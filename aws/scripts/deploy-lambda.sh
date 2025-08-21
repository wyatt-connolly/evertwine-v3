#!/bin/bash

echo "🚀 Deploying Lambda function and API Gateway..."

# Configuration
REGION="us-east-1"
LAMBDA_FUNCTION_NAME="evertwine-blog-api"
API_GATEWAY_NAME="evertwine-blog-api"

# Create deployment package
echo "📦 Creating deployment package..."
zip -r lambda-deployment.zip aws-lambda-blog-api.js node_modules/

# Create Lambda function
echo "⚡ Creating Lambda function..."
aws lambda create-function \
    --function-name $LAMBDA_FUNCTION_NAME \
    --runtime nodejs18.x \
    --role arn:aws:iam::851675948386:role/lambda-execution-role \
    --handler aws-lambda-blog-api.handler \
    --zip-file fileb://lambda-deployment.zip \
    --region $REGION \
    --timeout 30 \
    --memory-size 256 \
    --environment Variables="{TABLE_NAME=evertwine-blog-posts}" \
    || echo "Lambda function already exists, updating..."

# Update Lambda function if it already exists
aws lambda update-function-code \
    --function-name $LAMBDA_FUNCTION_NAME \
    --zip-file fileb://lambda-deployment.zip \
    --region $REGION

# Create API Gateway
echo "🌐 Creating API Gateway..."
API_ID=$(aws apigateway create-rest-api \
    --name $API_GATEWAY_NAME \
    --description "Evertwine Blog API" \
    --region $REGION \
    --query 'id' \
    --output text)

echo "API Gateway ID: $API_ID"

# Get root resource ID
ROOT_RESOURCE_ID=$(aws apigateway get-resources \
    --rest-api-id $API_ID \
    --region $REGION \
    --query 'items[?path==`/`].id' \
    --output text)

# Create API resources and methods
echo "Setting up API routes..."

# Health endpoint
aws apigateway create-resource \
    --rest-api-id $API_ID \
    --parent-id $ROOT_RESOURCE_ID \
    --path-part "health" \
    --region $REGION

HEALTH_RESOURCE_ID=$(aws apigateway get-resources \
    --rest-api-id $API_ID \
    --region $REGION \
    --query 'items[?path==`/health`].id' \
    --output text)

aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $HEALTH_RESOURCE_ID \
    --http-method GET \
    --authorization-type NONE \
    --region $REGION

# API resource
aws apigateway create-resource \
    --rest-api-id $API_ID \
    --parent-id $ROOT_RESOURCE_ID \
    --path-part "api" \
    --region $REGION

API_RESOURCE_ID=$(aws apigateway get-resources \
    --rest-api-id $API_ID \
    --region $REGION \
    --query 'items[?path==`/api`].id' \
    --output text)

# Blog resource
aws apigateway create-resource \
    --rest-api-id $API_ID \
    --parent-id $API_RESOURCE_ID \
    --path-part "blog" \
    --region $REGION

BLOG_RESOURCE_ID=$(aws apigateway get-resources \
    --rest-api-id $API_ID \
    --region $REGION \
    --query 'items[?path==`/api/blog`].id' \
    --output text)

# Blog slug resource
aws apigateway create-resource \
    --rest-api-id $API_ID \
    --parent-id $BLOG_RESOURCE_ID \
    --path-part "{slug}" \
    --region $REGION

BLOG_SLUG_RESOURCE_ID=$(aws apigateway get-resources \
    --rest-api-id $API_ID \
    --region $REGION \
    --query 'items[?path==`/api/blog/{slug}`].id' \
    --output text)

# Deploy API
echo "🚀 Deploying API..."
aws apigateway create-deployment \
    --rest-api-id $API_ID \
    --stage-name prod \
    --region $REGION

# Get API Gateway URL
API_URL="https://$API_ID.execute-api.$REGION.amazonaws.com/prod"

echo "✅ AWS Blog API deployment completed!"
echo "🌐 API Gateway URL: $API_URL"

# Update frontend environment
echo "🔧 Updating frontend environment..."
cat > frontend/.env.local << EOF
# AWS API Configuration
NEXT_PUBLIC_AWS_API_URL=$API_URL

# Keep existing local backend URL as fallback
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF

echo "✅ Frontend environment updated!"

# Test the API
echo "🧪 Testing AWS API..."
echo "Testing health endpoint..."
curl -s "$API_URL/health" | jq .

echo "Testing blog posts endpoint..."
curl -s "$API_URL/api/blog" | jq '.posts | length'

echo "🎉 AWS Blog API is ready!"
echo "📝 Next steps:"
echo "  1. Update your frontend to use the new AWS blog service"
echo "  2. Test the blog functionality"
echo "  3. Monitor the API usage in AWS Console"

# Cleanup
rm -f lambda-deployment.zip

echo "✅ Deployment script completed successfully!"
