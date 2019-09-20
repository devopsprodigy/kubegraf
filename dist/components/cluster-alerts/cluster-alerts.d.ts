import { K8sPage } from '../k8s-page';
export declare class ClusterAlerts extends K8sPage {
    $q: any;
    backendSrv: any;
    datasourceSrv: any;
    $location: any;
    $timeout: any;
    static templateUrl: string;
    constructor($scope: any, $injector: any, $q: any, backendSrv: any, datasourceSrv: any, $location: any, $timeout: any);
    clusterProblem(): boolean;
}
