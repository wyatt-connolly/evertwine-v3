const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 200],
      },
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 500],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    featuredImage: {
      type: DataTypes.STRING,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("draft", "published", "archived"),
      defaultValue: "draft",
    },
    publishedAt: {
      type: DataTypes.DATE,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "general",
    },
    readTime: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    commentCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    seoTitle: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 60],
      },
    },
    seoDescription: {
      type: DataTypes.TEXT,
      validate: {
        len: [1, 160],
      },
    },
    seoKeywords: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    metaData: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
  },
  {
    tableName: "blogs",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["slug"],
      },
      {
        fields: ["authorId"],
      },
      {
        fields: ["status"],
      },
      {
        fields: ["category"],
      },
      {
        fields: ["publishedAt"],
      },
      {
        fields: ["isFeatured"],
      },
      {
        fields: ["tags"],
        using: "gin",
      },
    ],
    hooks: {
      beforeCreate: (blog) => {
        if (blog.status === "published" && !blog.publishedAt) {
          blog.publishedAt = new Date();
        }
      },
      beforeUpdate: (blog) => {
        if (
          blog.changed("status") &&
          blog.status === "published" &&
          !blog.publishedAt
        ) {
          blog.publishedAt = new Date();
        }
      },
    },
  }
);

// Instance methods
Blog.prototype.incrementViewCount = async function () {
  this.viewCount += 1;
  return this.save();
};

Blog.prototype.incrementLikeCount = async function () {
  this.likeCount += 1;
  return this.save();
};

Blog.prototype.incrementCommentCount = async function () {
  this.commentCount += 1;
  return this.save();
};

Blog.prototype.decrementCommentCount = async function () {
  this.commentCount = Math.max(0, this.commentCount - 1);
  return this.save();
};

// Class methods
Blog.findPublished = function () {
  return this.findAll({
    where: { status: "published" },
    order: [["publishedAt", "DESC"]],
  });
};

Blog.findBySlug = function (slug) {
  return this.findOne({
    where: { slug, status: "published" },
  });
};

Blog.findByCategory = function (category) {
  return this.findAll({
    where: { category, status: "published" },
    order: [["publishedAt", "DESC"]],
  });
};

Blog.findByTag = function (tag) {
  return this.findAll({
    where: {
      status: "published",
      tags: { [sequelize.Op.like]: `%${tag}%` },
    },
    order: [["publishedAt", "DESC"]],
  });
};

Blog.findFeatured = function () {
  return this.findAll({
    where: { isFeatured: true, status: "published" },
    order: [["publishedAt", "DESC"]],
  });
};

Blog.search = function (query) {
  return this.findAll({
    where: {
      status: "published",
      [sequelize.Op.or]: [
        { title: { [sequelize.Op.iLike]: `%${query}%` } },
        { content: { [sequelize.Op.iLike]: `%${query}%` } },
        { excerpt: { [sequelize.Op.iLike]: `%${query}%` } },
        { tags: { [sequelize.Op.contains]: [query] } },
      ],
    },
    order: [["publishedAt", "DESC"]],
  });
};

module.exports = Blog;
