const express = require("express");
const { body, query, validationResult } = require("express-validator");
const logger = require("../utils/logger");
const {
  verifyToken,
  requireRole,
  optionalAuth,
} = require("../middleware/auth");
const { Blog, User } = require("../models");
const { cache, sequelize } = require("../config/database");
const { Op } = require("sequelize");

const router = express.Router();

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
      const offset = (page - 1) * limit;

      // Build where clause
      const whereClause = { status: "published" };

      if (category) {
        whereClause.category = category;
      }

      if (search) {
        whereClause[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { content: { [Op.iLike]: `%${search}%` } },
          { excerpt: { [Op.iLike]: `%${search}%` } },
        ];
      }

      // Build include clause for author
      const includeClause = [
        {
          model: User,
          as: "author",
          attributes: ["id", "firstName", "lastName", "profileImage"],
          where: author
            ? {
                [Op.or]: [
                  { firstName: { [Op.iLike]: `%${author}%` } },
                  { lastName: { [Op.iLike]: `%${author}%` } },
                ],
              }
            : undefined,
        },
      ];

      // Handle tag filtering
      if (tag) {
        whereClause.tags = { [Op.overlap]: [tag] };
      }

      const { count, rows: posts } = await Blog.findAndCountAll({
        where: whereClause,
        include: includeClause,
        order: [["publishedAt", "DESC"]],
        limit: parseInt(limit),
        offset: offset,
      });

      const totalPages = Math.ceil(count / limit);

      res.json({
        posts,
        total: count,
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
    const featuredPosts = await Blog.findAll({
      where: {
        status: "published",
        isFeatured: true,
      },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "firstName", "lastName", "profileImage"],
        },
      ],
      order: [["publishedAt", "DESC"]],
      limit: 5,
    });

    res.json(featuredPosts);
  } catch (error) {
    logger.error("Error fetching featured posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get blog categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Blog.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("category")), "category"],
      ],
      where: { status: "published" },
      raw: true,
    });

    const categoryList = categories.map((cat) => cat.category).filter(Boolean);
    res.json(categoryList);
  } catch (error) {
    logger.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get blog tags
router.get("/tags", async (req, res) => {
  try {
    const posts = await Blog.findAll({
      attributes: ["tags"],
      where: { status: "published" },
      raw: true,
    });

    const allTags = posts.flatMap((post) => post.tags || []);
    const uniqueTags = [...new Set(allTags)];
    res.json(uniqueTags);
  } catch (error) {
    logger.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single blog post by slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    // Try to get from cache first
    const cacheKey = `blog:${slug}`;
    const cachedPost = await cache.get(cacheKey);

    if (cachedPost) {
      // Increment view count in background
      Blog.increment("viewCount", { where: { slug } });
      return res.json(cachedPost);
    }

    const post = await Blog.findOne({
      where: { slug, status: "published" },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "firstName", "lastName", "profileImage"],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Increment view count
    await post.incrementViewCount();

    // Cache the post for 1 hour
    await cache.set(cacheKey, post.toJSON(), 3600);

    res.json(post);
  } catch (error) {
    logger.error("Error fetching blog post:", error);
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

      // Check if slug already exists
      const existingPost = await Blog.findOne({ where: { slug } });
      if (existingPost) {
        return res
          .status(400)
          .json({ error: "A post with this title already exists" });
      }

      const newPost = await Blog.create({
        title,
        slug,
        excerpt,
        content,
        authorId: req.user.id,
        category,
        tags,
        status,
        isFeatured: false,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        publishedAt: status === "published" ? new Date() : null,
        featuredImage,
      });

      // Clear cache
      await cache.del("blog:featured");

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
      const post = await Blog.findByPk(id);

      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }

      const updates = req.body;

      // Update fields
      Object.keys(updates).forEach((key) => {
        if (key !== "id" && key !== "authorId" && key !== "createdAt") {
          post[key] = updates[key];
        }
      });

      // Update publishedAt if status changed to published
      if (updates.status === "published" && !post.publishedAt) {
        post.publishedAt = new Date();
      }

      await post.save();

      // Clear cache
      await cache.del(`blog:${post.slug}`);
      await cache.del("blog:featured");

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
    const post = await Blog.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    await post.destroy();

    // Clear cache
    await cache.del(`blog:${post.slug}`);
    await cache.del("blog:featured");

    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    logger.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
