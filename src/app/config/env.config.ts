import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(8000),
  DATABASE_URL: z.url('Invalid DATABASE_URL'),
  FRONTEND_URL: z.string().url('Invalid FRONTEND_URL').default('http://localhost:3000'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug', 'verbose', 'silly']).default('info'),
  API_BASE_URL: z.url('Invalid API_BASE_URL').default('http://localhost:8000'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  SWAGGER_TITLE: z.string().default('E-Commerce API'),
  SWAGGER_DESCRIPTION: z.string().default('Production-ready REST API for e-commerce application'),
  SWAGGER_VERSION: z.string().default('1.0.0'),
});

type EnvConfig = z.infer<typeof envSchema>;

let cachedEnv: EnvConfig | null = null;

export function validateEnv(): EnvConfig {
  if (cachedEnv) return cachedEnv;

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    parsed.error.issues.forEach((error) => {
      console.error(`  ${error.path.join('.')}: ${error.message}`);
    });
    process.exit(1);
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}

export const env = validateEnv();
