import { Request, Response } from 'express';
import { authService } from './auth.service.js';
import { successResponse } from '@utils/index.js';
import { RegisterRequest, LoginRequest } from './auth.validation.js';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const data = req.body as RegisterRequest;
    const result = await authService.register(data);
    res.status(201).json(
      successResponse(201, 'User registered successfully', result)
    );
  }

  async login(req: Request, res: Response): Promise<void> {
    const data = req.body as LoginRequest;
    const result = await authService.login(data);
    res.status(200).json(
      successResponse(200, 'Login successful', result)
    );
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    const userId = req.user!.userId;
    const profile = await authService.getProfile(userId);
    res.status(200).json(
      successResponse(200, 'Profile fetched successfully', profile)
    );
  }
}

export const authController = new AuthController();
