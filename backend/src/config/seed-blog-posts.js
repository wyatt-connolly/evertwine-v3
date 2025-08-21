const { Blog, User } = require("../models");
const { sequelize } = require("./database");
const logger = require("../utils/logger");

const sampleBlogPosts = [
  {
    title: "Building Meaningful Connections in the Digital Age",
    slug: "building-meaningful-connections-digital-age",
    excerpt: "Discover how modern technology can help foster genuine relationships and community bonds in our increasingly connected world.",
    content: `In today's fast-paced digital world, it's easy to feel disconnected despite being constantly connected. Social media platforms promise to bring us together, but often leave us feeling more isolated than ever. This is where Evertwine comes in - we're building a platform that bridges the gap between digital convenience and genuine human connection.

The challenge of building meaningful relationships in the digital age is multifaceted. On one hand, we have unprecedented access to people from all walks of life, cultures, and backgrounds. On the other hand, the superficial nature of many online interactions can leave us feeling empty and unfulfilled.

At Evertwine, we believe that technology should enhance human connection, not replace it. Our platform is designed to facilitate deeper, more meaningful interactions by focusing on shared interests, values, and goals rather than just surface-level engagement.

Key principles that guide our approach:

1. **Authenticity First**: We encourage users to be their true selves, fostering genuine connections based on real interests and values.

2. **Quality Over Quantity**: Instead of maximizing the number of connections, we focus on the quality and depth of relationships.

3. **Community Building**: We provide tools and features that help users build and maintain thriving communities around shared interests.

4. **Privacy and Trust**: We prioritize user privacy and create a safe environment where people feel comfortable sharing and connecting.

The future of social networking lies in platforms that understand the difference between connection and mere contact. As we continue to develop Evertwine, we're committed to creating a space where meaningful relationships can flourish in the digital age.`,
    category: "Technology",
    tags: ["connections", "digital", "community", "social"],
    status: "published",
    isFeatured: true,
    viewCount: 1250,
    likeCount: 89,
    commentCount: 23,
    publishedAt: new Date("2024-03-15"),
    seoTitle: "Building Meaningful Connections in the Digital Age - Evertwine",
    seoDescription: "Discover how modern technology can help foster genuine relationships and community bonds in our increasingly connected world.",
    seoKeywords: ["social connections", "community building", "digital age", "meaningful relationships"],
    metaData: {
      readingTime: "5 min read",
      difficulty: "Beginner",
      topics: ["Social Media", "Community", "Technology"]
    }
  },
  {
    title: "The Future of Social Networking",
    slug: "future-of-social-networking",
    excerpt: "Exploring how social platforms are evolving to prioritize authentic connections over superficial interactions.",
    content: `The landscape of social networking is undergoing a fundamental transformation. For years, platforms have focused on maximizing engagement through addictive algorithms and superficial interactions. But users are increasingly demanding more meaningful experiences that actually improve their lives rather than just consuming their time.

The traditional social media model is showing its limitations. Users are becoming more aware of the negative impacts of endless scrolling, comparison culture, and the pressure to present a perfect life online. This awareness is driving a shift toward platforms that prioritize mental health, authentic connections, and real-world impact.

Emerging trends in social networking include:

**1. Mental Health Awareness**
Platforms are beginning to incorporate features that promote digital wellbeing, such as usage tracking, mindful notifications, and tools to manage screen time.

**2. Authentic Content**
There's a growing preference for raw, unfiltered content over highly curated posts. Users want to see real life, not just highlight reels.

**3. Community-Focused Features**
Instead of broadcasting to large audiences, users are gravitating toward smaller, more intimate communities where they can have meaningful discussions.

**4. Privacy-First Design**
With growing concerns about data privacy, platforms that prioritize user control over their information are gaining traction.

**5. Integration with Real Life**
The most successful platforms will be those that enhance real-world relationships rather than replacing them.

The future belongs to platforms that understand that social networking should serve people, not the other way around. As we build Evertwine, we're keeping these principles at the forefront of our design decisions.`,
    category: "Innovation",
    tags: ["social networking", "future", "authenticity", "technology"],
    status: "published",
    isFeatured: false,
    viewCount: 890,
    likeCount: 67,
    commentCount: 15,
    publishedAt: new Date("2024-03-10"),
    seoTitle: "The Future of Social Networking - Authentic Connections",
    seoDescription: "Exploring how social platforms are evolving to prioritize authentic connections over superficial interactions.",
    seoKeywords: ["social networking", "future", "authentic connections", "technology evolution"],
    metaData: {
      readingTime: "4 min read",
      difficulty: "Intermediate",
      topics: ["Social Media", "Technology Trends", "User Experience"]
    }
  },
  {
    title: "Community Building Best Practices",
    slug: "community-building-best-practices",
    excerpt: "Learn the essential strategies for creating and maintaining thriving online communities that last.",
    content: `Building a strong community is both an art and a science. Whether you're organizing a local meetup group or managing an online community, the principles of successful community building remain the same. Here are some essential strategies that have proven effective time and time again.

**1. Define Your Purpose**
Every successful community starts with a clear, compelling purpose. What problem are you solving? What value are you providing? Your community's purpose should be specific enough to attract the right people but broad enough to allow for growth and evolution.

**2. Foster Inclusivity**
Great communities welcome diverse perspectives and create safe spaces for all members. This means establishing clear guidelines, moderating effectively, and actively working to include underrepresented voices.

**3. Encourage Participation**
Communities thrive when members feel valued and heard. Create multiple ways for people to contribute, from simple reactions to hosting events or creating content.

**4. Build Relationships**
Focus on helping members connect with each other, not just with you. Facilitate introductions, create discussion topics, and organize activities that bring people together.

**5. Provide Value Consistently**
Regular, high-quality content and activities keep members engaged and coming back. This could be educational content, networking opportunities, or simply interesting discussions.

**6. Celebrate Success**
Recognize and celebrate both individual achievements and community milestones. This builds morale and reinforces the value of participation.

**7. Adapt and Evolve**
Successful communities grow and change over time. Be open to feedback and willing to adjust your approach based on member needs and preferences.

**8. Lead by Example**
As a community leader, your behavior sets the tone. Model the kind of engagement, respect, and enthusiasm you want to see from your members.

Remember, community building is a long-term commitment. The most successful communities are those that prioritize relationships over growth metrics and focus on creating genuine value for their members.`,
    category: "Community",
    tags: ["community building", "best practices", "leadership", "inclusivity"],
    status: "published",
    isFeatured: false,
    viewCount: 567,
    likeCount: 45,
    commentCount: 12,
    publishedAt: new Date("2024-03-05"),
    seoTitle: "Community Building Best Practices - Evertwine Guide",
    seoDescription: "Learn the essential strategies for creating and maintaining thriving online communities that last.",
    seoKeywords: ["community building", "best practices", "leadership", "inclusivity", "meetup groups"],
    metaData: {
      readingTime: "6 min read",
      difficulty: "Beginner",
      topics: ["Community Management", "Leadership", "Social Skills"]
    }
  }
];

const seedBlogPosts = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established for seeding.");

    // Get the first user as the author (assuming we have users)
    const author = await User.findOne();
    if (!author) {
      logger.error("No users found. Please create users first.");
      return;
    }

    // Check if blog posts already exist
    const existingPosts = await Blog.count();
    if (existingPosts > 0) {
      logger.info("Blog posts already exist. Skipping seeding.");
      return;
    }

    // Create blog posts
    for (const postData of sampleBlogPosts) {
      await Blog.create({
        ...postData,
        authorId: author.id,
      });
    }

    logger.info(`Successfully seeded ${sampleBlogPosts.length} blog posts.`);
  } catch (error) {
    logger.error("Error seeding blog posts:", error);
    throw error;
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedBlogPosts()
    .then(() => {
      logger.info("Blog seeding completed successfully.");
      process.exit(0);
    })
    .catch((error) => {
      logger.error("Blog seeding failed:", error);
      process.exit(1);
    });
}

module.exports = { seedBlogPosts };

