const bcrypt = require('bcryptjs');
const { User } = require('../../../src/models');

describe('User Model', () => {
  describe('User Creation', () => {
    it('should create a user with valid data', async () => {
      const userData = testUtils.createTestUser();
      const user = await User.create(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.firstName).toBe(userData.firstName);
      expect(user.lastName).toBe(userData.lastName);
      expect(user.id).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });

    it('should hash password on creation', async () => {
      const userData = testUtils.createTestUser();
      const user = await User.create(userData);

      expect(user.password).not.toBe(userData.password);
      const isPasswordValid = await bcrypt.compare(userData.password, user.password);
      expect(isPasswordValid).toBe(true);
    });

    it('should require email', async () => {
      const userData = testUtils.createTestUser();
      delete userData.email;

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should require unique email', async () => {
      const userData = testUtils.createTestUser();
      await User.create(userData);

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should validate email format', async () => {
      const userData = testUtils.createTestUser({ email: 'invalid-email' });

      await expect(User.create(userData)).rejects.toThrow();
    });
  });

  describe('User Authentication', () => {
    it('should validate password correctly', async () => {
      const userData = testUtils.createTestUser();
      const user = await User.create(userData);

      const isValid = await user.validatePassword(userData.password);
      expect(isValid).toBe(true);
    });

    it('should reject invalid password', async () => {
      const userData = testUtils.createTestUser();
      const user = await User.create(userData);

      const isValid = await user.validatePassword('wrongpassword');
      expect(isValid).toBe(false);
    });
  });

  describe('User Instance Methods', () => {
    it('should return full name', async () => {
      const userData = testUtils.createTestUser();
      const user = await User.create(userData);

      expect(user.getFullName()).toBe(`${userData.firstName} ${userData.lastName}`);
    });

    it('should return user without password', async () => {
      const userData = testUtils.createTestUser();
      const user = await User.create(userData);

      const userWithoutPassword = user.toJSON();
      expect(userWithoutPassword.password).toBeUndefined();
    });
  });

  describe('User Queries', () => {
    it('should find user by email', async () => {
      const userData = testUtils.createTestUser();
      await User.create(userData);

      const foundUser = await User.findOne({ where: { email: userData.email } });
      expect(foundUser).toBeDefined();
      expect(foundUser.email).toBe(userData.email);
    });

    it('should find user by id', async () => {
      const userData = testUtils.createTestUser();
      const createdUser = await User.create(userData);

      const foundUser = await User.findByPk(createdUser.id);
      expect(foundUser).toBeDefined();
      expect(foundUser.id).toBe(createdUser.id);
    });
  });
});
