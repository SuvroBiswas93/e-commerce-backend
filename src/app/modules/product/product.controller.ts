import { Request, Response } from 'express';
import { productService } from './product.service.js';
import { successResponse } from '@utils/index.js';
import { GetProductsQuery, GetProductByIdParams } from './product.validation.js';

export class ProductController {
  async getAll(req: Request, res: Response): Promise<void> {
    const { page, limit, search, category } = req.query as unknown as GetProductsQuery;

    const result = await productService.getProducts({
      page,
      limit,
      search,
      category,
    });

    res.status(200).json(
      successResponse(200, 'Products fetched successfully', result.data, result.meta)
    );
  }

  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params as GetProductByIdParams;
    const product = await productService.getProductById(id);
    res.status(200).json(
      successResponse(200, 'Product fetched successfully', product)
    );
  }
}

export const productController = new ProductController();
