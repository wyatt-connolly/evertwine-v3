const { Sequelize } = require('sequelize');

// Set test environment
process.env.NODE_ENV = 'test';
process.env.PORT = 3002;
process.env.DATABASE_URL = 'sqlite::memory:';
process.env.JWT_SECRET = 'test-secret-key';
process.env.REDIS_URL = 'redis://localhost:6379';

// Global test utilities
global.testUtils = {
  // Helper to create test user data
  createTestUser: (overrides = {}) => ({
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    ...overrides
  }),

  // Helper to create test blog post data
  createTestBlogPost: (overrides = {}) => ({
    title: 'Test Blog Post',
    content: 'This is a test blog post content.',
    excerpt: 'Test excerpt',
    slug: 'test-blog-post',
    author: 'Test Author',
    published: true,
    ...overrides
  }),

  // Helper to generate JWT token for testing
  generateTestToken: (userId = 1) => {
    const jwt = require('jsonwebtoken');
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
};

// Setup test database
beforeAll(async () => {
  // Initialize test database
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialect: 'sqlite'
  });

  // Import models and sync
  const models = require('../src/models');
  await sequelize.sync({ force: true });
});

// Cleanup after each test
afterEach(async () => {
  // Clear all tables
  const sequelize = require('../src/models').sequelize;
  const models = require('../src/models');
  
  for (const modelName in models) {
    if (models[modelName] && models[modelName].destroy) {
      await models[modelName].destroy({ where: {}, force: true });
    }
  }
});

// Cleanup after all tests
afterAll(async () => {
  const sequelize = require('../src/models').sequelize;
  await sequelize.close();
});
