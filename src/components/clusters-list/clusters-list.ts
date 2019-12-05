///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import appEvents from "app/core/app_events";

export class ClustersList {
    isReady: boolean;
    clusters: Array<any>;
    $scope: any;
    isAdmin: boolean;

    static templateUrl = 'components/clusters-list/clusters-list.html';

    constructor($scope, $injector, private backendSrv, private datasourceSrv, private contextSrv, private utilSrv){
        this.isReady = false;
        this.$scope = $scope;
        document.title = 'DevOpsProdigy KubeGraf';
        try{
            this.getClusters();
        }catch (e) {
            console.error(e);
        }finally {
            this.isReady = true;
        }
        try{
            this.isAdmin = this.contextSrv.isGrafanaAdmin;
        }catch (e) {
            console.error(e);
            this.isAdmin = false;
        }
    }

    getClusters() {
        const list = this.datasourceSrv.getAll();
        const type = 'devopsprodidy-kubegraf-datasource';
        console.log(list);
        if (Array.isArray(list)) {
            this.clusters = list.filter(item => {
                return item.type === type
            });
        } else {
            let clusters = [];
            Object.keys(list).forEach(key => {
                if (list[key].type === type) {
                    clusters.push(list[key])
                }
            });
            this.clusters = clusters;
        }
    }

    deleteCluster(cluster){
        appEvents.emit('confirm-modal', {
            title: 'Delete',
            text: 'Are you sure you want to delete this cluster?',
            yesText: "Delete",
            icon: "fa-trash",
            onConfirm: () => {
                this.confirmDelete(cluster.id);
            }
        });

    }

    confirmDelete(id){
        this.backendSrv.delete('/api/datasources/' + id)
            .then(() => {
                this.clusters = this.clusters.filter(item => {
                    return item.id !== id
                });
                // this.getClusters();
            });
    }
}
