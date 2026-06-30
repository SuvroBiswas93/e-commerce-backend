# Code Conventions & Standards

This document outlines the coding conventions and standards used in this project.

## 📐 File Naming Conventions

### Folders
- Use `kebab-case` for directory names
- Examples: `src/app/modules/product/`, `src/app/config/`, `scripts/lib/seeds/`

### Files
- Use `kebab-case` for file names
- Examples: `product.controller.ts`, `env.config.ts`, `async-handler.ts`

### Exceptions
- Database migration files follow Prisma conventions

## 🔤 Code Naming Conventions

### Variables & Constants
- **Variables**: Use `camelCase`
  ```typescript
  const userName = 'John';
  let productCount = 0;
  ```

- **Constants**: Use `UPPER_SNAKE_CASE`
  ```typescript
  const MAX_LIMIT = 20;
  const DEFAULT_PAGE = 1;
  const API_PREFIX = '/api';
  ```

### Functions
- Use `camelCase`
- Use descriptive names starting with verbs when appropriate
  ```typescript
  function validateEmail() {}
  function generateSlug() {}
  async function fetchProducts() {}
  ```

### Classes
- Use `PascalCase`
- Use descriptive nouns or noun phrases
  ```typescript
  class ProductService {}
  class AppError {}
  class CategoryController {}
  ```

### Interfaces & Types
- Use `PascalCase`
- Prefix interfaces with `I`
  ```typescript
  interface IProduct {}
  interface ICategory {}
  type ProductFilter = {};
  ```

### Prisma Models
- Use `PascalCase`
  ```prisma
  model Product { }
  model Category { }
  ```

### Enums & Permissions
- Use `UPPER_SNAKE_CASE` for enum values
- Use `resource:action` format for permissions
  ```typescript
  enum ROLE {
    ADMIN = 'ADMIN',
    USER = 'USER'
  }
  
  const PERMISSIONS = {
    CREATE_PRODUCT: 'product:create',
    READ_PRODUCT: 'product:read',
    UPDATE_PRODUCT: 'product:update',
    DELETE_PRODUCT: 'product:delete',
  };
  ```

## 📦 Module Structure

Every module must follow this structure:

```
module/
├── controller.ts      # Request/response handling
├── service.ts         # Business logic
├── routes.ts          # Route definitions
├── validation.ts      # Zod validation schemas
├── interface.ts       # TypeScript interfaces
└── swagger.ts         # Swagger documentation
```

### Example: Product Module

```
src/app/modules/product/
├── product.controller.ts
├── product.service.ts
├── product.routes.ts
├── product.validation.ts
├── product.interface.ts
└── product.swagger.ts
```

## 🏗️ Architecture Layers

### 1. Routes (Routing Layer)
- Defines API endpoints
- Applies middleware
- Routes requests to controllers

```typescript
// product.routes.ts
export const productRoutes = Router();
productRoutes.get('/', asyncHandler((req, res) => productController.getAll(req, res)));
```

### 2. Middleware (Middleware Layer)
- Request validation (Zod)
- Error handling
- CORS, logging, etc.

```typescript
// zod-validation.ts
export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validation logic
  };
};
```

### 3. Controller (Presentation Layer)
- Thin layer for HTTP handling
- Delegates to services
- Returns responses

```typescript
// product.controller.ts
export class ProductController {
  async getAll(req: Request, res: Response): Promise<void> {
    const result = await productService.getProducts(filters);
    res.status(200).json(successResponse(200, 'message', result.data, result.meta));
  }
}
```

### 4. Service (Business Logic Layer)
- Contains all business logic
- Interacts with database via Prisma
- No HTTP/request handling

```typescript
// product.service.ts
export class ProductService {
  async getProducts(filters: IProductFilters): Promise<IPaginatedResponse<IProduct>> {
    // Database queries with Prisma
    // Business logic
  }
}
```

### 5. Prisma (Data Access Layer)
- Database queries
- Schema migrations
- No business logic

```typescript
// prisma.ts
const product = await prisma.product.findMany({
  where: { categoryId: 'xyz' }
});
```

## ✅ Code Quality Rules

### 1. No Business Logic in Controllers
```typescript
// ❌ WRONG
export class ProductController {
  async getAll(req: Request, res: Response) {
    const products = await prisma.product.findMany(); // Database logic in controller
    const filtered = products.filter(p => p.price > 100); // Business logic in controller
  }
}

// ✅ CORRECT
export class ProductController {
  async getAll(req: Request, res: Response) {
    const result = await productService.getProducts(filters); // Delegate to service
  }
}
```

### 2. No Direct Database Access Outside Service
```typescript
// ❌ WRONG
// In controller or elsewhere
const product = await prisma.product.findUnique({ where: { id } });

// ✅ CORRECT
// In service
async getProductById(id: string) {
  return await prisma.product.findUnique({ where: { id } });
}
```

