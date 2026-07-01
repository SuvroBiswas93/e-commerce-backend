import type { PrismaClient } from '@prisma/client';
import { generateSlug } from '../../../src/utils/generate-slug.js';

export const categoriesData = [
  { name: 'Men\'s Shoes' },
  { name: 'Women\'s Shoes' },
  { name: 'Electronics' },
  { name: 'Smartphones' },
  { name: 'Laptops' },
  { name: 'Groceries' },
  { name: 'Beauty' },
  { name: 'Clothing' },
  { name: 'Home & Garden' },
  { name: 'Sports & Outdoors' },
];

export async function seedCategories(prisma: PrismaClient) {
  console.log('Seeding categories...');

  const createdCategories = [];

  for (const categoryData of categoriesData) {
    const slug = generateSlug(categoryData.name);

    const category = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name: categoryData.name,
        slug,
      },
    });

    createdCategories.push(category);
    console.log(`Created category: ${category.name}`);
  }

  return createdCategories;
}
