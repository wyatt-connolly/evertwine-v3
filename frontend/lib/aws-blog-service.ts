// AWS Blog Service - Replaces the local backend API
// This service connects to AWS Lambda + DynamoDB instead of the local Express server

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  category: string;
  tags: string[];
  featuredImage?: string;
  status: "draft" | "published" | "archived";
  isFeatured: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  metaData?: any;
}

export interface PaginatedBlogResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// AWS API Configuration
const AWS_API_BASE_URL =
  process.env.NEXT_PUBLIC_AWS_API_URL ||
  "https://your-api-gateway-url.amazonaws.com/prod";

// API Endpoints
const AWS_API_ENDPOINTS = {
  health: "/health",
  blog: {
    posts: "/api/blog",
    featured: "/api/blog/featured",
    categories: "/api/blog/categories",
    tags: "/api/blog/tags",
    post: (slug: string) => `/api/blog/${slug}`,
  },
};

// Custom API Error class
export class AwsApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "AwsApiError";
  }
}

// Helper function to handle AWS API requests
async function awsApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${AWS_API_BASE_URL}${endpoint}`;
    console.log(`🌐 Making AWS API request to: ${url}`);

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new AwsApiError(
        errorData.error || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }

    const data = await response.json();
    console.log(`✅ AWS API response received for: ${endpoint}`);
    return data;
  } catch (error) {
    console.error(`❌ AWS API request failed for ${endpoint}:`, error);
    throw error;
  }
}

// Get all published blog posts from AWS
export async function getBlogPosts(params?: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  author?: string;
}): Promise<PaginatedBlogResponse> {
  try {
    console.log("🔍 Fetching blog posts from AWS...");

    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.category) searchParams.append("category", params.category);
    if (params?.tag) searchParams.append("tag", params.tag);
    if (params?.search) searchParams.append("search", params.search);
    if (params?.author) searchParams.append("author", params.author);

    const endpoint = `${AWS_API_ENDPOINTS.blog.posts}?${searchParams.toString()}`;
    const response = await awsApiRequest<PaginatedBlogResponse>(endpoint);

    console.log("✅ Fetched blog posts from AWS:", response.posts.length);
    return response;
  } catch (error) {
    console.error("❌ Error fetching blog posts from AWS:", error);
    throw error;
  }
}

// Get featured blog posts from AWS
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    console.log("🔍 Fetching featured blog posts from AWS...");

    const response = await awsApiRequest<BlogPost[]>(
      AWS_API_ENDPOINTS.blog.featured
    );

    console.log("✅ Fetched featured posts from AWS:", response.length);
    return response;
  } catch (error) {
    console.error("❌ Error fetching featured posts from AWS:", error);
    throw error;
  }
}

// Get a single blog post by slug from AWS
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    console.log("🔍 Fetching blog post by slug from AWS:", slug);

    const response = await awsApiRequest<BlogPost>(
      AWS_API_ENDPOINTS.blog.post(slug)
    );

    console.log("✅ Fetched blog post from AWS:", response.title);
    return response;
  } catch (error) {
    console.error("❌ Error fetching blog post from AWS:", error);
    if (error instanceof AwsApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Get blog categories from AWS
export async function getBlogCategories(): Promise<string[]> {
  try {
    console.log("🔍 Fetching blog categories from AWS...");

    const response = await awsApiRequest<string[]>(
      AWS_API_ENDPOINTS.blog.categories
    );

    console.log("✅ Fetched categories from AWS:", response.length);
    return response;
  } catch (error) {
    console.error("❌ Error fetching categories from AWS:", error);
    throw error;
  }
}

// Get blog tags from AWS
export async function getBlogTags(): Promise<string[]> {
  try {
    console.log("🔍 Fetching blog tags from AWS...");

    const response = await awsApiRequest<string[]>(AWS_API_ENDPOINTS.blog.tags);

    console.log("✅ Fetched tags from AWS:", response.length);
    return response;
  } catch (error) {
    console.error("❌ Error fetching tags from AWS:", error);
    throw error;
  }
}

// Health check for AWS API
export async function checkAwsApiHealth(): Promise<{
  status: string;
  message: string;
}> {
  try {
    console.log("🔍 Checking AWS API health...");

    const response = await awsApiRequest<{ status: string; message: string }>(
      AWS_API_ENDPOINTS.health
    );

    console.log("✅ AWS API health check passed:", response);
    return response;
  } catch (error) {
    console.error("❌ AWS API health check failed:", error);
    throw error;
  }
}

// Helper function to format date for display
export function formatBlogDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

// Helper function to create slug from title
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// Test function to verify AWS connectivity
export async function testAwsConnection(): Promise<boolean> {
  try {
    await checkAwsApiHealth();
    return true;
  } catch (error) {
    console.error("AWS connection test failed:", error);
    return false;
  }
}
