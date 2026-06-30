import { Request, Response } from 'express';
import { AppError } from '@lib/errors/app-error.js';

export const notFoundMiddleware = (_req: Request, _res: Response) => {
  throw new AppError(404, 'Route not found', [{ message: 'The requested endpoint does not exist' }]);
};
