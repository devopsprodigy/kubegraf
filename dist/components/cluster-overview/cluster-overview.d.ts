/// <reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { K8sPage } from "../k8s-page";
export declare class ClusterOverview extends K8sPage {
    $q: any;
    backendSrv: any;
    datasourceSrv: any;
    contextSrv: any;
    $location: any;
    $timeout: any;
    private $window;
    columnNames: Array<{
        colName: string;
        nsKey: string;
    }>;
    hideAllWarningPods: boolean;
    version: number;
    static templateUrl: string;
    constructor($scope: any, $injector: any, $q: any, backendSrv: any, datasourceSrv: any, contextSrv: any, $location: any, $timeout: any, $window: any);
    __showAll(): void;
    __hideAll(): void;
    namespaceClick(event: any, namespace: any): void;
    toggleNamespace(namespace: boolean | any): void;
    updatePods(newPods: any): void;
    toggleAllWarningPods(): void;
}
