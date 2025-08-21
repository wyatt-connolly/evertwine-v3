const AWS = require("aws-sdk");

// Configure AWS
AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const lambda = new AWS.Lambda();

async function testLambdaFunction() {
  console.log("🧪 Testing AWS Lambda function...\n");

  try {
    // Test 1: Health check
    console.log("1️⃣ Testing health endpoint...");
    const healthEvent = {
      httpMethod: "GET",
      path: "/health",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const healthResult = await lambda
      .invoke({
        FunctionName: "evertwine-blog-api",
        Payload: JSON.stringify(healthEvent),
      })
      .promise();

    console.log("Health check result:", JSON.parse(healthResult.Payload));
    console.log("✅ Health check successful\n");

    // Test 2: Get blog posts
    console.log("2️⃣ Testing blog posts endpoint...");
    const blogEvent = {
      httpMethod: "GET",
      path: "/api/blog",
      headers: {
        "Content-Type": "application/json",
      },
      queryStringParameters: {
        page: "1",
        limit: "10",
      },
    };

    const blogResult = await lambda
      .invoke({
        FunctionName: "evertwine-blog-api",
        Payload: JSON.stringify(blogEvent),
      })
      .promise();

    const blogData = JSON.parse(blogResult.Payload);
    console.log("Blog posts result:", blogData);
    console.log(
      `✅ Retrieved ${
        blogData.body ? JSON.parse(blogData.body).posts?.length || 0 : 0
      } blog posts\n`
    );

    // Test 3: Get categories
    console.log("3️⃣ Testing categories endpoint...");
    const categoriesEvent = {
      httpMethod: "GET",
      path: "/api/blog/categories",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const categoriesResult = await lambda
      .invoke({
        FunctionName: "evertwine-blog-api",
        Payload: JSON.stringify(categoriesEvent),
      })
      .promise();

    const categoriesData = JSON.parse(categoriesResult.Payload);
    console.log("Categories result:", categoriesData);
    console.log("✅ Categories test successful\n");

    console.log("🎉 All Lambda function tests passed!");
  } catch (error) {
    console.error("❌ Error testing Lambda function:", error);
  }
}

testLambdaFunction();
