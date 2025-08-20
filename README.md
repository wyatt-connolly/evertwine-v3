# 🚀 Evertwine DevOps Practice Environment

> **A comprehensive full-stack application designed for maximum DevOps practice** - featuring modern web technologies, complete CI/CD pipelines, Kubernetes orchestration, AWS infrastructure, and comprehensive monitoring.

## 🎯 **What You'll Practice**

This project implements **ALL** major DevOps practices and tools mentioned in modern job descriptions:

### **🏗️ Infrastructure & Cloud**

- ✅ **AWS Services** (ECS, EKS, RDS, ElastiCache, ALB, VPC, IAM)
- ✅ **Terraform** Infrastructure as Code
- ✅ **Kubernetes** container orchestration with HPA
- ✅ **Docker** multi-stage builds and optimization

### **🔄 CI/CD & Automation**

- ✅ **GitHub Actions** comprehensive pipeline
- ✅ **Automated Testing** (Unit, Integration, E2E, Security, Performance)
- ✅ **Blue-Green Deployments** with rollback strategies
- ✅ **Vulnerability Scanning** (Trivy, CodeQL, Semgrep)

### **📊 Monitoring & Observability**

- ✅ **Prometheus + Grafana** metrics and dashboards
- ✅ **Distributed Logging** with Winston
- ✅ **Health Checks** and alerting
- ✅ **Performance Testing** with Artillery

### **🔒 Security & Best Practices**

- ✅ **Security Scanning** in CI/CD
- ✅ **Secrets Management** (AWS SSM, Kubernetes secrets)
- ✅ **Network Security** (VPC, Security Groups, Network Policies)
- ✅ **Container Security** (non-root users, minimal images)

---

## 🚀 **Quick Start Guide**

### **Option 1: Docker Compose (Fastest)**

```bash
git clone https://github.com/yourusername/evertwine-v3.git
cd evertwine-v3

# One-command setup with all services
./scripts/start-dev.sh

# Access the application
open http://localhost:3000          # Frontend
open http://localhost:3001/api/docs # API Documentation
open http://localhost:9090          # Prometheus
open http://localhost:3002          # Grafana (admin:admin)
```

**What this gives you:**

- ✅ Full-stack application running locally
- ✅ PostgreSQL and Redis databases
- ✅ Prometheus and Grafana monitoring
- ✅ Nginx reverse proxy
- ✅ All services networked and health-checked

### **Option 2: Kubernetes (Most Realistic)**

```bash
# Prerequisites: kubectl, AWS CLI, Docker
./scripts/deploy-k8s.sh

# Interactive menu will guide you through:
# 1. Building and pushing images to ECR
# 2. Deploying to Kubernetes
# 3. Setting up monitoring
# 4. Configuring ingress
```

### **Option 3: AWS Production Deployment**

```bash
cd infrastructure/terraform
terraform init
terraform plan
terraform apply

# Then deploy applications
./scripts/deploy-k8s.sh deploy --ecr-registry YOUR_ECR_REGISTRY
```

---

## 📊 **DevOps Features You'll Practice**

### **1. Container Orchestration**

**Docker Compose (Local Development):**

```yaml
services:
  frontend: # Next.js app
  backend: # Node.js API
  postgres: # Database with init scripts
  redis: # Cache with custom config
  prometheus: # Metrics collection
  grafana: # Visualization dashboards
  nginx: # Reverse proxy
  node_exporter: # System metrics
```

**Kubernetes (Production):**

```yaml
# Complete K8s setup with:
- Namespaces & ResourceQuotas
- ConfigMaps & Secrets
- Deployments with HPA
- Services & Ingress (ALB)
- PersistentVolumes
- NetworkPolicies
- ServiceMonitors
```

### **2. CI/CD Pipeline**

**Comprehensive GitHub Actions Pipeline:**

```yaml
Jobs: ✅ Security Scanning (Trivy, CodeQL, Semgrep)
  ✅ Backend Testing (Unit, Integration, Coverage)
  ✅ Frontend Testing (Unit, E2E, TypeScript)
  ✅ Infrastructure Validation (Terraform)
  ✅ Multi-platform Docker Builds
  ✅ Staging Deployment with Smoke Tests
  ✅ Production Deployment with Health Checks
  ✅ Performance Testing (Artillery)
  ✅ Security Testing (OWASP ZAP)
  ✅ Notifications (Slack, GitHub Releases)
```

### **3. Infrastructure as Code**

**Complete AWS Infrastructure:**

```hcl
# Terraform modules for:
- VPC with public/private subnets
- EKS cluster with managed node groups
- RDS PostgreSQL with backup/monitoring
- ElastiCache Redis cluster
- Application Load Balancer with SSL
- Security Groups with least privilege
- IAM roles and policies
- CloudWatch logging and monitoring
```

