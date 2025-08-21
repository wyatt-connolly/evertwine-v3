# Terraform variables for Evertwine development environment

aws_region = "us-west-2"
environment = "development"
project_name = "evertwine"

# Database configuration
db_password = "your-secure-password-here"  # Change this to a secure password
db_instance_class = "db.t3.micro"
db_allocated_storage = 20

# Redis configuration
redis_node_type = "cache.t3.micro"

# Application configuration
app_cpu = 256
app_memory = 512
app_desired_count = 1

# VPC configuration
vpc_cidr = "10.0.0.0/16"
availability_zones = ["us-west-2a", "us-west-2b"]
public_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24"]
private_subnet_cidrs = ["10.0.11.0/24", "10.0.12.0/24"]

# Security
jwt_secret = "your-super-secret-jwt-key-change-in-production"
certificate_arn = ""  # Leave empty for development
