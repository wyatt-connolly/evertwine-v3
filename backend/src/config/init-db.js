const { sequelize } = require("./database");
const User = require("../models/User");
const Blog = require("../models/Blog");
require("dotenv").config();

async function initializeDatabase() {
  try {
    console.log("🔌 Connecting to database...");

    // Test connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    // Sync all models (create tables)
    console.log("🔄 Syncing database models...");
    await sequelize.sync({ force: true }); // force: true will drop and recreate tables
    console.log("✅ Database models synced successfully.");

    // Create sample data
    console.log("📝 Creating sample data...");

    // Create sample users
    const users = await User.bulkCreate([
      {
        email: "admin@evertwine.com",
        password: "admin123",
        firstName: "Admin",
        lastName: "User",
        role: "admin",
        isActive: true,
        isEmailVerified: true,
      },
      {
        email: "sarah@evertwine.com",
        password: "password123",
        firstName: "Sarah",
        lastName: "Johnson",
        role: "user",
        isActive: true,
        isEmailVerified: true,
      },
      {
        email: "mike@evertwine.com",
        password: "password123",
        firstName: "Mike",
        lastName: "Chen",
        role: "user",
        isActive: true,
        isEmailVerified: true,
      },
      {
        email: "emily@evertwine.com",
        password: "password123",
        firstName: "Emily",
        lastName: "Rodriguez",
        role: "user",
        isActive: true,
        isEmailVerified: true,
      },
    ]);

    console.log("✅ Sample users created.");

    // Create sample blog posts
    const blogPosts = await Blog.bulkCreate([
      {
        title: "Building Meaningful Connections in the Digital Age",
        slug: "building-meaningful-connections-digital-age",
        excerpt:
          "Discover how modern technology can help foster genuine relationships and community bonds in our increasingly connected world.",
        content: `In today's fast-paced digital world, it's easy to feel disconnected despite being constantly connected. Social media platforms promise to bring us together, but often leave us feeling more isolated than ever. This is where Evertwine comes in - we're building a platform that bridges the gap between digital convenience and genuine human connection.

Our approach is simple yet powerful: we use technology to facilitate real-world meetups and meaningful interactions. Instead of endless scrolling and superficial online interactions, we encourage users to step away from their screens and engage with their local community.

The key to building meaningful connections lies in shared experiences. Whether it's a coffee meetup, a hiking adventure, or a book club discussion, these real-world interactions create bonds that digital communication simply cannot replicate. Our platform makes it easy to discover and organize these experiences with like-minded individuals in your area.

But meaningful connections aren't just about having fun - they're essential for our mental health and well-being. Research has shown that strong social connections can reduce stress, improve mood, and even increase lifespan. In a world where loneliness is becoming an epidemic, platforms like Evertwine are more important than ever.

We believe that technology should serve humanity, not the other way around. By combining the convenience of digital platforms with the authenticity of face-to-face interactions, we're creating a new model for social connection that prioritizes quality over quantity.

The future of social networking isn't about accumulating more online friends or followers - it's about building genuine relationships that enrich our lives and strengthen our communities. Join us in this mission to make the world a more connected, compassionate place, one meetup at a time.`,
        authorId: users[1].id, // Sarah Johnson
        category: "Technology",
        tags: ["connections", "digital", "community", "social"],
        status: "published",
        isFeatured: true,
        viewCount: 1250,
        likeCount: 89,
        commentCount: 23,
        publishedAt: new Date("2024-03-15T00:00:00.000Z"),
        seoTitle:
          "Building Meaningful Connections in the Digital Age - Evertwine",
        seoDescription:
          "Discover how modern technology can help foster genuine relationships and community bonds in our increasingly connected world.",
        seoKeywords:
          "social connections, community building, digital age, meaningful relationships",
      },
      {
        title: "The Future of Social Networking",
        slug: "future-of-social-networking",
        excerpt:
          "Exploring how social platforms are evolving to prioritize authentic connections over superficial interactions.",
        content: `The landscape of social networking is undergoing a fundamental transformation. For years, platforms have focused on maximizing engagement through addictive algorithms and superficial interactions. But users are increasingly demanding more meaningful experiences that actually improve their lives rather than just consuming their time.

This shift represents a broader cultural movement toward authenticity and genuine human connection. People are tired of curated personas and performative social media. They want platforms that help them build real relationships and create lasting memories.

The future of social networking lies in platforms that prioritize quality over quantity. Instead of competing for likes and followers, users are seeking spaces where they can be their authentic selves and connect with others who share their values and interests.

Technology is evolving to support this new paradigm. Advanced matching algorithms can now identify compatible individuals based on shared interests, values, and goals. Location-based services make it easier than ever to discover local communities and events.

Privacy and safety are also becoming central concerns. Users want to know that their personal information is protected and that they can trust the people they're connecting with. This is why verification systems and community guidelines are becoming standard features.

The most successful platforms of the future will be those that successfully balance digital convenience with human authenticity. They'll use technology to facilitate real-world interactions rather than replace them entirely.

At Evertwine, we're proud to be at the forefront of this movement. Our platform is designed from the ground up to foster genuine connections through real-world meetups and shared experiences. We believe that the future of social networking isn't about spending more time online - it's about using technology to enhance our offline lives.

As we look to the future, we're excited to see how this evolution continues. The potential for technology to bring people together in meaningful ways is enormous, and we're committed to being part of that positive change.`,
        authorId: users[2].id, // Mike Chen
        category: "Innovation",
        tags: ["social networking", "future", "authenticity", "technology"],
        status: "published",
        isFeatured: false,
        viewCount: 890,
        likeCount: 67,
        commentCount: 15,
        publishedAt: new Date("2024-03-10T00:00:00.000Z"),
        seoTitle: "The Future of Social Networking - Authentic Connections",
        seoDescription:
          "Exploring how social platforms are evolving to prioritize authentic connections over superficial interactions.",
        seoKeywords:
          "social networking, future, authentic connections, technology evolution",
      },
      {
        title: "Community Building Best Practices",
        slug: "community-building-best-practices",
        excerpt:
          "Learn the essential strategies for creating and maintaining thriving online communities that last.",
        content: `Building a strong community is both an art and a science. Whether you're organizing a local meetup group or managing an online community, the principles of successful community building remain the same. Here are some essential strategies that have proven effective time and time again.

First and foremost, successful communities are built around shared values and interests. People need a compelling reason to join and stay engaged. This could be a shared passion for a hobby, a common professional goal, or a desire to make a positive impact in their local area.

Clear communication is essential. Community guidelines should be transparent and easy to understand. Members need to know what's expected of them and what they can expect from others. Regular updates and announcements help keep everyone informed and engaged.

Inclusivity is key to building a thriving community. Everyone should feel welcome and valued, regardless of their background or experience level. This means actively working to create a safe and supportive environment where all voices can be heard.

Regular events and activities help maintain engagement and strengthen bonds between members. These don't have to be elaborate - even simple coffee meetups or casual get-togethers can be highly effective at building community spirit.

Leadership and moderation are crucial. Every community needs people who are willing to take initiative, organize events, and help resolve conflicts when they arise. These leaders don't need to be perfect, but they do need to be committed and fair.

Technology can be a powerful tool for community building, but it should serve the community, not dominate it. The best platforms are those that facilitate real-world interactions rather than replacing them entirely.

Finally, successful communities evolve over time. Be open to feedback and willing to adapt as your community grows and changes. The most vibrant communities are those that can grow and change while staying true to their core values.

At Evertwine, we've seen these principles in action time and time again. Our most successful meetup groups are those that have strong leadership, clear communication, and a commitment to inclusivity. They're the ones that create lasting friendships and meaningful experiences for their members.

Building a community takes time and effort, but the rewards are immeasurable. When done right, communities can provide support, friendship, and a sense of belonging that enriches everyone involved.`,
        authorId: users[3].id, // Emily Rodriguez
        category: "Community",
        tags: [
          "community building",
          "best practices",
          "leadership",
          "inclusivity",
        ],
        status: "published",
        isFeatured: false,
        viewCount: 567,
        likeCount: 45,
        commentCount: 12,
        publishedAt: new Date("2024-03-05T00:00:00.000Z"),
        seoTitle: "Community Building Best Practices - Evertwine Guide",
        seoDescription:
          "Learn the essential strategies for creating and maintaining thriving online communities that last.",
        seoKeywords:
          "community building, best practices, leadership, inclusivity, meetup groups",
      },
    ]);

    console.log("✅ Sample blog posts created.");

    console.log("🎉 Database initialization completed successfully!");
    console.log("\n📊 Sample data created:");
    console.log(`   - ${users.length} users`);
    console.log(`   - ${blogPosts.length} blog posts`);
    console.log("\n🔑 Admin credentials:");
    console.log("   Email: admin@evertwine.com");
    console.log("   Password: admin123");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Run the initialization
initializeDatabase();
