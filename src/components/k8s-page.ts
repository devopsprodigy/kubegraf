import appEvents from 'grafana/app/core/app_events';
import { Pod } from '../common/types/pod';
import { PrometheusProxy } from '../common/proxies/prometheusProxy';
import { ERROR, PODS_LIMIT, SUCCEEDED, SUCCESS, TERMINATING, WARNING } from '../common/constants';
import { Component } from '../common/types/component';
import { Service } from '../common/types/service';
import { Job } from '../common/types/job';
import { Cronjob } from '../common/types/cronjob';
import { Namespace } from '../common/types/namespace';
import store from '../common/store';
import { Deployment } from '../common/types/deployment';
import { Statefulset } from '../common/types/statefulset';
import { Daemonset } from '../common/types/daemonset';
import { Node } from '../common/types/node';
import { __convertToGB, __convertToHours, __convertToMicro, __roundCpu } from '../common/helpers';

const REFRESH_RATE_DEFAULT = 60000;
const ERROR_MSG_MEMORY_REQUESTS_LIMITS = 'Memory limits and requests not configured';
const ERROR_MSG_CPU_REQUESTS_LIMITS = 'CPU limits and requests not configured';

export class K8sPage {
  pageReady: boolean;
  namespaceMapReady: boolean;
  nodesMapReady = false;
  $scope: any;
  cluster: any;
  prometheusDS: any;
  isAdmin: boolean;
  location: any;
  backendSrv: any;
  datasourceSrv: any;
  contextSrv: any;
  timeout: any;
  refreshRate: number;
  $q: any;
  scrollToTop: object;

  //common store
  storePods: Pod[] = [];
  storeEvents: any[] = null;
  storeComponents: Component[] = [];
  storeServices: Service[] = [];
  storeJobs: Job[] = [];
  storeCronJobs: Cronjob[] = [];
  storeDeployments: Deployment[] = [];
  storeStatefulSets: Statefulset[] = [];
  storeDaemonSets: Daemonset[] = [];
  namespaceMap: Namespace[] = [];
  nodesMap: Node[] = [];
  nodesError: Boolean | Error = false;
  podsError: Boolean | Error = false;
  componentsError: Boolean | Error = false;
  orgId = 1;
  showMenu = false;
  updatePods(pods: Pod[]) {}

  constructor($scope, backendSrv, datasourceSrv, contextSrv, $location, timeout, $q, $window) {
    this.$q = $q;
    this.$scope = $scope;
    this.pageReady = false;
    this.location = $location;
    this.backendSrv = backendSrv;
    this.contextSrv = contextSrv;
    this.datasourceSrv = datasourceSrv;
    this.timeout = timeout;
    this.orgId = $window.grafanaBootData && $window.grafanaBootData.user ? $window.grafanaBootData.user.orgId : 1;
    try {
      this.isAdmin = this.contextSrv.hasRole('Admin');
    } catch (e) {
      console.error(e);
      this.isAdmin = false;
    }
    if (!('clusterName' in $location.search())) {
      appEvents.emit('alert-error', ['Cluster not specified']);

      return;
    }
    document.title = 'DevOpsProdigy KubeGraf';

    const elem = document.querySelector('.scroll-canvas');
    this.scrollToTop = () => {
      elem.scrollTo({
        top: 0,
        left: elem.scrollLeft,
        behavior: 'smooth',
      });
    };
  }

  async __getServersInfo(nodes: Node[]) {
    const info = [];
    const instance = nodes
      .reduce((accumulator: string[], node) => [...accumulator, `${node.name}|${node.hostIp}:.+`], [])
      .join('|');

    const result = await Promise.all([
      this.prometheusDS.query(
        {
          expr: `count(count(node_cpu_seconds_total{instance=~"${instance}"}) by (cpu, instance)) by (instance)`,
          legend: 'instance',
        },
        false
      ), //cpuCores
      this.prometheusDS.query(
        {
          expr: `sum(node_memory_MemTotal_bytes{instance=~"${instance}"}) by (instance)`,
          legend: 'instance',
        },
        false
      ), //ramTotal
      this.prometheusDS.query(
        {
          expr: `sum(node_memory_SwapTotal_bytes{instance=~"${instance}"}) by (instance)`,
          legend: 'instance',
        },
        false
      ), //swapTotal
      this.prometheusDS.query(
        {
          expr: `sum(node_filesystem_size_bytes{instance=~"${instance}",mountpoint="/",fstype!="rootfs"}) by (instance)`,
          legend: 'instance',
        },
        false
      ), //rootFSTotal
      this.prometheusDS.query(
        {
          expr: `sum(node_load1{instance=~"${instance}"}) by (instance)`,
          legend: 'instance',
        },
        false
      ), //sysLoad
      this.prometheusDS.query(
        {
          expr: `sum(node_time_seconds{instance=~"${instance}"} - node_boot_time_seconds{instance=~"${instance}"}) by (instance)`,
          legend: 'instance',
        },
        false
      ), //uptime
    ]);

    for (const node of nodes) {
      const datapoints = result.map((item) => {
        return item.find((element) => element.target === node.name || element.target.indexOf(`${node.hostIp}:`) === 0);
      });

      info[node.name] = {
        cpuCores: datapoints[0] && datapoints[0].datapoint,
        ramTotal: datapoints[1] && __convertToGB(datapoints[1].datapoint),
        swapTotal: datapoints[2] && __convertToGB(datapoints[2].datapoint),
        rootFSTotal: datapoints[3] && __convertToGB(datapoints[3].datapoint),
        sysLoad: datapoints[4] && datapoints[4].datapoint,
        uptime: datapoints[5] && __convertToHours(datapoints[5].datapoint * 1000),
      };
    }

    return info;
  }

