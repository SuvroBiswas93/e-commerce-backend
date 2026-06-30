import prisma from '@lib/database/prisma.js';
import { NotFoundError, ConflictError } from '@lib/errors/app-error.js';
import { generateSlug } from '@utils/index.js';
import { ICategory, ICreateCategory } from './category.interface.js';

export class CategoryService {
  async getAllCategories(): Promise<ICategory[]> {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return categories;
  }

  async getCategoryById(id: string): Promise<ICategory> {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundError('Category');
    }

    return category;
  }

  async getCategoryBySlug(slug: string): Promise<ICategory> {
    const category = await prisma.category.findUnique({
      where: { slug },
    });

    if (!category) {
      throw new NotFoundError('Category');
    }

    return category;
  }

  async createCategory(data: ICreateCategory): Promise<ICategory> {
    const slug = generateSlug(data.name);

    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      throw new ConflictError(`Category with name "${data.name}" already exists`);
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug,
      },
    });

    return category;
  }

  async updateCategory(id: string, data: ICreateCategory): Promise<ICategory> {
    const category = await this.getCategoryById(id);

    const slug = generateSlug(data.name);

    if (slug !== category.slug) {
      const existingCategory = await prisma.category.findUnique({
        where: { slug },
      });

      if (existingCategory) {
        throw new ConflictError(`Category with name "${data.name}" already exists`);
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug,
      },
    });

    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<ICategory> {
    const category = await this.getCategoryById(id);

    const deleted = await prisma.category.delete({
      where: { id },
    });

    return deleted;
  }
}

export const categoryService = new CategoryService();
