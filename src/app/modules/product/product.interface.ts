export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  stock: number;
  rating: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface ICreateProduct {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images?: string[];
  stock: number;
  rating?: number;
  categoryId: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginationMeta;
}

export interface IProductFilters {
  page: number;
  limit: number;
  search?: string;
  category?: string;
}
