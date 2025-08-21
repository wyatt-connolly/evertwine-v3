# Evertwine V3

A modern full-stack web application built with Next.js and Node.js, demonstrating professional development practices and CI/CD workflows.

## 🚀 Features

- **Frontend**: Next.js 15 with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express, PostgreSQL
- **Cloud**: AWS DynamoDB, Lambda, API Gateway, ECS
- **Infrastructure**: Terraform for AWS provisioning
- **Orchestration**: Kubernetes for container deployment
- **DevOps**: Docker, GitHub Actions, automated testing

## 📋 Prerequisites

- Node.js 18+
- Docker
- AWS CLI (for cloud features)

## 🏃‍♂️ Quick Start

```bash
# Clone the repository
git clone https://github.com/wyatt-connolly/evertwine-v3.git
cd evertwine-v3

# Start with Docker
docker-compose up

# Or run locally
cd frontend && npm install && npm run dev
cd backend && npm install && npm run dev
```

## 🏗️ Architecture

```
├── frontend/                    # Next.js React application
├── backend/                     # Node.js API server
├── infrastructure/              # Terraform & infrastructure code
│   ├── terraform/              # AWS infrastructure as code
│   └── kubernetes/             # K8s manifests
├── k8s/                        # Kubernetes deployment files
├── aws/                        # AWS-specific resources
│   ├── lambda/                 # Lambda functions
│   ├── scripts/                # AWS deployment scripts
│   └── config/                 # AWS configuration files
├── docs/                       # Documentation
│   ├── aws/                    # AWS setup guides
│   └── deployment/             # Deployment documentation
├── scripts/                    # Utility scripts
├── .github/workflows/          # CI/CD pipelines
└── docker-compose.yml          # Local development setup
```

## 🔄 CI/CD Pipeline

- **CI**: Automated testing, linting, and building on every push
- **Deploy**: Automatic deployment to production on main branch
- **Quality**: Code quality checks and Docker build verification

## 🌐 Live Demo

**AWS Cloud Infrastructure**: The blog data is served from AWS DynamoDB via Lambda functions and API Gateway, demonstrating serverless architecture and cloud integration.

## 🛠️ Development

This project showcases modern development practices including:

- **TypeScript** for type safety
- **ESLint/Prettier** for code quality
- **Docker** for containerization
- **GitHub Actions** for CI/CD
- **Terraform** for infrastructure as code
- **Kubernetes** for container orchestration
- **AWS** cloud services integration

---

_Built to demonstrate full-stack development and DevOps capabilities._
