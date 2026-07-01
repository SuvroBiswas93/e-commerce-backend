import type { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

interface UserSeed {
  name: string;
  email: string;
  password: string;
}

export const usersData: UserSeed[] = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
  },
];

export async function seedUsers(prisma: PrismaClient) {
  console.log('Seeding users...');

  const SALT_ROUNDS = 12;
  let createdCount = 0;

  for (const userData of usersData) {
    const existing = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existing) {
      console.log(`User already exists: ${userData.email}`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });

    createdCount++;
    console.log(`Created user: ${user.email}`);
  }

  console.log(`Total users seeded: ${createdCount}`);
}
