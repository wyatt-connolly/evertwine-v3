"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import {
  getBlogPosts,
  formatBlogDate,
  type BlogPost,
} from "@/lib/blog-service";

export default function BlogSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Delay cards animation
            setTimeout(() => setCardsVisible(true), 400);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await getBlogPosts();
        setBlogPosts(response.posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Get the 3 most recent posts and mark only the first one as featured
  const recentPosts = blogPosts.slice(0, 3).map((post, index) => ({
    ...post,
    isFeatured: index === 0, // Only the newest (first) post is featured
  }));

  // Function to format date
  const formatDate = (date: string) => {
    return formatBlogDate(date);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-black overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        ></div>
        <div
          className={`absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        ></div>
      </div>

      <div className="relative container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-sora transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Our <span className="text-blue-400">Blog</span>
          </h2>
          <p
            className={`text-xl text-gray-300 max-w-4xl mx-auto font-dm-sans transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Discover stories, tips, and insights to help you build meaningful
            connections and thrive in your community.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-gray-300 font-dm-sans">
                Loading blog posts...
              </p>
            </div>
          </div>
        ) : recentPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowRight className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-sora">
                No Blog Posts Yet
              </h3>
              <p className="text-gray-300 font-dm-sans mb-8">
                We&apos;re working on creating amazing content for you. Check
                back soon for insights, stories, and tips about building
                meaningful connections.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 font-dm-sans"
              >
                Get Notified
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group block transition-all duration-700 ${
                  cardsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
              >
                <article className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 transform hover:scale-105 hover:-translate-y-2 h-full">
                  {/* Blog Image */}
                  {post.featuredImage && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Featured Badge Overlay */}
                      {post.isFeatured && (
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
                    {post.isFeatured && !post.featuredImage && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-3 rounded-full font-medium">
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
                          <span className="font-medium">
                            {post.author.firstName} {post.author.lastName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span>
                            {formatDate(post.publishedAt || post.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span>
                            {Math.ceil(post.content.split(" ").length / 200)}{" "}
                            min read
                          </span>
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
            ))}
          </div>
        )}

        {/* CTA Button - only show if there are posts */}
        {!loading && recentPosts.length > 0 && (
          <div className="text-center">
            <Link
              href="/blog"
              className={`inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 font-dm-sans ${
                cardsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "1200ms" }}
            >
              View All Posts
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
