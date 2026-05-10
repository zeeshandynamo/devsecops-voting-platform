# 🚀 DevSecOps Voting Platform

A complete end-to-end **DevSecOps CI/CD Pipeline Project** built using modern cloud-native technologies including Kubernetes, Jenkins, Docker, SonarQube, Trivy, Prometheus, Grafana, and AWS.

This project demonstrates how a real-world production-style application can be:

* Containerized using Docker
* Automatically built and deployed using Jenkins
* Security scanned using Trivy
* Code quality checked using SonarQube
* Deployed to Kubernetes (K3s)
* Monitored using Prometheus & Grafana
* Alerted using Telegram notifications
* Auto-scaled using HPA
* Exposed publicly using Traefik Ingress

---

# 🌐 Live Project

## Application URL

```bash
http://13.205.126.153
```

## Jenkins

```bash
http://3.6.28.117:8080
```

## SonarQube

```bash
http://3.6.28.117:9000
```

## Grafana

```bash
http://13.205.126.153:32072
```

---

# 🏗️ Project Architecture

```text
Developer
   ↓
GitHub Repository
   ↓
GitHub Webhook
   ↓
Jenkins CI/CD Pipeline
   ↓
SonarQube Code Analysis
   ↓
Trivy Security Scan
   ↓
Docker Image Build
   ↓
DockerHub Push
   ↓
K3s Kubernetes Deployment
   ↓
Traefik Ingress Routing
   ↓
Prometheus Monitoring
   ↓
Grafana Dashboards
   ↓
Telegram Alerts
```

---

# ☁️ AWS Infrastructure

## EC2 Instances

### 🖥️ CI/CD Server

| Component      | Purpose                |
| -------------- | ---------------------- |
| Jenkins        | CI/CD Automation       |
| SonarQube      | Code Quality Analysis  |
| Docker         | Container Build Engine |
| Trivy          | Security Scanning      |
| GitHub Webhook | Auto Trigger Pipeline  |

### ☸️ K3s Kubernetes Server

| Component      | Purpose                 |
| -------------- | ----------------------- |
| K3s Kubernetes | Container Orchestration |
| Traefik        | Ingress Controller      |
| Prometheus     | Metrics Collection      |
| Grafana        | Visualization           |
| Alertmanager   | Alert Routing           |
| Node Exporter  | Node Metrics            |

---

# 🛠️ Technology Stack

## Cloud & Infrastructure

* AWS EC2
* Ubuntu Linux
* Elastic IP
* Security Groups

## DevOps & CI/CD

* Jenkins
* GitHub Webhooks
* Docker
* DockerHub
* Trivy
* SonarQube

## Kubernetes

* K3s
* Deployments
* Services
* Ingress
* Secrets
* HPA
* Namespace Isolation

## Monitoring & Observability

* Prometheus
* Grafana
* Alertmanager
* Node Exporter
* Telegram Alerts

## Application Stack

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Frontend

* React.js
* Axios
* Modern Pastel UI

---

# 📁 Project Structure

```text
DevSecOps-Voting-Platform/
│
├── backend/
├── frontend/
├── k8s/
├── monitoring/
├── docs/
├── Jenkinsfile
├── docker-compose.yml
├── sonar-project.properties
└── README.md
```

---

# ⚙️ CI/CD Pipeline Workflow

## 🔄 End-to-End Automation Flow

### 1️⃣ Developer Pushes Code

Code is pushed to GitHub repository.

### 2️⃣ GitHub Webhook Triggers Jenkins

GitHub automatically notifies Jenkins.

### 3️⃣ Jenkins Pipeline Starts

Jenkins pulls latest source code.

### 4️⃣ SonarQube Analysis

Code quality and security analysis is performed.

### 5️⃣ Docker Image Build

Backend and frontend images are built.

### 6️⃣ Trivy Security Scan

Container vulnerabilities are scanned.

### 7️⃣ DockerHub Push

Images are pushed with dynamic Jenkins build tags.

### 8️⃣ Kubernetes Deployment

Jenkins deploys workloads to K3s cluster.

### 9️⃣ Monitoring & Alerts

