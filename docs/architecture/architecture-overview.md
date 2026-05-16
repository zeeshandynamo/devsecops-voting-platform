# Architecture Overview

This document explains the completeO architecture of the DevSecOps Voting Platform, including CI/CD, Kubernetes deployment, monitoring, alerting, and centralized logging.

---

# High Level Architecture

```text
GitHub Repository
        ↓
Jenkins CI/CD Pipeline
        ↓
SonarQube Code Analysis
        ↓
Trivy Security Scanning
        ↓
Docker Build & Push
        ↓
Kubernetes (K3s)
        ↓
Prometheus Monitoring
        ↓
Grafana Dashboards
        ↓
Alertmanager + Telegram Alerts
        ↓
EFK Logging Stack
(Elasticsearch + Fluent Bit + Kibana)
```

---

# Architecture Components

## 1. GitHub Repository

GitHub is used as the central source code repository.

It stores:
- frontend code
- backend code
- Kubernetes manifests
- monitoring configurations
- logging configurations
- Jenkins pipeline definitions

GitHub webhooks trigger Jenkins pipelines automatically whenever code is pushed.

---

## 2. Jenkins CI/CD Pipeline

Jenkins automates the complete CI/CD workflow.

The pipeline performs:
- source code checkout
- Docker image build
- SonarQube analysis
- Trivy security scanning
- DockerHub image push
- Kubernetes deployment

This enables automated end-to-end deployment.

---

## 3. SonarQube

SonarQube performs static code analysis.

It identifies:
- bugs
- vulnerabilities
- code smells
- maintainability issues

This improves application quality and security.

---

## 4. Trivy Security Scanner

Trivy scans Docker images for vulnerabilities.

It detects:
- critical CVEs
- vulnerable packages
- insecure dependencies

This introduces DevSecOps practices into the CI/CD pipeline.

---

## 5. Docker & DockerHub

Docker is used to containerize:
- frontend application
- backend application

DockerHub stores versioned container images that are later deployed into Kubernetes.

---

## 6. Kubernetes (K3s)

K3s is used as the container orchestration platform.

Kubernetes manages:
- deployments
- replicas
- services
- namespaces
- pod lifecycle
- self-healing

Namespaces used:
- voting-app
- monitoring
- logging

---

## 7. Monitoring Stack

Prometheus collects metrics from:
- Kubernetes cluster
- nodes
- pods
- containers

Grafana visualizes:
- CPU usage
- memory usage
- pod health
- namespace metrics
- cluster performance

---

## 8. Alerting Stack

Alertmanager handles alert routing and notifications.

Telegram integration was configured for:
- frontend deployment failures
- Kubernetes component failures
- critical cluster alerts

This enables real-time incident notification.

---

## 9. EFK Logging Stack

The EFK stack provides centralized logging.

### Elasticsearch
Stores logs centrally.

### Fluent Bit
Collects logs from:
- containers
- pods
- Kubernetes nodes

### Kibana
Provides:
- log visualization
- searching
- filtering
- troubleshooting

This enables centralized observability and incident investigation.

---

# Observability Flow

The project follows a complete observability workflow:

Metrics → Grafana  
Alerts → Alertmanager + Telegram  
Logs → Kibana  

This enables:
- incident detection
- troubleshooting
- root cause analysis
- operational visibility

---

# Incident Simulation

A production-style outage simulation was performed by scaling frontend replicas to zero.

```bash
kubectl scale deployment frontend-deployment -n voting-app --replicas=0
```

Observed results:
- Grafana detected missing frontend pods
- Alertmanager fired critical alerts
- Telegram notifications were received
- Kibana captured pod shutdown logs

The deployment was later restored successfully.

---

# Conclusion

This architecture demonstrates a complete DevSecOps and SRE-style platform using Kubernetes, CI/CD automation, observability, monitoring, alerting, and centralized logging practices.
