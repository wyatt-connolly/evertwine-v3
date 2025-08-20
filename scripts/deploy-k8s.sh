#!/bin/bash

# Kubernetes Deployment Script for Evertwine DevOps Environment
# This script deploys the entire application stack to Kubernetes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
NAMESPACE="evertwine"
CONTEXT=""
ECR_REGISTRY=""
AWS_REGION="us-west-2"

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
    echo -e "${PURPLE} Evertwine Kubernetes Deployment${NC}"
    echo -e "${PURPLE}========================================${NC}"
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check kubectl
    if ! command -v kubectl &> /dev/null; then
        print_error "kubectl is not installed. Please install kubectl."
        exit 1
    fi
    
    # Check AWS CLI
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install AWS CLI."
        exit 1
    fi
    
    # Check Helm (optional but recommended)
    if ! command -v helm &> /dev/null; then
        print_warning "Helm is not installed. Some features may not be available."
    fi
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker."
        exit 1
    fi
    
    print_success "Prerequisites check completed"
}

# Function to check cluster connectivity
check_cluster() {
    print_status "Checking Kubernetes cluster connectivity..."
    
    if ! kubectl cluster-info &> /dev/null; then
        print_error "Cannot connect to Kubernetes cluster. Please check your kubeconfig."
        exit 1
    fi
    
    # Show cluster info
    print_status "Cluster information:"
    kubectl cluster-info
    
    print_success "Connected to Kubernetes cluster"
}

# Function to build and push Docker images
build_and_push_images() {
    print_status "Building and pushing Docker images..."
    
    # Get ECR login
    print_status "Logging into ECR..."
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY
    
    # Build backend image
    print_status "Building backend image..."
    docker build -t $ECR_REGISTRY/evertwine/backend:latest -f backend/Dockerfile backend/
    docker push $ECR_REGISTRY/evertwine/backend:latest
    
    # Build frontend image
    print_status "Building frontend image..."
    docker build -t $ECR_REGISTRY/evertwine/frontend:latest -f frontend/Dockerfile frontend/
    docker push $ECR_REGISTRY/evertwine/frontend:latest
    
    print_success "Images built and pushed successfully"
}

# Function to create namespace and basic resources
create_namespace() {
    print_status "Creating namespace and basic resources..."
    
    kubectl apply -f k8s/namespace.yaml
    
    print_success "Namespace created"
}

# Function to create secrets
create_secrets() {
    print_status "Creating secrets..."
    
    # Check if secrets already exist
    if kubectl get secret evertwine-secrets -n $NAMESPACE &> /dev/null; then
        print_warning "Secrets already exist. Skipping creation."
        print_warning "To update secrets, delete them first: kubectl delete secret evertwine-secrets -n $NAMESPACE"
        return
    fi
    
    # In production, you should use tools like AWS Secrets Manager, HashiCorp Vault, etc.
    print_warning "Creating secrets with default values. Please update them for production!"
    
    kubectl apply -f k8s/secrets.yaml
    
    print_success "Secrets created"
}

# Function to create ConfigMaps
create_configmaps() {
    print_status "Creating ConfigMaps..."
    
    kubectl apply -f k8s/configmap.yaml
    
    print_success "ConfigMaps created"
}

# Function to deploy databases
deploy_databases() {
    print_status "Deploying databases..."
    
    # Deploy PostgreSQL
    print_status "Deploying PostgreSQL..."
    kubectl apply -f k8s/postgres.yaml
    
    # Deploy Redis
    print_status "Deploying Redis..."
    kubectl apply -f k8s/redis.yaml
    
    # Wait for databases to be ready
    print_status "Waiting for databases to be ready..."
    kubectl wait --for=condition=available --timeout=300s deployment/postgres -n $NAMESPACE
    kubectl wait --for=condition=available --timeout=300s deployment/redis -n $NAMESPACE
    
    print_success "Databases deployed successfully"
}

