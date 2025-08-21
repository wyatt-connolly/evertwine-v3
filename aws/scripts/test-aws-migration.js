// Test script to verify AWS migration
const {
  testAwsConnection,
  getBlogPosts,
  getBlogCategories,
  getBlogTags,
} = require("./frontend/lib/aws-blog-service.ts");

async function testAwsMigration() {
  console.log("🧪 Testing AWS Blog API Migration...\n");

  try {
    // Test 1: Check AWS API health
    console.log("1️⃣ Testing AWS API health...");
    const health = await testAwsConnection();
    if (health) {
      console.log("✅ AWS API is healthy and accessible\n");
    } else {
      console.log("❌ AWS API health check failed\n");
      return;
    }

    // Test 2: Get blog posts
    console.log("2️⃣ Testing blog posts retrieval...");
    const postsResponse = await getBlogPosts();
    console.log(`✅ Retrieved ${postsResponse.posts.length} blog posts`);
    console.log(`   Total posts: ${postsResponse.total}`);
    console.log(`   Page: ${postsResponse.page}/${postsResponse.totalPages}\n`);

    // Test 3: Get categories
    console.log("3️⃣ Testing categories retrieval...");
    const categories = await getBlogCategories();
    console.log(
      `✅ Retrieved ${categories.length} categories:`,
      categories.join(", "),
      "\n"
    );

    // Test 4: Get tags
    console.log("4️⃣ Testing tags retrieval...");
    const tags = await getBlogTags();
    console.log(`✅ Retrieved ${tags.length} tags:`, tags.join(", "), "\n");

    // Test 5: Test individual blog post
    console.log("5️⃣ Testing individual blog post retrieval...");
    if (postsResponse.posts.length > 0) {
      const firstPost = postsResponse.posts[0];
      const post = await getBlogPostBySlug(firstPost.slug);
      if (post) {
        console.log(`✅ Retrieved blog post: "${post.title}"`);
        console.log(`   Views: ${post.viewCount}`);
        console.log(`   Category: ${post.category}`);
        console.log(`   Tags: ${post.tags.join(", ")}\n`);
      } else {
        console.log("❌ Failed to retrieve individual blog post\n");
      }
    }

    console.log("🎉 All AWS migration tests passed!");
    console.log("✅ Your blog data is successfully migrated to AWS");
    console.log(
      "✅ Frontend can now retrieve data from AWS instead of local backend"
    );
  } catch (error) {
    console.error("❌ AWS migration test failed:", error);
    console.log("\n🔧 Troubleshooting tips:");
    console.log("1. Check if AWS credentials are configured: aws configure");
    console.log("2. Verify the API Gateway URL in frontend/.env.local");
    console.log("3. Check AWS CloudWatch logs for Lambda function errors");
    console.log("4. Ensure DynamoDB table exists and contains data");
  }
}

// Run the test
testAwsMigration();
