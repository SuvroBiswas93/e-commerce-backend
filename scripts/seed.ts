import { PrismaClient } from '@prisma/client';
import { seedCategories } from './lib/seeds/categories.seed.js';
import { seedProducts } from './lib/seeds/products.seed.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    console.log('✓ Data cleared');

    // Seed categories
    await seedCategories();

    // Seed products
    await seedProducts();

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
