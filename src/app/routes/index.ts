import { Router, type Router as RouterType } from 'express';
import { productRoutes } from '@modules/product/product.routes.js';
import { categoryRoutes } from '@modules/category/category.routes.js';
import { authRoutes } from '@modules/auth/auth.routes.js';
import { authenticate } from '@middleware/authenticate.js';

export const apiRoutes: RouterType = Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/products', productRoutes);
apiRoutes.use('/categories', authenticate, categoryRoutes);
