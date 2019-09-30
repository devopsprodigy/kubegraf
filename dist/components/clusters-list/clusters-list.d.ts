/// <reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export declare class ClustersList {
    private backendSrv;
    private datasourceSrv;
    private contextSrv;
    private utilSrv;
    isReady: boolean;
    clusters: Array<any>;
    $scope: any;
    isAdmin: boolean;
    static templateUrl: string;
    constructor($scope: any, $injector: any, backendSrv: any, datasourceSrv: any, contextSrv: any, utilSrv: any);
    getClusters(): void;
    deleteCluster(cluster: any): void;
    confirmDelete(id: any): void;
}
