import { Router, type Router as RouterType } from 'express';
import { categoryController } from './category.controller.js';
import { asyncHandler } from '@middleware/async-handler.js';

export const categoryRoutes: RouterType = Router();

categoryRoutes.get('/', asyncHandler((req, res) => categoryController.getAll(req, res)));

categoryRoutes.get('/:id', asyncHandler((req, res) => categoryController.getById(req, res)));
