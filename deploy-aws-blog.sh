#!/bin/bash

# AWS Blog API Deployment Script
# This script sets up the AWS infrastructure and migrates blog data

set -e

echo "🚀 Starting AWS Blog API deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials are not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

# Configuration
REGION="us-east-1"
TABLE_NAME="evertwine-blog-posts"
LAMBDA_FUNCTION_NAME="evertwine-blog-api"
API_GATEWAY_NAME="evertwine-blog-api"

echo -e "${BLUE}📋 Configuration:${NC}"
echo "  Region: $REGION"
echo "  DynamoDB Table: $TABLE_NAME"
echo "  Lambda Function: $LAMBDA_FUNCTION_NAME"
echo "  API Gateway: $API_GATEWAY_NAME"

# Step 1: Install dependencies
echo -e "\n${YELLOW}📦 Installing dependencies...${NC}"
npm install aws-sdk

# Step 2: Create DynamoDB table and migrate data
echo -e "\n${YELLOW}🗄️ Creating DynamoDB table and migrating data...${NC}"
node aws-blog-migration.js

# Step 3: Create Lambda function
echo -e "\n${YELLOW}⚡ Creating Lambda function...${NC}"

# Create deployment package
echo "Creating deployment package..."
zip -r lambda-deployment.zip aws-lambda-blog-api.js node_modules/

# Create Lambda function
aws lambda create-function \
    --function-name $LAMBDA_FUNCTION_NAME \
    --runtime nodejs18.x \
    --role arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/lambda-execution-role \
    --handler aws-lambda-blog-api.handler \
    --zip-file fileb://lambda-deployment.zip \
    --region $REGION \
    --timeout 30 \
    --memory-size 256 \
    --environment Variables="{TABLE_NAME=$TABLE_NAME}" \
    || echo "Lambda function already exists, updating..."

# Update Lambda function if it already exists
aws lambda update-function-code \
    --function-name $LAMBDA_FUNCTION_NAME \
    --zip-file fileb://lambda-deployment.zip \
    --region $REGION

# Step 4: Create API Gateway
echo -e "\n${YELLOW}🌐 Creating API Gateway...${NC}"

# Create REST API
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

# Step 5: Deploy API
echo -e "\n${YELLOW}🚀 Deploying API...${NC}"

# Create deployment
aws apigateway create-deployment \
    --rest-api-id $API_ID \
    --stage-name prod \
    --region $REGION

# Get API Gateway URL
API_URL="https://$API_ID.execute-api.$REGION.amazonaws.com/prod"

echo -e "\n${GREEN}✅ AWS Blog API deployment completed!${NC}"
echo -e "${BLUE}🌐 API Gateway URL: $API_URL${NC}"

# Step 6: Update frontend environment
echo -e "\n${YELLOW}🔧 Updating frontend environment...${NC}"

# Create .env.local with AWS API URL
cat > frontend/.env.local << EOF
# AWS API Configuration
NEXT_PUBLIC_AWS_API_URL=$API_URL

# Keep existing local backend URL as fallback
NEXT_PUBLIC_API_URL=http://localhost:3001
EOF

echo -e "${GREEN}✅ Frontend environment updated!${NC}"

# Step 7: Test the API
echo -e "\n${YELLOW}🧪 Testing AWS API...${NC}"

# Test health endpoint
echo "Testing health endpoint..."
curl -s "$API_URL/health" | jq .

# Test blog posts endpoint
echo "Testing blog posts endpoint..."
curl -s "$API_URL/api/blog" | jq '.posts | length'

echo -e "\n${GREEN}🎉 AWS Blog API is ready!${NC}"
echo -e "${BLUE}📝 Next steps:${NC}"
echo "  1. Update your frontend to use the new AWS blog service"
echo "  2. Test the blog functionality"
echo "  3. Monitor the API usage in AWS Console"

# Cleanup
rm -f lambda-deployment.zip

echo -e "\n${GREEN}✅ Deployment script completed successfully!${NC}"
