const AWS = require("aws-sdk");

// Configure AWS
AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const apigateway = new AWS.APIGateway();
const lambda = new AWS.Lambda();

async function createApiMethod() {
  console.log("🔧 Creating API Gateway method and integration...\n");

  try {
    // Get the existing API
    const apis = await apigateway.getRestApis().promise();
    const api = apis.items.find((a) => a.name === "evertwine-blog-api");

    if (!api) {
      console.log("❌ API Gateway not found");
      return;
    }

    console.log(`✅ Found API: ${api.name} (${api.id})`);

    // Get resources
    const resources = await apigateway
      .getResources({ restApiId: api.id })
      .promise();
    const blogResource = resources.items.find((r) => r.path === "/api/blog");

    if (!blogResource) {
      console.log("❌ /api/blog resource not found");
      return;
    }

    console.log(`✅ Found /api/blog resource: ${blogResource.id}`);

    // Create GET method
    console.log("🔧 Creating GET method...");
    await apigateway
      .putMethod({
        restApiId: api.id,
        resourceId: blogResource.id,
        httpMethod: "GET",
        authorizationType: "NONE",
      })
      .promise();
    console.log("✅ GET method created");

    // Set up Lambda integration
    console.log("🔧 Setting up Lambda integration...");
    await apigateway
      .putIntegration({
        restApiId: api.id,
        resourceId: blogResource.id,
        httpMethod: "GET",
        type: "AWS_PROXY",
        integrationHttpMethod: "POST",
        uri: `arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:851675948386:function:evertwine-blog-api/invocations`,
      })
      .promise();
    console.log("✅ Lambda integration created");

    // Add Lambda permission
    console.log("🔧 Adding Lambda permission...");
    try {
      await lambda
        .addPermission({
          FunctionName: "evertwine-blog-api",
          StatementId: "apigateway-invoke",
          Action: "lambda:InvokeFunction",
          Principal: "apigateway.amazonaws.com",
          SourceArn: `arn:aws:execute-api:us-east-1:851675948386:${api.id}/*/*`,
        })
        .promise();
      console.log("✅ Lambda permission added");
    } catch (error) {
      if (error.code === "ResourceConflictException") {
        console.log("ℹ️ Lambda permission already exists");
      } else {
        console.error("❌ Error adding Lambda permission:", error.message);
      }
    }

    // Deploy the API
    console.log("🔧 Deploying API...");
    await apigateway
      .createDeployment({
        restApiId: api.id,
        stageName: "prod",
      })
      .promise();
    console.log("✅ API deployed");

    console.log("✅ API Gateway setup complete!");
    console.log(
      `🌐 API URL: https://${api.id}.execute-api.us-east-1.amazonaws.com/prod/api/blog`
    );

    // Test the API
    console.log("\n🧪 Testing the API...");
    const https = require("https");
    const url = `https://${api.id}.execute-api.us-east-1.amazonaws.com/prod/api/blog`;

    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const response = JSON.parse(data);
            console.log("✅ API Response:", response);
            console.log(
              `📊 Number of posts: ${
                response.posts ? response.posts.length : 0
              }`
            );
          } catch (error) {
            console.log("❌ Error parsing response:", data);
          }
        });
      })
      .on("error", (error) => {
        console.error("❌ Error testing API:", error.message);
      });
  } catch (error) {
    console.error("❌ Error creating API method:", error.message);
  }
}

createApiMethod();
