# Monitoring Overview

This document explains the monitoring and alerting architecture of the DevSecOps Voting Platform.

The monitoring stack was built using:
- Prometheus
- Grafana
- Alertmanager
- Node Exporter
- kube-state-metrics
- Telegram alerts

---

# Monitoring Architecture

```text
Kubernetes Cluster
        ↓
Prometheus Metrics Collection
        ↓
Grafana Dashboards
        ↓
Alertmanager
        ↓
Telegram Notifications
```

---

# Prometheus

Prometheus is used as the central metrics collection system.

It collects:
- node metrics
- pod metrics
- Kubernetes metrics
- deployment metrics
- resource utilization metrics

Prometheus continuously scrapes metrics from Kubernetes components.

---

# Node Exporter

Node Exporter provides system-level metrics.

Examples:
- CPU usage
- memory usage
- disk utilization
- network usage

These metrics help monitor Kubernetes node health.

---

# kube-state-metrics

kube-state-metrics exposes Kubernetes object metrics.

Examples:
- deployment replicas
- pod status
- namespace health
- StatefulSet information

This enables Kubernetes-level monitoring inside Grafana.

---

# Grafana Dashboards

Grafana visualizes metrics collected by Prometheus.

Dashboards were used to monitor:
- cluster health
- CPU utilization
- memory usage
- pod counts
- namespace metrics
- deployment availability

Grafana enabled real-time infrastructure visibility.

---

# Alertmanager

Alertmanager handles:
- alert routing
- grouping
- notifications

Alert rules were configured using PrometheusRule resources.

Critical alerts were routed to Telegram.

---

# Telegram Alerting

Telegram alerts were integrated for real-time incident notifications.

Configured alerts include:
- frontend deployment unavailable
- Kubernetes component failures
- pod failures
- critical cluster alerts

Example alert:

```text
Frontend deployment unavailable
No frontend replicas are available in the voting-app namespace
```

---

# Incident Simulation

A real outage simulation was performed by scaling frontend replicas to zero.

```bash
kubectl scale deployment frontend-deployment -n voting-app --replicas=0
```

Observed results:
- Grafana showed missing frontend pods
- Alertmanager triggered alerts
- Telegram notifications were received
- metrics changed in dashboards

This demonstrated end-to-end monitoring and incident detection.

---

# Recovery Testing

Frontend replicas were restored successfully:

```bash
kubectl scale deployment frontend-deployment -n voting-app --replicas=2
```

The monitoring stack detected recovery automatically.

---

# Key Learning Outcomes

This monitoring stack provided hands-on experience with:
- Kubernetes monitoring
- observability
- metrics collection
- alerting systems
- incident detection
- outage simulation
- operational visibility

---

# Conclusion

The monitoring stack demonstrates production-style observability using Prometheus, Grafana, Alertmanager, and Kubernetes metrics integration.
