const express = require("express");
const { body, query, validationResult } = require("express-validator");
const logger = require("../utils/logger");
const {
  verifyToken,
  requireRole,
  optionalAuth,
} = require("../middleware/auth");

const router = express.Router();

// Mock blog data
const mockBlogPosts = [
  {
    id: "1",
    title: "Building Meaningful Connections in the Digital Age",
    slug: "building-meaningful-connections-digital-age",
    excerpt:
      "Discover how modern technology can help foster genuine relationships and community bonds in our increasingly connected world.",
    content:
      "In today's fast-paced digital world, it's easy to feel disconnected despite being constantly connected. Social media platforms promise to bring us together, but often leave us feeling more isolated than ever. This is where Evertwine comes in - we're building a platform that bridges the gap between digital convenience and genuine human connection.",
    author: {
      id: "1",
      firstName: "Sarah",
      lastName: "Johnson",
      profileImage: "/hero-bg.webp",
    },
    category: "Technology",
    tags: ["connections", "digital", "community", "social"],
    status: "published",
    isFeatured: true,
    viewCount: 1250,
    likeCount: 89,
    commentCount: 23,
    publishedAt: "2024-03-15T00:00:00.000Z",
    createdAt: "2024-03-15T00:00:00.000Z",
    updatedAt: "2024-03-15T00:00:00.000Z",
    seoTitle: "Building Meaningful Connections in the Digital Age - Evertwine",
    seoDescription:
      "Discover how modern technology can help foster genuine relationships and community bonds in our increasingly connected world.",
    seoKeywords: [
      "social connections",
      "community building",
      "digital age",
      "meaningful relationships",
    ],
  },
  {
    id: "2",
    title: "The Future of Social Networking",
    slug: "future-of-social-networking",
    excerpt:
      "Exploring how social platforms are evolving to prioritize authentic connections over superficial interactions.",
    content:
      "The landscape of social networking is undergoing a fundamental transformation. For years, platforms have focused on maximizing engagement through addictive algorithms and superficial interactions. But users are increasingly demanding more meaningful experiences that actually improve their lives rather than just consuming their time.",
    author: {
      id: "2",
      firstName: "Mike",
      lastName: "Chen",
      profileImage: "/hero-bg.webp",
    },
    category: "Innovation",
    tags: ["social networking", "future", "authenticity", "technology"],
    status: "published",
    isFeatured: false,
    viewCount: 890,
    likeCount: 67,
    commentCount: 15,
    publishedAt: "2024-03-10T00:00:00.000Z",
    createdAt: "2024-03-10T00:00:00.000Z",
    updatedAt: "2024-03-10T00:00:00.000Z",
    seoTitle: "The Future of Social Networking - Authentic Connections",
    seoDescription:
      "Exploring how social platforms are evolving to prioritize authentic connections over superficial interactions.",
    seoKeywords: [
      "social networking",
      "future",
      "authentic connections",
      "technology evolution",
    ],
  },
  {
    id: "3",
    title: "Community Building Best Practices",
    slug: "community-building-best-practices",
    excerpt:
      "Learn the essential strategies for creating and maintaining thriving online communities that last.",
    content:
      "Building a strong community is both an art and a science. Whether you're organizing a local meetup group or managing an online community, the principles of successful community building remain the same. Here are some essential strategies that have proven effective time and time again.",
    author: {
      id: "3",
      firstName: "Emily",
      lastName: "Rodriguez",
      profileImage: "/hero-bg.webp",
    },
    category: "Community",
    tags: ["community building", "best practices", "leadership", "inclusivity"],
    status: "published",
    isFeatured: false,
    viewCount: 567,
    likeCount: 45,
    commentCount: 12,
    publishedAt: "2024-03-05T00:00:00.000Z",
    createdAt: "2024-03-05T00:00:00.000Z",
    updatedAt: "2024-03-05T00:00:00.000Z",
    seoTitle: "Community Building Best Practices - Evertwine Guide",
    seoDescription:
      "Learn the essential strategies for creating and maintaining thriving online communities that last.",
    seoKeywords: [
      "community building",
      "best practices",
      "leadership",
      "inclusivity",
      "meetup groups",
    ],
  },
];

