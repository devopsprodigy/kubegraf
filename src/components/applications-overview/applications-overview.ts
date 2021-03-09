import store from '../../common/store';

import { K8sPage } from '../k8s-page';
import { __getGrafanaVersion } from '../../common/helpers';

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
        colName: 'Other',
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

    const showColumnFromStorage = localStorage.getItem(this.storageShowColumnKey);
    this.showColumn = showColumnFromStorage ? JSON.parse(showColumnFromStorage) : { cronJobs: {}, jobs: {} };
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
    return namespaces.filter((item) => item.is_deleted === false);
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
    localStorage.setItem(this.storageShowColumnKey, JSON.stringify(this.showColumn));
  }

  showCheck(columnName: string, namespace: string): boolean {
    return (
      (columnName !== 'jobs' && columnName !== 'cronJobs') ||
      (this.showColumn[columnName][namespace] !== undefined && this.showColumn[columnName][namespace] !== false)
    );
  }
}
