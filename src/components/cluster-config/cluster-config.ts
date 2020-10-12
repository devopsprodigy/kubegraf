///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import appEvents from "grafana/app/core/app_events";
import { TYPE_KUBEGRAF_PLUGIN, TYPE_PROMETHEUS } from "../../common/constants";
import { __getGrafanaVersion } from "../../common/helpers";

export class ClusterConfig{
    cluster: any;
    prometheusList: Array<any>;
    busy: boolean;
    $scope: any;
    pageReady: boolean;
    version: number;
    retry = 3;

    static templateUrl = 'components/cluster-config/cluster-config.html';

    constructor($scope, $injector, private backendSrv, private datasourceSrv, private alertSrv, private $q, private $location, private $window){
        this.pageReady = false;
        this.$scope = $scope;
        this.busy = false;
        this.version = __getGrafanaVersion($window);

        this.getCluster().finally(() => {
            this.pageReady = true
            this.$scope.$apply();
        });
    }

    async getCluster(): Promise<void> {
        if ("clusterId" in this.$location.search()) {
            await this.getDatasource(this.$location.search().clusterId);
            document.title = 'DevOpsProdigy KubeGraf | Edit cluster';
        } else {
            this.cluster = {
                type: TYPE_KUBEGRAF_PLUGIN,
                access: 'proxy',
                jsonData: {
                    refresh_pods_rate: '60',
                    access_via_token: false,
                    prom_name: '',
                    permissions: [
                        {role: "Edit", type: "Editor", user: null},
                        {role: "View", type: "Viewer", user: null}
                    ]
                }
            };
            document.title = 'DevOpsProdigy KubeGraf | New cluster';
        }

        await this.getPrometheusList()
    }

    getPrometheusList(){
        return this.backendSrv.get('/api/datasources')
            .then(datasources => {
                this.prometheusList = datasources.filter(item => {
                    return item.type === TYPE_PROMETHEUS;
                });
                let defProm = this.prometheusList.filter(item =>
                    item.isDefault
                );
                if(defProm.length > 0 && this.cluster.jsonData.prom_name == ''){
                    this.cluster.jsonData.prom_name = defProm[0].name;
                }
            })
    }

    saveCluster(){
        if (this.busy) return;
        this.busy = true;
        this.cluster.jsonData.cluster_url = this.cluster.url;

        return this.saveDatasource()
            .then((res) => {
                if(res && res.datasource) {
                    this.cluster = res.datasource
                    this.testCluster()
                }
            })
            .finally(() => {
                this.busy = false;
            });
    }

    check(): boolean {
        return !this.pageReady ? false : this.$scope.clusterForm.$valid
    }

    saveDatasource() {
        return this.cluster.id ? this.updateDatasource() : this.createDatasource();
    }

    createDatasource(){
        return this.backendSrv.post('/api/datasources', this.cluster)
            .then(res => {
                return this.$q.resolve(res);
            }, err => {
                return this.$q.reject(err);
            });
    }

    updateDatasource(){
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

    testCluster() {
        let url = '/api/v1/namespaces';
        let _url = '/api/datasources/proxy/' + this.cluster.id;
        if(this.cluster.jsonData.access_via_token) {
            _url += '/__proxy';
        }
        _url += url;
        this.backendSrv.datasourceRequest({
            url: _url,
            method: "GET",
            headers: {"Content-Type": 'application/json'},
        })
            .then(response => {
                if (response && response.status === 200) {
                    setTimeout(() => {
                        window.history.back()
                    }, 800)
                } else {
                    appEvents.emit('alert-error', ['Unhandled error']);
                }
            }, error => {
                if (error && error.status && error.statusText) {
                    appEvents.emit('alert-error', [error.status + ' ' + error.statusText]);
                } else {
                    appEvents.emit('alert-error', ['Unhandled error']);
                }
            })
    }
}
