import { K8sPage } from "../k8s-page";
import { Pod } from "../../common/types/pod";
export declare class NodesOverview extends K8sPage {
    $q: any;
    backendSrv: any;
    datasourceSrv: any;
    contextSrv: any;
    $location: any;
    $timeout: any;
    private $window;
    static templateUrl: string;
    version: number;
    constructor($scope: any, $injector: any, $q: any, backendSrv: any, datasourceSrv: any, contextSrv: any, $location: any, $timeout: any, $window: any);
    showAllPodsNS(ns: any): void;
    toggleNsList(node: any): void;
    updatePods(newPods: Array<Pod>): void;
    summary(ns: any, metric: any): any;
    nodeClick(event: any, node: any): void;
    __showAll(): void;
    __hideAll(): void;
    toggleNodes(node: boolean | any): void;
    podsFilterIsDeleted(pods: Array<Pod>): Pod[];
}
