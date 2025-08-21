# AWS Database Setup Guide for Evertwine

This guide will help you connect your blog posts to an AWS RDS PostgreSQL database.

## Prerequisites

1. **AWS Account**: You need an active AWS account
2. **AWS CLI**: Install and configure AWS CLI
3. **Node.js**: Ensure Node.js is installed in your backend
4. **PostgreSQL Client**: Optional, for direct database access

## Step 1: Install and Configure AWS CLI

### Install AWS CLI
```bash
# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Windows
# Download from https://aws.amazon.com/cli/
```

### Configure AWS CLI
```bash
aws configure
```

Enter your:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., us-east-1)
- Default output format (json)

## Step 2: Create AWS RDS PostgreSQL Instance

### Option A: Using AWS Console (Recommended for beginners)

1. **Go to AWS RDS Console**
   - Navigate to https://console.aws.amazon.com/rds/
   - Click "Create database"

2. **Choose Configuration**
   - Choose "Standard create"
   - Engine type: PostgreSQL
   - Version: 14.7 (or latest)
   - Template: Free tier (for development)

3. **Database Settings**
   - DB instance identifier: `evertwine-db`
   - Master username: `evertwine_user`
   - Master password: `[create a strong password]`

4. **Instance Configuration**
   - DB instance class: `db.t3.micro` (free tier)
   - Storage: 20 GB
   - Storage type: General Purpose SSD (gp2)

5. **Connectivity**
   - VPC: Default VPC
   - Public access: Yes (for development)
   - VPC security group: Create new
   - Availability Zone: No preference
   - Database port: 5432

6. **Additional Configuration**
   - Initial database name: `evertwine_production`
   - Backup retention: 7 days
   - Enable encryption: Yes

7. **Create Database**
   - Click "Create database"
   - Wait 5-10 minutes for creation

### Option B: Using AWS CLI

```bash
# Create RDS instance
aws rds create-db-instance \
    --db-instance-identifier evertwine-db \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --engine-version 14.7 \
    --master-username evertwine_user \
    --master-user-password YOUR_STRONG_PASSWORD \
    --allocated-storage 20 \
    --storage-type gp2 \
    --db-name evertwine_production \
    --backup-retention-period 7 \
    --storage-encrypted \
    --region us-east-1
```

## Step 3: Configure Security Groups

1. **Find your RDS instance**
   - Go to RDS Console
   - Click on your database instance
   - Note the VPC Security Group

2. **Configure Security Group**
   - Go to EC2 Console → Security Groups
   - Find your RDS security group
   - Add inbound rule:
     - Type: PostgreSQL
     - Port: 5432
     - Source: Your IP address (for development) or 0.0.0.0/0 (not recommended for production)

## Step 4: Get Database Endpoint

1. **From AWS Console**
   - Go to RDS Console
   - Click on your database instance
   - Copy the "Endpoint" (e.g., `evertwine-db.abc123.us-east-1.rds.amazonaws.com`)

2. **From AWS CLI**
```bash
aws rds describe-db-instances \
    --db-instance-identifier evertwine-db \
    --query 'DBInstances[0].Endpoint.Address' \
    --output text
```

## Step 5: Update Environment Configuration

1. **Create/Update backend/.env file**
```bash
cd backend
cp env.example .env
```

2. **Edit backend/.env with AWS database settings**
```env
# Application Configuration
NODE_ENV=production
PORT=3001

# AWS RDS Database Configuration
DB_HOST=your-rds-endpoint.region.rds.amazonaws.com
DB_PORT=5432
DB_NAME=evertwine_production
DB_USER=evertwine_user
DB_PASSWORD=your-strong-password

# Redis Configuration (local for now)
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@evertwine.com

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Logging
LOG_LEVEL=debug

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Monitoring
ENABLE_METRICS=true
METRICS_PORT=9090

# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

## Step 6: Test Database Connection

1. **Install dependencies**
```bash
cd backend
npm install
```

2. **Test connection**
```bash
node -e "
require('dotenv').config();
const { testConnection } = require('./src/config/database');
testConnection()
    .then(() => {
        console.log('✅ Database connection successful!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    });
"
```

## Step 7: Run Database Migrations

1. **Sync database models**
```bash
node -e "
require('dotenv').config();
const { sequelize } = require('./src/config/database');
const { User, Blog } = require('./src/models');

sequelize.sync({ force: false })
    .then(() => {
        console.log('✅ Database models synchronized successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Database sync failed:', err.message);
        process.exit(1);
    });
"
```

## Step 8: Seed Database with Sample Data

1. **Create a test user first** (if you don't have one)
```bash
node -e "
require('dotenv').config();
const { User } = require('./src/models');
const bcrypt = require('bcryptjs');

User.create({
    email: 'admin@evertwine.com',
    password: bcrypt.hashSync('password123', 12),
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true,
    isEmailVerified: true
}).then(() => {
    console.log('✅ Test user created');
    process.exit(0);
}).catch(err => {
    console.error('❌ User creation failed:', err.message);
    process.exit(1);
});
"
```

2. **Seed blog posts**
```bash
node src/config/seed-blog-posts.js
```

## Step 9: Test the API

1. **Start the backend server**
```bash
npm run dev
```

2. **Test blog endpoints**
```bash
# Get all blog posts
curl http://localhost:3001/api/blog

# Get a specific blog post
curl http://localhost:3001/api/blog/building-meaningful-connections-digital-age

# Get featured posts
curl http://localhost:3001/api/blog/featured
```

## Step 10: Update Frontend (if needed)

The frontend should automatically work with the new database since we've updated the blog routes to use the database instead of mock data.

## Troubleshooting

### Common Issues

1. **Connection Timeout**
   - Check if RDS instance is running
   - Verify security group allows your IP
   - Ensure database endpoint is correct

2. **Authentication Failed**
   - Verify username and password
   - Check if database exists
   - Ensure user has proper permissions

3. **SSL Connection Issues**
   - For development, SSL is disabled by default
   - For production, ensure SSL certificates are properly configured

4. **Database Not Found**
   - Verify database name in .env file
   - Check if database was created during RDS setup

### Useful Commands

```bash
# Check RDS instance status
aws rds describe-db-instances --db-instance-identifier evertwine-db

# Get connection details
aws rds describe-db-instances \
    --db-instance-identifier evertwine-db \
    --query 'DBInstances[0].{Endpoint:Endpoint.Address,Port:Endpoint.Port,Status:DBInstanceStatus}'

# Test connection with psql (if installed)
psql -h your-endpoint -U evertwine_user -d evertwine_production
```

## Next Steps

1. **Set up ElastiCache for Redis** (for caching)
2. **Configure AWS Secrets Manager** (for secure credential management)
3. **Set up automated backups**
4. **Configure monitoring and alerting**
5. **Deploy to production environment**

## Security Best Practices

1. **Never commit .env files** to version control
2. **Use strong passwords** for database access
3. **Restrict security group access** to specific IPs
4. **Enable encryption** for data at rest and in transit
5. **Regularly rotate credentials**
6. **Monitor database access logs**

## Cost Optimization

1. **Use appropriate instance sizes** for your workload
2. **Enable auto-scaling** for production workloads
3. **Use reserved instances** for predictable workloads
4. **Monitor and optimize storage usage**
5. **Consider Aurora Serverless** for variable workloads

---

**Note**: This setup is for development/testing. For production, consider using AWS Secrets Manager, proper VPC configuration, and enhanced security measures.

