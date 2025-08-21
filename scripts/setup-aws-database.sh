#!/bin/bash

# AWS Database Setup Script for Evertwine
# This script helps set up the AWS RDS database connection

set -e

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

# Check if AWS CLI is installed
check_aws_cli() {
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install it first:"
        echo "  https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
        exit 1
    fi
    print_success "AWS CLI is installed"
}

# Check if user is authenticated with AWS
check_aws_auth() {
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "You are not authenticated with AWS. Please run:"
        echo "  aws configure"
        exit 1
    fi
    print_success "AWS authentication verified"
}

# Create RDS instance
create_rds_instance() {
    local instance_name="evertwine-db"
    local db_name="evertwine_production"
    local username="evertwine_user"
    local password="$1"
    local region="$2"
    
    print_status "Creating RDS PostgreSQL instance..."
    
    # Create RDS instance
    aws rds create-db-instance \
        --db-instance-identifier "$instance_name" \
        --db-instance-class "db.t3.micro" \
        --engine "postgres" \
        --engine-version "14.7" \
        --master-username "$username" \
        --master-user-password "$password" \
        --allocated-storage 20 \
        --storage-type "gp2" \
        --db-name "$db_name" \
        --vpc-security-group-ids "sg-xxxxxxxxx" \
        --db-subnet-group-name "default" \
        --backup-retention-period 7 \
        --preferred-backup-window "03:00-04:00" \
        --preferred-maintenance-window "sun:04:00-sun:05:00" \
        --storage-encrypted \
        --region "$region" \
        --tags Key=Project,Value=evertwine Key=Environment,Value=production
    
    print_success "RDS instance creation initiated"
    print_warning "RDS instance creation can take 5-10 minutes. Please wait..."
}

# Get RDS endpoint
get_rds_endpoint() {
    local instance_name="$1"
    local region="$2"
    
    print_status "Getting RDS endpoint..."
    
    # Wait for RDS instance to be available
    aws rds wait db-instance-available \
        --db-instance-identifier "$instance_name" \
        --region "$region"
    
    # Get the endpoint
    local endpoint=$(aws rds describe-db-instances \
        --db-instance-identifier "$instance_name" \
        --region "$region" \
        --query 'DBInstances[0].Endpoint.Address' \
        --output text)
    
    print_success "RDS endpoint: $endpoint"
    echo "$endpoint"
}

# Create environment file
create_env_file() {
    local endpoint="$1"
    local username="$2"
    local password="$3"
    local region="$4"
    
    print_status "Creating .env file with AWS configuration..."
    
    cat > backend/.env << EOF
# Application Configuration
NODE_ENV=production
PORT=3001

# AWS RDS Database Configuration
DB_HOST=$endpoint
DB_PORT=5432
DB_NAME=evertwine_production
DB_USER=$username
DB_PASSWORD=$password

# AWS ElastiCache Configuration (to be configured)
# REDIS_URL=redis://your-elasticache-endpoint.$region.cache.amazonaws.com:6379

# JWT Configuration
JWT_SECRET=$(openssl rand -base64 32)

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@evertwine.com

# Frontend URL
FRONTEND_URL=https://your-domain.com

# Logging
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=$(openssl rand -base64 32)

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Monitoring
ENABLE_METRICS=true
METRICS_PORT=9090

# AWS Configuration
AWS_REGION=$region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
EOF

    print_success "Environment file created at backend/.env"
    print_warning "Please update the AWS credentials and other sensitive information in the .env file"
}

# Test database connection
test_connection() {
    print_status "Testing database connection..."
    
    cd backend
    
    # Install dependencies if not already installed
    if [ ! -d "node_modules" ]; then
        npm install
    fi
    
    # Test connection
    if node -e "
        require('dotenv').config();
        const { testConnection } = require('./src/config/database');
        testConnection()
            .then(() => {
                console.log('Database connection successful!');
                process.exit(0);
            })
            .catch(err => {
                console.error('Database connection failed:', err.message);
                process.exit(1);
            });
    "; then
        print_success "Database connection test passed"
    else
        print_error "Database connection test failed"
        exit 1
    fi
    
    cd ..
}

# Run database migrations
run_migrations() {
    print_status "Running database migrations..."
    
    cd backend
    
    # Sync database models
    if node -e "
        require('dotenv').config();
        const { sequelize } = require('./src/config/database');
        const { User, Blog } = require('./src/models');
        
        sequelize.sync({ force: false })
            .then(() => {
                console.log('Database models synchronized successfully!');
                process.exit(0);
            })
            .catch(err => {
                console.error('Database sync failed:', err.message);
                process.exit(1);
            });
    "; then
        print_success "Database migrations completed"
    else
        print_error "Database migrations failed"
        exit 1
    fi
    
    cd ..
}

# Seed database
seed_database() {
    print_status "Seeding database with sample data..."
    
    cd backend
    
    # Run seeding script
    if node src/config/seed-blog-posts.js; then
        print_success "Database seeding completed"
    else
        print_error "Database seeding failed"
        exit 1
    fi
    
    cd ..
}

# Main function
main() {
    echo "=========================================="
    echo "  AWS Database Setup for Evertwine"
    echo "=========================================="
    echo
    
    # Check prerequisites
    check_aws_cli
    check_aws_auth
    
    # Get user input
    read -p "Enter AWS region (e.g., us-east-1): " region
    read -s -p "Enter database password: " password
    echo
    read -p "Enter database username [evertwine_user]: " username
    username=${username:-evertwine_user}
    
    # Create RDS instance
    create_rds_instance "$password" "$region"
    
    # Get endpoint
    endpoint=$(get_rds_endpoint "evertwine-db" "$region")
    
    # Create environment file
    create_env_file "$endpoint" "$username" "$password" "$region"
    
    # Test connection
    test_connection
    
    # Run migrations
    run_migrations
    
    # Seed database
    seed_database
    
    echo
    echo "=========================================="
    print_success "AWS Database setup completed!"
    echo "=========================================="
    echo
    echo "Next steps:"
    echo "1. Update AWS credentials in backend/.env"
    echo "2. Configure ElastiCache for Redis"
    echo "3. Set up security groups and VPC"
    echo "4. Deploy your application"
    echo
    echo "Database endpoint: $endpoint"
    echo "Database name: evertwine_production"
    echo "Username: $username"
    echo
}

# Run main function
main "$@"