  getNodeDashboardLink(node) {
    let dbUrl = 'dashboard/db/devopsprodigy-kubegraf-nodes-dashboard?orgId=' + this.orgId;
    dbUrl += '&' + 'var-cluster=' + this.cluster.name;
    dbUrl += '&' + 'var-node=' + node.name;
    return dbUrl;
  }

  getPodDashboardLink(pod) {
    let dbUrl = 'dashboard/db/devopsprodigy-kubegraf-pods-dashboard?orgId=' + this.orgId;
    dbUrl += '&' + 'var-cluster=' + this.cluster.name;
    dbUrl += '&' + 'var-namespace=' + pod.data.metadata.namespace;
    dbUrl += '&' + 'var-pod=' + pod.name;
    return dbUrl;
  }

  getEntityDashboardLink(entity, name) {
    let entityName = name.substring(0, name.length - 1);
    let dbUrl = 'dashboard/db/devopsprodigy-kubegraf-' + name + '-dashboard?orgId=' + this.orgId;
    dbUrl += '&' + 'var-cluster=' + this.cluster.name;
    dbUrl += '&' + 'var-namespace=' + entity.data.metadata.namespace;
    dbUrl += '&' + 'var-' + entityName + '=' + entity.name;
    return dbUrl;
  }

  getNodeMap(withoutPods = false) {
    let _promises = [];
    _promises.push(this.getNodes());

    if (!withoutPods) {
      _promises.push(this.getPods(true));
    }

    return this.$q.all(_promises).then(() => {
      if (!withoutPods) {
        this.insertPodsToNodesMap(this.storePods);
        this.getPodsMetrics();
      }

      this.timeout(() => {
        this.refreshNodes();
      }, this.refreshRate);
    });
  }

  getResourcesMetrics() {
    let _promises = [];
    _promises.push(this.__getCpuMetricsRequested());
    _promises.push(this.__getMemoryMetricsRequested());
    _promises.push(this.__getPodsCountMetrics());
    _promises.push(this.__getCpuMetricsUsed());
    _promises.push(this.__getMemoryMetricsUsed());
    _promises.push(this.__getCpuLimitMetrics());
    _promises.push(this.__getMemoryLimitMetrics());

    return this.$q.all(_promises).then((results) => {
      this.nodesMap.forEach((node) => {
        node.parseMetrics(results[0], results[1], results[2], results[3], results[4], results[5], results[6]);
      });

      this.timeout(() => {
        this.getResourcesMetrics();
      }, this.refreshRate);
    });
  }

  __getCpuMetricsUsed() {
    const promQuery = {
      expr: 'sum(rate(container_cpu_usage_seconds_total{id="/"}[2m])) by (instance)',
      legend: 'instance',
    };
    return this.prometheusDS.query(promQuery, false).then((res) => res);
  }

  __getCpuMetricsRequested() {
    const promQuery = {
      expr:
        'sum(sum(kube_pod_container_resource_requests{resource="cpu",unit="core"}) by (namespace, pod, node) * on (pod, namespace) group_left()  (sum(kube_pod_status_phase{phase="Running"}) by (pod, namespace) == 1)) by (node)',
      legend: 'node',
    };

    return this.prometheusDS.query(promQuery, false).then((res) => res);
  }

  __getCpuLimitMetrics() {
    const promQuery = {
      expr:
        'sum(sum(kube_pod_container_resource_limits{resource="cpu", unit="core"}) by (namespace, pod, node) * on (pod, namespace) group_left()  (sum(kube_pod_status_phase{phase="Running"}) by (pod, namespace) == 1)) by (node)',
      legend: 'node',
    };

    return this.prometheusDS.query(promQuery, false).then((res) => res);
  }

