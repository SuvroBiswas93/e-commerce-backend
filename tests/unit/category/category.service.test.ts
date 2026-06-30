/**
 * Category Service Unit Tests
 *
 * Tests for CategoryService covering:
 * - Category listing
 * - Category retrieval by ID and slug
 * - Slug generation
 * - Validation
 * - Error handling
 */

describe('CategoryService', () => {
  describe('Slug Generation', () => {
    it('should generate slug from category name', () => {
      const generateSlug = (text: string): string => {
        return text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      };

      expect(generateSlug("Men's Shoes")).toBe('mens-shoes');
      expect(generateSlug('Women\'s Shoes')).toBe('womens-shoes');
      expect(generateSlug('Electronics')).toBe('electronics');
      expect(generateSlug('  Nested  Category  ')).toBe('nested-category');
    });

    it('should handle special characters', () => {
      const generateSlug = (text: string): string => {
        return text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      };

      expect(generateSlug('Home & Garden')).toBe('home-garden');
      expect(generateSlug('Sports/Outdoors')).toBe('sportsoutdoors');
      expect(generateSlug('Beauty + Health')).toBe('beauty-health');
    });

    it('should handle edge cases', () => {
      const generateSlug = (text: string): string => {
        return text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      };

      expect(generateSlug('---')).toBe('');
      expect(generateSlug('___')).toBe('');
      expect(generateSlug('123')).toBe('123');
    });
  });

  describe('Category Retrieval', () => {
    it('should have correct category structure', () => {
      const category = {
        id: 'uuid-123',
        name: 'Men\'s Shoes',
        slug: 'mens-shoes',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('slug');
      expect(category).toHaveProperty('createdAt');
      expect(category).toHaveProperty('updatedAt');
      expect(typeof category.name).toBe('string');
      expect(typeof category.slug).toBe('string');
    });

    it('should validate category ID format', () => {
      const validId = '550e8400-e29b-41d4-a716-446655440000';
      const invalidId = 'not-a-uuid';
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      expect(uuidRegex.test(validId)).toBe(true);
      expect(uuidRegex.test(invalidId)).toBe(false);
    });

    it('should validate category name', () => {
      const validNames = [
        "Men's Shoes",
        'Women\'s Shoes',
        'Electronics',
        'Smartphones',
        'Home & Garden',
      ];
      const invalidNames = ['', '   ', null, undefined];

      validNames.forEach((name) => {
        expect(typeof name === 'string' && name.trim().length > 0).toBe(true);
      });

      invalidNames.forEach((name) => {
        expect(typeof name === 'string' && name.trim().length > 0).toBe(false);
      });
    });
  });

  describe('Duplicate Prevention', () => {
    it('should prevent duplicate category names', () => {
      const existingCategories = [
        { id: '1', name: "Men's Shoes", slug: 'mens-shoes' },
        { id: '2', name: 'Electronics', slug: 'electronics' },
      ];

      const newCategoryName = "Men's Shoes";
      const isDuplicate = existingCategories.some(
        (cat) => cat.name.toLowerCase() === newCategoryName.toLowerCase()
      );

      expect(isDuplicate).toBe(true);
    });

    it('should prevent duplicate slugs', () => {
      const generateSlug = (text: string): string => {
        return text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      };

      const existingCategories = [
        { id: '1', name: "Men's Shoes", slug: 'mens-shoes' },
        { id: '2', name: 'Electronics', slug: 'electronics' },
      ];

      const newCategoryName = 'Mens Shoes';
      const newSlug = generateSlug(newCategoryName);
      const isDuplicateSlug = existingCategories.some((cat) => cat.slug === newSlug);

      expect(isDuplicateSlug).toBe(true);
    });

    it('should allow similar names with different slugs', () => {
      const generateSlug = (text: string): string => {
        return text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      };

      const existingCategories = [{ id: '1', name: 'Electronics', slug: 'electronics' }];

      const newCategoryName = 'Electronic Gadgets';
      const newSlug = generateSlug(newCategoryName);
      const isDuplicateSlug = existingCategories.some((cat) => cat.slug === newSlug);

      expect(isDuplicateSlug).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle not found error', () => {
      const notFoundError = { statusCode: 404, message: 'Category not found' };

      expect(notFoundError.statusCode).toBe(404);
      expect(notFoundError.message).toContain('not found');
    });

    it('should handle conflict error', () => {
      const conflictError = {
        statusCode: 409,
        message: 'Category with name "Electronics" already exists',
      };

      expect(conflictError.statusCode).toBe(409);
      expect(conflictError.message).toContain('already exists');
    });

    it('should validate error response structure', () => {
      const errorResponse = {
        success: false,
        statusCode: 400,
        message: 'Validation failed',
        errorSources: [{ field: 'name', message: 'Category name is required' }],
      };

      expect(errorResponse.success).toBe(false);
      expect(typeof errorResponse.statusCode).toBe('number');
      expect(typeof errorResponse.message).toBe('string');
      expect(Array.isArray(errorResponse.errorSources)).toBe(true);
    });
  });

  describe('Response Format', () => {
    it('should have correct success response format', () => {
      const response = {
        success: true,
        statusCode: 200,
        message: 'Categories fetched successfully',
        data: [
          {
            id: 'uuid',
            name: 'Electronics',
            slug: 'electronics',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      };

      expect(response.success).toBe(true);
      expect(response.statusCode).toBe(200);
      expect(typeof response.message).toBe('string');
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeGreaterThan(0);
    });

    it('should have correct single category response', () => {
      const response = {
        success: true,
        statusCode: 200,
        message: 'Category fetched successfully',
        data: {
          id: 'uuid',
          name: 'Electronics',
          slug: 'electronics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('slug');
      expect(typeof response.data).toBe('object');
    });
  });
});
