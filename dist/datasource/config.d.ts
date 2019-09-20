export declare class DOPK8SConfig {
    private backendSrv;
    static templateUrl: string;
    current: any;
    prometheusList: Array<any>;
    pageReady: boolean;
    constructor($scope: any, $injector: any, backendSrv: any);
    setUrl(): void;
    getPrometheusList(): any;
}
