import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { env, swaggerSpec, APP_CONFIG, logger } from '@config/index.js';
import { apiRoutes } from '@app/routes/index.js';
import { errorMiddleware } from '@middleware/error-middleware.js';
import { notFoundMiddleware } from '@middleware/not-found-middleware.js';
import { asyncHandler } from '@middleware/async-handler.js';

export const createApp = (): Express => {
  const app = express();

  // Trust proxy
  app.set('trust proxy', 1);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', env.FRONTEND_URL);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  // Request logging
  app.use((req, res, next) => {
    const startTime = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      logger.info(`${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
    });
    next();
  });

  // Root route
  app.get('/', (_req, res) => {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'E-Commerce API',
      version: '1.0.0',
      docs: `${env.API_BASE_URL}${APP_CONFIG.SWAGGER_PATH}`,
     
      timestamp: new Date().toISOString(),
    });
  });

  // Health check
  app.get(
    APP_CONFIG.HEALTH_CHECK_PATH,
    asyncHandler((_req, res) => {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
      });
    })
  );

  // Swagger
  app.use(
    APP_CONFIG.SWAGGER_PATH,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        url: '/api/swagger.json',
      },
    })
  );

  // Swagger JSON
  app.get('/api/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // API routes
  app.use(APP_CONFIG.API_PREFIX, apiRoutes);

  // Not found middleware
  app.use(notFoundMiddleware);

  // Error handling middleware
  app.use(errorMiddleware);

  return app;
};