// Get all published blog posts with pagination and filtering
router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 50 }),
    query("category").optional().isString(),
    query("tag").optional().isString(),
    query("search").optional().isString(),
    query("author").optional().isString(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { page = 1, limit = 10, category, tag, search, author } = req.query;
      let filteredPosts = [...mockBlogPosts];

      // Filter by category
      if (category) {
        filteredPosts = filteredPosts.filter(
          (post) => post.category.toLowerCase() === category.toLowerCase()
        );
      }

      // Filter by tag
      if (tag) {
        filteredPosts = filteredPosts.filter((post) =>
          post.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
        );
      }

      // Filter by author
      if (author) {
        filteredPosts = filteredPosts.filter((post) =>
          `${post.author.firstName} ${post.author.lastName}`
            .toLowerCase()
            .includes(author.toLowerCase())
        );
      }

      // Search functionality
      if (search) {
        const searchLower = search.toLowerCase();
        filteredPosts = filteredPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchLower) ||
            post.content.toLowerCase().includes(searchLower) ||
            post.excerpt.toLowerCase().includes(searchLower) ||
            post.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      }

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

      const total = filteredPosts.length;
      const totalPages = Math.ceil(total / limit);

      res.json({
        posts: paginatedPosts,
        total,
        page: parseInt(page),
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      });
    } catch (error) {
      logger.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get featured blog posts
router.get("/featured", async (req, res) => {
  try {
    const featuredPosts = mockBlogPosts.filter((post) => post.isFeatured);
    res.json(featuredPosts);
  } catch (error) {
    logger.error("Error fetching featured posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single blog post by slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const post = mockBlogPosts.find((p) => p.slug === slug);

    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Increment view count (in a real app, this would be in the database)
    post.viewCount += 1;

    res.json(post);
  } catch (error) {
    logger.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get blog categories
router.get("/categories", async (req, res) => {
  try {
    const categories = [...new Set(mockBlogPosts.map((post) => post.category))];
    res.json(categories);
  } catch (error) {
    logger.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get blog tags
router.get("/tags", async (req, res) => {
  try {
    const allTags = mockBlogPosts.flatMap((post) => post.tags);
    const uniqueTags = [...new Set(allTags)];
    res.json(uniqueTags);
  } catch (error) {
    logger.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new blog post (admin only)
router.post(
  "/",
  [
    verifyToken,
    requireRole("admin"),
    body("title").trim().isLength({ min: 1, max: 200 }),
    body("excerpt").trim().isLength({ min: 1, max: 500 }),
    body("content").trim().isLength({ min: 1 }),
    body("category").trim().isLength({ min: 1 }),
    body("tags").optional().isArray(),
    body("status").optional().isIn(["draft", "published"]),
    body("featuredImage").optional().isURL(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        title,
        excerpt,
        content,
        category,
        tags = [],
        status = "draft",
        featuredImage,
      } = req.body;

      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const newPost = {
        id: Date.now().toString(),
        title,
        slug,
        excerpt,
        content,
        author: {
          id: req.user.id,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          profileImage: "/hero-bg.webp",
        },
        category,
        tags,
        status,
        isFeatured: false,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        publishedAt: status === "published" ? new Date().toISOString() : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        featuredImage,
      };

      // In a real app, this would be saved to the database
      mockBlogPosts.unshift(newPost);

      res
        .status(201)
        .json({ id: newPost.id, message: "Blog post created successfully" });
    } catch (error) {
      logger.error("Error creating blog post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Update a blog post (admin only)
router.put(
  "/:id",
  [
    verifyToken,
    requireRole("admin"),
    body("title").optional().trim().isLength({ min: 1, max: 200 }),
    body("excerpt").optional().trim().isLength({ min: 1, max: 500 }),
    body("content").optional().trim().isLength({ min: 1 }),
    body("category").optional().trim().isLength({ min: 1 }),
    body("tags").optional().isArray(),
    body("status").optional().isIn(["draft", "published"]),
    body("featuredImage").optional().isURL(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const postIndex = mockBlogPosts.findIndex((p) => p.id === id);

      if (postIndex === -1) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      const post = mockBlogPosts[postIndex];
      const updates = req.body;

      // Update fields
      Object.keys(updates).forEach((key) => {
        if (key !== "id" && key !== "author" && key !== "createdAt") {
          post[key] = updates[key];
        }
      });

      // Update publishedAt if status changed to published
      if (updates.status === "published" && !post.publishedAt) {
        post.publishedAt = new Date().toISOString();
      }

      post.updatedAt = new Date().toISOString();

      res.json({ message: "Blog post updated successfully" });
    } catch (error) {
      logger.error("Error updating blog post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete a blog post (admin only)
router.delete("/:id", [verifyToken, requireRole("admin")], async (req, res) => {
  try {
    const { id } = req.params;
    const postIndex = mockBlogPosts.findIndex((p) => p.id === id);

    if (postIndex === -1) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // In a real app, this would be deleted from the database
    mockBlogPosts.splice(postIndex, 1);

    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    logger.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
