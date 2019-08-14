/// <reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
export declare class ClustersList {
    private backendSrv;
    private utilSrv;
    isReady: boolean;
    clusters: Array<any>;
    $scope: any;
    static templateUrl: string;
    constructor($scope: any, $injector: any, backendSrv: any, utilSrv: any);
    getClusters(): any;
    deleteCluster(cluster: any): void;
    confirmDelete(id: any): void;
}