  __getMemoryMetricsRequested() {
    const promQuery = {
      expr:
        'sum(sum(kube_pod_container_resource_requests{resource="memory", unit="byte"}) by (namespace, pod, node) * on (pod, namespace) group_left() (sum(kube_pod_status_phase{phase="Running"}) by (pod, namespace) == 1)) by (node)',
      legend: 'node',
    };

    return this.prometheusDS.query(promQuery, false).then((res) => res);
  }

  __getMemoryLimitMetrics() {
    const promQuery = {
      expr:
        'sum(sum(kube_pod_container_resource_limits{resource="memory", unit="byte"}) by (namespace, pod, node) * on (pod, namespace) group_left()  (sum(kube_pod_status_phase{phase="Running"}) by (pod, namespace) == 1)) by (node)',
      legend: 'node',
    };

    return this.prometheusDS.query(promQuery, false).then((res) => res);
  }

  __getMemoryMetricsUsed() {
    const promQuery = {
      expr:
        'sum(node_memory_MemTotal_bytes) by (instance) - sum(node_memory_MemFree_bytes) by (instance) - sum(node_memory_Buffers_bytes) by (instance) - sum(node_memory_Cached_bytes) by (instance) ',
      legend: 'instance',
    };
    return this.prometheusDS.query(promQuery, false).then((res) => res);
  }

  __getPodsCountMetrics() {
    const promQuery = {
      expr: 'sum(kubelet_running_pod_count) by (instance)',
      legend: 'instance',
    };

    return this.prometheusDS.query(promQuery, false).then((res) => res);
  }

  getNodes() {
    return this.cluster.getNodes().then((nodes) => {
      let nodeStore = [];
      let getStore = store.getObject('nodeStore');

      if (getStore) {
        nodeStore = getStore;
      }

      if (nodes instanceof Array) {
        this.nodesError = false;
        nodes.forEach((node) => {
          let nd = new Node(node);
          this.nodesMap.push(nd);

          let index = nodeStore.findIndex((item) => item.name === nd.name);
          if (index > -1) {
            nd.open = nodeStore[index].open;
          } else {
            nodeStore.push({ name: nd.name, open: nd.open });
          }
        });
        store.setObject('nodeStore', nodeStore);
      } else if (nodes instanceof Error) {
        this.nodesError = nodes;
      }
    });
  }

  getPodsMetrics() {
    let _promises = [];
    _promises.push(this.__getPodsUsedCpu());
    _promises.push(this.__getPodsUsedMemory());
    _promises.push(this.__getPodsRequestedCpu());
    _promises.push(this.__getPodsRequestedMemory());
    _promises.push(this.__getPodsLimitCpu());
    _promises.push(this.__getPodsLimitMemory());

    this.$q.all(_promises).then((results) => {
      this.nodesMap.forEach((node) => {
        node.namespaces.map((namespace) => {
          namespace.pods.map((pod) => {
            const cpu = results[0].find((item) => item.target === pod.name);
            const mem = results[1].find((item) => item.target === pod.name);
            const cpuReq = results[2].find((item) => item.target === pod.name);
            const memReq = results[3].find((item) => item.target === pod.name);
            const cpuLimit = results[4].find((item) => item.target === pod.name);
            const memLimit = results[5].find((item) => item.target === pod.name);

            if (cpu !== undefined) {
              pod.sourceMetrics.cpuUsed = cpu.datapoint;
              pod.metrics.cpuUsed = __convertToMicro(cpu.datapoint.toFixed(3));
            }
            if (mem !== undefined) {
              pod.sourceMetrics.memoryUsed = mem.datapoint;
              pod.metrics.memoryUsed = __convertToGB(mem.datapoint);
            }
            if (cpuReq !== undefined) {
              pod.sourceMetrics.cpuRequested = cpuReq.datapoint;
              pod.metrics.cpuRequested = __convertToMicro(__roundCpu(cpuReq.datapoint));
            }
            if (memReq !== undefined) {
              pod.sourceMetrics.memoryRequested = memReq.datapoint;
              pod.metrics.memoryRequested = __convertToGB(memReq.datapoint);
            }
            if (cpuLimit !== undefined) {
              pod.sourceMetrics.cpuLimit = cpuLimit.datapoint;
              pod.metrics.cpuLimit = __convertToMicro(__roundCpu(cpuLimit.datapoint));
            }
            if (memLimit !== undefined) {
              pod.sourceMetrics.memoryLimit = memLimit.datapoint;
              pod.metrics.memoryLimit = __convertToGB(memLimit.datapoint);
            }
          });
        });
      });

      this.timeout(() => {
        this.getPodsMetrics();
      }, this.refreshRate);
    });
  }

