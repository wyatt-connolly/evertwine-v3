const request = require('supertest');
const app = require('../../src/server');
const { Blog, User } = require('../../src/models');

describe('Blog Routes', () => {
  let authToken;
  let userId;

  beforeEach(async () => {
    // Create a test user and get auth token
    const userData = testUtils.createTestUser();
    
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send(userData);

    userId = registerResponse.body.user.id;

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: userData.password
      });

    authToken = loginResponse.body.token;
  });

  describe('GET /api/blog', () => {
    beforeEach(async () => {
      // Create test blog posts
      await Blog.create(testUtils.createTestBlogPost({ title: 'First Post', slug: 'first-post' }));
      await Blog.create(testUtils.createTestBlogPost({ title: 'Second Post', slug: 'second-post' }));
      await Blog.create(testUtils.createTestBlogPost({ title: 'Draft Post', slug: 'draft-post', published: false }));
    });

    it('should return all published blog posts', async () => {
      const response = await request(app)
        .get('/api/blog')
        .expect(200);

      expect(response.body).toHaveProperty('posts');
      expect(response.body.posts).toHaveLength(2);
      expect(response.body.posts[0]).toHaveProperty('title');
      expect(response.body.posts[0]).toHaveProperty('slug');
      expect(response.body.posts[0]).toHaveProperty('excerpt');
      expect(response.body.posts[0]).toHaveProperty('author');
      expect(response.body.posts[0]).toHaveProperty('published', true);
    });

    it('should return paginated results', async () => {
      const response = await request(app)
        .get('/api/blog?page=1&limit=1')
        .expect(200);

      expect(response.body).toHaveProperty('posts');
      expect(response.body.posts).toHaveLength(1);
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.pagination).toHaveProperty('currentPage', 1);
      expect(response.body.pagination).toHaveProperty('totalPages');
      expect(response.body.pagination).toHaveProperty('totalPosts');
    });

    it('should return posts ordered by creation date', async () => {
      const response = await request(app)
        .get('/api/blog')
        .expect(200);

      const posts = response.body.posts;
      expect(posts.length).toBeGreaterThan(1);
      expect(new Date(posts[0].createdAt)).toBeGreaterThan(new Date(posts[1].createdAt));
    });
  });

  describe('GET /api/blog/:slug', () => {
    let blogPost;

    beforeEach(async () => {
      blogPost = await Blog.create(testUtils.createTestBlogPost({ slug: 'test-post' }));
    });

    it('should return a specific blog post by slug', async () => {
      const response = await request(app)
        .get('/api/blog/test-post')
        .expect(200);

      expect(response.body).toHaveProperty('post');
      expect(response.body.post).toHaveProperty('id', blogPost.id);
      expect(response.body.post).toHaveProperty('title', blogPost.title);
      expect(response.body.post).toHaveProperty('content', blogPost.content);
      expect(response.body.post).toHaveProperty('slug', 'test-post');
    });

    it('should return 404 for non-existent blog post', async () => {
      const response = await request(app)
        .get('/api/blog/non-existent-post')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Blog post not found');
    });

    it('should return 404 for unpublished blog post', async () => {
      await Blog.create(testUtils.createTestBlogPost({ 
        slug: 'unpublished-post', 
        published: false 
      }));

      const response = await request(app)
        .get('/api/blog/unpublished-post')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Blog post not found');
    });
  });

  describe('POST /api/blog (Admin)', () => {
    it('should create a new blog post with valid data', async () => {
      const blogData = testUtils.createTestBlogPost();

      const response = await request(app)
        .post('/api/blog')
        .set('Authorization', `Bearer ${authToken}`)
        .send(blogData)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Blog post created successfully');
      expect(response.body).toHaveProperty('post');
      expect(response.body.post).toHaveProperty('id');
      expect(response.body.post).toHaveProperty('title', blogData.title);
      expect(response.body.post).toHaveProperty('content', blogData.content);
      expect(response.body.post).toHaveProperty('slug', blogData.slug);
    });

    it('should auto-generate slug if not provided', async () => {
      const blogData = testUtils.createTestBlogPost();
      delete blogData.slug;

      const response = await request(app)
        .post('/api/blog')
        .set('Authorization', `Bearer ${authToken}`)
        .send(blogData)
        .expect(201);

      expect(response.body.post).toHaveProperty('slug');
      expect(response.body.post.slug).toMatch(/^test-blog-post/);
    });

    it('should return 400 for missing required fields', async () => {
      const blogData = { title: 'Test Post' }; // Missing content

      const response = await request(app)
        .post('/api/blog')
        .set('Authorization', `Bearer ${authToken}`)
        .send(blogData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 401 without authentication', async () => {
      const blogData = testUtils.createTestBlogPost();

      const response = await request(app)
        .post('/api/blog')
        .send(blogData)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'No token provided');
    });

    it('should return 409 for duplicate slug', async () => {
      const blogData = testUtils.createTestBlogPost();

      // Create first post
      await request(app)
        .post('/api/blog')
        .set('Authorization', `Bearer ${authToken}`)
        .send(blogData)
        .expect(201);

      // Try to create second post with same slug
      const response = await request(app)
        .post('/api/blog')
        .set('Authorization', `Bearer ${authToken}`)
        .send(blogData)
        .expect(409);

      expect(response.body).toHaveProperty('error', 'Slug already exists');
    });
  });

  describe('PUT /api/blog/:id (Admin)', () => {
    let blogPost;

    beforeEach(async () => {
      blogPost = await Blog.create(testUtils.createTestBlogPost());
    });

    it('should update blog post successfully', async () => {
      const updateData = {
        title: 'Updated Title',
        content: 'Updated content',
        published: true
      };

      const response = await request(app)
        .put(`/api/blog/${blogPost.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Blog post updated successfully');
      expect(response.body).toHaveProperty('post');
      expect(response.body.post).toHaveProperty('title', updateData.title);
      expect(response.body.post).toHaveProperty('content', updateData.content);
      expect(response.body.post).toHaveProperty('published', updateData.published);
    });

    it('should return 404 for non-existent blog post', async () => {
      const updateData = { title: 'Updated Title' };

      const response = await request(app)
        .put('/api/blog/999999')
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Blog post not found');
    });

    it('should return 401 without authentication', async () => {
      const updateData = { title: 'Updated Title' };

      const response = await request(app)
        .put(`/api/blog/${blogPost.id}`)
        .send(updateData)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'No token provided');
    });
  });

  describe('DELETE /api/blog/:id (Admin)', () => {
    let blogPost;

    beforeEach(async () => {
      blogPost = await Blog.create(testUtils.createTestBlogPost());
    });

    it('should delete blog post successfully', async () => {
      const response = await request(app)
        .delete(`/api/blog/${blogPost.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Blog post deleted successfully');

      // Verify post is deleted
      const deletedPost = await Blog.findByPk(blogPost.id);
      expect(deletedPost).toBeNull();
    });

    it('should return 404 for non-existent blog post', async () => {
      const response = await request(app)
        .delete('/api/blog/999999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Blog post not found');
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .delete(`/api/blog/${blogPost.id}`)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'No token provided');
    });
  });

  describe('GET /api/blog/search', () => {
    beforeEach(async () => {
      await Blog.create(testUtils.createTestBlogPost({ 
        title: 'JavaScript Tutorial', 
        content: 'Learn JavaScript programming',
        slug: 'javascript-tutorial'
      }));
      await Blog.create(testUtils.createTestBlogPost({ 
        title: 'React Guide', 
        content: 'Complete React development guide',
        slug: 'react-guide'
      }));
      await Blog.create(testUtils.createTestBlogPost({ 
        title: 'Node.js Basics', 
        content: 'Introduction to Node.js',
        slug: 'nodejs-basics'
      }));
    });

    it('should search blog posts by title', async () => {
      const response = await request(app)
        .get('/api/blog/search?q=JavaScript')
        .expect(200);

      expect(response.body).toHaveProperty('posts');
      expect(response.body.posts).toHaveLength(1);
      expect(response.body.posts[0].title).toContain('JavaScript');
    });

    it('should search blog posts by content', async () => {
      const response = await request(app)
        .get('/api/blog/search?q=React')
        .expect(200);

      expect(response.body).toHaveProperty('posts');
      expect(response.body.posts).toHaveLength(1);
      expect(response.body.posts[0].title).toContain('React');
    });

    it('should return empty results for no matches', async () => {
      const response = await request(app)
        .get('/api/blog/search?q=nonexistent')
        .expect(200);

      expect(response.body).toHaveProperty('posts');
      expect(response.body.posts).toHaveLength(0);
    });

    it('should return 400 for missing search query', async () => {
      const response = await request(app)
        .get('/api/blog/search')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Search query is required');
    });
  });
});
