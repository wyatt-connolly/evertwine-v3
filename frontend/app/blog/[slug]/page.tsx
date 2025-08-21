"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";
import {
  getBlogPosts,
  getBlogPostBySlug,
  formatBlogDate,
  type BlogPost,
} from "@/lib/blog-service";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Unwrap the params Promise using React.use()
  const resolvedParams = React.use(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPost = await getBlogPostBySlug(resolvedParams.slug);
        const fetchedPosts = await getBlogPosts();

        if (!fetchedPost) {
          notFound();
          return;
        }

        setPost(fetchedPost);
        setAllPosts(fetchedPosts.posts);
        setLoading(false);
        setPageLoaded(true);
        setTimeout(() => setContentVisible(true), 300);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        notFound();
      }
    };

    fetchData();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // Get navigation posts
  const currentIndex = allPosts.findIndex(
    (p) => p.slug === resolvedParams.slug
  );
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Convert content to HTML (simple implementation)
  const formatContent = (content: string) => {
    return content
      .split("\n\n")
      .map((paragraph) => {
        if (paragraph.startsWith("# ")) {
          return `<h2 class="text-2xl font-bold text-white mt-8 mb-4 font-sora">${paragraph.slice(2)}</h2>`;
        }
        return `<p class="text-gray-300 leading-relaxed mb-6 font-dm-sans">${paragraph}</p>`;
      })
      .join("");
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Header - consistent with partners page */}
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

      {/* Main Content */}
      <main className="pt-[110px]">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-900 via-black to-purple-900 py-20">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative container mx-auto px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Back to Blog */}
              <Link
                href="/blog"
                className={`inline-flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 mb-8 font-medium font-dm-sans ${
                  pageLoaded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>

              {/* Category Badge */}
              <div
                className={`mb-6 transition-all duration-700 delay-200 ${
                  pageLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium font-dm-sans">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sora transition-all duration-700 delay-300 ${
                  pageLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {post.title}
              </h1>

              {/* Meta Info */}
              <div
                className={`flex flex-wrap items-center gap-6 text-gray-300 mb-8 font-dm-sans transition-all duration-700 delay-400 ${
                  pageLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>
                    {post.author.firstName} {post.author.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatBlogDate(post.publishedAt || post.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {Math.ceil(post.content.split(" ").length / 200)} min read
                  </span>
                </div>
              </div>

              {/* Excerpt */}
              <p
                className={`text-xl text-gray-300 leading-relaxed font-dm-sans transition-all duration-700 delay-500 ${
                  pageLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="bg-gradient-to-b from-black via-gray-900 to-black py-16">
            <div className="container mx-auto px-6 md:px-8">
              <div className="max-w-4xl mx-auto">
                <div
                  className={`relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 delay-600 ${
                    pageLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="bg-black py-16">
          <div className="container mx-auto px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div
                className={`prose prose-lg prose-invert max-w-none transition-all duration-700 ${
                  contentVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                dangerouslySetInnerHTML={{
                  __html: formatContent(post.content),
                }}
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        {(prevPost || nextPost) && (
          <div className="bg-gray-900 py-16">
            <div className="container mx-auto px-6 md:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  {prevPost && (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="group p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="flex items-center text-blue-400 mb-2 font-dm-sans">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous Post
                      </div>
                      <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors font-sora">
                        {prevPost.title}
                      </h3>
                    </Link>
                  )}
                  {nextPost && (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="group p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="flex items-center justify-end text-blue-400 mb-2 font-dm-sans">
                        Next Post
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                      <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors text-right font-sora">
                        {nextPost.title}
                      </h3>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-gray-800 py-16">
            <div className="container mx-auto px-6 md:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-12 text-center font-sora">
                  Related Posts
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost, index) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className={`group block bg-gray-700 rounded-xl overflow-hidden hover:bg-gray-600 transition-all duration-500 transform hover:scale-105 ${
                        contentVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="p-6">
                        <span className="bg-gray-600 text-gray-300 text-xs px-3 py-1 rounded-full font-dm-sans">
                          {relatedPost.category}
                        </span>
                        <h3 className="text-lg font-semibold text-white mt-3 mb-2 group-hover:text-blue-400 transition-colors font-sora">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-300 text-sm font-dm-sans line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer - consistent with partners page */}
      <footer className="relative bg-black text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative container mx-auto px-6 py-16 md:px-8 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Image
                  src="/evertwine-logo.png"
                  alt="Evertwine logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 mr-3"
                />
                <span className="text-3xl font-bold font-sora">Evertwine</span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 font-dm-sans">
                Connecting hearts, creating communities. Evertwine brings people
                together through authentic connections and shared experiences.
              </p>
              <div className="flex space-x-6">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-2xl"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-2xl"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-2xl"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6 font-sora">
                Quick Links
              </h3>
              <ul className="space-y-4 font-dm-sans">
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xl font-semibold mb-6 font-sora">Legal</h3>
              <ul className="space-y-4 font-dm-sans">
                <li>
                  <Link
                    href="/legal/privacy-policy"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/terms-of-service"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/cookie-policy"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 font-dm-sans">
              © 2024 Evertwine. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
