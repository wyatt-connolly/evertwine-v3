const AWS = require("aws-sdk");

// Configure AWS
AWS.config.update({
  region: "us-west-1", // US West (N. California)
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "evertwine-blog-posts";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Requested-With",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Credentials": "false",
  "Access-Control-Max-Age": "86400",
};

// Helper function to create response
function createResponse(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}

// Get all published blog posts
async function getBlogPosts(event) {
  try {
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: "#status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": "published",
      },
    };

    const result = await dynamodb.scan(params).promise();

    // Parse query parameters
    const queryParams = event.queryStringParameters || {};
    let posts = result.Items;

    // Sort by publishedAt (newest first)
    posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    // Apply filters
    if (queryParams.category) {
      posts = posts.filter((post) => post.category === queryParams.category);
    }

    if (queryParams.tag) {
      posts = posts.filter(
        (post) => post.tags && post.tags.includes(queryParams.tag)
      );
    }

    if (queryParams.search) {
      const searchTerm = queryParams.search.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm)
      );
    }

    // Pagination
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    return createResponse(200, {
      posts: paginatedPosts,
      total: posts.length,
      page,
      totalPages: Math.ceil(posts.length / limit),
      hasNext: endIndex < posts.length,
      hasPrev: page > 1,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return createResponse(500, { error: "Internal server error" });
  }
}

// Get featured blog posts
async function getFeaturedPosts() {
  try {
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: "#status = :status AND #isFeatured = :isFeatured",
      ExpressionAttributeNames: {
        "#status": "status",
        "#isFeatured": "isFeatured",
      },
      ExpressionAttributeValues: {
        ":status": "published",
        ":isFeatured": true,
      },
    };

    const result = await dynamodb.scan(params).promise();
    return createResponse(200, result.Items);
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return createResponse(500, { error: "Internal server error" });
  }
}

// Get a single blog post by slug
async function getBlogPostBySlug(slug) {
  try {
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: "#slug = :slug AND #status = :status",
      ExpressionAttributeNames: {
        "#slug": "slug",
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":slug": slug,
        ":status": "published",
      },
    };

    const result = await dynamodb.scan(params).promise();

    if (result.Items.length === 0) {
      return createResponse(404, { error: "Blog post not found" });
    }

    // Increment view count (you might want to implement this differently)
    const post = result.Items[0];
    post.viewCount = (post.viewCount || 0) + 1;

    // Update the view count in DynamoDB
    await dynamodb
      .put({
        TableName: TABLE_NAME,
        Item: post,
      })
      .promise();

    return createResponse(200, post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return createResponse(500, { error: "Internal server error" });
  }
}

// Get blog categories
async function getBlogCategories() {
  try {
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: "#status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": "published",
      },
    };

    const result = await dynamodb.scan(params).promise();
    const categories = [...new Set(result.Items.map((post) => post.category))];
    return createResponse(200, categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return createResponse(500, { error: "Internal server error" });
  }
}

// Get blog tags
async function getBlogTags() {
  try {
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: "#status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": "published",
      },
    };

    const result = await dynamodb.scan(params).promise();
    const allTags = result.Items.flatMap((post) => post.tags || []);
    const uniqueTags = [...new Set(allTags)];
    return createResponse(200, uniqueTags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return createResponse(500, { error: "Internal server error" });
  }
}

// Health check endpoint
function healthCheck() {
  return createResponse(200, {
    status: "healthy",
    message: "Blog API is running",
  });
}

// Main Lambda handler
exports.handler = async (event) => {
  console.log("Event:", JSON.stringify(event, null, 2));

  const { httpMethod, path, pathParameters, queryStringParameters } = event;

  try {
    // Handle CORS preflight requests
    if (httpMethod === "OPTIONS") {
      return createResponse(200, {});
    }

    // Route handling
    if (httpMethod === "GET") {
      if (path === "/health") {
        return healthCheck();
      }

      if (path === "/api/blog") {
        return await getBlogPosts(event);
      }

      if (path === "/api/blog/featured") {
        return await getFeaturedPosts();
      }

      if (path === "/api/blog/categories") {
        return await getBlogCategories();
      }

      if (path === "/api/blog/tags") {
        return await getBlogTags();
      }

      // Handle individual blog post by slug
      if (pathParameters && pathParameters.slug) {
        return await getBlogPostBySlug(pathParameters.slug);
      }
    }

    return createResponse(404, { error: "Route not found" });
  } catch (error) {
    console.error("Lambda handler error:", error);
    return createResponse(500, { error: "Internal server error" });
  }
};
