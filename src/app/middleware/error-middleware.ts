import { Request, Response, NextFunction } from 'express';
import { AppError, InternalServerError } from '@lib/errors/app-error.js';
import { logger } from '@config/index.js';

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(`Error: ${error.message}`, { stack: error.stack });

  let appError: AppError;

  if (error instanceof AppError) {
    appError = error;
  } else if (error instanceof SyntaxError && 'body' in error) {
    appError = new AppError(400, 'Invalid JSON', [{ message: 'Request body contains invalid JSON' }]);
  } else {
    appError = new InternalServerError(
      process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : error.message
    );
  }

  res.status(appError.statusCode).json({
    success: false,
    statusCode: appError.statusCode,
    message: appError.message,
    errorSources: appError.errorSources,
  });
};
