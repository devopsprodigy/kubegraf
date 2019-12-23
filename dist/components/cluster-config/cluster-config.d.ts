export declare class ClusterConfig {
    private backendSrv;
    private datasourceSrv;
    private alertSrv;
    private $q;
    private $location;
    private $window;
    cluster: any;
    prometheusList: Array<any>;
    busy: boolean;
    $scope: any;
    pageReady: boolean;
    version: number;
    retry: number;
    static templateUrl: string;
    constructor($scope: any, $injector: any, backendSrv: any, datasourceSrv: any, alertSrv: any, $q: any, $location: any, $window: any);
    getCluster(): void;
    getPrometheusList(): any;
    setGrafanaVersion(window: any): void;
    saveCluster(): any;
    check(): any;
    saveDatasource(): any;
    createDatasource(): any;
    updateDatasource(): any;
    getDatasource(id: any): any;
    testCluster(): void;
}
