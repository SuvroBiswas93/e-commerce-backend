import { Request, Response } from 'express';
import { categoryService } from './category.service.js';
import { successResponse } from '@utils/index.js';

export class CategoryController {
  async getAll(_req: Request, res: Response): Promise<void> {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(
      successResponse(200, 'Categories fetched successfully', categories)
    );
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const category = await categoryService.getCategoryById(id);
    res.status(200).json(
      successResponse(200, 'Category fetched successfully', category)
    );
  }
}

export const categoryController = new CategoryController();
