export declare class DOPK8SConfig {
    private backendSrv;
    private $window;
    static templateUrl: string;
    current: any;
    prometheusList: Array<any>;
    pageReady: boolean;
    version: number;
    constructor($scope: any, $injector: any, backendSrv: any, $window: any);
    setGrafanaVersion(window: any): void;
    setUrl(): void;
    getPrometheusList(): any;
}
