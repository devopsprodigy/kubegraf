import store from '../../common/store';

import { K8sPage } from '../k8s-page';
import { __getGrafanaVersion } from '../../common/helpers';
import { TYPE_DATASOURCE } from "../../common/constants";

export class ApplicationsOverview extends K8sPage {
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
  static templateUrl = 'components/applications-overview/applications-overview.html';
  columnNames: Array<{
    colName: string;
    nsKey: string;
  }>;
  hideAllWarningPods: boolean;
  version: number;
  open: { [key: string]: boolean };
  storageOpenKey = 'application-overview-open';
  showColumn: { [key: string]: { [key: string]: boolean } };
  storageShowColumnKey = 'application-overview-show-column';
  showScrollButton = false;
  clusters: any[];

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
      this.getClusters();
      this.getClusterComponents();
      this.getNamespaceMap();
    });

    this.columnNames = [
      {
        colName: 'Deployments',
        nsKey: 'deployments',
      },
      {
        colName: 'Statefulsets',
        nsKey: 'statefulsets',
      },
      {
        colName: 'Daemonsets',
        nsKey: 'daemonsets',
      },
      {
        colName: 'Other pods',
        nsKey: 'other',
      },
      {
        colName: 'Cron Jobs',
        nsKey: 'cronJobs',
      },
      {
        colName: 'Jobs',
        nsKey: 'jobs',
      },
    ];
    this.hideAllWarningPods = true;

    const openFromStorage = localStorage.getItem(this.storageOpenKey);
    this.open = openFromStorage ? JSON.parse(openFromStorage) : {};

    //const showColumnFromStorage = localStorage.getItem(this.storageShowColumnKey);
    const showColumnFromStorage = false;
    this.showColumn = showColumnFromStorage ? JSON.parse(showColumnFromStorage) : { cronJobs: {}, jobs: {}, other: {} };
    if (typeof this.showColumn.other === 'undefined') {
      this.showColumn.other = {};
    }

    const elem = document.querySelector('.scroll-canvas');
    elem.addEventListener('scroll', () => {
      this.showScrollButton = elem.scrollTop > 64;
      $scope.$apply();
    });
  }

  async getClusters() {
    const datasources = await this.datasourceSrv.getAll();
    const type = TYPE_DATASOURCE;

    if (Array.isArray(datasources)) {
      this.clusters = datasources.filter((item) => {
        return item.type === type;
      });
    } else {
      let clusters = [];
      Object.keys(datasources).forEach((key) => {
        if (datasources[key].type === type) {
          clusters.push(datasources[key]);
        }
      });
      this.clusters = clusters;
    }
  }

  __showAll() {
    this.toggleNamespace(true);
  }

  __hideAll() {
    this.toggleNamespace(false);
  }

  namespaceClick(event, namespace) {
    if (event.ctrlKey || event.metaKey) {
      if (namespace.open) {
        event.preventDefault();
      }
      this.toggleNamespace(namespace);
    } else {
      namespace.toggle();
    }
  }

  toggleNamespace(namespace: boolean | any) {
    store.delete('namespaceStore');
    let namespaceStore = [];
    this.namespaceMap.map((ns) => {
      ns.open = namespace === true || namespace === false ? namespace : namespace.name === ns.name;
      namespaceStore.push({ name: ns.name, open: ns.open });
    });
    store.setObject('namespaceStore', namespaceStore);
  }

  updatePods(newPods): void {
    this.refreshNamespaceMap();
  }

  toggleAllWarningPods() {
    this.hideAllWarningPods = !this.hideAllWarningPods;
  }

  namespaceFilterIsDeleted(namespaces) {
    return namespaces.filter((item) => item.is_deleted === false || typeof item.is_deleted === 'undefined');
  }

  namespaceCount(): number {
    return this.namespaceMap ? this.namespaceMap.length : 0;
  }

  namespaceActiveCount(): number {
    return this.namespaceMap ? this.namespaceMap.filter((namespace) => namespace.open).length : 0;
  }

  toggleTab(namespace: string): void {
    if (this.open[namespace] === undefined) {
      this.open[namespace] = false;
    } else {
      this.open[namespace] = !this.open[namespace];
    }
    localStorage.setItem(this.storageOpenKey, JSON.stringify(this.open));
  }

  toggleColumn(columnName: string, namespace: string): void {
    if (this.showColumn[columnName][namespace] === undefined) {
      this.showColumn[columnName][namespace] = true;
    } else {
      this.showColumn[columnName][namespace] = !this.showColumn[columnName][namespace];
    }
    //localStorage.setItem(this.storageShowColumnKey, JSON.stringify(this.showColumn));
  }

  showCheck(columnName: string, namespace: string): boolean {
    return (
      (columnName !== 'jobs' && columnName !== 'cronJobs' && columnName !== 'other') ||
      (this.showColumn[columnName][namespace] !== undefined && this.showColumn[columnName][namespace] !== false)
    );
  }
}
