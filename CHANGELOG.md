# 1.4.1 (2020-06-19)

### Bug Fixes
* Fix integration nodes' metrics with different node-exporter installations

# 1.4.0 (2020-05-13)

### New features
* Add integrations with node-exporter-full-dashboard
* Add server' stat to nodes-overview page
* Redesign of applications-overview page

### Bug Fixes
* Disks operations' legend in different dashboards
* Improve compatibility with MacOS 
* Compatibility with Grafana 6.6.* , 6.7.* , 7.0.*
* Fix orgid on dashboards' links

# 1.3.0 (2020-02-12)

### New features
* Add requested resource metrics (CPU, memory) to node's dashboard
* Add order for pods (by cpu, memory) at Nodes overview page
* Add disk metrics to dashboards
* Migrate to Webpack
* Parse error messages from Events (you need to update [ClusterRole](https://github.com/devopsprodigy/kubegraf/blob/master/kubernetes/clusterrole.yaml))
* Add namespaces update on static pages
* Compatibility with different metric's labels (pod/pod_name, container/container_name)


### Bug Fixes
* Fix Save&Test button
* Cluster delete

# 1.2.0 (2019-12-20)

### New features
* Navigation improvement: 
    * Hide all button (for nodes and namespaces)
    * Show one node or namespace (by click with ctrl)
* Summary-row in namespace section in nodes-overview page
* Add restarts to pod's resource dashboard
* Add resource graphs to deployment's, daemonset's & statefulset's dashboards
* Add sidecars' resources to pod's, deployment's, daemonset's & statefulset's dashboards

### Bug Fixes
* Plugin's config link
* Node's cpu usage correct value
* Node's memory usage correct value
* N/A labels in nodes-overview page
* Compatibility with different prometheus' installations [#14](https://github.com/devopsprodigy/kubegraf/issues/14)
* List of clusters on grafana 5.x.x

# 1.1.1.1 (2019-10-10)
### Bug Fixes
* Grafana v6.4.x support

# 1.1.1 (2019-09-30)
### Bug Fixes
* Bearer token access on Grafana version 5.x.x [#10](https://github.com/devopsprodigy/kubegraf/issues/10)
* Viewer & editor modes' fix

# 1.1.0 (2019-09-25)

### New features
* **k8s v1.16 support** (Deployments, Daemonsets and Statefulsets migrate to use the apps/v1 API)
* **Bearer token access** (restart your grafana-server after update) [#5](https://github.com/devopsprodigy/kubegraf/issues/5) [#4](https://github.com/devopsprodigy/kubegraf/issues/4)

### Bug Fixes 
* Node._getBytes now works with Mi [#7](https://github.com/devopsprodigy/kubegraf/pull/7)
* Grafana v6.3.5 minor fixes (markdown, styles)
* Try-catch on http-requests

# 1.0.1 (2019-09-14)

### Bug Fixes
* Readonly access via cert and key [#6](https://github.com/devopsprodigy/kubegraf/pull/6)
