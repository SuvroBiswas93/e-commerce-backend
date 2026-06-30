import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Category name is required').max(100),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

export const getCategorySchema = z.object({
  body: z.object({}).passthrough().default({}),
  params: z.object({}).passthrough().default({}),
  query: z.object({}).passthrough().default({}),
});

export type CreateCategoryRequest = z.infer<typeof createCategorySchema>['body'];
