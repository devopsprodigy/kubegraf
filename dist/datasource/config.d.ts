export declare class DOPK8SConfig {
    private backendSrv;
    static templateUrl: string;
    current: any;
    httpAccessConst: string;
    tokenAccessConst: string;
    prometheusList: Array<any>;
    pageReady: boolean;
    constructor($scope: any, $injector: any, backendSrv: any);
    getPrometheusList(): any;
}
