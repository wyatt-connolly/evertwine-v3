// Re-export types and functions from blog-service for backward compatibility
export type { BlogPost } from "./blog-service";
export {
  getBlogPosts,
  getBlogPostBySlug,
  formatBlogDate,
} from "./blog-service";

// All blog data is now served from AWS DynamoDB
