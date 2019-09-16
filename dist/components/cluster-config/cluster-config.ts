import {CLUSTER_ACCESS_HTTP, CLUSTER_ACCESS_TOKEN} from "../../common/constants";

const TYPE_PROMETHEUS = "prometheus";

export class ClusterConfig{
    cluster: any;
    prometheusList: Array<any>;
    busy: boolean;
    $scope: any;
    pageReady: boolean;
    tokenAccessConst: string;
    httpAccessConst: string;

    static templateUrl = 'components/cluster-config/cluster-config.html';

    constructor($scope, $injector, private backendSrv, private alertSrv, private $q, private $location){
        this.pageReady = false;

        this.$scope = $scope;
        this.busy = false;
        this.tokenAccessConst = CLUSTER_ACCESS_TOKEN.toString();
        this.httpAccessConst = CLUSTER_ACCESS_HTTP.toString();
        this.getCluster();
    }

    getCluster(){
        let promises = [];
        if ("clusterId" in this.$location.search()){
            promises.push(
                this.getDatasource(this.$location.search().clusterId)
                .then(() => {
                    document.title = 'DevOpsProdigy KubeGraf | Edit cluster';
                })
            );
        }else{
            this.cluster = {
                type: 'devopsprodidy-kubegraf-datasource',
                access: 'proxy',
                jsonData: {
                    refresh_pods_rate: '60',
                    access_type: this.httpAccessConst
                }

            };
            document.title = 'DevOpsProdigy KubeGraf | New cluster';
        }

        promises.push(this.getPrometheusList());

        this.$q.all(promises)
            .then(() => {
                this.pageReady = true;
            })
    }

    getPrometheusList(){
        return this.backendSrv.get('/api/datasources')
            .then(datasources => {
                this.prometheusList = datasources.filter(item => {
                    return item.type === TYPE_PROMETHEUS;
                })
            })
    }

    saveCluster(){
        if(this.busy) return;
        this.busy = true;
        return this.saveDatasource()
            .then((res) => {
                window.location.href = 'plugins/devopsprodigy-kubegraf-app/page/clusters';
            },err => {
                this.busy = false;
            });
    }

    check(){
        if(!this.pageReady)
            return false;
        return this.$scope.clusterForm.$valid;
    }

    saveDatasource() {
        if(!this.cluster.id){
            return this.createDatasource();
        }else{
            return this.updateDatasource();
        }
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
                    result.jsonData.refresh_pods_rate = 60;

                if(!(result.jsonData.access_type))
                    result.jsonData.access_type = this.httpAccessConst;

                this.cluster = result;
            })
    }
}
