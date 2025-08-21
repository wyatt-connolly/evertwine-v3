import {
  fetchBlogPosts,
  fetchBlogPost,
  searchBlogPosts,
  sendContactEmail,
  sendEmail,
} from "@/lib/api";

// Mock fetch globally
global.fetch = jest.fn();

describe("API Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset environment variables
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:3001/api";
  });

  describe("fetchBlogPosts", () => {
    it("should fetch blog posts successfully", async () => {
      const mockPosts = [
        testUtils.createTestBlogPost({ id: 1, title: "First Post" }),
        testUtils.createTestBlogPost({ id: 2, title: "Second Post" }),
      ];

      const mockResponse = testUtils.mockApiResponse({
        posts: mockPosts,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalPosts: 2,
        },
      });

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await fetchBlogPosts();

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/blog",
        expect.any(Object)
      );
      expect(result.posts).toEqual(mockPosts);
      expect(result.pagination).toBeDefined();
    });

    it("should fetch blog posts with pagination parameters", async () => {
      const mockResponse = testUtils.mockApiResponse({
        posts: [],
        pagination: { currentPage: 2, totalPages: 3, totalPosts: 0 },
      });

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await fetchBlogPosts({ page: 2, limit: 10 });

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/blog?page=2&limit=10",
        expect.any(Object)
      );
    });

    it("should handle API errors", async () => {
      const mockResponse = testUtils.mockApiResponse(
        { error: "Internal server error" },
        500
      );

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(fetchBlogPosts()).rejects.toThrow("Internal server error");
    });

    it("should handle network errors", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      await expect(fetchBlogPosts()).rejects.toThrow("Network error");
    });
  });

  describe("fetchBlogPost", () => {
    it("should fetch a single blog post successfully", async () => {
      const mockPost = testUtils.createTestBlogPost({ slug: "test-post" });
      const mockResponse = testUtils.mockApiResponse({ post: mockPost });

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await fetchBlogPost("test-post");

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/blog/test-post",
        expect.any(Object)
      );
      expect(result).toEqual(mockPost);
    });

    it("should handle 404 errors for non-existent posts", async () => {
      const mockResponse = testUtils.mockApiResponse(
        { error: "Blog post not found" },
        404
      );

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(fetchBlogPost("non-existent")).rejects.toThrow(
        "Blog post not found"
      );
    });
  });

  describe("searchBlogPosts", () => {
    it("should search blog posts successfully", async () => {
      const mockPosts = [
        testUtils.createTestBlogPost({ title: "JavaScript Tutorial" }),
      ];
      const mockResponse = testUtils.mockApiResponse({ posts: mockPosts });

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await searchBlogPosts("JavaScript");

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/blog/search?q=JavaScript",
        expect.any(Object)
      );
      expect(result).toEqual(mockPosts);
    });

    it("should handle empty search results", async () => {
      const mockResponse = testUtils.mockApiResponse({ posts: [] });

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await searchBlogPosts("nonexistent");

      expect(result).toEqual([]);
    });

    it("should handle missing search query", async () => {
      const mockResponse = testUtils.mockApiResponse(
        { error: "Search query is required" },
        400
      );

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(searchBlogPosts("")).rejects.toThrow(
        "Search query is required"
      );
    });
  });

  describe("sendContactEmail", () => {
    it("should send contact email successfully", async () => {
      const contactData = testUtils.createTestContactData();
      const mockResponse = testUtils.mockApiResponse({
        message: "Email sent successfully",
      });

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await sendContactEmail(contactData);

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        }
      );
      expect(result).toEqual({ message: "Email sent successfully" });
    });

    it("should handle validation errors", async () => {
      const invalidData = { name: "", email: "invalid", message: "" };
      const mockResponse = testUtils.mockApiResponse(
        { error: "Validation failed" },
        400
      );

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(sendContactEmail(invalidData)).rejects.toThrow(
        "Validation failed"
      );
    });
  });

  describe("sendEmail", () => {
    it("should send email successfully", async () => {
      const emailData = {
        to: "test@example.com",
        subject: "Test Subject",
        message: "Test message",
      };
      const mockResponse = testUtils.mockApiResponse({
        message: "Email sent successfully",
      });

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await sendEmail(emailData);

      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );
      expect(result).toEqual({ message: "Email sent successfully" });
    });
  });

  describe("Error Handling", () => {
    it("should handle non-JSON responses", async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        text: async () => "Internal Server Error",
        json: async () => {
          throw new Error("Invalid JSON");
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(fetchBlogPosts()).rejects.toThrow("Internal Server Error");
    });

    it("should handle timeout errors", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("timeout"));

      await expect(fetchBlogPosts()).rejects.toThrow("timeout");
    });

    it("should handle CORS errors", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("CORS error")
      );

      await expect(fetchBlogPosts()).rejects.toThrow("CORS error");
    });
  });

  describe("Request Configuration", () => {
    it("should include proper headers", async () => {
      const mockResponse = testUtils.mockApiResponse({ posts: [] });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await fetchBlogPosts();

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
    });

    it("should handle different HTTP methods", async () => {
      const mockResponse = testUtils.mockApiResponse({ message: "Success" });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await sendContactEmail(testUtils.createTestContactData());

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
        })
      );
    });
  });
});
