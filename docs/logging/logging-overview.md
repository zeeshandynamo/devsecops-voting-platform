# Centralized Logging Overview

This document explains the centralized logging architecture of the DevSecOps Voting Platform using the EFK stack.

The logging stack was implemented using:
- Elasticsearch
- Fluent Bit
- Kibana

The goal was to provide centralized log collection, storage, searching, and troubleshooting capabilities for Kubernetes workloads.

---

# Logging Architecture

```text
Kubernetes Pods
        ↓
Fluent Bit Log Collection
        ↓
Elasticsearch Storage
        ↓
Kibana Visualization & Search
```

---

# Why Centralized Logging Is Important

In Kubernetes environments, logs are distributed across multiple pods and containers.

Without centralized logging:
- troubleshooting becomes difficult
- logs disappear when pods restart
- debugging incidents becomes slow

The EFK stack solves this by collecting and storing logs centrally.

---

# Elasticsearch

Elasticsearch is used as the centralized log storage engine.

It stores:
- Kubernetes pod logs
- container logs
- application logs
- infrastructure logs

Elasticsearch enables:
- fast searching
- indexing
- filtering
- historical log retention

A StatefulSet with persistent storage was used to store logs.

---

# Fluent Bit

Fluent Bit is the lightweight log collector used in the Kubernetes cluster.

It runs as a DaemonSet so that:
- one Fluent Bit pod runs on each Kubernetes node
- logs from all containers are collected automatically

Fluent Bit collects:
- pod logs
- container logs
- Kubernetes metadata

and forwards them to Elasticsearch.

---

# Kibana

Kibana provides visualization and searching for logs stored inside Elasticsearch.

Kibana was used for:
- log exploration
- namespace filtering
- pod-level troubleshooting
- incident investigation
- log searching

The Discover section was primarily used for troubleshooting and analysis.

---

# Kubernetes Metadata Integration

Fluent Bit enriched logs with Kubernetes metadata such as:
- namespace name
- pod name
- container name
- node information
- labels

This enabled advanced filtering and troubleshooting inside Kibana.

---

# Example Log Investigation Workflow

## Step 1 — Alert Triggered

A Telegram alert indicated that the frontend deployment became unavailable.

---

## Step 2 — Grafana Investigation

Grafana dashboards showed:
- frontend pods missing
- deployment health degraded

---

## Step 3 — Kibana Investigation

Kibana Discover was used to:
- filter logs by namespace
- filter logs by pod
- inspect frontend logs
- analyze shutdown messages

Observed logs included:

```text
worker process exited with code 0
signal received
```

This indicated that the frontend pods were terminated gracefully after scaling replicas to zero.

---

# Incident Simulation

A production-style outage simulation was performed:

```bash
kubectl scale deployment frontend-deployment -n voting-app --replicas=0
```

Results:
- frontend pods disappeared
- Grafana metrics changed
- Telegram alerts fired
- Kibana captured pod termination logs

This validated the centralized logging and observability workflow.

---

# Key Kibana Concepts Learned

## Discover

Used for:
- viewing live logs
- filtering logs
- searching messages
- troubleshooting issues

---

## Important Fields

### message
Contains actual application logs.

### kubernetes.namespace_name
Identifies Kubernetes namespace.

### kubernetes.pod_name
Identifies the pod generating logs.

### kubernetes.container_name
Identifies the container generating logs.

---

# Log Analysis Skills Learned

The project provided hands-on experience with:
- reading Kubernetes logs
- understanding log levels
- identifying graceful shutdowns
- identifying errors and failures
- troubleshooting production-style incidents

---

# Future Improvements

Potential future logging enhancements:
- log retention policies
- Elasticsearch scaling
- OpenSearch integration
- Loki logging stack
- OpenTelemetry integration

---

# Conclusion

The EFK stack enabled centralized logging and observability for the Kubernetes platform.

This provided real-world experience with:
- log aggregation
- Kubernetes troubleshooting
- observability workflows
- incident investigation
- production-style debugging