Prometheus and Grafana monitor workloads and Telegram sends alerts.

---

# 🐳 Docker Setup

## Backend Dockerization

* Node.js backend containerized
* Production-ready Dockerfile
* Optimized image layers

## Frontend Dockerization

* React frontend containerized
* Nginx used for frontend serving

## DockerHub Images

```bash
zeeshandynamo/voting-backend:<BUILD_NUMBER>
zeeshandynamo/voting-frontend:<BUILD_NUMBER>
```

---

# ☸️ Kubernetes Deployment

## Namespace Isolation

```bash
voting-app
```

## Kubernetes Components

* Deployments
* Services
* Ingress
* Secrets
* HPA

## Replica Configuration

```bash
Backend Replicas: 2
Frontend Replicas: 2
```

## Autoscaling

```bash
Min Pods: 2
Max Pods: 5
CPU Threshold: 70%
```

---

# 🔐 Security Features

## SonarQube

* Code smells detection
* Security hotspot analysis
* Static code analysis

## Trivy

* Container vulnerability scanning
* Critical & High vulnerability detection

## Kubernetes Secrets

Sensitive MongoDB connection string stored securely.

---

# 📊 Monitoring & Alerting

## Prometheus

Collects Kubernetes and node metrics.

## Grafana Dashboards

* Kubernetes Cluster Monitoring
* Node Metrics
* Pod Metrics
* Namespace Metrics

## Telegram Alerts

Configured for:

* Pod failures
* Deployment issues
* Cluster alerts

---

# 🎨 Application Features

## Frontend

* Modern pastel UI
* Company voting cards
* Responsive layout
* Live vote updates
* Winner announcement system

## Backend API Endpoints

```bash
GET    /health
GET    /api/candidates
POST   /api/candidates
PUT    /api/candidates/vote/:id
```

---

# 📈 Production Features

✅ Dynamic Docker Image Tagging

✅ Kubernetes Namespace Isolation

✅ Health Checks

* Liveness Probe
* Readiness Probe

✅ Horizontal Pod Autoscaler

✅ Monitoring Stack

✅ Telegram Alerting

✅ CI/CD Automation

---

# 🧠 Problems Faced & Fixes

## Docker Socket Permission Issue

### Problem

Jenkins could not access Docker daemon.

### Fix

```bash
sudo chmod 666 /var/run/docker.sock
```

---

## Kubernetes API TLS Error

### Problem

Jenkins could not connect to Kubernetes API.

### Fix

Updated kubeconfig to use K3s private IP instead of localhost.

---

## Elastic IP Issue

### Problem

EC2 public IP changed after restart.

### Fix

Attached Elastic IPs to both servers.

---

# 📸 Suggested Screenshots

* AWS EC2 Dashboard
* Jenkins Pipeline Success
* SonarQube Dashboard
* Trivy Scan Results
* DockerHub Images
* Kubernetes Pods
* Ingress
* Grafana Dashboards
* Telegram Alerts
* Live Voting Application

---

# 🚀 Future Improvements

* HTTPS using cert-manager
* Custom domain integration
* RBAC security hardening
* ArgoCD GitOps deployment
* Centralized logging stack
* Redis integration
* Multi-node Kubernetes cluster

---

# 👨‍💻 Author

## Zeeshan Ali

DevSecOps | Cloud | Kubernetes | DevOps Engineer

### Technologies Worked On

* AWS
* Docker
* Kubernetes
* Jenkins
* SonarQube
* Trivy
* Grafana
* Prometheus
* Linux
* GitHub Actions
* Terraform
* Ansible

---

# ⭐ Final Note

This project was designed to simulate a real-world production-grade DevSecOps environment with complete CI/CD automation, monitoring, scalability, and security best practices.

It demonstrates practical implementation of:

* Cloud Infrastructure
* Containerization
* Kubernetes Orchestration
* DevSecOps Practices
* CI/CD Automation
* Monitoring & Alerting
* Production Deployment Workflows

---

# 📌 If You Like This Project

⭐ Star the repository

🍴 Fork the repository

📢 Connect on LinkedIn

🚀 Keep Learning DevOps & Cloud Technologies
