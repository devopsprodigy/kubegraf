///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import appEvents from "grafana/app/core/app_events";
import {TYPE_PROMETHEUS} from "../../common/constants";
import { __getGrafanaVersion } from "../../common/helpers";

export class ClusterPermissions{
    $scope: any;
    cluster: any;
    busy: boolean;
    pageReady: boolean;
    version: number;
    permissionFormOpen: boolean = true;
    permissionFormValid: boolean = false;
    permissionGroup: string = "Team";
    permissionReceiver: number;
    permissionRole: string;
    users: any[];
    teams: any[];

    static templateUrl = 'components/cluster-permissions/cluster-permissions.html';

    constructor($scope, $injector, private backendSrv, private datasourceSrv, private alertSrv, private $q, private $location, private $window){
        document.title = 'DevOpsProdigy KubeGraf | Cluster Permissions';
        this.pageReady = false;
        this.$scope = $scope;
        this.busy = false;
        this.version = __getGrafanaVersion($window);
        this.getData().finally(() => {
            this.pageReady = true
            this.$scope.$apply();
        });
    }

    async getData() {
        await Promise.all([
            this.getCluster(),
            this.getUsers(),
            this.getTeams()
        ]);
    }

    async getCluster(): Promise<void> {
        if ("clusterId" in this.$location.search()) {
            await this.getDatasource(this.$location.search().clusterId);
        }
    }

    async getUsers() {
        const url = '/api/users/';
        await this.backendSrv.request({ url, method: 'GET' }).then(res => {
            this.users = res;
        })
    }

    async getTeams() {
        const url = '/api/teams/search';
        await this.backendSrv.request({ url, method: 'GET' }).then(res => {
            this.teams = res.teams;
        })
    }

    saveCluster(){
        return this.backendSrv.put('/api/datasources/' + this.cluster.id, this.cluster)
            .then(res => {
                return this.$q.resolve(res);
            }, err => {
                return this.$q.reject(err);
            });
    }

    getDatasource(id){
        return this.backendSrv.get('/api/datasources/' + id)
            .then(result => {
                if(!(result.jsonData.prom_name))
                    result.jsonData.prom_name = '';

                if(!(result.jsonData.refresh_pods_rate))
                    result.jsonData.refresh_pods_rate = '60';

                this.cluster = result;
            })
    }

    togglePermissionForm(open: boolean): void {
        this.permissionFormOpen = open
    }

    validateForm(field: string) {
        if(field === 'group'){
            this.permissionReceiver = null;
        }

        if (this.permissionGroup && this.permissionReceiver && this.permissionRole) {
            this.permissionFormValid = true
        } else if ((this.permissionGroup === "Viewer" || this.permissionGroup === "Editor") && this.permissionRole) {
            this.permissionFormValid = true
        } else {
            this.permissionFormValid = false
        }


    }
}
