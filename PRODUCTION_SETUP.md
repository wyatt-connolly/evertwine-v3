# 🚀 Production Setup Guide

## ✅ **Infrastructure Status**

Your AWS infrastructure is **successfully deployed** with the following components:

### **🌐 Load Balancer**

- **URL**: `https://evertwine-alb-650798781.us-west-2.elb.amazonaws.com`
- **Status**: ✅ Active
- **Region**: us-west-2

### **🗄️ Database (RDS PostgreSQL)**

- **Endpoint**: `evertwine-db.czwiog2wcwu2.us-west-2.rds.amazonaws.com:5432`
- **Database**: `evertwine_db`
- **Status**: ✅ Active

### **⚡ Cache (ElastiCache Redis)**

- **Endpoint**: `master.evertwine-redis.vwv4sk.usw2.cache.amazonaws.com:6379`
- **Status**: ✅ Active

### **🐳 Container Orchestration (ECS)**

- **Cluster**: `evertwine-cluster`
- **Status**: ✅ Active

---

## 🔧 **Next Steps for Production Deployment**

### **1. Update Environment Variables**

#### **Backend Production Environment**

File: `backend/env.production`

```bash
# Update these values with your actual production credentials:
DB_PASSWORD=your-actual-secure-password
JWT_SECRET=your-actual-jwt-secret
SESSION_SECRET=your-actual-session-secret
SMTP_USER=your-actual-email@gmail.com
SMTP_PASS=your-actual-app-password
AWS_ACCESS_KEY_ID=your-actual-access-key
AWS_SECRET_ACCESS_KEY=your-actual-secret-key
```

#### **Frontend Production Environment**

File: `frontend/env.production`

```bash
# Update these values:
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### **2. Set Up Domain and SSL Certificate**

#### **Option A: Custom Domain (Recommended)**

1. **Register a domain** (e.g., `evertwine.com`)
2. **Create SSL Certificate** in AWS Certificate Manager
3. **Update DNS** to point to the load balancer
4. **Update environment variables** with your domain

#### **Option B: Use Load Balancer URL**

- **Current URL**: `https://evertwine-alb-650798781.us-west-2.elb.amazonaws.com`
- **Update frontend**: `NEXT_PUBLIC_API_URL=https://evertwine-alb-650798781.us-west-2.elb.amazonaws.com`

### **3. Deploy Application**

#### **Using GitHub Actions (Recommended)**

1. **Push to production branch**:

   ```bash
   git checkout -b production
   git add .
   git commit -m "Production deployment"
   git push origin production
   ```

2. **Update CI/CD workflow** to deploy on production branch:
   - Edit `.github/workflows/ci-cd.yml`
   - Add `production` to the branches list

#### **Manual Deployment**

1. **Build and push Docker images**:

   ```bash
   # Build for production
   docker buildx build --platform linux/amd64 -t evertwine-v3-backend:prod -f backend/Dockerfile backend/
   docker buildx build --platform linux/amd64 -t evertwine-v3-frontend:prod -f frontend/Dockerfile frontend/

   # Push to ECR
   aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 851675948386.dkr.ecr.us-west-2.amazonaws.com
   docker tag evertwine-v3-backend:prod 851675948386.dkr.ecr.us-west-2.amazonaws.com/evertwine-backend:latest
   docker tag evertwine-v3-frontend:prod 851675948386.dkr.ecr.us-west-2.amazonaws.com/evertwine-frontend:latest
   docker push 851675948386.dkr.ecr.us-west-2.amazonaws.com/evertwine-backend:latest
   docker push 851675948386.dkr.ecr.us-west-2.amazonaws.com/evertwine-frontend:latest
   ```

2. **Update ECS services** with new task definitions

### **4. Database Setup**

#### **Run Migrations**

```bash
# Connect to the production database
psql -h evertwine-db.czwiog2wcwu2.us-west-2.rds.amazonaws.com -U postgres -d evertwine_db

# Run your database migrations
# (This depends on your migration system)
```

#### **Seed Data (if needed)**

```bash
# Run seed scripts for production data
npm run seed:production
```