# Function to deploy applications
deploy_applications() {
    print_status "Deploying applications..."
    
    # Update image references in manifests
    if [ ! -z "$ECR_REGISTRY" ]; then
        print_status "Updating image references..."
        sed -i.bak "s|evertwine/backend:latest|$ECR_REGISTRY/evertwine/backend:latest|g" k8s/backend.yaml
        sed -i.bak "s|evertwine/frontend:latest|$ECR_REGISTRY/evertwine/frontend:latest|g" k8s/frontend.yaml
    fi
    
    # Deploy backend
    print_status "Deploying backend..."
    kubectl apply -f k8s/backend.yaml
    
    # Deploy frontend
    print_status "Deploying frontend..."
    kubectl apply -f k8s/frontend.yaml
    
    # Wait for applications to be ready
    print_status "Waiting for applications to be ready..."
    kubectl wait --for=condition=available --timeout=300s deployment/backend -n $NAMESPACE
    kubectl wait --for=condition=available --timeout=300s deployment/frontend -n $NAMESPACE
    
    print_success "Applications deployed successfully"
}

# Function to deploy ingress
deploy_ingress() {
    print_status "Deploying ingress..."
    
    # Check if AWS Load Balancer Controller is installed
    if ! kubectl get deployment aws-load-balancer-controller -n kube-system &> /dev/null; then
        print_warning "AWS Load Balancer Controller not found. Please install it first."
        print_warning "See: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html"
    fi
    
    kubectl apply -f k8s/ingress.yaml
    
    print_success "Ingress deployed successfully"
}

# Function to deploy monitoring
deploy_monitoring() {
    print_status "Deploying monitoring stack..."
    
    kubectl apply -f k8s/monitoring.yaml
    
    # Wait for monitoring to be ready
    print_status "Waiting for monitoring stack to be ready..."
    kubectl wait --for=condition=available --timeout=300s deployment/prometheus -n $NAMESPACE
    kubectl wait --for=condition=available --timeout=300s deployment/grafana -n $NAMESPACE
    
    print_success "Monitoring stack deployed successfully"
}

# Function to check deployment status
check_deployment_status() {
    print_status "Checking deployment status..."
    
    echo -e "\n${CYAN}Pods:${NC}"
    kubectl get pods -n $NAMESPACE
    
    echo -e "\n${CYAN}Services:${NC}"
    kubectl get services -n $NAMESPACE
    
    echo -e "\n${CYAN}Ingresses:${NC}"
    kubectl get ingress -n $NAMESPACE
    
    echo -e "\n${CYAN}Persistent Volume Claims:${NC}"
    kubectl get pvc -n $NAMESPACE
    
    echo -e "\n${CYAN}Horizontal Pod Autoscalers:${NC}"
    kubectl get hpa -n $NAMESPACE
    
    print_success "Deployment status check completed"
}

# Function to show access information
show_access_info() {
    print_header
    echo -e "${CYAN}🚀 Evertwine Kubernetes Deployment Complete!${NC}"
    echo ""
    
    # Get LoadBalancer addresses
    FRONTEND_LB=$(kubectl get ingress evertwine-ingress -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null || echo "Pending...")
    
    echo -e "${YELLOW}Application URLs:${NC}"
    echo "  Frontend:    https://$FRONTEND_LB"
    echo "  API:         https://$FRONTEND_LB/api"
    echo ""
    
    echo -e "${YELLOW}Monitoring (Port Forward Required):${NC}"
    echo "  Prometheus:  kubectl port-forward svc/prometheus 9090:9090 -n $NAMESPACE"
    echo "  Grafana:     kubectl port-forward svc/grafana 3000:3000 -n $NAMESPACE"
    echo ""
    
    echo -e "${YELLOW}Useful Commands:${NC}"
    echo "  View pods:         kubectl get pods -n $NAMESPACE"
    echo "  View logs:         kubectl logs -f deployment/backend -n $NAMESPACE"
    echo "  Scale deployment:  kubectl scale deployment backend --replicas=5 -n $NAMESPACE"
    echo "  Delete deployment: kubectl delete namespace $NAMESPACE"
    echo "  Port forward:      kubectl port-forward svc/SERVICE PORT:PORT -n $NAMESPACE"
    echo ""
    
    print_success "Deployment information displayed! 🎉"
}

