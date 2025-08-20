import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin" | "moderator";
  isActive: boolean;
  isEmailVerified: boolean;
  lastLoginAt?: string;
  profileImage?: string;
  preferences?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  authorId: string;
  status: "draft" | "published" | "archived";
  publishedAt?: string;
  tags: string[];
  category: string;
  readTime: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords: string[];
  metaData?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      await api.post("/auth/logout", { userId });
    }
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (
    token: string,
    password: string
  ): Promise<{ message: string }> => {
    const response = await api.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  },

  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await api.get(`/auth/verify-email/${token}`);
    return response.data;
  },

  refreshToken: async (token: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/refresh", { token });
    return response.data;
  },
};

// User API
export const userAPI = {
  getProfile: async (): Promise<User> => {
    const response = await api.get("/users/profile");
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put("/users/profile", userData);
    return response.data;
  },

  changePassword: async (passwords: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string }> => {
    const response = await api.put("/users/password", passwords);
    return response.data;
  },

  deleteAccount: async (password: string): Promise<{ message: string }> => {
    const response = await api.delete("/users/account", { data: { password } });
    return response.data;
  },
};

// Blog API
export const blogAPI = {
  getPosts: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    tag?: string;
    search?: string;
  }): Promise<{
    posts: BlogPost[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    const response = await api.get("/blog", { params });
    return response.data;
  },

  getPost: async (slug: string): Promise<BlogPost> => {
    const response = await api.get(`/blog/${slug}`);
    return response.data;
  },

  getFeaturedPosts: async (): Promise<BlogPost[]> => {
    const response = await api.get("/blog/featured");
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get("/blog/categories");
    return response.data;
  },

  getTags: async (): Promise<string[]> => {
    const response = await api.get("/blog/tags");
    return response.data;
  },

  // Admin only
  createPost: async (postData: Partial<BlogPost>): Promise<BlogPost> => {
    const response = await api.post("/blog", postData);
    return response.data;
  },

  updatePost: async (
    id: string,
    postData: Partial<BlogPost>
  ): Promise<BlogPost> => {
    const response = await api.put(`/blog/${id}`, postData);
    return response.data;
  },

  deletePost: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/blog/${id}`);
    return response.data;
  },
};

// Contact API
export const contactAPI = {
  sendMessage: async (formData: ContactForm): Promise<{ message: string }> => {
    const response = await api.post("/contact", formData);
    return response.data;
  },
};

// Health API
export const healthAPI = {
  check: async (): Promise<{
    status: string;
    timestamp: string;
    uptime: number;
    environment: string;
  }> => {
    const response = await api.get("/health");
    return response.data;
  },
};

export default api;
