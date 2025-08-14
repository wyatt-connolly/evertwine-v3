// Re-export types and functions from blog-service for backward compatibility
export type { BlogPost } from "./blog-service";
export {
  getBlogPosts,
  getBlogPostBySlug,
  formatBlogDate,
} from "./blog-service";

// For development/fallback, keep a few sample posts
// These will be replaced by Firebase data in production
export const sampleBlogPosts = [
  {
    id: "sample-1",
    title: "Welcome to Our Blog",
    excerpt:
      "This is a sample blog post to demonstrate the structure. Replace this with real content from Firebase.",
    content:
      "This is sample content. In production, this will be replaced with real blog posts from your Firebase collection.",
    author: "Blog Team",
    date: "2025-08-14",
    image: "/hero-bg.webp",
    readTime: "2 min read",
    category: "Announcement",
    slug: "welcome-to-our-blog",
    featured: false,
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
