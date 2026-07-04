import { Router, type Router as RouterType } from 'express';
import { productController } from './product.controller.js';
import { authenticate } from '@middleware/authenticate.js';
import { asyncHandler } from '@middleware/async-handler.js';
import { validateRequest } from '@middleware/zod-validation.js';
import { getProductsSchema, getProductByIdSchema } from './product.validation.js';

export const productRoutes: RouterType = Router();

productRoutes.get(
  '/',
  authenticate,
  validateRequest(getProductsSchema),
  asyncHandler((req, res) => productController.getAll(req, res))
);

productRoutes.get(
  '/:id',
  validateRequest(getProductByIdSchema),
  asyncHandler((req, res) => productController.getById(req, res))
);
