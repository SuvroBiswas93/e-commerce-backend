import { Router, type Router as RouterType } from 'express';
import { authController } from './auth.controller.js';
import { asyncHandler } from '@middleware/async-handler.js';
import { validateRequest } from '@middleware/zod-validation.js';
import { authenticate } from '@middleware/authenticate.js';
import { registerSchema, loginSchema } from './auth.validation.js';

export const authRoutes: RouterType = Router();

authRoutes.post(
  '/register',
  validateRequest(registerSchema),
  asyncHandler((req, res) => authController.register(req, res))
);

authRoutes.post(
  '/login',
  validateRequest(loginSchema),
  asyncHandler((req, res) => authController.login(req, res))
);

authRoutes.get(
  '/me',
  authenticate,
  asyncHandler((req, res) => authController.getProfile(req, res))
);
