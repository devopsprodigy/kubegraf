export declare class ClusterConfig {
    private backendSrv;
    private alertSrv;
    private $q;
    private $location;
    cluster: any;
    prometheusList: Array<any>;
    busy: boolean;
    $scope: any;
    pageReady: boolean;
    tokenAccessConst: string;
    httpAccessConst: string;
    static templateUrl: string;
    constructor($scope: any, $injector: any, backendSrv: any, alertSrv: any, $q: any, $location: any);
    getCluster(): void;
    getPrometheusList(): any;
    saveCluster(): any;
    check(): any;
    saveDatasource(): any;
    createDatasource(): any;
    updateDatasource(): any;
    getDatasource(id: any): any;
}
