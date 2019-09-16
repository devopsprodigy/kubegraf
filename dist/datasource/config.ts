import {CLUSTER_ACCESS_TOKEN, CLUSTER_ACCESS_HTTP, TYPE_PROMETHEUS} from "../common/constants";

export class DOPK8SConfig{
    static templateUrl = 'datasource/partials/config.html'

    current: any;
    httpAccessConst : string;
    tokenAccessConst: string;
    prometheusList: Array<any>;
    pageReady: boolean;

    constructor($scope, $injector, private backendSrv){
        this.httpAccessConst = CLUSTER_ACCESS_HTTP.toString();
        this.tokenAccessConst = CLUSTER_ACCESS_TOKEN.toString();
        this.pageReady = false;

        if(this.current.id){
            if(!(this.current.jsonData.access_type))
                this.current.jsonData.access_type = this.httpAccessConst;

            if(!(this.current.jsonData.prom_name))
                this.current.jsonData.prom_name = '';

            if(!(this.current.jsonData.refresh_pods_rate))
                this.current.jsonData.refresh_pods_rate = '60';

        }else{
            this.current = {
                type: 'devopsprodidy-kubegraf-datasource',
                access: 'proxy',
                jsonData: {
                    refresh_pods_rate: '60',
                    access_type: this.httpAccessConst,
                    prom_name: ''
                }

            };
        }
        this.getPrometheusList()
            .then(() => {
                this.pageReady = true;
            })
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
                if(defProm.length > 0 && this.current.jsonData.prom_name == '' ){
                    this.current.jsonData.prom_name = defProm[0].name;
                }
            })
    }
}
