import { K8sPage } from "../k8s-page";
export declare class NodesOverview extends K8sPage {
    $q: any;
    backendSrv: any;
    datasourceSrv: any;
    contextSrv: any;
    $location: any;
    $timeout: any;
    static templateUrl: string;
    constructor($scope: any, $injector: any, $q: any, backendSrv: any, datasourceSrv: any, contextSrv: any, $location: any, $timeout: any);
    showAllPodsNS(ns: any): void;
    toggleNsList(node: any): void;
    updatePods(newPods: any): void;
    summary(ns: any, metric: any): any;
    nodeClick(event: any, node: any): void;
    __showAll(): void;
    __hideAll(): void;
}