  __getPodsUsedCpu() {
    const podsUsedCpu = {
      //expr: 'sum(rate(container_cpu_usage_seconds_total{pod_name!="", container_name!="", container_name!="POD"}[2m])) by (pod_name)',
      expr:
        'sum(rate(container_cpu_usage_seconds_total{pod!="", container!="", container!="POD"}[2m])) by (pod) or ' +
        'sum(label_replace(rate(container_cpu_usage_seconds_total{pod_name!="", container_name!="", container_name!="POD"}[2m]), "pod", "$1", "pod_name", "(.*)")) by (pod)',
      legend: 'pod',
    };

    return this.prometheusDS.query(podsUsedCpu, false).then((res) => res);
  }

  __getPodsUsedMemory() {
    const podsUsedMemory = {
      //expr: 'sum(container_memory_usage_bytes{container_name!="", container_name!="POD"}) by (pod_name)'
      expr:
        'sum(container_memory_working_set_bytes{container!="", container!="POD"}) by (pod) or ' +
        'sum(label_replace(container_memory_working_set_bytes{container_name!="", container_name!="POD"}, "pod", "$1", "pod_name", "(.*)")) by (pod)',
      legend: 'pod',
    };

    return this.prometheusDS.query(podsUsedMemory, false).then((res) => res);
  }

  __getPodsRequestedCpu() {
    const podsUsedCpu = {
      expr: 'sum(kube_pod_container_resource_requests{resource="cpu",unit="core"}) by (pod)',
      legend: 'pod',
    };

    return this.prometheusDS.query(podsUsedCpu, false).then((res) => res);
  }

  __getPodsLimitCpu() {
    const podsLimitCpu = {
      expr: 'sum(kube_pod_container_resource_limits{resource="cpu", unit="core"}) by (pod)',
      legend: 'pod',
    };

    return this.prometheusDS.query(podsLimitCpu, false).then((res) => res);
  }

  __getPodsRequestedMemory() {
    const podsUsedMemory = {
      expr: 'sum(kube_pod_container_resource_requests{resource="memory", unit="byte"}) by (pod)',
      legend: 'pod',
    };

    return this.prometheusDS.query(podsUsedMemory, false).then((res) => res);
  }

  __getPodsLimitMemory() {
    const podsLimitMemory = {
      expr: 'sum(kube_pod_container_resource_limits{resource="memory", unit="byte"}) by (pod)',
      legend: 'pod',
    };

    return this.prometheusDS.query(podsLimitMemory, false).then((res) => res);
  }

  insertPodsToNodesMap(pods) {
    this.nodesMap.forEach((node) => {
      let filterPods = pods.filter((pod) => pod.data.status.hostIP === node.hostIp);

      filterPods.forEach((pod) => {
        let _nsIsset = node.namespaces.filter((item) => {
          return item.name === pod.data.metadata.namespace;
        });

        if (_nsIsset.length === 0) {
          let _ns = {
            name: pod.data.metadata.namespace,
            pods: [],
            limit: PODS_LIMIT,
            sort: 'name',
          };
          node.namespaces.push(_ns);
        }

        let _ns = node.namespaces.filter((item) => {
          return item.name === pod.data.metadata.namespace;
        })[0];
        _ns.pods.push(pod);
      });
    });
  }

  refreshNodes() {
    this.cluster
      .getNodes()
      .then((nodes) => {
        return this.nodesMap.forEach((issetNode) => {
          let equalNode = nodes.filter((item) => {
            return item.metadata.uid === issetNode.data.metadata.uid;
          });
          if (equalNode.length > 0) {
            equalNode = equalNode[0];
            issetNode.update(equalNode);
          }
        });
      })
      .then(() => {
        this.timeout(() => {
          this.refreshNodes();
        }, this.refreshRate);
      });
  }

