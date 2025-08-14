"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { getBlogPosts, type BlogPost } from "@/lib/blog-service";
import { Timestamp } from "firebase/firestore";
import Footer from "@/components/layout/Footer";

export default function BlogPage() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Refs for animations
  const headerRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Process all posts to mark only the newest (first) one as featured
  const processedPosts = blogPosts.map((post, index) => ({
    ...post,
    featured: index === 0, // Only the newest (first) post is featured
  }));

  // Function to format date
  const formatDate = (date: Timestamp | string | null): string => {
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    if (date && typeof date.toDate === "function") {
      return date.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "Unknown Date";
  };

  const PostCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <Link href={`/blog/${post.slug}`} key={post.id}>
      <article
        className={`group transition-all duration-700 ${
          pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transform hover:scale-105 hover:-translate-y-2 h-full`}
        style={{ transitionDelay: `${600 + index * 200}ms` }}
      >
        {/* Blog Image */}
        {post.image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Featured Badge Overlay */}
            {post.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  Featured
                </span>
              </div>
            )}
          </div>
        )}

        <div className="p-6 md:p-8 flex flex-col h-full">
          {/* Featured Badge for posts without images */}
          {post.featured && !post.image && (
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                Featured
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300 font-sora">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed font-dm-sans line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="space-y-2 md:space-y-0 md:flex md:items-center md:justify-between text-sm md:text-base text-gray-400 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>{formatDate(post.date || post.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{post.read_time} min read</span>
              </div>
            </div>
          </div>

          {/* Read More */}
          <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors font-medium font-dm-sans text-base md:text-lg mt-auto">
            <span>Read More</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </article>
    </Link>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black overflow-hidden">
        {/* Header - partners style */}
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
                    Evertwine
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
        <main className="container mx-auto px-4 py-16 pt-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="animate-pulse">
                <div className="h-12 bg-gray-700 rounded-lg w-64 mx-auto mb-4"></div>
                <div className="h-6 bg-gray-700 rounded-lg w-96 mx-auto"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-700 rounded-3xl h-64 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Header - partners style */}
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
                  Evertwine
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
      <main className="container mx-auto px-4 py-16 pt-32">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div
            ref={headerRef}
            id="header"
            className={`text-center mb-16 transition-all duration-1000 ${
              pageLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-white mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover insights, tips, and stories about building meaningful
              connections through our platform.
            </p>
          </div>

          {/* Blog Posts Section */}
          <div
            ref={postsRef}
            id="posts"
            className={`transition-all duration-1000 delay-300 ${
              pageLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {processedPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    No Blog Posts Yet
                  </h3>
                  <p className="text-gray-300 mb-8">
                    We&apos;re working on creating amazing content for you.
                    Check back soon for the latest insights and updates!
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
                {processedPosts.map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
