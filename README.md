# E-Commerce Backend API

A production-ready REST API backend for a mini e-commerce application built with Node.js, TypeScript, Express, PostgreSQL, and Prisma.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [Database Setup](#database-setup)
- [Development](#development)
- [Building for Production](#building-for-production)
- [API Endpoints](#api-endpoints)
- [Swagger Documentation](#swagger-documentation)
- [Testing](#testing)
- [Assumptions](#assumptions)
- [Limitations](#limitations)

## Overview

This backend provides a complete REST API for an e-commerce application with:

- **Authentication**: User registration and login with JWT tokens
- **Product Management**: Listing, searching, and filtering products
- **Category Management**: Organizing products into categories
- **Pagination**: Server-side pagination with configurable limits
- **Search**: Database-level full-text search
- **Filtering**: Category-based filtering
- **Validation**: Comprehensive input validation using Zod
- **Error Handling**: Structured error responses with detailed messages
- **Documentation**: Interactive Swagger API documentation
- **Testing**: Unit tests using Jest
- **Logging**: Structured logging with Winston and daily rotation
- **Docker**: Containerized deployment with Docker Compose

## Architecture

The backend follows a **Modular Monolith + Layered Architecture** pattern inspired by NestJS:

```
Routes
  ↓
Middleware (Validation, Authentication, Error Handling)
  ↓
Controller (Request/Response Handling)
  ↓
Service (Business Logic)
  ↓
Prisma ORM
  ↓
PostgreSQL Database
```

### Key Principles

- **Modular Design**: Each feature is a self-contained module with its own controller, service, validation, and routes
- **Separation of Concerns**: Controllers handle HTTP requests, services contain business logic
- **Single Responsibility**: Each layer has a single, well-defined responsibility
- **Database-Level Operations**: Filtering, searching, and pagination happen at the database level for performance
- **Type Safety**: Full TypeScript implementation for type safety and better developer experience

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Runtime | Node.js LTS | 20+ |
| Language | TypeScript | 6.0+ |
| Framework | Express | 5.2+ |
| ORM | Prisma | 7.8+ |
| Database | PostgreSQL | 16+ |
| Validation | Zod | 4.4+ |
| Authentication | JWT (jsonwebtoken + bcryptjs) | 9.0+ / 3.0+ |
| Testing | Jest | 30.4+ |
| Documentation | Swagger/OpenAPI (swagger-jsdoc + swagger-ui-express) | 3.0 |
| Package Manager | pnpm | 8.0+ |
| Containerization | Docker | Latest |
| Logging | Winston + daily-rotate-file | 3.19+ |
| Development | tsx | 4.22+ |
| Build | tsup, tsc-alias | Latest |
| Code Quality | ESLint, Prettier, Husky, lint-staged | Latest |

## Project Structure

```
ecommerce-backend/
├── .editorconfig
├── .env
├── .env.example
├── .gitignore
├── .eslintrc.json
├── .husky/
├── CONVENTIONS.md
├── README.md
├── docker-compose.yml
├── Dockerfile
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── prisma.config.ts
├── tsconfig.json
├── jest.config.js
├── prettier.config.js
├── tsup.config.ts
│
├── prisma/
│   └── schema.prisma
│
├── scripts/
│   ├── seed.ts
│   └── lib/seeds/
│       ├── categories.seed.ts
│       └── products.seed.ts
│
├── src/
│   ├── app.ts                          # Express app setup
│   ├── server.ts                       # Server entry point
│   │
│   ├── app/
│   │   ├── config/
│   │   │   ├── index.ts
│   │   │   ├── app.config.ts
│   │   │   ├── env.config.ts
│   │   │   ├── swagger.config.ts
│   │   │   └── winston.config.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── index.ts
│   │   │   ├── async-handler.ts
│   │   │   ├── authenticate.ts
│   │   │   ├── error-middleware.ts
│   │   │   ├── not-found-middleware.ts
│   │   │   └── zod-validation.ts
│   │   │
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.interface.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.swagger.ts
│   │   │   │   └── auth.validation.ts
│   │   │   │
│   │   │   ├── product/
│   │   │   │   ├── product.controller.ts
│   │   │   │   ├── product.interface.ts
│   │   │   │   ├── product.routes.ts
│   │   │   │   ├── product.service.ts
│   │   │   │   ├── product.swagger.ts
│   │   │   │   └── product.validation.ts
│   │   │   │
│   │   │   └── category/
│   │   │       ├── category.controller.ts
│   │   │       ├── category.interface.ts
│   │   │       ├── category.routes.ts
│   │   │       ├── category.service.ts
│   │   │       ├── category.swagger.ts
│   │   │       └── category.validation.ts
│   │   │
│   │   └── routes/
│   │       └── index.ts
│   │
│   ├── lib/
│   │   ├── database/
│   │   │   └── prisma.ts
│   │   └── errors/
│   │       └── app-error.ts
│   │
│   ├── types/
│   │   └── express.d.ts
│   │
│   └── utils/
│       ├── index.ts
│       ├── generate-slug.ts
│       └── success-response.ts
│
├── tests/
│   └── unit/
│       ├── product/
│       │   └── product.service.test.ts
│       └── category/
│           └── category.service.test.ts
│
└── logs/
    ├── error/
    ├── combined/
    ├── exceptions/
    └── rejections/
```

## Installation

### Prerequisites

- Node.js 20+ LTS
- pnpm 8.0+
- PostgreSQL 16+ (or use Docker)
- Git

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd ecommerce-backend
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Copy environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```bash
# Edit .env with your database, JWT, and server configuration
nano .env
```

5. **Set up the database**
```bash
# Run migrations
pnpm run db:migrate:dev

# Generate Prisma client
pnpm run db:generate

# Seed the database
pnpm run db:seed
```

6. **Start development server**
```bash
pnpm run dev
```

The API will be available at `http://localhost:8000`

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Environment
NODE_ENV=development

# Server
PORT=8000
API_BASE_URL=http://localhost:8000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce_db

# CORS
FRONTEND_URL=http://localhost:3000

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars-long!!
JWT_EXPIRES_IN=7d

# Logging
LOG_LEVEL=debug

# Swagger
SWAGGER_TITLE=E-Commerce API
SWAGGER_DESCRIPTION=Production-ready REST API for e-commerce application
SWAGGER_VERSION=1.0.0
```

## Docker Setup

### Run with Docker Compose

```bash
# Build and start all services
docker compose up

# Run in background
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Reset everything (remove volumes)
docker compose down -v
```

This will start:
- **PostgreSQL**: Running on port 5432
- **API**: Running on port 8000

### Environment Variables for Docker

Update the `.env` file or pass variables via `docker-compose.yml`:

```yml
environment:
  DATABASE_URL: postgresql://user:password@postgres:5432/ecommerce_db
  PORT: 8000
```

## Database Setup

### Database Schema

#### Users Table
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (String, hashed)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

#### Categories Table
- `id` (UUID, Primary Key)
- `name` (String, Unique)
- `slug` (String, Unique)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

#### Products Table
- `id` (UUID, Primary Key)
- `title` (String)
- `description` (Text)
- `price` (Float)
- `thumbnail` (String)
- `images` (JSON Array)
- `stock` (Integer)
- `rating` (Float, Default: 0)
- `categoryId` (UUID, Foreign Key)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Prisma Migrations

```bash
# Create a new migration
pnpm run db:migrate:dev --name migration_name

# Deploy migrations
pnpm run db:migrate:deploy

# Reset database (development only)
pnpm run db:reset

# Generate Prisma client
pnpm run db:generate

# Open Prisma Studio
pnpm run db:studio
```

## Development

### Available Scripts

```bash
# Development
pnpm run dev              # Start dev server with hot reload

# Building
pnpm run build            # Build for production
pnpm run start            # Start production server

# Database
pnpm run db:migrate:dev   # Run migrations in dev
pnpm run db:migrate:deploy # Deploy migrations
pnpm run db:generate      # Generate Prisma client
pnpm run db:seed          # Seed database
pnpm run db:push          # Push schema to database
pnpm run db:studio        # Open Prisma Studio
pnpm run db:reset         # Reset database

# Testing
pnpm run test             # Run all tests
pnpm run test:watch       # Run tests in watch mode
pnpm run test:cov         # Generate coverage report

# Code Quality
pnpm run lint             # Run ESLint
pnpm run format           # Format code with Prettier
pnpm run format:check     # Check formatting
pnpm run prepare          # Install Husky hooks

# Docker
pnpm run docker:build     # Build Docker image
pnpm run docker:up        # Start Docker services
pnpm run docker:down      # Stop Docker services
```

### Environment Setup for Development

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env

# Configure database
# Edit .env and set DATABASE_URL and JWT_SECRET

# Run migrations
pnpm run db:migrate:dev

# Seed data
pnpm run db:seed

# Start development server
pnpm run dev
```

## Building for Production

```bash
# Build the project
pnpm run build

# Start production server
pnpm run start
```

The build output will be in the `dist/` directory.

## API Endpoints

### Authentication

All protected endpoints require an `Authorization: Bearer <token>` header.

#### Register
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt-token"
  }
}
```

#### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt-token"
  }
}
```

#### Get Profile
```http
GET /api/auth/me
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Profile fetched successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Products Endpoints

All product endpoints require authentication (`Authorization: Bearer <token>`).

#### Get All Products
```http
GET /api/products?page=1&limit=10&search=shoe&category=mens-shoes
```

**Query Parameters:**
- `page` (integer, default: 1): Page number (minimum: 1)
- `limit` (integer, default: 10): Items per page (1-20)
- `search` (string, optional): Search products by title
- `category` (string, optional): Filter by category slug

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Products fetched successfully",
  "data": [
    {
      "id": "uuid",
      "title": "Product Title",
      "description": "Product description",
      "price": 99.99,
      "thumbnail": "image-url",
      "images": ["image1", "image2"],
      "stock": 50,
      "rating": 4.5,
      "categoryId": "uuid",
      "category": {
        "id": "uuid",
        "name": "Category Name",
        "slug": "category-slug"
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasMore": true
  }
}
```

#### Get Product by ID
```http
GET /api/products/{id}
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Product fetched successfully",
  "data": {
    "id": "uuid",
    "title": "Product Title",
    "description": "Product description",
    "price": 99.99,
    "thumbnail": "image-url",
    "images": ["image1", "image2"],
    "stock": 50,
    "rating": 4.5,
    "categoryId": "uuid",
    "category": {
      "id": "uuid",
      "name": "Category Name",
      "slug": "category-slug"
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Categories Endpoints

All category endpoints require authentication (`Authorization: Bearer <token>`).

#### Get All Categories
```http
GET /api/categories
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Categories fetched successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Category Name",
      "slug": "category-slug",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Get Category by ID
```http
GET /api/categories/{id}
```

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Swagger Documentation

Interactive API documentation is available at:
```
http://localhost:8000/api/docs
```

The Swagger/OpenAPI 3.0 spec is generated from dedicated swagger definition files in each module and is available at:
```
http://localhost:8000/api/swagger.json
```

## Testing

### Run Tests

```bash
# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Generate coverage report
pnpm run test:cov
```

### Test Structure

Tests are located in `tests/unit/` directory with the following structure:

```
tests/unit/
├── product/
│   └── product.service.test.ts
└── category/
    └── category.service.test.ts
```

### Test Coverage

Tests cover:
- Service business logic
- Pagination functionality
- Search functionality
- Category filtering
- 404 error handling
- Validation logic

## Assumptions

1. **Database-Level Operations**: All search, filtering, and pagination are performed at the database level using PostgreSQL for performance
2. **UUID IDs**: All entities use UUID for primary keys for better scalability and distribution
3. **JSON Images Array**: Product images are stored as a JSON array in the database
4. **Slug Generation**: Category slugs are automatically generated from names using kebab-case
5. **CORS Enabled**: CORS is enabled for the frontend URL specified in environment variables
6. **Logging**: All requests and errors are logged using Winston with daily rotation
7. **JWT Authentication**: The API uses JWT-based authentication; tokens are required for protected endpoints
8. **Frontend State Only**: Cart functionality is handled by the frontend using local state

## Limitations

1. **No Admin Endpoints**: Admin CRUD operations for products/categories not exposed via routes (only GET endpoints are routed)
2. **No Payment Processing**: Shopping cart and checkout are frontend-only; payment processing needs integration
3. **No Order Management**: Order creation and tracking not implemented
4. **No Rate Limiting**: API rate limiting should be added for production
5. **No Caching**: Response caching (Redis) not implemented
6. **No File Upload**: Product images are external URLs; file upload to Blob storage not included
7. **Single Region**: Database and API are single-region; multi-region deployment not configured
8. **No CI/CD**: GitHub Actions or similar CI/CD pipelines not configured
9. **No Migrations Directory**: Initial Prisma migrations have not been generated yet (run `pnpm run db:migrate:dev` to create them)

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## License

MIT

## Support

For issues and questions, please create an issue in the repository or contact the development team.

---

**Built with Node.js, TypeScript, Express, PostgreSQL, and Prisma**
