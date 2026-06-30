export interface ErrorSource {
  field?: string;
  message: string;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorSources: ErrorSource[];

  constructor(statusCode: number, message: string, errorSources: ErrorSource[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errorSources = errorSources;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    const message = `${resource} not found`;
    super(404, message, [{ message }]);
  }
}

export class ValidationError extends AppError {
  constructor(errorSources: ErrorSource[]) {
    super(400, 'Validation failed', errorSources);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message, [{ message }]);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(401, message, [{ message }]);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(403, message, [{ message }]);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(500, message, [{ message }]);
  }
}