### 3. Use Zod for All Input Validation
```typescript
// ❌ WRONG
if (!email || !email.includes('@')) {
  throw new Error('Invalid email');
}

// ✅ CORRECT
const schema = z.object({
  email: z.string().email('Invalid email')
});
```

### 4. Use Proper Error Classes
```typescript
// ❌ WRONG
throw new Error('Product not found');

// ✅ CORRECT
throw new NotFoundError('Product');
```

### 5. Always Use Async Handler Middleware
```typescript
// ❌ WRONG
router.get('/', (req, res) => {
  productController.getAll(req, res); // Unhandled promise rejection
});

// ✅ CORRECT
router.get('/', asyncHandler((req, res) => productController.getAll(req, res)));
```

## 🎯 TypeScript Best Practices

### 1. Use Interfaces for Data Structures
```typescript
// ✅ Define interfaces
interface IProduct {
  id: string;
  title: string;
  price: number;
}

// Use in function signatures
async function getProduct(id: string): Promise<IProduct> {}
```

### 2. Avoid `any` Type
```typescript
// ❌ WRONG
function process(data: any) {}

// ✅ CORRECT
function process(data: IProduct) {}
```

### 3. Use Union Types for Error Handling
```typescript
// ✅ CORRECT
type Result<T> = T | AppError;

async function getProduct(id: string): Promise<Result<IProduct>> {
  if (!id) {
    return new NotFoundError('Product');
  }
  return product;
}
```

### 4. Use Type Guards
```typescript
// ✅ Type guard function
function isProduct(obj: any): obj is IProduct {
  return obj.id && obj.title && typeof obj.price === 'number';
}

if (isProduct(data)) {
  // data is typed as IProduct here
}
```

## 🔑 Key Principles

### 1. DRY (Don't Repeat Yourself)
- Extract repeated code into utility functions
- Use shared middleware and handlers

### 2. SOLID Principles
- **S**ingle Responsibility: Each class/function has one job
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Subtypes should substitute parent types
- **I**nterface Segregation: Specific interfaces over generic ones
- **D**ependency Inversion: Depend on abstractions, not concrete implementations

### 3. Separation of Concerns
- Controllers handle HTTP only
- Services handle business logic
- Middleware handles cross-cutting concerns

### 4. Database-Level Operations
- Pagination at database level (skip/take)
- Search at database level (WHERE clauses)
- Filtering at database level (WHERE conditions)
- Never fetch all data and filter in code

## 📝 Comments & Documentation

### When to Comment
```typescript
// ✅ Good: Explains WHY, not WHAT
// We cache the category slug because it's used in 100+ requests per minute
const cachedSlug = cache.get('category-slug');

// ❌ Bad: Explains obvious WHAT
// Get the product
const product = await prisma.product.findUnique({ where: { id } });
```

### Function Documentation
```typescript
/**
 * Fetches paginated products with optional filtering
 * @param filters - Pagination, search, and category filters
 * @returns Paginated response with metadata
 * @throws NotFoundError if category doesn't exist
 */
async function getProducts(filters: IProductFilters): Promise<IPaginatedResponse<IProduct>> {
  // Implementation
}
```

## 🚫 Anti-Patterns to Avoid

1. **No In-Memory Data**: Don't use arrays or objects for data that should be in the database
2. **No Mock APIs**: Always use real database connections
3. **No TODO Comments**: Complete all functionality before committing
4. **No Hardcoded Values**: Use environment variables or configuration files
5. **No Large Files**: Keep files to <300 lines for maintainability
6. **No Circular Dependencies**: Design modules to be independent
7. **No God Objects**: Don't create monolithic services
8. **No Magic Strings**: Use constants for repeated strings

## 🔄 Import Path Aliases

Use path aliases for cleaner imports:

```typescript
// ❌ WRONG
import { ProductService } from '../../../../app/modules/product/product.service';

// ✅ CORRECT
import { ProductService } from '@modules/product/product.service';
```

### Available Aliases
- `@/*` - src folder root
- `@app/*` - src/app
- `@config/*` - src/app/config
- `@middleware/*` - src/app/middleware
- `@modules/*` - src/app/modules
- `@utils/*` - src/utils
- `@types/*` - src/types
- `@lib/*` - src/lib
- `@db/*` - src/lib/database
- `@constants/*` - src/constants

## 🧹 Code Formatting

### Prettier Configuration
- 2 spaces for indentation
- Single quotes for strings
- Trailing commas for ES5
- 100 character line width
- Always add semicolons

### ESLint Rules
- No unused variables
- No console logs (except in logging module)
- No implicit any types
- Strict null checks

### Format Code
```bash
pnpm run format          # Format all files
pnpm run format:check    # Check formatting
pnpm run lint            # Run ESLint
```

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Zod Documentation](https://zod.dev/)