# Function to clean up deployment
cleanup() {
    print_status "Cleaning up deployment..."
    
    read -p "Are you sure you want to delete the entire $NAMESPACE namespace? (y/N): " confirm
    if [[ $confirm == [yY] ]]; then
        kubectl delete namespace $NAMESPACE
        print_success "Deployment cleaned up"
    else
        print_status "Cleanup cancelled"
    fi
}

# Function to show menu
show_menu() {
    echo ""
    echo -e "${CYAN}Kubernetes Deployment Options:${NC}"
    echo "1. Full deployment (recommended)"
    echo "2. Deploy infrastructure only (databases, configs)"
    echo "3. Deploy applications only (backend, frontend)"
    echo "4. Deploy monitoring only"
    echo "5. Check deployment status"
    echo "6. Build and push images"
    echo "7. Show access information"
    echo "8. Clean up deployment"
    echo "9. Exit"
    echo ""
    read -p "Enter your choice (1-9): " choice
    
    case $choice in
        1)
            full_deployment
            ;;
        2)
            deploy_infrastructure
            ;;
        3)
            deploy_applications
            ;;
        4)
            deploy_monitoring
            ;;
        5)
            check_deployment_status
            ;;
        6)
            build_and_push_images
            ;;
        7)
            show_access_info
            ;;
        8)
            cleanup
            ;;
        9)
            echo "Goodbye!"
            exit 0
            ;;
        *)
            print_error "Invalid choice"
            show_menu
            ;;
    esac
}

# Function for full deployment
full_deployment() {
    print_header
    check_prerequisites
    check_cluster
    create_namespace
    create_secrets
    create_configmaps
    deploy_databases
    deploy_applications
    deploy_ingress
    deploy_monitoring
    sleep 10
    check_deployment_status
    show_access_info
}

# Function for infrastructure deployment
deploy_infrastructure() {
    print_status "Deploying infrastructure..."
    create_namespace
    create_secrets
    create_configmaps
    deploy_databases
    print_success "Infrastructure deployment completed"
}

# Parse command line arguments
parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            --context)
                CONTEXT="$2"
                shift 2
                ;;
            --ecr-registry)
                ECR_REGISTRY="$2"
                shift 2
                ;;
            --aws-region)
                AWS_REGION="$2"
                shift 2
                ;;
            --namespace)
                NAMESPACE="$2"
                shift 2
                ;;
            *)
                echo "Unknown option $1"
                exit 1
                ;;
        esac
    done
    
    # Set kubectl context if provided
    if [ ! -z "$CONTEXT" ]; then
        kubectl config use-context $CONTEXT
    fi
}

# Main execution
if [ $# -eq 0 ]; then
    # Interactive mode
    show_menu
else
    # Command line mode
    parse_args "$@"
    
    case $1 in
        "deploy"|"up")
            full_deployment
            ;;
        "infrastructure"|"infra")
            deploy_infrastructure
            ;;
        "apps"|"applications")
            deploy_applications
            ;;
        "monitoring"|"monitor")
            deploy_monitoring
            ;;
        "status")
            check_deployment_status
            ;;
        "build")
            build_and_push_images
            ;;
        "clean"|"cleanup")
            cleanup
            ;;
        *)
            echo "Usage: $0 [deploy|infra|apps|monitoring|status|build|clean] [options]"
            echo ""
            echo "Commands:"
            echo "  deploy      - Full deployment"
            echo "  infra       - Deploy infrastructure only"
            echo "  apps        - Deploy applications only"
            echo "  monitoring  - Deploy monitoring only"
            echo "  status      - Check deployment status"
            echo "  build       - Build and push images"
            echo "  clean       - Clean up deployment"
            echo ""
            echo "Options:"
            echo "  --context CONTEXT         - Kubernetes context to use"
            echo "  --ecr-registry REGISTRY   - ECR registry URL"
            echo "  --aws-region REGION       - AWS region (default: us-west-2)"
            echo "  --namespace NAMESPACE     - Kubernetes namespace (default: evertwine)"
            echo ""
            echo "Examples:"
            echo "  $0 deploy --ecr-registry 123456789.dkr.ecr.us-west-2.amazonaws.com"
            echo "  $0 status --namespace evertwine-prod"
            echo ""
            echo "Run without arguments for interactive menu"
            ;;
    esac
fi
