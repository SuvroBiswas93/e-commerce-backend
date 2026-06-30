import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '@config/env.config.js';
import { logger } from '@config/index.js';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({ adapter });
    (global.prisma as any).$on('query', (e: any) => {
      logger.debug(`Query: ${e.query}`, { duration: `${e.duration}ms` });
    });
  }
  prisma = global.prisma;
}

export default prisma;
