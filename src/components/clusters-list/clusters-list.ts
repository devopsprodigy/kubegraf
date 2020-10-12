///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import appEvents from "grafana/app/core/app_events";
import { __getGrafanaVersion } from "../../common/helpers";
import { TYPE_KUBEGRAF_PLUGIN } from "../../common/constants";
import { ClusterPermissions } from "../../common/cluster-permissions";

export class ClustersList {
    isReady: boolean;
    clusters: Array<any>;
    $scope: any;
    isAdmin: boolean;
    version: number;
    clusterPermissions: ClusterPermissions;

    static templateUrl = 'components/clusters-list/clusters-list.html';

    constructor($scope, $injector, private backendSrv, private datasourceSrv, private contextSrv, private utilSrv, private $window) {
        this.isReady = false;
        this.$scope = $scope;
        this.version = __getGrafanaVersion($window);
        document.title = 'DevOpsProdigy KubeGraf';
        this.clusterPermissions = new ClusterPermissions(backendSrv, contextSrv);
        this.isAdmin = this.clusterPermissions.isAdmin();

        try {
            this.getClusters().then(() => {
                this.isReady = true
                this.$scope.$apply()
            });
        } catch (e) {
            console.error(e);
        }
    }

    async getClusters() {
        const datasources = await this.backendSrv.get('/api/datasources/');
        if (Array.isArray(datasources)) {
            this.clusters = datasources.filter(item => {
                return item.type === TYPE_KUBEGRAF_PLUGIN
            }).filter(item => {
                return item.jsonData ? this.clusterPermissions.checkPermission(item.jsonData.permissions) : false
            });
        } else {
            let clusters = [];
            Object.keys(datasources).forEach(key => {
                if (datasources[key].type === TYPE_KUBEGRAF_PLUGIN) {
                    if (datasources[key].jsonData ? this.clusterPermissions.checkPermission(datasources[key].jsonData.permissions) : false) {
                        clusters.push(datasources[key])
                    }
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
