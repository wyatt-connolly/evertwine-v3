const AWS = require("aws-sdk");

// Configure AWS
AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const apigateway = new AWS.APIGateway();
const lambda = new AWS.Lambda();

async function setupApiGateway() {
  console.log("🔧 Setting up API Gateway integration...\n");

  try {
    // Get the existing API
    const apis = await apigateway.getRestApis().promise();
    const api = apis.items.find((a) => a.name === "evertwine-blog-api");

    if (!api) {
      console.log("❌ API Gateway not found. Creating new API...");
      return;
    }

    console.log(`✅ Found API: ${api.name} (${api.id})`);

    // Get resources
    const resources = await apigateway
      .getResources({ restApiId: api.id })
      .promise();
    console.log(
      "📋 Available resources:",
      resources.items.map((r) => ({ id: r.id, path: r.path }))
    );

    // Find the root resource
    const rootResource = resources.items.find((r) => r.path === "/");
    if (!rootResource) {
      console.log("❌ Root resource not found");
      return;
    }

    // Create /api resource
    console.log("🔧 Creating /api resource...");
    const apiResource = await apigateway
      .createResource({
        restApiId: api.id,
        parentId: rootResource.id,
        pathPart: "api",
      })
      .promise();

    // Create /api/blog resource
    console.log("🔧 Creating /api/blog resource...");
    const blogResource = await apigateway
      .createResource({
        restApiId: api.id,
        parentId: apiResource.id,
        pathPart: "blog",
      })
      .promise();

    // Create GET method for /api/blog
    console.log("🔧 Creating GET method for /api/blog...");
    await apigateway
      .putMethod({
        restApiId: api.id,
        resourceId: blogResource.id,
        httpMethod: "GET",
        authorizationType: "NONE",
      })
      .promise();

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

    console.log("✅ API Gateway setup complete!");
    console.log(
      `🌐 API URL: https://${api.id}.execute-api.us-east-1.amazonaws.com/prod/api/blog`
    );
  } catch (error) {
    console.error("❌ Error setting up API Gateway:", error.message);
  }
}

setupApiGateway();
