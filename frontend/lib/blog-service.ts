import {
  API_BASE_URL,
  API_ENDPOINTS,
  getAuthHeaders,
  ApiError,
} from "./api-config";

// AWS API Configuration
const AWS_API_BASE_URL =
  process.env.NEXT_PUBLIC_AWS_API_URL ||
  "https://491icyf530.execute-api.us-west-1.amazonaws.com/prod";

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
}

export interface BlogPostInput {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  status?: "draft" | "published" | "archived";
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export interface PaginatedBlogResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  totalPages: number;
}

// No sample data needed - using AWS DynamoDB for all blog data

// Helper function to handle API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.error || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// Get all published blog posts
export async function getBlogPosts(params?: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  author?: string;
}): Promise<PaginatedBlogResponse> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.category) searchParams.append("category", params.category);
    if (params?.tag) searchParams.append("tag", params.tag);
    if (params?.search) searchParams.append("search", params.search);
    if (params?.author) searchParams.append("author", params.author);

    const url = `${AWS_API_BASE_URL}/api/blog?${searchParams.toString()}`;

    // Use AWS API instead of local backend
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog posts from AWS:", error);

    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof Error) {
      throw new ApiError(
        `Failed to fetch blog posts from AWS: ${error.message}`,
        500
      );
    } else {
      throw new ApiError("Failed to fetch blog posts from AWS", 500);
    }
  }
}

// Get featured blog posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    console.log("🔍 Fetching featured blog posts...");

    const response = await apiRequest<BlogPost[]>(API_ENDPOINTS.blog.featured);

    console.log("✅ Fetched featured posts:", response.length);
    return response;
  } catch (error) {
    console.error("❌ Error fetching featured posts:", error);

    // Handle different types of errors
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof Error) {
      throw new ApiError(
        `Failed to fetch featured posts: ${error.message}`,
        500
      );
    } else {
      throw new ApiError("Failed to fetch featured posts", 500);
    }
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    console.log("🔍 Fetching blog post by slug from AWS:", slug);

    // Use AWS API instead of local backend
    const response = await fetch(`${AWS_API_BASE_URL}/api/blog/${slug}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    console.log("✅ Fetched blog post from AWS:", data.title);
    return data;
  } catch (error) {
    console.error("❌ Error fetching blog post from AWS:", error);

    // Handle different types of errors
    if (error instanceof ApiError) {
      throw error;
    } else if (error instanceof Error) {
      throw new ApiError(
        `Failed to fetch blog post ${slug}: ${error.message}`,
        500
      );
    } else {
      throw new ApiError(`Failed to fetch blog post: ${slug}`, 500);
    }
  }
}

// Get blog categories
export async function getBlogCategories(): Promise<string[]> {
  try {
    console.log("🔍 Fetching blog categories from AWS...");

    // Use AWS API instead of local backend
    const response = await fetch(`${AWS_API_BASE_URL}/api/blog/categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    console.log("✅ Fetched categories from AWS:", data.length);
    return data;
  } catch (error) {
    console.error("❌ Error fetching categories from AWS:", error);

    // Return sample categories
    return ["Technology", "Innovation", "Community"];
  }
}

// Get blog tags
export async function getBlogTags(): Promise<string[]> {
  try {
    console.log("🔍 Fetching blog tags from AWS...");

    // Use AWS API instead of local backend
    const response = await fetch(`${AWS_API_BASE_URL}/api/blog/tags`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    console.log("✅ Fetched tags from AWS:", data.length);
    return data;
  } catch (error) {
    console.error("❌ Error fetching tags from AWS:", error);

    // Return sample tags
    return [
      "connections",
      "digital",
      "community",
      "social",
      "networking",
      "future",
      "best-practices",
      "online",
    ];
  }
}

// Create a new blog post (requires authentication)
export async function createBlogPost(
  postData: BlogPostInput,
  token: string
): Promise<string | null> {
  try {
    console.log("🚀 Creating blog post...");

    const response = await apiRequest<{ id: string }>(
      API_ENDPOINTS.blog.posts,
      {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify(postData),
      }
    );

    console.log("✅ Created blog post with ID:", response.id);
    return response.id;
  } catch (error) {
    console.error("❌ Error creating blog post:", error);
    return null;
  }
}

// Update an existing blog post (requires authentication)
export async function updateBlogPost(
  id: string,
  updates: Partial<BlogPostInput>,
  token: string
): Promise<boolean> {
  try {
    console.log("🔄 Updating blog post:", id);

    await apiRequest(`${API_ENDPOINTS.blog.posts}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(token),
      body: JSON.stringify(updates),
    });

    console.log("✅ Updated blog post successfully");
    return true;
  } catch (error) {
    console.error("❌ Error updating blog post:", error);
    return false;
  }
}

// Delete a blog post (requires authentication)
export async function deleteBlogPost(
  id: string,
  token: string
): Promise<boolean> {
  try {
    console.log("🗑️ Deleting blog post:", id);

    await apiRequest(`${API_ENDPOINTS.blog.posts}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });

    console.log("✅ Deleted blog post successfully");
    return true;
  } catch (error) {
    console.error("❌ Error deleting blog post:", error);
    return false;
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

// Upload image (placeholder - would need to be implemented with your backend)
export async function uploadBlogImage(
  file: File,
  _token: string
): Promise<string | null> {
  try {
    console.log("🚀 Uploading image:", file.name);

    // This would need to be implemented with your backend file upload endpoint
    // For now, we'll return a placeholder
    console.warn("Image upload not implemented - returning placeholder");
    return "/hero-bg.webp";
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    return null;
  }
}
