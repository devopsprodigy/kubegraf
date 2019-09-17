import {TYPE_PROMETHEUS} from "../common/constants";

export class DOPK8SConfig{
    static templateUrl = 'datasource/partials/config.html';

    current: any;
    prometheusList: Array<any>;
    pageReady: boolean;

    constructor($scope, $injector, private backendSrv){
        this.pageReady = false;

        if(this.current.id){
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
                    access_via_token: false,
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