  getNamespaceMap() {
    this.cluster.getNamespaces().then((namespaces) => {
      let namespaceStore = [];
      let getStore = store.getObject('namespaceStore');
      if (getStore) {
        namespaceStore = getStore;
      }
      namespaces.forEach((namespace) => {
        let ns = new Namespace(namespace);
        this.namespaceMap.push(ns);
        let index = namespaceStore.findIndex((item) => item.name === ns.name);

        if (index > -1) {
          ns.open = namespaceStore[index].open;
        } else {
          namespaceStore.push({ name: ns.name, open: ns.open });
        }
      });
      store.setObject('namespaceStore', namespaceStore);

      let _promises = [];
      _promises.push(this.attachDeployments());
      _promises.push(this.attachStatefulsets());
      _promises.push(this.attachDaemonsets());
      _promises.push(this.getClusterCronJobs());
      _promises.push(this.getClusterJobs());

      this.$q.all(_promises).then(() => {
        this.attachJobs();
        this.attachCronJobs();

        let _psPromises = [];
        _psPromises.push(this.getAllServices());
        _psPromises.push(this.getPods());
        this.$q.all(_psPromises).then(() => {
          this.attachPodsToMap();
          this.namespaceMapReady = true;
        });
      });
    });
  }

  refreshNamespaceMap() {
    this.cluster.getNamespaces().then((namespaces) => {
      let namespaceStore = [];
      namespaces.forEach((namespace) => {
        let ns = new Namespace(namespace);
        if (this.namespaceMap.every((item) => item.name !== ns.name)) {
          this.namespaceMap.push(ns);
          const storeIndex = namespaceStore.findIndex((item) => item.name === ns.name);
          if (storeIndex > -1) {
            ns.open = namespaceStore[storeIndex].open;
          } else {
            namespaceStore.push({ name: ns.name, open: ns.open });
          }
        }
      });
      this.namespaceMap.forEach((ns, index) => {
        if (namespaces.every((item) => item.metadata.name !== ns.name)) {
          this.namespaceMap.splice(index, 1);
          const storeIndex = namespaceStore.findIndex((item) => item.name === ns.name);
          if (storeIndex > -1) {
            namespaceStore.splice(storeIndex, 1);
          }
        }
      });
      store.setObject('namespaceStore', namespaceStore);

      let _promises = [];
      _promises.push(this.refreshDeployments());
      _promises.push(this.refreshStatefulsets());
      _promises.push(this.refreshDaemonsets());
      _promises.push(this.getClusterCronJobs());
      _promises.push(this.refreshJobs());

      this.$q.all(_promises).then(() => {
        let _psPromises = [];
        _psPromises.push(this.getAllServices());
        this.$q.all(_psPromises).then(() => {
          this.attachPodsToMap();
          this.namespaceMapReady = true;
        });
      });
    });
  }

  attachDeployments() {
    return this.cluster.getDeployments().then((deployments) => {
      deployments.forEach((item) => {
        let deploy = new Deployment(item);
        let _ns = this.__getNamespace(item.metadata.namespace);
        this.storeDeployments.push(deploy);
        _ns.deployments.push(deploy);
      });
    });
  }

  refreshDeployments() {
    this.cluster.getDeployments().then((newDeployments) => {
      this.storeDeployments
        .filter((deployment) => {
          return !deployment.is_deleted;
        })
        .forEach((issetDeployment) => {
          let equalDeployment = newDeployments.filter((item) => {
            return item.metadata.uid === issetDeployment.data.metadata.uid;
          });
          if (equalDeployment.length > 0) {
            equalDeployment = equalDeployment[0];
          } else {
            equalDeployment = false;
          }

          if (equalDeployment !== false) {
            issetDeployment.update(equalDeployment);
            newDeployments.splice(newDeployments.indexOf(equalDeployment), 1);
          } else {
            issetDeployment.destroy();
          }
        });
      newDeployments = newDeployments.map((newDeployment) => new Deployment(newDeployment));
      this.storeDeployments = this.storeDeployments.concat(newDeployments);

      newDeployments.forEach((newDeployment) => {
        let _ns = this.__getNamespace(newDeployment.data.metadata.namespace);
        _ns.deployments.push(newDeployment);
      });
    });
  }

  attachStatefulsets() {
    return this.cluster.getStatefulsets().then((statefulsets) => {
      statefulsets.forEach((item) => {
        let _ns = this.__getNamespace(item.metadata.namespace);
        let ss = new Statefulset(item);
        _ns.statefulsets.push(ss);
        this.storeStatefulSets.push(ss);
      });
    });
  }

  refreshStatefulsets() {
    this.cluster.getStatefulsets().then((Statefulsets) => {
      this.storeStatefulSets
        .filter((statefulset) => {
          return !statefulset.is_deleted;
        })
        .forEach((issetStatefulset) => {
          let equalStatefulset = Statefulsets.filter((item) => {
            return item.metadata.uid === issetStatefulset.data.metadata.uid;
          });
          if (equalStatefulset.length > 0) {
            equalStatefulset = equalStatefulset[0];
          } else {
            equalStatefulset = false;
          }

          if (equalStatefulset !== false) {
            issetStatefulset.update(equalStatefulset);
            Statefulsets.splice(Statefulsets.indexOf(equalStatefulset), 1);
          } else {
            issetStatefulset.destroy();
          }
        });
      Statefulsets = Statefulsets.map((newStatefulset) => new Statefulset(newStatefulset));
      this.storeStatefulSets = this.storeStatefulSets.concat(Statefulsets);

      Statefulsets.forEach((newStatefulset) => {
        let _ns = this.__getNamespace(newStatefulset.data.metadata.namespace);
        _ns.statefulsets.push(newStatefulset);
      });
    });
  }

