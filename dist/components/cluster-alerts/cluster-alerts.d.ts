import { K8sPage } from '../k8s-page';
export declare class ClusterAlerts extends K8sPage {
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
    clusterProblem(): Boolean | Error;
}
