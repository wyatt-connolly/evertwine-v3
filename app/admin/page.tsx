"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  uploadBlogImage,
  type BlogPost,
  type BlogPostInput,
} from "@/lib/blog-service";
import { Timestamp } from "firebase/firestore";

// Force dynamic rendering - prevents prerendering issues with Firebase
export const dynamic = "force-dynamic";

interface LoginCredentials {
  username: string;
  password: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Blog management state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<BlogPostInput>({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    image: "",
    read_time: "",
    category: "",
    slug: "",
    published: true,
  });
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    setPageLoaded(true);
    // Check if already authenticated
    const authStatus = localStorage.getItem("evertwine_admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      fetchBlogPosts();
    }
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const posts = await getBlogPosts();
      setBlogPosts(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");

    // Simple hardcoded authentication
    if (
      loginData.username === "evertwinesocial" &&
      loginData.password === "Letslaunch25!"
    ) {
      setIsAuthenticated(true);
      localStorage.setItem("evertwine_admin_auth", "true");
      await fetchBlogPosts();
    } else {
      setLoginError("Invalid username or password");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("evertwine_admin_auth");
    setLoginData({ username: "", password: "" });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image and get URL
  const handleImageUpload = async (): Promise<string> => {
    if (!selectedFile) return formData.image;

    setUploading(true);
    try {
      const imageUrl = await uploadBlogImage(selectedFile);
      setUploading(false);
      return imageUrl || formData.image;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
      return formData.image;
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload image first if there's a selected file
      let imageUrl = formData.image;
      if (selectedFile) {
        imageUrl = await handleImageUpload();
      }

      const slug = formData.slug || generateSlug(formData.title);
      await createBlogPost({ ...formData, slug, image: imageUrl });
      await fetchBlogPosts();
      setShowCreateForm(false);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        image: "",
        read_time: "",
        category: "",
        slug: "",
        published: true,
      });
      setSelectedFile(null);
      setImagePreview("");
    } catch (error) {
      console.error("Error creating blog post:", error);
    }

    setLoading(false);
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    setLoading(true);

    try {
      // Upload image first if there's a selected file
      let imageUrl = formData.image;
      if (selectedFile) {
        imageUrl = await handleImageUpload();
      }

      const slug = formData.slug || generateSlug(formData.title);
      await updateBlogPost(editingPost.id, {
        ...formData,
        slug,
        image: imageUrl,
      });
      await fetchBlogPosts();
      setEditingPost(null);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        image: "",
        read_time: "",
        category: "",
        slug: "",
        published: true,
      });
      setSelectedFile(null);
      setImagePreview("");
    } catch (error) {
      console.error("Error updating blog post:", error);
    }

    setLoading(false);
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    setLoading(true);

    try {
      await deleteBlogPost(postId);
      await fetchBlogPosts();
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }

    setLoading(false);
  };

  const startEditing = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      image: post.image,
      read_time: post.read_time,
      category: post.category,
      slug: post.slug,
      published: post.published,
    });
    setSelectedFile(null);
    setImagePreview("");
    setShowCreateForm(false);
  };

  const formatDate = (date: Timestamp | string) => {
    if (date instanceof Timestamp) {
      return date.toDate().toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black overflow-hidden">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-blue-900/20">
          <div className="container mx-auto px-6 py-4 md:px-8 md:py-8 h-[96px] md:h-[110px] flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <Link
                  href="/"
                  className={`flex items-center transition-all duration-500 ${
                    pageLoaded ? "opacity-100" : "opacity-0 -translate-x-8"
                  }`}
                >
                  <Image
                    src="/evertwine-logo.png"
                    alt="Evertwine logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3"
                  />
                  <span className="text-white text-2xl md:text-3xl font-bold tracking-tight font-sora">
                    Evertwine Admin
                  </span>
                </Link>
              </div>
              <Link
                href="/"
                className={`inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-500 text-sm font-medium border border-white/20 ${
                  pageLoaded ? "opacity-100" : "opacity-0 translate-x-8"
                }`}
              >
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Login Form */}
        <main className="container mx-auto px-4 py-16 pt-32">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-3xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Admin Login
                </h1>
                <p className="text-gray-300">
                  Enter your credentials to access the CMS
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      value={loginData.username}
                      onChange={(e) =>
                        setLoginData({ ...loginData, username: e.target.value })
                      }
                      className="block w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      className="block w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div className="text-red-400 text-sm text-center">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-blue-900/20">
        <div className="container mx-auto px-6 py-4 md:px-8 md:py-8 h-[96px] md:h-[110px] flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/evertwine-logo.png"
                  alt="Evertwine logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3"
                />
                <span className="text-white text-2xl md:text-3xl font-bold tracking-tight font-sora">
                  Evertwine Admin
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setShowCreateForm(true);
                  setEditingPost(null);
                  setFormData({
                    title: "",
                    excerpt: "",
                    content: "",
                    author: "",
                    image: "",
                    read_time: "",
                    category: "",
                    slug: "",
                    published: true,
                  });
                  setSelectedFile(null);
                  setImagePreview("");
                }}
                className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-500 text-sm font-medium text-white"
              >
                <Plus className="w-4 h-4" />
                <span>New Post</span>
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-500 text-sm font-medium border border-white/20 text-white"
              >
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 pt-32">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
              Blog Management
            </h1>
            <p className="text-gray-300 text-lg">
              Create, edit, and manage your blog posts
            </p>
          </div>

          {/* Create/Edit Form */}
          {(showCreateForm || editingPost) && (
            <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-3xl shadow-2xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingPost(null);
                    setFormData({
                      title: "",
                      excerpt: "",
                      content: "",
                      author: "",
                      image: "",
                      read_time: "",
                      category: "",
                      slug: "",
                      published: true,
                    });
                    setSelectedFile(null);
                    setImagePreview("");
                  }}
                  className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Author
                    </label>
                    <Select
                      value={formData.author}
                      onValueChange={(value) =>
                        setFormData({ ...formData, author: value })
                      }
                      required
                    >
                      <SelectTrigger className="w-full bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <SelectValue placeholder="Select Author" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border border-gray-600">
                        <SelectItem
                          value="Skylar Greggory (CEO)"
                          className="text-white hover:bg-gray-700"
                        >
                          Skylar Greggory (CEO)
                        </SelectItem>
                        <SelectItem
                          value="Wyatt Connolly (CTO)"
                          className="text-white hover:bg-gray-700"
                        >
                          Wyatt Connolly (CTO)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={10}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Read Time (minutes)
                    </label>
                    <input
                      type="number"
                      value={formData.read_time}
                      onChange={(e) =>
                        setFormData({ ...formData, read_time: e.target.value })
                      }
                      placeholder="5"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Category
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                      required
                    >
                      <SelectTrigger className="w-full bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border border-gray-600">
                        <SelectItem
                          value="Development"
                          className="text-white hover:bg-gray-700"
                        >
                          Development
                        </SelectItem>
                        <SelectItem
                          value="Business"
                          className="text-white hover:bg-gray-700"
                        >
                          Business
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      placeholder="Auto-generated from title"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Featured Image
                    {editingPost && (
                      <span className="text-gray-400 text-xs ml-2">
                        (Upload new image to replace current one)
                      </span>
                    )}
                  </label>
                  <div className="space-y-4">
                    {/* File upload */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                      required={!editingPost && !formData.image}
                    />

                    {/* Image preview */}
                    {(imagePreview || formData.image) && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-400 mb-2">Preview:</p>
                        <Image
                          src={imagePreview || formData.image}
                          alt="Preview"
                          width={200}
                          height={120}
                          className="w-50 h-30 object-cover rounded-lg border border-gray-600"
                        />
                      </div>
                    )}

                    {uploading && (
                      <div className="flex items-center space-x-2 text-blue-400">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                        <span className="text-sm">Uploading image...</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="published"
                    className="ml-2 block text-sm text-gray-200"
                  >
                    Publish immediately
                  </label>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setEditingPost(null);
                    }}
                    className="px-6 py-2 border border-gray-600 rounded-lg text-gray-200 hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>
                      {loading
                        ? "Saving..."
                        : editingPost
                          ? "Update Post"
                          : "Create Post"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Blog Posts List */}
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">
                Blog Posts ({blogPosts.length})
              </h2>
            </div>

            {blogPosts.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  No blog posts yet
                </h3>
                <p className="text-gray-300 mb-6">
                  Create your first blog post to get started.
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create First Post</span>
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-6 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        {/* Blog post image */}
                        <div className="flex-shrink-0">
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={80}
                            height={80}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <h3 className="text-lg font-semibold text-white">
                              {post.title}
                            </h3>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                post.published
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {post.published ? "Published" : "Draft"}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-2 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>By {post.author}</span>
                            <span>•</span>
                            <span>
                              {formatDate(post.date || post.created_at)}
                            </span>
                            <span>•</span>
                            <span>{post.read_time} min read</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => startEditing(post)}
                          className="p-2 text-blue-400 hover:bg-blue-900/50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-red-400 hover:bg-red-900/50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
