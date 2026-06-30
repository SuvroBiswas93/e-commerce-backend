import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(128),
  }),
  params: z.object({}).passthrough().default({}),
  query: z.object({}).passthrough().default({}),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
  }),
  params: z.looseObject({}).default({}),
  query: z.looseObject({}).default({}),
});

export type RegisterRequest = z.infer<typeof registerSchema>['body'];
export type LoginRequest = z.infer<typeof loginSchema>['body'];
