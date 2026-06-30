import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const productsData = [
  // Men's Shoes
  {
    title: 'Classic Leather Oxford Shoes',
    description: 'Premium quality leather oxford shoes for professional and casual wear',
    price: 129.99,
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    ],
    stock: 50,
    rating: 4.5,
    categorySlug: 'mens-shoes',
  },
  {
    title: 'Running Sneakers Pro',
    description: 'Lightweight and comfortable running shoes with advanced cushioning',
    price: 89.99,
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'],
    stock: 75,
    rating: 4.7,
    categorySlug: 'mens-shoes',
  },
  {
    title: 'Casual Canvas Sneakers',
    description: 'Versatile canvas sneakers perfect for everyday wear',
    price: 59.99,
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'],
    stock: 100,
    rating: 4.3,
    categorySlug: 'mens-shoes',
  },

  // Women's Shoes
  {
    title: 'Elegant High Heels',
    description: 'Sophisticated high heels for special occasions',
    price: 149.99,
    thumbnail: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80'],
    stock: 40,
    rating: 4.6,
    categorySlug: 'womens-shoes',
  },
  {
    title: 'Comfortable Flats',
    description: 'All-day comfortable flat shoes for women',
    price: 69.99,
    thumbnail: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80'],
    stock: 85,
    rating: 4.4,
    categorySlug: 'womens-shoes',
  },
  {
    title: 'Sporty Women\'s Trainers',
    description: 'Stylish and comfortable trainers for active women',
    price: 94.99,
    thumbnail: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80'],
    stock: 65,
    rating: 4.5,
    categorySlug: 'womens-shoes',
  },

  // Electronics
  {
    title: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-canceling wireless headphones',
    price: 199.99,
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80'],
    stock: 120,
    rating: 4.8,
    categorySlug: 'electronics',
  },
  {
    title: 'Portable Power Bank 20000mAh',
    description: 'High-capacity power bank with fast charging',
    price: 49.99,
    thumbnail: 'https://images.unsplash.com/photo-1591290619762-d0e2682dd04d?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1591290619762-d0e2682dd04d?w=400&q=80'],
    stock: 200,
    rating: 4.6,
    categorySlug: 'electronics',
  },
  {
    title: 'USB-C Multi Hub',
    description: '7-in-1 USB-C hub with multiple ports',
    price: 79.99,
    thumbnail: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&q=80'],
    stock: 150,
    rating: 4.4,
    categorySlug: 'electronics',
  },

  // Smartphones
  {
    title: 'Latest Smartphone Pro Max',
    description: 'Flagship smartphone with advanced camera and processor',
    price: 1299.99,
    thumbnail: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&q=80'],
    stock: 30,
    rating: 4.9,
    categorySlug: 'smartphones',
  },
  {
    title: 'Mid-Range Smartphone',
    description: 'Perfect balance of price and performance',
    price: 599.99,
    thumbnail: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&q=80'],
    stock: 80,
    rating: 4.5,
    categorySlug: 'smartphones',
  },
  {
    title: 'Budget Smartphone',
    description: 'Affordable smartphone with essential features',
    price: 299.99,
    thumbnail: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=400&q=80'],
    stock: 150,
    rating: 4.2,
    categorySlug: 'smartphones',
  },

  // Laptops
  {
    title: 'Professional Laptop Pro 15',
    description: 'High-performance laptop for professionals and creators',
    price: 1999.99,
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80'],
    stock: 25,
    rating: 4.8,
    categorySlug: 'laptops',
  },
  {
    title: 'Business Laptop',
    description: 'Reliable laptop for business and everyday use',
    price: 899.99,
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80'],
    stock: 50,
    rating: 4.4,
    categorySlug: 'laptops',
  },
  {
    title: 'Ultrabook Lightweight',
    description: 'Portable and lightweight laptop for travelers',
    price: 1299.99,
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80'],
    stock: 40,
    rating: 4.6,
    categorySlug: 'laptops',
  },

  // Groceries
  {
    title: 'Organic Whole Wheat Bread',
    description: 'Fresh organic bread made with whole wheat flour',
    price: 4.99,
    thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80'],
    stock: 500,
    rating: 4.5,
    categorySlug: 'groceries',
  },
  {
    title: 'Almond Butter Natural',
    description: '100% pure natural almond butter',
    price: 9.99,
    thumbnail: 'https://images.unsplash.com/photo-1599599810694-85081dbf86f1?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1599599810694-85081dbf86f1?w=400&q=80'],
    stock: 200,
    rating: 4.7,
    categorySlug: 'groceries',
  },
  {
    title: 'Organic Green Tea',
    description: 'Premium organic green tea leaves',
    price: 14.99,
    thumbnail: 'https://images.unsplash.com/photo-1597318972915-3ec6f6904df2?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1597318972915-3ec6f6904df2?w=400&q=80'],
    stock: 300,
    rating: 4.6,
    categorySlug: 'groceries',
  },

  // Beauty
  {
    title: 'Facial Moisturizer Cream',
    description: 'Hydrating moisturizer for all skin types',
    price: 34.99,
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80'],
    stock: 180,
    rating: 4.4,
    categorySlug: 'beauty',
  },
  {
    title: 'Organic Shampoo',
    description: 'Natural shampoo made with organic ingredients',
    price: 19.99,
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80'],
    stock: 250,
    rating: 4.5,
    categorySlug: 'beauty',
  },
  {
    title: 'Vitamin C Serum',
    description: 'Brightening vitamin C serum for glowing skin',
    price: 44.99,
    thumbnail: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80'],
    stock: 120,
    rating: 4.7,
    categorySlug: 'beauty',
  },

  // Clothing
  {
    title: 'Classic White T-Shirt',
    description: '100% cotton comfortable t-shirt',
    price: 19.99,
    thumbnail: 'https://images.unsplash.com/photo-1577537453e3e44ceab1ee1ac3cf8e9c39ab4e71?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1577537453e3e44ceab1ee1ac3cf8e9c39ab4e71?w=400&q=80'],
    stock: 300,
    rating: 4.3,
    categorySlug: 'clothing',
  },
  {
    title: 'Denim Jeans Blue',
    description: 'Stylish denim jeans for casual wear',
    price: 59.99,
    thumbnail: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&q=80'],
    stock: 200,
    rating: 4.6,
    categorySlug: 'clothing',
  },
  {
    title: 'Casual Hoodie',
    description: 'Comfortable and warm hoodie',
    price: 49.99,
    thumbnail: 'https://images.unsplash.com/photo-1556821552-107f9ca4c71e?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1556821552-107f9ca4c71e?w=400&q=80'],
    stock: 150,
    rating: 4.5,
    categorySlug: 'clothing',
  },

  // Home & Garden
  {
    title: 'LED Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness',
    price: 39.99,
    thumbnail: 'https://images.unsplash.com/photo-1565636192335-14e2ca59ba87?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1565636192335-14e2ca59ba87?w=400&q=80'],
    stock: 100,
    rating: 4.5,
    categorySlug: 'home-and-garden',
  },
  {
    title: 'Throw Pillow Set',
    description: 'Comfortable throw pillows for couch and bed',
    price: 49.99,
    thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'],
    stock: 80,
    rating: 4.4,
    categorySlug: 'home-and-garden',
  },
  {
    title: 'Indoor Plant Pot',
    description: 'Stylish ceramic pot for indoor plants',
    price: 24.99,
    thumbnail: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&q=80'],
    stock: 150,
    rating: 4.3,
    categorySlug: 'home-and-garden',
  },

  // Sports & Outdoors
  {
    title: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat for comfortable practice',
    price: 34.99,
    thumbnail: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80'],
    stock: 120,
    rating: 4.6,
    categorySlug: 'sports-and-outdoors',
  },
  {
    title: 'Camping Backpack 60L',
    description: 'Durable backpack for outdoor adventures',
    price: 129.99,
    thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80'],
    stock: 60,
    rating: 4.7,
    categorySlug: 'sports-and-outdoors',
  },
  {
    title: 'Water Bottle Insulated',
    description: 'Keep drinks cold for 24 hours',
    price: 29.99,
    thumbnail: 'https://images.unsplash.com/photo-1602143407151-7111542de6e9?w=400&q=80',
    images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e9?w=400&q=80'],
    stock: 200,
    rating: 4.5,
    categorySlug: 'sports-and-outdoors',
  },
];

export async function seedProducts() {
  console.log('🌱 Seeding products...');

  let createdCount = 0;

  for (const productData of productsData) {
    const category = await prisma.category.findUnique({
      where: { slug: productData.categorySlug },
    });

    if (!category) {
      console.warn(`✗ Category not found: ${productData.categorySlug}`);
      continue;
    }

    const product = await prisma.product.create({
      data: {
        title: productData.title,
        description: productData.description,
        price: productData.price,
        thumbnail: productData.thumbnail,
        images: productData.images,
        stock: productData.stock,
        rating: productData.rating,
        categoryId: category.id,
      },
    });

    createdCount++;
    console.log(`✓ Created product: ${product.title}`);
  }

  console.log(`✓ Total products seeded: ${createdCount}`);
}
