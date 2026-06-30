import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '@lib/errors/app-error.js';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if (validated.body && typeof validated.body === 'object') {
        req.body = validated.body;
      }
      if (validated.query && typeof validated.query === 'object') {
        Object.defineProperty(req, 'query', {
          value: validated.query,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }
      if (validated.params && typeof validated.params === 'object') {
        Object.defineProperty(req, 'params', {
          value: validated.params,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorSources = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        throw new ValidationError(errorSources);
      }
      throw error;
    }
  };
};
