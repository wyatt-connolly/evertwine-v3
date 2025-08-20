// API Configuration for Evertwine Backend
// This replaces the Firebase configuration with our custom backend API

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    verify: "/auth/verify",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  users: {
    profile: "/users/profile",
    updateProfile: "/users/profile",
    changePassword: "/users/password",
    deleteAccount: "/users/account",
  },
  blog: {
    posts: "/blog",
    featured: "/blog/featured",
    categories: "/blog/categories",
    tags: "/blog/tags",
    post: (slug: string) => `/blog/${slug}`,
  },
  contact: {
    send: "/contact",
  },
  health: {
    check: "/health",
    detailed: "/health/detailed",
  },
} as const;

// Default headers for API requests
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

// Helper function to get auth headers
export const getAuthHeaders = (token?: string) => {
  const headers = { ...DEFAULT_HEADERS };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// API response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

// Error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// API client configuration
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
} as const;
