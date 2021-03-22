import { K8sPage } from '../k8s-page';
import { Node } from '../../common/types/node';
import store from '../../common/store';
import { __convertToGB, __roundCpu, __convertToMicro, __getGrafanaVersion } from '../../common/helpers';
import { Pod } from '../../common/types/pod';

export class NodesOverview extends K8sPage {
  static templateUrl = 'components/nodes-overview/nodes-overview.html';
  static $inject = [
    '$scope',
    '$injector',
    '$q',
    'backendSrv',
    'datasourceSrv',
    'contextSrv',
    '$location',
    '$timeout',
    '$window',
  ];
  version: number;
  open: { [key: string]: boolean };
  storageOpenKey = 'nodes-overview-open';
  serverInfo: any = null;
  hideAllWarningPods = true;
  showScrollButton = false;

  constructor(
    $scope,
    $injector,
    public $q,
    public backendSrv,
    public datasourceSrv,
    public contextSrv,
    public $location,
    public $timeout,
    private $window
  ) {
    super($scope, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $q, $window);
    this.pageReady = false;
    this.version = __getGrafanaVersion($window);

    this.__prepareDS().then(() => {
      this.getEvents();
      this.getNodeMap()
        .then(() => {
          if (this.nodesMap.length > 0 && this.serverInfo === null) {
            this.getServerInfo();
          }
          this.pageReady = true;
        })
        .then(() => {
          this.getResourcesMetrics().then(() => {});
        });
    });

    const openFromStorage = localStorage.getItem(this.storageOpenKey);
    this.open = openFromStorage ? JSON.parse(openFromStorage) : {};

    const elem = document.querySelector('.scroll-canvas');
    elem.addEventListener('scroll', () => {
      this.showScrollButton = elem.scrollTop > 64;
      $scope.$apply();
    });
  }

  getServerInfo() {
    this.serverInfo = {};
    this.__getServersInfo(this.nodesMap).then((res) => {
      this.serverInfo = res;
    });
  }

  showAllPodsNS(ns) {
    ns.limit = false;
  }

  toggleNsList(node) {
    node.hideNs = !node.hideNs;

    /*let key = node.name + 'NsList';
        let state = store.get(key);

        if (state === 'false') {
            state = false;
        } else if (state === 'true') {
            state = true;
        }

        store.set(key, !state);*/
  }

  updatePods(newPods: Pod[]): void {
    this.insertPodsToNodesMap(newPods);
  }

  summary(ns, metric) {
    let res = 0;

    if (ns.pods) {
      res = ns.pods.reduce((prevValue, pod) => {
        if (pod.sourceMetrics[metric]) {
          return prevValue + pod.sourceMetrics[metric];
        }
        return prevValue;
      }, 0);
    }

    switch (metric) {
      case 'cpuUsed':
        return __convertToMicro(res.toFixed(3));
      case 'cpuRequested':
        return __convertToMicro(__roundCpu(res));
      case 'cpuLimit':
        return __convertToMicro(__roundCpu(res));
      case 'memoryUsed':
        return __convertToGB(res);
      case 'memoryRequested':
        return __convertToGB(res);
      case 'memoryLimit':
        return __convertToGB(res);
      default:
        return 'N-A';
    }
  }

  nodeClick(event, node) {
    if (event.ctrlKey) {
      if (node.open) {
        event.preventDefault();
      }
      this.toggleNodes(node);
    } else {
      node.toggle();
    }
  }

  __showAll() {
    this.toggleNodes(true);
  }

  __hideAll() {
    this.toggleNodes(false);
  }

  toggleNodes(node: boolean | any) {
    store.delete('nodeStore');
    let nodeStore = [];
    this.nodesMap.map((ns) => {
      ns.open = node === true || node === false ? node : node.name === ns.name;
      nodeStore.push({ name: ns.name, open: ns.open });
    });
    store.setObject('nodeStore', nodeStore);
  }

  podsFilterIsDeleted(pods: Pod[]) {
    return pods.filter((pod) => pod.is_deleted === false);
  }

  sort(key, nsIndex, nodeIndex) {
    if (this.nodesMap[nodeIndex] && this.nodesMap[nodeIndex].namespaces[nsIndex]) {
      if (this.nodesMap[nodeIndex].namespaces[nsIndex].sort.indexOf(key) === 0) {
        this.nodesMap[nodeIndex].namespaces[nsIndex].sort = '-' + key;
      } else {
        this.nodesMap[nodeIndex].namespaces[nsIndex].sort = key;
      }
    }
  }

  icon(key, nsIndex, nodeIndex) {
    if (this.nodesMap[nodeIndex] && this.nodesMap[nodeIndex].namespaces[nsIndex]) {
      if (this.nodesMap[nodeIndex].namespaces[nsIndex].sort.indexOf(key) === 0) {
        return '<i class="fa fa-long-arrow-down"></i>';
      } else if (this.nodesMap[nodeIndex].namespaces[nsIndex].sort.indexOf('-' + key) === 0) {
        return '<i class="fa fa-long-arrow-up"></i>';
      }
    }
    return '<i class="fa fa-long-arrow-up grey"></i>';
  }

  toggleAllWarningPods() {
    this.hideAllWarningPods = !this.hideAllWarningPods;
  }

  nodeCount(): number {
    return this.nodesMap ? this.nodesMap.length : 0;
  }

  nodeActiveCount(): number {
    return this.nodesMap ? this.nodesMap.filter((node) => node.open).length : 0;
  }

  toggleTab(nodeName: string): void {
    if (this.open[nodeName] === undefined) {
      this.open[nodeName] = false;
    } else {
      this.open[nodeName] = !this.open[nodeName];
    }
    localStorage.setItem(this.storageOpenKey, JSON.stringify(this.open));
  }
}
