import prisma from '@lib/database/prisma.js';
import { NotFoundError } from '@lib/errors/app-error.js';
import { IProduct, IPaginatedResponse, IProductFilters, ICreateProduct } from './product.interface.js';

export class ProductService {
  async getProducts(filters: IProductFilters): Promise<IPaginatedResponse<IProduct>> {
    const { page, limit, search, category } = filters;

    // Build where clause for database-level filtering
    const where: any = {};

    if (search) {
      where.title = {
        search: search,
      };
    }

    if (category) {
      where.category = {
        slug: category,
      };
    }

    // Get total count with filters applied
    const total = await prisma.product.count({ where });

    // Fetch products with pagination
    const products = await prisma.product.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return {
      data: products as IProduct[],
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasMore,
      },
    };
  }

  async getProductById(id: string): Promise<IProduct> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundError('Product');
    }

    return product as IProduct;
  }

  async getProductsByCategory(categoryId: string): Promise<IProduct[]> {
    const products = await prisma.product.findMany({
      where: { categoryId },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return products as IProduct[];
  }

  async createProduct(data: ICreateProduct): Promise<IProduct> {
    const product = await prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        thumbnail: data.thumbnail,
        images: data.images || [],
        stock: data.stock,
        rating: data.rating || 0,
        categoryId: data.categoryId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return product as IProduct;
  }

  async updateProduct(id: string, data: Partial<ICreateProduct>): Promise<IProduct> {
    const product = await this.getProductById(id);

    const updated = await prisma.product.update({
      where: { id },
      data: {
        title: data.title || product.title,
        description: data.description || product.description,
        price: data.price || product.price,
        thumbnail: data.thumbnail || product.thumbnail,
        images: data.images || product.images,
        stock: data.stock !== undefined ? data.stock : product.stock,
        rating: data.rating || product.rating,
        categoryId: data.categoryId || product.categoryId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return updated as IProduct;
  }

  async deleteProduct(id: string): Promise<IProduct> {
    const product = await this.getProductById(id);

    await prisma.product.delete({
      where: { id },
    });

    return product;
  }
}

export const productService = new ProductService();
