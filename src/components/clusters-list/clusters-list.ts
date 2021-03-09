///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import appEvents from "grafana/app/core/app_events";
import { __getGrafanaVersion } from "../../common/helpers";

export class ClustersList {
    isReady: boolean;
    clusters: Array<any>;
    $scope: any;
    isAdmin: boolean;
    version: number;

    static templateUrl = 'components/clusters-list/clusters-list.html';

    constructor($scope, $injector, private backendSrv, private datasourceSrv, private contextSrv, private utilSrv, private $window) {
        this.isReady = false;
        this.$scope = $scope;
        this.version = __getGrafanaVersion($window);
        document.title = 'DevOpsProdigy KubeGraf';

        try {
            this.getClusters().then(() => {
                this.isReady = true
                this.$scope.$apply()
            });
        } catch (e) {
            console.error(e);
        }

        try {
            this.isAdmin = this.contextSrv.hasRole('Admin');
        } catch (e) {
            console.error(e);
            this.isAdmin = false;
        }
    }

    async getClusters() {
        const datasources = await this.datasourceSrv.getAll()
        const type = 'devopsprodidy-kubegraf-datasource'

        if (Array.isArray(datasources)) {
            this.clusters = datasources.filter(item => {
                return item.type === type
            });
        } else {
            let clusters = [];
            Object.keys(datasources).forEach(key => {
                if (datasources[key].type === type) {
                    clusters.push(datasources[key])
                }
            });
            this.clusters = clusters
        }
    }

    deleteCluster(cluster) {
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

    confirmDelete(id) {
        this.backendSrv.delete('/api/datasources/' + id)
            .then(() => {
                this.clusters = this.clusters.filter(item => {
                    return item.id !== id
                });
                this.$scope.$apply();
            });
    }
}
