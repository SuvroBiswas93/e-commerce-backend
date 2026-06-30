export interface ICategory {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCategory {
  name: string;
}
