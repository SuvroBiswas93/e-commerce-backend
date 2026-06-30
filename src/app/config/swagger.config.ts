import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env.config.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: env.SWAGGER_TITLE,
      version: env.SWAGGER_VERSION,
      description: env.SWAGGER_DESCRIPTION,
      contact: {
        name: 'API Support',
        url: 'https://github.com',
      },
    },
    servers: [
      {
        url: env.API_BASE_URL,
        description: 'API Server',
      },
    ],
    tags: [
      { name: 'Authentication', description: 'User authentication endpoints (register, login, profile)' },
      { name: 'Categories', description: 'Category management endpoints' },
      { name: 'Products', description: 'Product management endpoints' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            statusCode: { type: 'integer', example: 200 },
            message: { type: 'string', example: 'Operation successful' },
            data: { type: 'object' },
            meta: { type: 'object' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            statusCode: { type: 'integer', example: 400 },
            message: { type: 'string' },
            errorSources: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            slug: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number', format: 'float' },
            thumbnail: { type: 'string' },
            images: {
              type: 'array',
              items: { type: 'string' },
            },
            stock: { type: 'integer' },
            rating: { type: 'number', format: 'float' },
            categoryId: { type: 'string', format: 'uuid' },
            category: { $ref: '#/components/schemas/Category' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./src/app/modules/**/*.swagger.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
