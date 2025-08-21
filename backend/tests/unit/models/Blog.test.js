const { Blog } = require('../../../src/models');

describe('Blog Model', () => {
  describe('Blog Creation', () => {
    it('should create a blog post with valid data', async () => {
      const blogData = testUtils.createTestBlogPost();
      const blog = await Blog.create(blogData);

      expect(blog).toBeDefined();
      expect(blog.title).toBe(blogData.title);
      expect(blog.content).toBe(blogData.content);
      expect(blog.slug).toBe(blogData.slug);
      expect(blog.author).toBe(blogData.author);
      expect(blog.published).toBe(blogData.published);
      expect(blog.id).toBeDefined();
      expect(blog.createdAt).toBeDefined();
      expect(blog.updatedAt).toBeDefined();
    });

    it('should require title', async () => {
      const blogData = testUtils.createTestBlogPost();
      delete blogData.title;

      await expect(Blog.create(blogData)).rejects.toThrow();
    });

    it('should require content', async () => {
      const blogData = testUtils.createTestBlogPost();
      delete blogData.content;

      await expect(Blog.create(blogData)).rejects.toThrow();
    });

    it('should require unique slug', async () => {
      const blogData = testUtils.createTestBlogPost();
      await Blog.create(blogData);

      await expect(Blog.create(blogData)).rejects.toThrow();
    });

    it('should auto-generate slug if not provided', async () => {
      const blogData = testUtils.createTestBlogPost();
      delete blogData.slug;
      const blog = await Blog.create(blogData);

      expect(blog.slug).toBeDefined();
      expect(blog.slug).toMatch(/^test-blog-post/);
    });

    it('should set published to false by default', async () => {
      const blogData = testUtils.createTestBlogPost();
      delete blogData.published;
      const blog = await Blog.create(blogData);

      expect(blog.published).toBe(false);
    });
  });

  describe('Blog Queries', () => {
    beforeEach(async () => {
      // Create test blog posts
      await Blog.create(testUtils.createTestBlogPost({ title: 'First Post', slug: 'first-post' }));
      await Blog.create(testUtils.createTestBlogPost({ title: 'Second Post', slug: 'second-post', published: false }));
      await Blog.create(testUtils.createTestBlogPost({ title: 'Third Post', slug: 'third-post' }));
    });

    it('should find all published blog posts', async () => {
      const publishedPosts = await Blog.findAll({ where: { published: true } });
      expect(publishedPosts).toHaveLength(2);
    });

    it('should find blog post by slug', async () => {
      const blog = await Blog.findOne({ where: { slug: 'first-post' } });
      expect(blog).toBeDefined();
      expect(blog.title).toBe('First Post');
    });

    it('should find blog post by id', async () => {
      const createdBlog = await Blog.create(testUtils.createTestBlogPost());
      const foundBlog = await Blog.findByPk(createdBlog.id);
      expect(foundBlog).toBeDefined();
      expect(foundBlog.id).toBe(createdBlog.id);
    });

    it('should order blog posts by creation date', async () => {
      const blogs = await Blog.findAll({ 
        where: { published: true },
        order: [['createdAt', 'DESC']]
      });
      expect(blogs.length).toBeGreaterThan(1);
      expect(new Date(blogs[0].createdAt)).toBeGreaterThan(new Date(blogs[1].createdAt));
    });
  });

  describe('Blog Instance Methods', () => {
    it('should return excerpt correctly', async () => {
      const blogData = testUtils.createTestBlogPost({
        content: 'This is a very long content that should be truncated to create an excerpt. It contains more than 150 characters to test the excerpt functionality properly.'
      });
      const blog = await Blog.create(blogData);

      const excerpt = blog.getExcerpt();
      expect(excerpt.length).toBeLessThanOrEqual(150);
      expect(excerpt).toContain('...');
    });

    it('should return reading time estimate', async () => {
      const blogData = testUtils.createTestBlogPost({
        content: 'This is a test content. '.repeat(50) // ~1000 characters
      });
      const blog = await Blog.create(blogData);

      const readingTime = blog.getReadingTime();
      expect(readingTime).toBeGreaterThan(0);
      expect(typeof readingTime).toBe('number');
    });

    it('should return formatted date', async () => {
      const blogData = testUtils.createTestBlogPost();
      const blog = await Blog.create(blogData);

      const formattedDate = blog.getFormattedDate();
      expect(formattedDate).toBeDefined();
      expect(typeof formattedDate).toBe('string');
    });
  });

  describe('Blog Validation', () => {
    it('should validate title length', async () => {
      const blogData = testUtils.createTestBlogPost({
        title: 'a'.repeat(256) // Too long title
      });

      await expect(Blog.create(blogData)).rejects.toThrow();
    });

    it('should validate content minimum length', async () => {
      const blogData = testUtils.createTestBlogPost({
        content: 'Short' // Too short content
      });

      await expect(Blog.create(blogData)).rejects.toThrow();
    });

    it('should validate slug format', async () => {
      const blogData = testUtils.createTestBlogPost({
        slug: 'invalid slug with spaces' // Invalid slug format
      });

      await expect(Blog.create(blogData)).rejects.toThrow();
    });
  });
});
