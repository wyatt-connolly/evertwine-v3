#!/bin/bash

# 🚀 Evertwine Production Deployment Script
# This script securely deploys the application to AWS ECS

set -e  # Exit on any error

echo "🚀 Starting Evertwine Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if AWS CLI is configured
print_status "Checking AWS CLI configuration..."
if ! aws sts get-caller-identity &> /dev/null; then
    print_error "AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION="us-west-2"
ECR_REPO_BACKEND="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/evertwine-backend"
ECR_REPO_FRONTEND="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/evertwine-frontend"

print_success "AWS CLI configured for account: $AWS_ACCOUNT_ID in region: $AWS_REGION"

# Step 1: Build Docker images
print_status "Building Docker images for production..."

# Build backend
print_status "Building backend image..."
docker buildx build --platform linux/amd64 -t evertwine-v3-backend:prod -f backend/Dockerfile backend/

# Build frontend
print_status "Building frontend image..."
docker buildx build --platform linux/amd64 -t evertwine-v3-frontend:prod -f frontend/Dockerfile frontend/

print_success "Docker images built successfully"

# Step 2: Login to ECR
print_status "Logging into Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

print_success "Logged into ECR successfully"

# Step 3: Tag and push images
print_status "Tagging and pushing images to ECR..."

# Tag backend image
docker tag evertwine-v3-backend:prod $ECR_REPO_BACKEND:latest
docker tag evertwine-v3-backend:prod $ECR_REPO_BACKEND:$(date +%Y%m%d-%H%M%S)

# Tag frontend image
docker tag evertwine-v3-frontend:prod $ECR_REPO_FRONTEND:latest
docker tag evertwine-v3-frontend:prod $ECR_REPO_FRONTEND:$(date +%Y%m%d-%H%M%S)

# Push backend image
print_status "Pushing backend image..."
docker push $ECR_REPO_BACKEND:latest
docker push $ECR_REPO_BACKEND:$(date +%Y%m%d-%H%M%S)

# Push frontend image
print_status "Pushing frontend image..."
docker push $ECR_REPO_FRONTEND:latest
docker push $ECR_REPO_FRONTEND:$(date +%Y%m%d-%H%M%S)

print_success "Images pushed to ECR successfully"

# Step 4: Update ECS services
print_status "Updating ECS services..."

# Update backend service
print_status "Updating backend service..."
aws ecs update-service \
    --cluster evertwine-cluster \
    --service evertwine-backend-service \
    --force-new-deployment \
    --region $AWS_REGION

# Update frontend service
print_status "Updating frontend service..."
aws ecs update-service \
    --cluster evertwine-cluster \
    --service evertwine-frontend-service \
    --force-new-deployment \
    --region $AWS_REGION

print_success "ECS services updated successfully"

# Step 5: Wait for deployment to complete
print_status "Waiting for deployment to complete..."
aws ecs wait services-stable \
    --cluster evertwine-cluster \
    --services evertwine-backend-service evertwine-frontend-service \
    --region $AWS_REGION

print_success "Deployment completed successfully!"

# Step 6: Check deployment status
print_status "Checking deployment status..."

# Get service status
BACKEND_STATUS=$(aws ecs describe-services \
    --cluster evertwine-cluster \
    --services evertwine-backend-service \
    --query 'services[0].status' \
    --output text \
    --region $AWS_REGION)

FRONTEND_STATUS=$(aws ecs describe-services \
    --cluster evertwine-cluster \
    --services evertwine-frontend-service \
    --query 'services[0].status' \
    --output text \
    --region $AWS_REGION)

print_status "Backend service status: $BACKEND_STATUS"
print_status "Frontend service status: $FRONTEND_STATUS"

# Step 7: Test the deployment
print_status "Testing deployment..."

# Wait a moment for services to be fully ready
sleep 30

# Test health endpoint
HEALTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" https://evertwine-alb-650798781.us-west-2.elb.amazonaws.com/health || echo "000")

if [ "$HEALTH_RESPONSE" = "200" ]; then
    print_success "Health check passed! Application is running."
else
    print_warning "Health check returned status: $HEALTH_RESPONSE"
    print_status "This might be normal if the service is still starting up."
fi

# Final status
print_success "🎉 Deployment completed!"
echo ""
echo "📋 Deployment Summary:"
echo "   • Backend: $ECR_REPO_BACKEND:latest"
echo "   • Frontend: $ECR_REPO_FRONTEND:latest"
echo "   • Load Balancer: https://evertwine-alb-650798781.us-west-2.elb.amazonaws.com"
echo "   • Health Check: https://evertwine-alb-650798781.us-west-2.elb.amazonaws.com/health"
echo ""
echo "🔍 Monitor your deployment:"
echo "   • ECS Console: https://console.aws.amazon.com/ecs/home?region=us-west-2#/clusters/evertwine-cluster"
echo "   • CloudWatch Logs: https://console.aws.amazon.com/cloudwatch/home?region=us-west-2#logsV2:log-groups/log-group/ecs/evertwine-app"
echo ""
print_success "Your application is now deployed to production! 🚀"
