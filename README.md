# DevOpsProdigy KubeGraf
[![Slack Url](https://img.shields.io/badge/Slack-channel-red?logo=slack)](https://join.slack.com/t/devopsprodigygroup/shared_invite/enQtODM0Nzc2NjkwNzkwLTgwMGUwYzFiMDU1N2Y2OWM2NjdiYTc2YjU2NDFmYjQ1NDY5YzM1OGYwMDRjOWZmNDYxOTMxODYzZjc0Mjg3MDc)
[![Telegram Url](https://img.shields.io/badge/Telegram-chat-blue?logo=telegram)](https://t.me/kubegraf)
[![Change Log](https://img.shields.io/badge/Change-log-blue.svg?style=flat)](https://github.com/devopsprodigy/kubegraf/blob/master/CHANGELOG.md)
[![Project Site](https://img.shields.io/badge/Project-site-red)](https://devopsprodigy.com/products/kubegraf)
## Kubernetes plugin for Grafana

An updated version of the Grafana App for Kubernetes plugin (https://grafana.com/plugins/grafana-kubernetes-app), this plugin allows you to visualize and analyze your Kubernetes cluster’s performance. It demonstrates in graphics the main service metrics and characteristics of the Kubernetes cluster. It also makes it easier to examine the application’s life cycle and error logs.

## Requirements

1. Grafana > 5.0.0
2. Prometheus + node-exporter + kube-state-metrics
1. Grafana-piechart-panel

## Features

The plugin consists of three main info pages with detailed information about the Kubernetes cluster.

### Applications overview

- Logic map of applications;
- Distribution of Kubernetes entities;
- List of pod entities with life metrics;
- Visual presentation of the application’s life cycle and its basic characteristics;
- Description of the ports that allow access services in the cluster.

![](https://devopsprodigy.com/img/dop-kubegraf/v140/n_applications_overview_2.png)

*Pic. 1:  Applications overview*

### Cluster status

- Summary about the status of the cluster and the nodes within it;
- Details of monitoring the application’s life cycle;
- Visual presentation of where the services in the cluster servers are located.

![](https://devopsprodigy.com/img/dop-kubegraf/v120/cluster_status_1.png)

*Pic. 2: Cluster status*

### Nodes overview

- Summary of cluster’s nodes;
- Information about used and allocated resources (RAM, CPU utilization) and the number of pods;
- Physical distribution of pods.

![](https://devopsprodigy.com/img/dop-kubegraf/v150/n5_node_overview.png)

*Pic. 3: Nodes overview*

### Dashboards

Besides providing general information on the main pages, the plugin allows you to track a cluster’s performance in graphs, which are located on five dashboards.

- **node dashboard**

This is a dashboard with node metrics. It displays the employment of resources like CPU utilization, memory consumption, percentage of CPU time in idle / iowait modes, and disk and network status.

![](https://devopsprodigy.com/img/dop-kubegraf/v140/n_node_dashboard_1.png)

*Pic. 4: Node dashboard*

- **pod resources**

Displays how much of the resources the selected pod has used.

![](https://devopsprodigy.com/img/dop-kubegraf/v150/n5_pods_dashboard.png)

*Pic. 5: Pod resources*

- **deployment dashboard**

![](https://devopsprodigy.com/img/dop-kubegraf/v120/deployments_dashboard_1.png)

*Pic. 6: Deployment dashboard*
![](https://devopsprodigy.com/img/dop-kubegraf/v150/n5_deployments_dashboard_2.png)

*Pic. 7: Deployment dashboard*

- **statefulsets dashboard**
- **daemonsets dashboard**

The above three dashboards show the number of available / unavailable application replicas and the status of containers in the pods of these applications, and trace containers’ restarts.

### Installation


1. Go to the plugins directory in Grafana:

	`cd $GRAFANA_PATH/data/plugins`

2. Copy the repository:

	`git clone https://github.com/devopsprodigy/kubegraf  /var/lib/grafana/plugins/devopsprodigy-kubegraf-app` and restart grafana-server

	or

	`grafana-cli plugins install devopsprodigy-kubegraf-app` and restart grafana-server.

3. Create namespace "kubegraf" and apply Kubernetes manifests from [kubernetes/](https://github.com/devopsprodigy/kubegraf/tree/master/kubernetes) directory to give
     required permissions to the user `grafana-kubegraf`:
      ```
      kubectl create ns kubegraf
      kubectl apply -f https://raw.githubusercontent.com/devopsprodigy/kubegraf/master/kubernetes/serviceaccount.yaml
      kubectl apply -f https://raw.githubusercontent.com/devopsprodigy/kubegraf/master/kubernetes/clusterrole.yaml
      kubectl apply -f https://raw.githubusercontent.com/devopsprodigy/kubegraf/master/kubernetes/clusterrolebinding.yaml
      kubectl apply -f https://raw.githubusercontent.com/devopsprodigy/kubegraf/master/kubernetes/secret.yaml
      ```

4. Create a `grafana-kubegraf` user private key and certificate on one of the
      master nodes:
      ```
      openssl genrsa -out ~/grafana-kubegraf.key 2048
      openssl req -new -key ~/grafana-kubegraf.key -out ~/grafana-kubegraf.csr -subj "/CN=grafana-kubegraf/O=monitoring"
      openssl x509 -req -in ~/grafana-kubegraf.csr -CA /etc/kubernetes/pki/ca.crt -CAkey /etc/kubernetes/pki/ca.key -out /etc/kubernetes/pki/grafana-kubegraf.crt -CAcreateserial
      ```
     Copy /etc/kubernetes/pki/grafana-kubegraf.crt to all other master nodes.

    or

    Get the token
    ```
    kubectl get secret grafana-kubegraf-secret -o jsonpath={.data.token} -n kubegraf | base64 -d
    ```

5. Go to /configuration-plugins in Grafana and click on the plugin. Then click “enable”.

6. Go to the plugin and select “create cluster”.

7. Enter the settings of http-access to the Kubernetes api server:
    * Kubernetes master's url from `kubectl cluster-info`
    * Enter the certificate and key from step #4  "TLS Client Auth" section
      Or
      The token from step #4 in "Bearer token access" section

8. Open the “additional datasources” drop-down list and select the prometheus that is used in this cluster.
