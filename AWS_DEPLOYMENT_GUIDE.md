# 🚀 AWS Deployment Guide for Evertwine

## **Current Status:**

✅ Docker containers running locally  
✅ AWS CLI configured and connected  
✅ Terraform infrastructure code ready

---

## **🎯 Deployment Options (Choose One)**

### **Option 1: AWS App Runner (Easiest)**

Deploy your frontend and backend as separate services.

### **Option 2: AWS ECS with Fargate (Recommended)**

Deploy your entire Docker Compose stack to AWS.

### **Option 3: AWS EKS (Advanced)**

Use your existing Kubernetes configurations.

---

## **🚀 Option 1: AWS App Runner (Quick Start)**

### **Step 1: Push Images to ECR**

```bash
# Create ECR repositories
aws ecr create-repository --repository-name evertwine-frontend --region us-west-2
aws ecr create-repository --repository-name evertwine-backend --region us-west-2

# Get login token
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 851675948386.dkr.ecr.us-west-2.amazonaws.com

# Tag and push images
docker tag evertwine-v3-frontend:latest 851675948386.dkr.ecr.us-west-2.amazonaws.com/evertwine-frontend:latest
docker tag evertwine-v3-backend:latest 851675948386.dkr.ecr.us-west-2.amazonaws.com/evertwine-backend:latest

docker push 851675948386.dkr.ecr.us-west-2.amazonaws.com/evertwine-frontend:latest
docker push 851675948386.dkr.ecr.us-west-2.amazonaws.com/evertwine-backend:latest
```

### **Step 2: Deploy to App Runner**

```bash
# Deploy backend
aws apprunner create-service \
  --service-name evertwine-backend \
  --source-configuration '{
    "ImageRepository": {
      "ImageIdentifier": "851675948386.dkr.ecr.us-west-2.amazonaws.com/evertwine-backend:latest",
      "ImageRepositoryType": "ECR"
    }
  }' \
  --instance-configuration '{
    "Cpu": "256",
    "Memory": "512"
  }' \
  --region us-west-2
```

---

## **🚀 Option 2: AWS ECS with Fargate (Recommended)**

### **Step 1: Create ECS Task Definition**

```bash
# Create task definition for your application
aws ecs register-task-definition \
  --family evertwine-app \
  --network-mode awsvpc \
  --requires-compatibilities FARGATE \
  --cpu 512 \
  --memory 1024 \
  --execution-role-arn arn:aws:iam::851675948386:role/ecsTaskExecutionRole \
  --container-definitions '[
    {
      "name": "backend",
      "image": "evertwine-v3-backend:latest",
      "portMappings": [{"containerPort": 3001}],
      "environment": [
        {"name": "NODE_ENV", "value": "production"},
        {"name": "PORT", "value": "3001"}
      ]
    },
    {
      "name": "frontend",
      "image": "evertwine-v3-frontend:latest",
      "portMappings": [{"containerPort": 3000}],
      "environment": [
        {"name": "NODE_ENV", "value": "production"}
      ]
    }
  ]'
```

### **Step 2: Create ECS Service**

```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name evertwine-cluster

# Create service
aws ecs create-service \
  --cluster evertwine-cluster \
  --service-name evertwine-service \
  --task-definition evertwine-app:1 \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration '{
    "awsvpcConfiguration": {
      "subnets": ["subnet-xxxxx", "subnet-yyyyy"],
      "securityGroups": ["sg-xxxxx"],
      "assignPublicIp": "ENABLED"
    }
  }'
```

---

## **🚀 Option 3: Use Terraform (Advanced)**

### **Step 1: Fix and Deploy Infrastructure**

```bash
cd infrastructure/terraform

# Update the certificate_arn in terraform.tfvars
# Set it to empty string for development

# Plan and apply
terraform plan
terraform apply
```

### **Step 2: Deploy to EKS**

```bash
# Get EKS cluster credentials
aws eks update-kubeconfig --region us-west-2 --name evertwine-cluster

# Deploy Kubernetes resources
kubectl apply -f k8s/
```

---

## **🎯 Recommended Next Steps**

### **For Learning/Development:**

1. **Start with Option 1 (App Runner)** - Quickest to get running
2. **Use AWS Console** to visualize your resources
3. **Set up monitoring** with CloudWatch

### **For Production:**

1. **Use Option 2 (ECS)** - More control and scalability
2. **Set up CI/CD** with GitHub Actions
3. **Configure monitoring** and alerting

---

## **🔧 Quick AWS Console Setup**

### **Step 1: Access AWS Console**

1. Go to https://console.aws.amazon.com
2. Sign in with your account (851675948386)
3. Navigate to the service you want to use

### **Step 2: Key Services to Explore**

- **ECR**: Container Registry (for your Docker images)
- **ECS**: Container Orchestration
- **App Runner**: Simple container deployment
- **RDS**: Managed PostgreSQL database
- **ElastiCache**: Managed Redis
- **CloudWatch**: Monitoring and logging

---

## **💰 Cost Estimation (Development)**

### **Monthly Costs (us-west-2):**

- **App Runner**: ~$15-30/month
- **ECS Fargate**: ~$20-40/month
- **RDS (t3.micro)**: ~$15/month
- **ElastiCache (t3.micro)**: ~$15/month
- **Total**: ~$50-100/month for development

### **Free Tier:**

- **ECR**: 500MB storage free
- **ECS**: 750 hours/month free
- **RDS**: 750 hours/month free

---

## **🎉 Success Checklist**

- [ ] Choose deployment option
- [ ] Push Docker images to ECR
- [ ] Deploy application to AWS
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring
- [ ] Test application in production
- [ ] Set up CI/CD pipeline

---

**Ready to deploy? Choose your option and let's get your application running in the cloud! 🚀**