  attachDaemonsets() {
    return this.cluster.getDaemonsets().then((daemonsets) => {
      daemonsets.forEach((item) => {
        let _ns = this.__getNamespace(item.metadata.namespace);
        let ds = new Daemonset(item);
        _ns.daemonsets.push(ds);
        this.storeDaemonSets.push(ds);
      });
    });
  }

  refreshDaemonsets() {
    this.cluster.getDaemonsets().then((Daemonsets) => {
      this.storeDaemonSets
        .filter((daemonset) => {
          return !daemonset.is_deleted;
        })
        .forEach((issetDaemonSet) => {
          let equalDaemonSet = Daemonsets.filter((item) => {
            return item.metadata.uid === issetDaemonSet.data.metadata.uid;
          });
          if (equalDaemonSet.length > 0) {
            equalDaemonSet = equalDaemonSet[0];
          } else {
            equalDaemonSet = false;
          }

          if (equalDaemonSet !== false) {
            issetDaemonSet.update(equalDaemonSet);
            Daemonsets.splice(Daemonsets.indexOf(equalDaemonSet), 1);
          } else {
            issetDaemonSet.destroy();
          }
        });
      Daemonsets = Daemonsets.map((newDaemonset) => new Daemonset(newDaemonset));
      this.storeDaemonSets = this.storeDaemonSets.concat(Daemonsets);

      Daemonsets.forEach((newDaemonset) => {
        let _ns = this.__getNamespace(newDaemonset.data.metadata.namespace);
        _ns.daemonsets.push(newDaemonset);
      });
    });
  }

  attachJobs() {
    this.namespaceMap.forEach((ns) => {
      let jobsList = this.storeJobs.filter(
        (job) => !job.data.metadata.ownerReferences && job.data.metadata.namespace === ns.name
      );
      let ns_crons = this.storeCronJobs.filter((cron) => cron.data.metadata.namespace === ns);
      ns_crons.forEach((cj) => {
        let uid = cj.data.metadata.uid;
        this.storeJobs.forEach((job) => {
          if (job.data.metadata.ownerReferences) {
            if (!job.data.metadata.ownerReferences.filter((item) => item.kind === 'CronJob' && item.uid === uid)[0]) {
              jobsList.push(job);
            }
          }
        });
      });

      ns.jobs = jobsList;
    });
  }

  attachCronJobs() {
    this.namespaceMap.forEach((ns) => {
      ns.cronJobs = this.storeCronJobs.filter((cron) => cron.data.metadata.namespace === ns.name);

      ns.cronJobs.forEach((cj) => {
        let uid = cj.data.metadata.uid;
        let jobsList = [];

        this.storeJobs.forEach((job) => {
          if (job.data.metadata.ownerReferences) {
            if (job.data.metadata.ownerReferences.filter((item) => item.kind === 'CronJob' && item.uid === uid)[0]) {
              jobsList.push(job);
            }
          }
        });

        cj.jobs = jobsList;
      });
    });
  }

  attachPodsToMap() {
    this.namespaceMap.forEach((ns) => {
      ns.deployments.forEach((deployment) => {
        deployment.pods = this.__findPodsBySelector(deployment.data.spec.selector.matchLabels, ns.name);
        deployment.services = this.__findServices(deployment);
      });
      ns.statefulsets.forEach((statefulset) => {
        statefulset.pods = this.__findPodsBySelector(statefulset.data.spec.selector.matchLabels, ns.name);
        statefulset.services = this.__findServices(statefulset);
      });
      ns.daemonsets.forEach((daemonset) => {
        daemonset.pods = this.__findPodsBySelector(daemonset.data.spec.selector.matchLabels, ns.name);
        daemonset.services = this.__findServices(daemonset);
      });

      ns.jobs.forEach((job) => {
        job.pods = this.__findPodsBySelector(job.data.metadata.labels, ns.name);
      });

      ns.cronJobs.forEach((cron) => {
        cron.jobs.map((job) => {
          job.pods = this.__findPodsBySelector(job.data.metadata.labels, ns.name);
        });
      });

      ns.other[0].pods = this.storePods.filter((item) => !item.used && item.data.metadata.namespace === ns.name);
    });
  }

