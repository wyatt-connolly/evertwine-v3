// Custom functions for Artillery load testing

"use strict";

module.exports = {
  selectRandomPost,
  generateRandomUser,
  validateResponse,
  setupAuth,
};

// Select a random blog post slug from the blog listing
function selectRandomPost(requestParams, response, context, ee, next) {
  if (response.body) {
    try {
      const data = JSON.parse(response.body);
      if (data.posts && data.posts.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.posts.length);
        const selectedPost = data.posts[randomIndex];
        context.vars.postSlug = selectedPost.slug;
        console.log(
          `Selected post: ${selectedPost.title} (${selectedPost.slug})`
        );
      } else {
        context.vars.postSlug = "building-meaningful-connections-digital-age"; // fallback
      }
    } catch (error) {
      console.error("Error parsing blog response:", error);
      context.vars.postSlug = "building-meaningful-connections-digital-age"; // fallback
    }
  }
  return next();
}

// Generate random user data for testing
function generateRandomUser(context, next) {
  const firstNames = [
    "John",
    "Jane",
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
  ];

  context.vars.randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  context.vars.randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  context.vars.randomEmail = `test-${Date.now()}-${Math.random()
    .toString(36)
    .substring(7)}@example.com`;
  context.vars.randomPassword = "TestPassword123!";

  return next();
}

// Validate API responses
function validateResponse(requestParams, response, context, ee, next) {
  if (response.statusCode >= 400) {
    console.error(`Error response: ${response.statusCode} - ${response.body}`);
    ee.emit("error", `HTTP ${response.statusCode}`);
  }

  // Check response time
  const responseTime = response.timings.response;
  if (responseTime > 5000) {
    // 5 seconds
    console.warn(`Slow response: ${responseTime}ms for ${requestParams.url}`);
    ee.emit("slow_response", { url: requestParams.url, time: responseTime });
  }

  return next();
}

// Setup authentication for protected endpoints
function setupAuth(context, next) {
  // This function can be used to handle authentication setup
  // For now, we'll use a test token
  context.vars.testAuthToken = "test-token-for-load-testing";
  return next();
}
