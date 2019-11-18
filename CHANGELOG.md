# 1.2.0 (2019-11-18)

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
``