  updateJobs() {
    let _promises = [];

    _promises.push(this.refreshJobs());

    this.$q.all(_promises).then(() => {
      this.attachJobs();
      this.attachCronJobs();
    });
  }

  __findPodsBySelector(filter, namespace, pods = this.storePods) {
    return pods
      .filter((item) => {
        return item.data.metadata.namespace === namespace;
      })
      .filter((item) => {
        let labels = item.data.metadata.labels;

        if (typeof labels === 'undefined') {
          return false;
        } else {
          for (let prop in filter) {
            if (!labels.hasOwnProperty(prop)) {
              return false;
            }
            if (labels[prop] !== filter[prop]) {
              return false;
            }
          }
        }
        item.used = true;
        return true;
      });
  }

  __findServices(entity) {
    return this.storeServices.filter((item) => {
      if (!item.data.spec || !item.data.spec.selector) {
        return false;
      }
      let matchLabels = item.data.spec.selector;
      let result = this.__findPodsBySelector(matchLabels, item.data.metadata.namespace, entity.pods);
      if (result.length > 0) {
        return true;
      }

      return false;
    });
  }

  __prepareDS() {
    return this.datasourceSrv.get(this.location.search().clusterName).then((ds) => {
      this.cluster = ds;
      this.__setRefreshRate(this.cluster.refreshRate);
      return this.getPrometheusDS(this.cluster.prometheus).then(() => {
        this.pageReady = true;
      });
    });
  }

  getPrometheusDS(name) {
    return this.datasourceSrv.get(name).then((ds) => {
      this.prometheusDS = new PrometheusProxy(ds);
    });
  }

  getPods(skipEmptyHost = false) {
    return this.cluster.getPods().then((pods) => {
      if (pods instanceof Array) {
        this.podsError = false;
        if (skipEmptyHost) {
          pods = pods.filter((pod) => typeof pod.status.hostIP !== 'undefined');
        }
        this.storePods = pods.map((pod) => new Pod(pod));
      } else if (pods instanceof Error) {
        this.podsError = pods;
      }

      this.timeout(() => {
        this.refreshPods(skipEmptyHost);
      }, this.refreshRate);
    });
  }

  refreshPods(skipEmptyHost = false) {
    this.cluster.getPods().then((pods) => {
      if (pods instanceof Array) {
        this.podsError = false;

        if (skipEmptyHost) {
          pods = pods.filter((pod) => typeof pod.status.hostIP !== 'undefined');
        }

        this.storePods
          .filter((pod) => !pod.is_deleted)
          .forEach((issetPod) => {
            let equalPod = pods.filter((item) => {
              return item.metadata.uid === issetPod.data.metadata.uid;
            });
            if (equalPod.length > 0) {
              equalPod = equalPod[0];
            } else {
              equalPod = false;
            }

            if (equalPod !== false) {
              issetPod.update(equalPod);
              pods.splice(pods.indexOf(equalPod), 1);
            } else {
              issetPod.destroy();
            }
          });
        pods = pods.map((pod) => new Pod(pod));
        this.storePods = this.storePods.concat(pods);
        this.updatePods(pods);
      } else if (pods instanceof Error) {
        this.podsError = pods;
      }
    });

    this.timeout(() => {
      this.refreshPods(skipEmptyHost);
    }, this.refreshRate);
  }

  getClusterComponents() {
    this.cluster.getComponents().then((components) => {
      if (components instanceof Array) {
        this.componentsError = false;
        this.storeComponents = components.map((component) => new Component(component));
      } else if (components instanceof Error) {
        this.componentsError = components;
      }

      this.timeout(() => {
        this.refreshClusterComponents();
      }, this.refreshRate);
    });
  }

  refreshClusterComponents() {
    this.cluster.getComponents().then((components) => {
      if (components instanceof Array) {
        this.componentsError = false;
        this.storeComponents = components.map((component) => new Component(component));
      } else if (components instanceof Error) {
        this.componentsError = components;
      }

      this.timeout(() => {
        this.refreshClusterComponents();
      }, this.refreshRate);
    });
  }

  getAllServices() {
    return this.cluster.getServices().then((services) => {
      this.storeServices = services.map((service) => new Service(service));
    });
  }

  getClusterJobs() {
    return this.cluster.getJobs().then((jobs) => {
      this.storeJobs = jobs.map((job) => new Job(job));
    });
  }

  getClusterCronJobs() {
    return this.cluster.getCronJobs().then((cronjobs) => {
      this.storeCronJobs = cronjobs.map((cronjob) => new Cronjob(cronjob));
    });
  }

