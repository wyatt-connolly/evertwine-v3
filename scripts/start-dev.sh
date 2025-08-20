#!/bin/bash

# Evertwine DevOps Environment Startup Script
# This script sets up the complete development environment with Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
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

print_header() {
    echo -e "${PURPLE}========================================${NC}"
    echo -e "${PURPLE} Evertwine DevOps Environment Setup${NC}"
    echo -e "${PURPLE}========================================${NC}"
}

# Function to check if Docker is running
check_docker() {
    print_status "Checking Docker installation..."
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker Desktop."
        echo "Visit: https://docs.docker.com/desktop/"
        exit 1
    fi

    if ! docker info &> /dev/null; then
        print_error "Docker daemon is not running. Please start Docker Desktop."
        exit 1
    fi

    print_success "Docker is running"
}

# Function to check if Docker Compose is available
check_docker_compose() {
    print_status "Checking Docker Compose..."
    if ! command -v docker &> /dev/null || ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not available. Please update Docker Desktop."
        exit 1
    fi
    print_success "Docker Compose is available"
}

# Function to create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    directories=(
        "infrastructure/nginx/conf.d"
        "infrastructure/nginx/ssl"
        "monitoring/grafana/provisioning/datasources"
        "monitoring/grafana/provisioning/dashboards"
        "monitoring/grafana/dashboards"
        "backend/logs"
        "scripts"
    )
    
    for dir in "${directories[@]}"; do
        mkdir -p "$dir"
        echo "  ✓ Created $dir"
    done
    
    print_success "Directories created"
}

# Function to set up environment files
setup_env_files() {
    print_status "Setting up environment files..."
    
    # Backend .env
    if [ ! -f "backend/.env" ]; then
        print_status "Creating backend/.env from example..."
        cp "backend/.env.example" "backend/.env"
        print_success "Backend .env created"
    else
        print_warning "Backend .env already exists"
    fi
    
    # Frontend .env
    if [ ! -f "frontend/.env.local" ]; then
        print_status "Creating frontend/.env.local from example..."
        cp "frontend/.env.example" "frontend/.env.local"
        print_success "Frontend .env.local created"
    else
        print_warning "Frontend .env.local already exists"
    fi
}

# Function to build and start services
start_services() {
    print_status "Building and starting services..."
    
    # Stop any existing containers
    print_status "Stopping existing containers..."
    docker compose down 2>/dev/null || true
    
    # Build and start core services first
    print_status "Starting database services..."
    docker compose up -d postgres redis
    
    # Wait for databases to be ready
    print_status "Waiting for databases to be ready..."
    sleep 15
    
    # Start application services
    print_status "Starting application services..."
    docker compose up -d backend frontend
    
    # Wait for application services
    print_status "Waiting for application services..."
    sleep 10
    
    # Start monitoring services
    print_status "Starting monitoring services..."
    docker compose up -d prometheus grafana node_exporter
    
    # Start nginx last
    print_status "Starting nginx reverse proxy..."
    docker compose up -d nginx
    
    print_success "All services started"
}

# Function to check service health
check_health() {
    print_status "Checking service health..."
    
    services=("postgres" "redis" "backend" "frontend" "prometheus" "grafana")
    
    for service in "${services[@]}"; do
        if docker compose ps "$service" | grep -q "Up"; then
            echo "  ✓ $service is running"
        else
            echo "  ✗ $service is not running"
        fi
    done
}

# Function to display access information
show_access_info() {
    echo ""
    print_header
    echo -e "${CYAN}🚀 Evertwine DevOps Environment is Ready!${NC}"
    echo ""
    echo -e "${YELLOW}Application URLs:${NC}"
    echo "  Frontend:    http://localhost:3000"
    echo "  Backend API: http://localhost:3001"
    echo "  Nginx Proxy: http://localhost:80"
    echo ""
    echo -e "${YELLOW}Database URLs:${NC}"
    echo "  PostgreSQL:  localhost:5432 (user: postgres, password: password)"
    echo "  Redis:       localhost:6379 (password: redispassword)"
    echo ""
    echo -e "${YELLOW}Monitoring URLs:${NC}"
    echo "  Prometheus:  http://localhost:9090"
    echo "  Grafana:     http://localhost:3002 (admin:admin)"
    echo "  Node Exporter: http://localhost:9100"
    echo ""
    echo -e "${YELLOW}Health Checks:${NC}"
    echo "  Backend:     http://localhost:3001/health"
    echo "  Nginx:       http://localhost:80/nginx-health"
    echo ""
    echo -e "${YELLOW}Useful Commands:${NC}"
    echo "  View logs:   docker compose logs -f [service]"
    echo "  Stop all:    docker compose down"
    echo "  Restart:     docker compose restart [service]"
    echo "  Shell:       docker compose exec [service] sh"
    echo ""
    print_success "Setup complete! Happy DevOps practicing! 🎉"
}

# Function to show menu
show_menu() {
    echo ""
    echo -e "${CYAN}What would you like to do?${NC}"
    echo "1. Full setup (recommended for first time)"
    echo "2. Quick start (assumes setup is done)"
    echo "3. Stop all services"
    echo "4. View service status"
    echo "5. View logs"
    echo "6. Exit"
    echo ""
    read -p "Enter your choice (1-6): " choice
    
    case $choice in
        1)
            full_setup
            ;;
        2)
            quick_start
            ;;
        3)
            stop_services
            ;;
        4)
            docker compose ps
            ;;
        5)
            echo "Enter service name (or 'all' for all services):"
            read service
            if [ "$service" = "all" ]; then
                docker compose logs -f
            else
                docker compose logs -f "$service"
            fi
            ;;
        6)
            echo "Goodbye!"
            exit 0
            ;;
        *)
            print_error "Invalid choice"
            show_menu
            ;;
    esac
}

# Function for full setup
full_setup() {
    print_header
    check_docker
    check_docker_compose
    create_directories
    setup_env_files
    start_services
    sleep 5
    check_health
    show_access_info
}

# Function for quick start
quick_start() {
    print_status "Quick starting services..."
    docker compose up -d
    sleep 10
    check_health
    show_access_info
}

# Function to stop services
stop_services() {
    print_status "Stopping all services..."
    docker compose down
    print_success "All services stopped"
}

# Main execution
if [ $# -eq 0 ]; then
    # Interactive mode
    show_menu
else
    # Command line mode
    case $1 in
        "start"|"up")
            full_setup
            ;;
        "quick")
            quick_start
            ;;
        "stop"|"down")
            stop_services
            ;;
        "status")
            docker compose ps
            ;;
        "logs")
            docker compose logs -f
            ;;
        *)
            echo "Usage: $0 [start|quick|stop|status|logs]"
            echo "  start  - Full setup and start"
            echo "  quick  - Quick start (assumes setup done)"
            echo "  stop   - Stop all services"
            echo "  status - Show service status"
            echo "  logs   - Show service logs"
            echo ""
            echo "Run without arguments for interactive menu"
            ;;
    esac
fi
