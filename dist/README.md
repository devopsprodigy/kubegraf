# DevOpsProdigy KubeGraf
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

![](https://devopsprodigy.com/img/dop-kubegraf/applications_overview_1.png)

*Pic. 1:  Applications overview*

### Cluster status

- Summary about the status of the cluster and the nodes within it;
- Details of monitoring the application’s life cycle;
- Visual presentation of where the services in the cluster servers are located.

![](https://devopsprodigy.com/img/dop-kubegraf/cluster_status.png)

*Pic. 2: Cluster status*

### Nodes overview

- Summary of cluster’s nodes;
- Information about used and allocated resources (RAM, CPU utilization) and the number of pods;
- Physical distribution of pods.

![](https://devopsprodigy.com/img/dop-kubegraf/nodes_overview.png)

*Pic. 3: Nodes overview*

###Dashboards

Besides providing general information on the main pages, the plugin allows you to track a cluster’s performance in graphs, which are located on five dashboards.

- ** node dashboard**

This is a dashboard with node metrics. It displays the employment of resources like CPU utilization, memory consumption, percentage of CPU time in idle / iowait modes, and disk and network status.

![](https://devopsprodigy.com/img/dop-kubegraf/node_dashboard_1.png)

*Pic. 4: Node dashboard *

- **pod resources **

Displays how much of the resources the selected pod has used.

![](https://devopsprodigy.com/img/dop-kubegraf/pod_resources_dashboard.png)

*Pic. 5: Pod resources*

- **deployment dashboard **

![](https://devopsprodigy.com/img/dop-kubegraf/deployment_dashboard.png)

*Pic. 6: Deployment dashboard*

- **statefulsets dashboard **
- **daemonsets dashboard **

The above three dashboards show the number of available / unavailable application replicas and the status of containers in the pods of these applications, and trace containers’ restarts.

### Installation


1. Go to the plugins directory in Grafana:

	`cd $GRAFANA_PATH/data/plugins`
	
2. Copy repository:

	`git clone https://github.com/devopsprodigy/kubegraf  /var/lib/grafana/plugins` and restart grafana-server
	 
	or
	 
	`grafana-cli plugins install devopsprodigy-kubegraf-app`
	
3. Go to /configuration-plugins in Grafana and click on the plugin. Then click “enable”.

4. Go to the plugin and select “create cluster”.

5. Enter the settings of http-access to the Kubernetes api server.

6. Open the “additional datasources” drop-down list and select the prometheus that is used in this cluster.
