import { z } from 'zod';
import { APP_CONFIG } from '@config/app.config.js';

export const getProductsSchema = z.object({
  body: z.object({}).passthrough().default({}),
  params: z.object({}).passthrough().default({}),
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : APP_CONFIG.DEFAULT_PAGE))
      .refine((val) => val >= APP_CONFIG.MIN_PAGE, {
        message: `Page must be at least ${APP_CONFIG.MIN_PAGE}`,
      }),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : APP_CONFIG.DEFAULT_LIMIT))
      .refine((val) => val >= APP_CONFIG.MIN_LIMIT, {
        message: `Limit must be at least ${APP_CONFIG.MIN_LIMIT}`,
      })
      .refine((val) => val <= APP_CONFIG.MAX_LIMIT, {
        message: `Limit must be at most ${APP_CONFIG.MAX_LIMIT}`,
      }),
    search: z.string().optional(),
    category: z.string().optional(),
    sort: z.enum(['newest', 'price_asc', 'price_desc', 'top_rated']).optional(),
    minPrice: z
      .string()
      .optional()
      .transform((val) => (val ? parseFloat(val) : undefined))
      .refine((val) => val === undefined || !isNaN(val), { message: 'minPrice must be a valid number' })
      .refine((val) => val === undefined || val >= 0, { message: 'minPrice must be non-negative' }),
    maxPrice: z
      .string()
      .optional()
      .transform((val) => (val ? parseFloat(val) : undefined))
      .refine((val) => val === undefined || !isNaN(val), { message: 'maxPrice must be a valid number' })
      .refine((val) => val === undefined || val >= 0, { message: 'maxPrice must be non-negative' }),
  }).refine(
    (data) => data.minPrice === undefined || data.maxPrice === undefined || data.minPrice <= data.maxPrice,
    { message: 'minPrice must be less than or equal to maxPrice', path: ['minPrice'] },
  ),
});

export const getProductByIdSchema = z.object({
  body: z.object({}).passthrough().default({}),
  params: z.object({
    id: z.string().uuid('Invalid product ID format'),
  }),
  query: z.object({}).passthrough().default({}),
});

export const createProductSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
    price: z.number().positive('Price must be positive'),
    thumbnail: z.string().url('Invalid thumbnail URL'),
    images: z.array(z.string().url('Invalid image URL')).optional(),
    stock: z.number().int().nonnegative('Stock must be non-negative'),
    rating: z.number().min(0).max(5).optional(),
    categoryId: z.string().uuid('Invalid category ID'),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

export type GetProductsQuery = z.infer<typeof getProductsSchema>['query'];
export type GetProductByIdParams = z.infer<typeof getProductByIdSchema>['params'];
export type CreateProductRequest = z.infer<typeof createProductSchema>['body'];
