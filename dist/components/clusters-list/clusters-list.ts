///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import appEvents from "app/core/app_events";

export class ClustersList {
    isReady: boolean;
    clusters: Array<any>;
    $scope: any;

    static templateUrl = 'components/clusters-list/clusters-list.html';

    constructor($scope, $injector, private backendSrv, private utilSrv){
        this.isReady = false;
        this.$scope = $scope;
        document.title = 'DevOpsProdigy KubeGraf';
        this.getClusters().then(() => {
            this.isReady = true;
        });
    }

    getClusters(){
        return this.backendSrv.get('/api/datasources')
            .then(res => {
                this.clusters = res.filter(item => {
                    return item.type === 'devopsprodidy-kubegraf-datasource'
                });
            })
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
                this.getClusters();
            })
    }
}
