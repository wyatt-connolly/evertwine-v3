import {
  API_BASE_URL,
  API_ENDPOINTS,
  getAuthHeaders,
  ApiError,
} from "./firebase";

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
  status?: "draft" | "published";
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

// Sample data for fallback when API is not available
const sampleBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Meaningful Connections in the Digital Age",
    slug: "building-meaningful-connections-digital-age",
    excerpt:
      "Discover how modern technology can help foster genuine relationships and community bonds in our increasingly connected world.",
    content: "Full article content here...",
    author: {
      id: "1",
      firstName: "Sarah",
      lastName: "Johnson",
      profileImage: "/hero-bg.webp",
    },
    category: "Technology",
    tags: ["connections", "digital", "community"],
    status: "published",
    isFeatured: false,
    viewCount: 1250,
    likeCount: 89,
    commentCount: 23,
    publishedAt: "2024-03-15T00:00:00.000Z",
    createdAt: "2024-03-15T00:00:00.000Z",
    updatedAt: "2024-03-15T00:00:00.000Z",
  },
  {
    id: "2",
    title: "The Future of Social Networking",
    slug: "future-of-social-networking",
    excerpt:
      "Exploring how social platforms are evolving to prioritize authentic connections over superficial interactions.",
    content: "Full article content here...",
    author: {
      id: "2",
      firstName: "Mike",
      lastName: "Chen",
      profileImage: "/hero-bg.webp",
    },
    category: "Innovation",
    tags: ["social", "networking", "future"],
    status: "published",
    isFeatured: false,
    viewCount: 980,
    likeCount: 67,
    commentCount: 15,
    publishedAt: "2024-03-10T00:00:00.000Z",
    createdAt: "2024-03-10T00:00:00.000Z",
    updatedAt: "2024-03-10T00:00:00.000Z",
  },
  {
    id: "3",
    title: "Community Building Best Practices",
    slug: "community-building-best-practices",
    excerpt:
      "Learn the essential strategies for creating and maintaining thriving online communities that last.",
    content: "Full article content here...",
    author: {
      id: "3",
      firstName: "Emily",
      lastName: "Rodriguez",
      profileImage: "/hero-bg.webp",
    },
    category: "Community",
    tags: ["community", "best-practices", "online"],
    status: "published",
    isFeatured: false,
    viewCount: 1450,
    likeCount: 112,
    commentCount: 34,
    publishedAt: "2024-03-05T00:00:00.000Z",
    createdAt: "2024-03-05T00:00:00.000Z",
    updatedAt: "2024-03-05T00:00:00.000Z",
  },
];

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
    console.log("🔍 Fetching blog posts from API...");

    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.category) searchParams.append("category", params.category);
    if (params?.tag) searchParams.append("tag", params.tag);
    if (params?.search) searchParams.append("search", params.search);
    if (params?.author) searchParams.append("author", params.author);

    const endpoint = `${API_ENDPOINTS.blog.posts}?${searchParams.toString()}`;
    const response = await apiRequest<PaginatedBlogResponse>(endpoint);

    console.log("✅ Fetched blog posts:", response.posts.length);
    return response;
  } catch (error) {
    console.error("❌ Error fetching blog posts:", error);
    console.warn("Using sample blog data due to API error");

    // Return sample data in the expected format
    return {
      posts: sampleBlogPosts,
      total: sampleBlogPosts.length,
      page: 1,
      totalPages: 1,
    };
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
    console.warn("Using sample featured data due to API error");

    // Return first post as featured
    return [sampleBlogPosts[0]];
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    console.log("🔍 Fetching blog post by slug:", slug);

    const response = await apiRequest<BlogPost>(API_ENDPOINTS.blog.post(slug));

    console.log("✅ Fetched blog post:", response.title);
    return response;
  } catch (error) {
    console.error("❌ Error fetching blog post:", error);

    // Check sample data as fallback
    const samplePost = sampleBlogPosts.find((post) => post.slug === slug);
    if (samplePost) {
      console.warn("Using sample blog data due to API error");
      return samplePost;
    }

    return null;
  }
}

// Get blog categories
export async function getBlogCategories(): Promise<string[]> {
  try {
    console.log("🔍 Fetching blog categories...");

    const response = await apiRequest<string[]>(API_ENDPOINTS.blog.categories);

    console.log("✅ Fetched categories:", response.length);
    return response;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);

    // Return sample categories
    return ["Technology", "Innovation", "Community"];
  }
}

// Get blog tags
export async function getBlogTags(): Promise<string[]> {
  try {
    console.log("🔍 Fetching blog tags...");

    const response = await apiRequest<string[]>(API_ENDPOINTS.blog.tags);

    console.log("✅ Fetched tags:", response.length);
    return response;
  } catch (error) {
    console.error("❌ Error fetching tags:", error);

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
  token: string
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
