import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@lib/database/prisma.js';
import { env } from '@config/env.config.js';
import { ConflictError, NotFoundError, UnauthorizedError } from '@lib/errors/app-error.js';
import { IAuthResponse, IRegisterRequest, ILoginRequest, IUserProfile } from './auth.interface.js';

export class AuthService {
  async register(data: IRegisterRequest): Promise<IAuthResponse> {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });

    if (existing) {
      throw new ConflictError('A user with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async login(data: ILoginRequest): Promise<IAuthResponse> {
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  async getProfile(userId: string): Promise<IUserProfile> {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError('User');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private generateToken(userId: string, email: string): string {
    return jwt.sign({ userId, email }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as any,
    });
  }
}

export const authService = new AuthService();
