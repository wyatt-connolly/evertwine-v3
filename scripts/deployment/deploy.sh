#!/bin/bash

# Evertwine Deployment Script
# This script handles deployment of the application to different environments

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
ENVIRONMENT=${1:-development}
ACTION=${2:-deploy}

# Load environment variables
source "$PROJECT_ROOT/.env.$ENVIRONMENT" 2>/dev/null || {
    echo -e "${RED}Error: .env.$ENVIRONMENT file not found${NC}"
    exit 1
}

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Validate environment
validate_environment() {
    log_info "Validating environment: $ENVIRONMENT"
    
    case $ENVIRONMENT in
        development|staging|production)
            log_success "Environment $ENVIRONMENT is valid"
            ;;
        *)
            log_error "Invalid environment: $ENVIRONMENT"
            log_error "Valid environments: development, staging, production"
            exit 1
            ;;
    esac
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed"
        exit 1
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed"
        exit 1
    fi
    
    # Check if Docker daemon is running
    if ! docker info &> /dev/null; then
        log_error "Docker daemon is not running"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Build Docker images
build_images() {
    log_info "Building Docker images..."
    
    cd "$PROJECT_ROOT"
    
    # Build backend
    log_info "Building backend image..."
    docker build -t evertwine-backend:latest ./backend
    
    # Build frontend
    log_info "Building frontend image..."
    docker build -t evertwine-frontend:latest ./frontend
    
    log_success "Docker images built successfully"
}

# Run database migrations
run_migrations() {
    log_info "Running database migrations..."
    
    cd "$PROJECT_ROOT"
    
    # Wait for database to be ready
    log_info "Waiting for database to be ready..."
    timeout 60 bash -c 'until docker-compose exec -T postgres pg_isready -U postgres; do sleep 2; done'
    
    # Run migrations
    docker-compose exec -T backend npm run migrate
    
    log_success "Database migrations completed"
}

# Deploy application
deploy_application() {
    log_info "Deploying application..."
    
    cd "$PROJECT_ROOT"
    
    # Stop existing containers
    log_info "Stopping existing containers..."
    docker-compose down --remove-orphans
    
    # Start services
    log_info "Starting services..."
    docker-compose up -d
    
    # Wait for services to be healthy
    log_info "Waiting for services to be healthy..."
    timeout 120 bash -c 'until docker-compose ps | grep -q "healthy"; do sleep 5; done'
    
    log_success "Application deployed successfully"
}

# Run health checks
run_health_checks() {
    log_info "Running health checks..."
    
    local health_checks=(
        "http://localhost:3001/health"
        "http://localhost:3000"
        "http://localhost:9090/-/healthy"
        "http://localhost:3002/api/health"
    )
    
    for check in "${health_checks[@]}"; do
        log_info "Checking: $check"
        if curl -f -s "$check" > /dev/null; then
            log_success "Health check passed: $check"
        else
            log_error "Health check failed: $check"
            return 1
        fi
    done
    
    log_success "All health checks passed"
}

# Backup database
backup_database() {
    log_info "Creating database backup..."
    
    local backup_dir="$PROJECT_ROOT/backups"
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_file="$backup_dir/backup_${ENVIRONMENT}_${timestamp}.sql"
    
    mkdir -p "$backup_dir"
    
    docker-compose exec -T postgres pg_dump -U postgres evertwine_db > "$backup_file"
    
    log_success "Database backup created: $backup_file"
}

# Rollback deployment
rollback_deployment() {
    log_warning "Rolling back deployment..."
    
    cd "$PROJECT_ROOT"
    
    # Stop current deployment
    docker-compose down
    
    # Restore from backup if available
    local latest_backup=$(ls -t "$PROJECT_ROOT/backups/backup_${ENVIRONMENT}_"*.sql 2>/dev/null | head -1)
    if [ -n "$latest_backup" ]; then
        log_info "Restoring from backup: $latest_backup"
        docker-compose up -d postgres
        sleep 10
        docker-compose exec -T postgres psql -U postgres -d evertwine_db < "$latest_backup"
    fi
    
    # Restart with previous version
    docker-compose up -d
    
    log_success "Rollback completed"
}

# Cleanup old resources
cleanup_resources() {
    log_info "Cleaning up old resources..."
    
    # Remove old Docker images
    docker image prune -f
    
    # Remove old containers
    docker container prune -f
    
    # Remove old volumes (be careful with this in production)
    if [ "$ENVIRONMENT" != "production" ]; then
        docker volume prune -f
    fi
    
    log_success "Cleanup completed"
}

# Main deployment function
main() {
    log_info "Starting deployment process..."
    log_info "Environment: $ENVIRONMENT"
    log_info "Action: $ACTION"
    
    case $ACTION in
        deploy)
            validate_environment
            check_prerequisites
            backup_database
            build_images
            deploy_application
            run_migrations
            run_health_checks
            cleanup_resources
            log_success "Deployment completed successfully!"
            ;;
        rollback)
            rollback_deployment
            run_health_checks
            log_success "Rollback completed successfully!"
            ;;
        health-check)
            run_health_checks
            ;;
        backup)
            backup_database
            ;;
        *)
            log_error "Invalid action: $ACTION"
            log_error "Valid actions: deploy, rollback, health-check, backup"
            exit 1
            ;;
    esac
}

# Handle script interruption
trap 'log_error "Deployment interrupted"; exit 1' INT TERM

# Run main function
main "$@"
