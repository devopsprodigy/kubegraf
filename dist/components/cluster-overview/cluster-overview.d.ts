/// <reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { K8sPage } from "../k8s-page";
export declare class ClusterOverview extends K8sPage {
    $q: any;
    backendSrv: any;
    datasourceSrv: any;
    $location: any;
    $timeout: any;
    columnNames: Array<{
        colName: string;
        nsKey: string;
    }>;
    hideAllWarningPods: boolean;
    static templateUrl: string;
    constructor($scope: any, $injector: any, $q: any, backendSrv: any, datasourceSrv: any, $location: any, $timeout: any);
    __showAll(): void;
    updatePods(newPods: any): void;
    toggleAllWarningPods(): void;
}
