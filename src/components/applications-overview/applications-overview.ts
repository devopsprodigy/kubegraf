///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import store from "../../common/store";

import {K8sPage} from "../k8s-page";
import { __getGrafanaVersion } from "../../common/helpers";

export class ApplicationsOverview extends K8sPage{

    columnNames: Array<{
        colName: string,
        nsKey: string
    }>;
    hideAllWarningPods: boolean;
    version: number;

    static templateUrl = 'components/applications-overview/applications-overview.html';

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
    ){
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
              nsKey: 'deployments'
            },
            {
                colName: 'Statefulsets',
                nsKey: 'statefulsets'
            },
            {
                colName: 'Daemonsets',
                nsKey: 'daemonsets'
            },
            {
                colName: 'Cron Jobs',
                nsKey: 'cronJobs'
            },
            {
                colName: 'Jobs',
                nsKey: 'jobs'
            },
            {
                colName: 'Other',
                nsKey: 'other'
            },
        ];

        this.hideAllWarningPods = true;
    }

    __showAll(){
        this.toggleNamespace(true);
    }

    __hideAll(){
        this.toggleNamespace(false);
    }

    namespaceClick(event, namespace) {
        if (event.ctrlKey || event.metaKey) {
            if(namespace.open) {
                event.preventDefault();
            }
            this.toggleNamespace(namespace);
        } else {
            namespace.toggle();
        }
    }

    toggleNamespace(namespace: boolean|any) {
        store.delete('namespaceStore');
        let namespaceStore = [];
        this.namespaceMap.map(ns => {
            ns.open = namespace === true || namespace === false ? namespace : namespace.name === ns.name;
            namespaceStore.push({name: ns.name, open: ns.open});
        });
        store.setObject('namespaceStore', namespaceStore);
    }

    updatePods(newPods): void {
        this.refreshNamespaceMap()
    }

    toggleAllWarningPods(){
        this.hideAllWarningPods = !this.hideAllWarningPods;
    }

    namespaceFilterIsDeleted(namespaces) {
        return namespaces.filter(item => item.is_deleted === false)
    }

}
