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

    constructor($scope, $injector, private backendSrv, private datasourceSrv, private contextSrv, private utilSrv, private $window){
        this.isReady = false;
        this.$scope = $scope;
        this.version = __getGrafanaVersion($window);
        document.title = 'DevOpsProdigy KubeGraf';
        this.clusterPermissions = new ClusterPermissions(backendSrv, contextSrv);
        this.isAdmin = this.clusterPermissions.isAdmin();

        try {
            this.getClusters();
        } catch (e) {
            console.error(e);
        } finally {
            this.isReady = true;
        }
    }

    getClusters() {
        const list = this.datasourceSrv.getAll();
        if (Array.isArray(list)) {
            this.clusters = list.filter(item => {
                return item.type === TYPE_KUBEGRAF_PLUGIN
            }).filter(item => {
                return item.jsonData ? this.clusterPermissions.checkPermission(item.jsonData.permissions) : false
            });
        } else {
            let clusters = [];
            Object.keys(list).forEach(key => {
                if (list[key].type === TYPE_KUBEGRAF_PLUGIN) {
                    if (list[key].jsonData ? this.clusterPermissions.checkPermission(list[key].jsonData.permissions) : false) {
                        clusters.push(list[key])
                    }
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