  refreshJobs() {
    return this.cluster.getJobs().then((newJobs) => {
      this.storeJobs
        .filter((job) => {
          return !job.is_deleted;
        })
        .forEach((issetJob) => {
          let equalPod = newJobs.filter((item) => {
            return item.metadata.uid === issetJob.data.metadata.uid;
          });
          if (equalPod.length > 0) {
            equalPod = equalPod[0];
          } else {
            equalPod = false;
          }

          if (equalPod !== false) {
            issetJob.update(equalPod);
            newJobs.splice(newJobs.indexOf(equalPod), 1);
          } else {
            issetJob.destroy();
          }
        });
      newJobs = newJobs.map((newJob) => new Job(newJob));
      this.storeJobs = this.storeJobs.concat(newJobs);
    });
  }

  __getNamespace(namespace) {
    return this.namespaceMap.filter((ns) => {
      return ns.name === namespace;
    })[0];
  }

  __setRefreshRate(rate) {
    if (rate === undefined) {
      this.refreshRate = REFRESH_RATE_DEFAULT;
    } else {
      this.refreshRate = rate * 1000;
    }
  }

  __getPodsLength(pods = []) {
    return pods.filter((item) => !item.is_deleted).length;
  }

  getWarningPods() {
    let warningPods = this.storePods.filter((item) => this.podIsWarning(item));
    if (warningPods.length > 0 && warningPods.filter((pod) => pod.message === 'Undefined error').length > 0) {
      this.storePods.forEach((pod, index) => {
        if (this.podIsWarning(pod) && pod.message === 'Undefined error' && this.storeEvents) {
          const event = this.storeEvents.find((event) => event.involvedObject.name === pod.name);
          if (event !== undefined) {
            this.storePods[index].message = event.message;
          }
        }
      });
    }

    return this.sortByStatus(warningPods);
  }

  sortByStatus(array: Array<{ status: number }>, rule = [ERROR, WARNING, SUCCESS, SUCCEEDED, TERMINATING]): any[] {
    const sorted = [];

    rule.forEach((status) => {
      sorted.push(...array.filter((pod) => pod.status === status));
    });

    return sorted;
  }

  getWarningNodes() {
    return this.nodesMap.filter((item) => item.status === ERROR);
  }

  goTo(id) {
    let pod = null;
    if (id) {
      pod = document.getElementsByClassName(id)[0];
    }
    if (pod) {
      pod.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  getAlertsNodesByCPU(status: 'cpuStatus' | 'cpuStatusRequested' = 'cpuStatus') {
    return this.nodesMap.filter((item) => item[status] === WARNING || item[status] === ERROR);
  }

  getAlertsNodesByMemory(status: 'memoryStatus' | 'memoryStatusRequested' = 'memoryStatus') {
    return this.nodesMap.filter((item) => item[status] === WARNING || item[status] === ERROR);
  }

  getAlertsNodesByPods(status: 'podsStatus' = 'podsStatus') {
    return this.nodesMap.filter((item) => item[status] === WARNING || item[status] === ERROR);
  }

  getAlertsComponents() {
    return this.storeComponents.filter((item) => item.status === ERROR);
  }

  getEvents() {
    this.cluster.getEvents().then((events) => {
      this.storeEvents = events;

      this.timeout(() => {
        this.getEvents();
      }, this.refreshRate);
    });
  }

  podIsWarning(pod: Pod): boolean {
    if (!pod.is_deleted) {
      if (pod.status === WARNING || pod.status === ERROR || pod.status === TERMINATING) {
        return true;
      }
      return !this.validResources(pod);
    }
    return false;
  }

  validResources(pod: Pod): boolean {
    return pod.data.spec.containers.every((container) => {
      const msgCpu = [];
      const msgMemory = [];

      if (pod.data.metadata.namespace !== 'kube-system' && pod.status !== SUCCEEDED) {
        if (!container.resources.requests || !container.resources.requests.cpu) {
          msgCpu.push('CPU request');
        }
        if (!container.resources.limits || !container.resources.limits.cpu) {
          msgCpu.push('CPU limit');
        }
        if (!container.resources.requests || !container.resources.requests.memory) {
          msgMemory.push('Memory request');
        }
        if (!container.resources.limits || !container.resources.limits.memory) {
          msgMemory.push('Memory limit');
        }
      }

      if (msgCpu.length > 0 || msgMemory.length > 0) {
        pod.message = `Container "${container.name}":
                 ${msgCpu.length && 'Specify ' + msgCpu.join(' and ') + ';'}
                 ${msgMemory.length && 'Specify ' + msgMemory.join(' and ') + ';'}`;
        return false;
      }

      return true;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
