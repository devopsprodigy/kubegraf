///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import store from "../../common/store";

import {K8sPage} from "../k8s-page";

export class ClusterOverview extends K8sPage{

    columnNames: Array<{
        colName: string,
        nsKey: string
    }>;

    hideAllWarningPods: boolean;

    static templateUrl = 'components/cluster-overview/cluster-overview.html';

    constructor(
        $scope,
        $injector,
        public $q,
        public backendSrv,
        public datasourceSrv,
        public contextSrv,
        public $location,
        public $timeout
    ){
        super($scope, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $q);
        this.pageReady = false;


        this.__prepareDS().then(() => {
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
        ]

        this.hideAllWarningPods = true;
    }

    __showAll(){
        this.toggleNamespace(true);
    }

    __hideAll(){
        this.toggleNamespace(false);
    }

    namespaceClick(event, namespace) {
        if (event.ctrlKey) {
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
        this.updateJobs();
        this.namespaceMap.forEach(ns => {
            ns.deployments.forEach(deployment => {
                let pods = this.__findPodsBySelector(deployment.data.spec.selector.matchLabels, ns.name, newPods);
                deployment.pods = deployment.pods.concat(pods);
            });
            ns.statefulsets.forEach(statefulset => {
                let pods = this.__findPodsBySelector(statefulset.data.spec.selector.matchLabels, ns.name, newPods);
                statefulset.pods = statefulset.pods.concat(pods);
            });
            ns.daemonsets.forEach(daemonset => {
                let pods = this.__findPodsBySelector(daemonset.data.spec.selector.matchLabels, ns.name, newPods);
                daemonset.pods = daemonset.pods.concat(pods);
            });

            ns.jobs.forEach(job =>{
                job.pods = this.__findPodsBySelector(
                    job.data.metadata.labels,
                    ns.name
                );
            });

            ns.cronJobs.forEach(cron =>{
                cron.jobs.map(job => {
                    job.pods = this.__findPodsBySelector(
                        job.data.metadata.labels,
                        ns.name
                    );
                });
            });

            ns.other[0].pods = ns.other[0].pods.concat(newPods.filter(item => !item.used && item.data.metadata.namespace === ns.name));
        });
    }

    toggleAllWarningPods(){
        this.hideAllWarningPods = !this.hideAllWarningPods;
    }

}
