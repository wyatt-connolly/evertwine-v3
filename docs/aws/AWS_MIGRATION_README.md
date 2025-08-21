# AWS Blog API Migration Guide

This guide will help you migrate your blog data from the local backend to AWS and update your frontend to use AWS services.

## 🎯 Overview

We're migrating from:

- **Local Backend**: Express.js + PostgreSQL (localhost:3001)
- **To AWS**: Lambda + DynamoDB + API Gateway

## 📋 Prerequisites

1. **AWS Account**: You need an active AWS account
2. **AWS CLI**: Install and configure AWS CLI
3. **Node.js**: Version 18 or higher
4. **jq**: For JSON parsing in scripts

### Install AWS CLI

```bash
# macOS
brew install awscli

# Ubuntu/Debian
sudo apt-get install awscli

# Windows
# Download from https://aws.amazon.com/cli/
```

### Configure AWS CLI

```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter your preferred region (e.g., us-east-1)
# Enter your preferred output format (json)
```

## 🚀 Quick Start

### 1. Run the Migration Script

```bash
# Make the script executable
chmod +x deploy-aws-blog.sh

# Run the deployment
./deploy-aws-blog.sh
```

This script will:

- ✅ Create DynamoDB table
- ✅ Migrate blog data from local backend
- ✅ Create Lambda function
- ✅ Set up API Gateway
- ✅ Update frontend environment
- ✅ Test the API

### 2. Update Frontend to Use AWS

Replace the existing blog service with the AWS version:

```typescript
// In your components, replace:
import { getBlogPosts, getBlogPostBySlug } from "../lib/blog-service";

// With:
import { getBlogPosts, getBlogPostBySlug } from "../lib/aws-blog-service";
```

## 📁 File Structure

```
├── aws-blog-migration.js          # Data migration script
├── aws-lambda-blog-api.js         # Lambda function code
├── aws-api-gateway-config.json    # API Gateway configuration
├── deploy-aws-blog.sh             # Deployment script
├── frontend/
│   └── lib/
│       ├── blog-service.ts        # Original local service
│       └── aws-blog-service.ts    # New AWS service
└── AWS_MIGRATION_README.md        # This file
```

## 🔧 Manual Setup (Alternative)

If you prefer to set up AWS services manually:

### 1. Create DynamoDB Table

```bash
aws dynamodb create-table \
    --table-name evertwine-blog-posts \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
        AttributeName=slug,AttributeType=S \
        AttributeName=status,AttributeType=S \
        AttributeName=category,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
        AttributeName=slug,KeyType=RANGE \
    --global-secondary-indexes \
        IndexName=StatusIndex,KeySchema=[{AttributeName=status,KeyType=HASH},{AttributeName=publishedAt,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
        IndexName=CategoryIndex,KeySchema=[{AttributeName=category,KeyType=HASH},{AttributeName=publishedAt,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

### 2. Migrate Data

```bash
node aws-blog-migration.js
```

### 3. Create Lambda Function

```bash
# Create deployment package
zip -r lambda-deployment.zip aws-lambda-blog-api.js node_modules/

# Create Lambda function
aws lambda create-function \
    --function-name evertwine-blog-api \
    --runtime nodejs18.x \
    --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \
    --handler aws-lambda-blog-api.handler \
    --zip-file fileb://lambda-deployment.zip \
    --timeout 30 \
    --memory-size 256
```

### 4. Create API Gateway

Use the AWS Console or import the `aws-api-gateway-config.json` file.

## 🔍 Testing

### Test AWS API

```bash
# Health check
curl https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/health

# Get all blog posts
curl https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/api/blog

# Get specific blog post
curl https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/api/blog/building-meaningful-connections-digital-age

# Get categories
curl https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/api/blog/categories

# Get tags
curl https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/api/blog/tags
```

### Test Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` and check the browser console for AWS API logs.

## 🔄 API Endpoints

| Endpoint               | Method | Description                                    |
| ---------------------- | ------ | ---------------------------------------------- |
| `/health`              | GET    | Health check                                   |
| `/api/blog`            | GET    | Get all blog posts (with pagination/filtering) |
| `/api/blog/featured`   | GET    | Get featured blog posts                        |
| `/api/blog/categories` | GET    | Get all categories                             |
| `/api/blog/tags`       | GET    | Get all tags                                   |
| `/api/blog/{slug}`     | GET    | Get blog post by slug                          |

### Query Parameters for `/api/blog`

- `page`: Page number (default: 1)
- `limit`: Posts per page (default: 10)
- `category`: Filter by category
- `tag`: Filter by tag
- `search`: Search in title, content, excerpt

## 💰 Cost Estimation

**DynamoDB** (us-east-1):

- Storage: ~1KB per blog post = ~$0.25/month for 1000 posts
- Read/Write: ~$1.25/month for 1M requests

**Lambda**:

- ~$0.20/month for 1M requests

**API Gateway**:

- ~$3.50/month for 1M requests

**Total**: ~$5/month for moderate usage

## 🛠️ Troubleshooting

### Common Issues

1. **AWS Credentials Not Configured**

   ```bash
   aws configure
   ```

2. **Lambda Execution Role Missing**

   ```bash
   # Create IAM role for Lambda
   aws iam create-role \
       --role-name lambda-execution-role \
       --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}'

   # Attach policies
   aws iam attach-role-policy \
       --role-name lambda-execution-role \
       --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

   aws iam attach-role-policy \
       --role-name lambda-execution-role \
       --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess
   ```

3. **CORS Issues**

   - The Lambda function includes CORS headers
   - Check browser console for CORS errors

4. **API Gateway Not Responding**
   - Check Lambda function logs in CloudWatch
   - Verify API Gateway integration

### Debug Commands

```bash
# Check Lambda logs
aws logs describe-log-groups --log-group-name-prefix /aws/lambda/evertwine-blog-api

# Test Lambda function directly
aws lambda invoke \
    --function-name evertwine-blog-api \
    --payload '{"httpMethod":"GET","path":"/health"}' \
    response.json

# Check DynamoDB table
aws dynamodb scan --table-name evertwine-blog-posts --limit 5
```

## 🔄 Rollback Plan

If you need to rollback to the local backend:

1. **Update frontend environment**:

   ```bash
   # In frontend/.env.local
   NEXT_PUBLIC_API_URL=http://localhost:3001
   # Comment out or remove NEXT_PUBLIC_AWS_API_URL
   ```

2. **Update imports**:

   ```typescript
   // Change back to local service
   import { getBlogPosts, getBlogPostBySlug } from "../lib/blog-service";
   ```

3. **Restart local backend**:
   ```bash
   cd backend
   npm start
   ```

## 📊 Monitoring

### AWS CloudWatch

- Lambda function metrics
- API Gateway metrics
- DynamoDB metrics

### Custom Monitoring

Add logging to track API usage:

```typescript
// In aws-blog-service.ts
console.log(`🌐 AWS API request: ${endpoint}`);
```

## 🚀 Production Considerations

1. **Custom Domain**: Set up a custom domain for API Gateway
2. **Caching**: Add CloudFront for caching
3. **Rate Limiting**: Configure API Gateway throttling
4. **Monitoring**: Set up CloudWatch alarms
5. **Backup**: Enable DynamoDB point-in-time recovery

## 📞 Support

If you encounter issues:

1. Check AWS CloudWatch logs
2. Verify AWS credentials and permissions
3. Test API endpoints directly
4. Check browser console for frontend errors

---

**Happy migrating! 🎉**