### **5. Monitoring and Logging**

#### **CloudWatch Monitoring**

- **Logs**: Available in CloudWatch Log Groups
- **Metrics**: ECS, RDS, and ALB metrics are automatically collected
- **Alarms**: Set up CloudWatch alarms for critical metrics

#### **Application Monitoring**

- **Health Checks**: `/health` endpoint is configured
- **Error Tracking**: Set up Sentry for error monitoring
- **Performance**: Enable application performance monitoring

### **6. Security Hardening**

#### **Environment Variables**

- ✅ **Use AWS Secrets Manager** for sensitive data
- ✅ **Rotate credentials** regularly
- ✅ **Use IAM roles** instead of access keys where possible

#### **Network Security**

- ✅ **Security Groups** are configured
- ✅ **VPC** is properly isolated
- ✅ **HTTPS** is enabled on load balancer

#### **Application Security**

- ✅ **CORS** is configured
- ✅ **Rate limiting** is enabled
- ✅ **Input validation** is implemented

---

## 🎯 **Quick Start Commands**

### **Deploy to Production**

```bash
# 1. Update environment variables
cp backend/env.production backend/.env
cp frontend/env.production frontend/.env.local

# 2. Build and push images
docker buildx build --platform linux/amd64 -t evertwine-v3-backend:prod -f backend/Dockerfile backend/
docker buildx build --platform linux/amd64 -t evertwine-v3-frontend:prod -f frontend/Dockerfile frontend/

# 3. Push to ECR
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 851675948386.dkr.ecr.us-west-2.amazonaws.com
docker tag evertwine-v3-backend:prod 851675948386.dkr.ecr.us-west-2.amazonaws.com/evertwine-backend:latest
docker tag evertwine-v3-frontend:prod 851675948386.dkr.ecr.us-west-2.amazonaws.com/evertwine-frontend:latest
docker push 851675948386.dkr.ecr.us-west-2.amazonaws.com/evertwine-backend:latest
docker push 851675948386.dkr.ecr.us-west-2.amazonaws.com/evertwine-frontend:latest

# 4. Update ECS services
aws ecs update-service --cluster evertwine-cluster --service evertwine-service --force-new-deployment
```

### **Check Deployment Status**

```bash
# Check ECS service status
aws ecs describe-services --cluster evertwine-cluster --services evertwine-service

# Check load balancer health
aws elbv2 describe-target-health --target-group-arn arn:aws:elasticloadbalancing:us-west-2:851675948386:targetgroup/evertwine-tg/e197fe8c54ad061d

# Check application health
curl https://evertwine-alb-650798781.us-west-2.elb.amazonaws.com/health
```

---

## 🔍 **Troubleshooting**

### **Common Issues**

1. **ECS Service Not Starting**

   - Check task definition logs
   - Verify environment variables
   - Check security group rules

2. **Database Connection Issues**

   - Verify RDS security group allows ECS traffic
   - Check database credentials
   - Ensure database is accessible from VPC

3. **Load Balancer Health Check Failing**
   - Verify application is responding on `/health`
   - Check security group rules
   - Ensure target group is configured correctly

### **Useful Commands**

```bash
# View ECS logs
aws logs tail /ecs/evertwine-app --follow

# Check RDS status
aws rds describe-db-instances --db-instance-identifier evertwine-db

# Check Redis status
aws elasticache describe-replication-groups --replication-group-id evertwine-redis
```

---

## 📞 **Support**

If you encounter issues:

1. **Check CloudWatch logs** for detailed error messages
2. **Review security group rules** for connectivity issues
3. **Verify environment variables** are correctly set
4. **Check AWS service limits** and quotas

---

## 🎉 **Success!**

Your production infrastructure is ready! The next step is to:

1. **Update the environment variables** with your actual credentials
2. **Deploy your application** using the CI/CD pipeline or manual deployment
3. **Set up monitoring** and alerts
4. **Configure your domain** (optional but recommended)

**Your application will be available at**: `https://evertwine-alb-650798781.us-west-2.elb.amazonaws.com`
