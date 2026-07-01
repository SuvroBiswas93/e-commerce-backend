import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { seedUsers } from './lib/seeds/users.seed.js';
import { seedCategories } from './lib/seeds/categories.seed.js';
import { seedProducts } from './lib/seeds/products.seed.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seeding...');

  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    console.log('Data cleared');

    // Seed users
    await seedUsers(prisma);

    // Seed categories
    await seedCategories(prisma);

    // Seed products
    await seedProducts(prisma);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