---

## 🎓 **Access URLs**

After running `./scripts/start-dev.sh`:

| Service         | URL                            | Credentials             |
| --------------- | ------------------------------ | ----------------------- |
| **Frontend**    | http://localhost:3000          | -                       |
| **Backend API** | http://localhost:3001          | -                       |
| **API Docs**    | http://localhost:3001/api/docs | -                       |
| **Prometheus**  | http://localhost:9090          | -                       |
| **Grafana**     | http://localhost:3002          | admin:admin             |
| **PostgreSQL**  | localhost:5432                 | postgres:password       |
| **Redis**       | localhost:6379                 | password: redispassword |

---

## 🧪 **Testing Everything**

### **Run All Tests**

```bash
# Backend tests with coverage
cd backend && npm test

# Frontend tests with coverage
cd frontend && npm test

# Integration tests
npm run test:integration

# Load testing
artillery run performance/load-test.yml

# Security scanning
npm audit
```

### **Test CI/CD Pipeline**

```bash
# Create a feature branch
git checkout -b feature/test-pipeline

# Make a small change and push
git add . && git commit -m "test: trigger CI/CD pipeline"
git push origin feature/test-pipeline

# Create PR to see full pipeline in action
```

---

## 🚨 **Common DevOps Scenarios to Practice**

### **1. Handling a Production Incident**

```bash
# Simulate high error rates
kubectl scale deployment backend --replicas=1 -n evertwine

# Monitor in Grafana - open http://localhost:3002

# Scale back up
kubectl scale deployment backend --replicas=3 -n evertwine
```

### **2. Rolling Back a Deployment**

```bash
# View deployment history
kubectl rollout history deployment/backend -n evertwine

# Rollback to previous version
kubectl rollout undo deployment/backend -n evertwine
```

### **3. Performance Optimization**

```bash
# Run load tests
artillery run performance/load-test.yml

# Check performance metrics in Grafana
# Test auto-scaling
kubectl get hpa -n evertwine -w
```

---

## 🎯 **Technology Stack**

**Frontend:**

- **Next.js 15** with React 18 & TypeScript
- **Tailwind CSS** for styling
- **Zustand** state management
- **React Query** data fetching

**Backend:**

- **Node.js** with Express.js
- **PostgreSQL** with Sequelize ORM
- **Redis** for caching and sessions
- **JWT** authentication
- **Winston** logging

**Infrastructure:**

- **AWS EKS** Kubernetes cluster
- **AWS RDS** PostgreSQL database
- **AWS ElastiCache** Redis cluster
- **Terraform** for IaC
- **Docker** containerization

---

## 📁 **Project Structure**

```
evertwine-v3/
├── 🎨 frontend/                 # Next.js application
├── ⚙️  backend/                  # Node.js API server
├── 🏗️ infrastructure/           # Terraform AWS infrastructure
├── ☸️ k8s/                      # Kubernetes manifests
├── 📊 monitoring/               # Prometheus & Grafana config
├── 🧪 performance/              # Load testing with Artillery
├── 🚀 scripts/                  # Deployment automation scripts
├── 🔄 .github/workflows/        # CI/CD pipeline
└── 📋 docker-compose.yml        # Local development environment
```

---

## 🎓 **Skills You'll Develop**

### **DevOps Engineering Skills**

- ✅ Container orchestration (Docker, Kubernetes)
- ✅ Infrastructure as Code (Terraform)
- ✅ CI/CD pipeline design and implementation
- ✅ Monitoring and observability (Prometheus, Grafana)
- ✅ Cloud platform management (AWS)
- ✅ Security scanning and compliance
- ✅ Performance testing and optimization
- ✅ Incident response and troubleshooting

### **Software Engineering Skills**

- ✅ Full-stack development (React, Node.js)
- ✅ API design and documentation
- ✅ Database design and optimization
- ✅ Testing strategies (Unit, Integration, E2E)
- ✅ Code quality and security practices

---

## 🤝 **Contributing**

This project is designed for learning! Here's how to contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** (add new DevOps tools, improve processes)
4. **Add tests** for new functionality
5. **Commit your changes** (`git commit -m 'feat: add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

---

## 📞 **Getting Help**

- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/evertwine-v3/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/evertwine-v3/discussions)
- 📧 **Email**: support@evertwine.com

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### **🎯 Ready to Level Up Your DevOps Skills?**

**Start with Docker Compose, progress to Kubernetes, master AWS!**

[**🚀 Get Started Now**](#-quick-start-guide) | [**📊 View Features**](#-devops-features-youll-practice) | [**🎓 Learn Skills**](#-skills-youll-develop)

**Happy DevOps Learning! 🚀🎯✨**

</div>
