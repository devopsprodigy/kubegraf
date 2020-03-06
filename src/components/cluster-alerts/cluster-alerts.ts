import {K8sPage} from '../k8s-page';
import { __getGrafanaVersion } from "../../common/helpers";

export class ClusterAlerts extends K8sPage{
    static templateUrl = 'components/cluster-alerts/cluster-alerts.html';
    version: number;

    constructor(
        $scope,
        $injector,
        public $q,
        public backendSrv,
        public datasourceSrv,
        public contextSrv,
        public $location,
        public $timeout,
        private $window
    ){
        super($scope, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $q, $window);
        this.pageReady = false;
        this.version = __getGrafanaVersion($window);

        this.__prepareDS().then(() => {
            let _promises = [];

            _promises.push(this.getEvents());
            _promises.push(this.getPods());
            _promises.push(this.getClusterComponents());
            _promises.push(
                this.getNodeMap(true).then(() => {
                    this.getResourcesMetrics().then(() => {
                        this.nodesMapReady = true;
                    })
                })
            );

            this.$q.all(_promises)
                .then(()=> {
                    this.pageReady = true;
                });
        })
    }

    clusterProblem() {
        let node = this.getWarningNodes().length === 0;
        let usedCpu = this.getAlertsNodesByCPU().length === 0;
        let usedMemory = this.getAlertsNodesByMemory().length === 0;
        let usedPods = this.getAlertsNodesByPods().length === 0;
        let requestedCpu = this.getAlertsNodesByCPU('cpuStatusRequested').length === 0;
        let requestedMemory = this.getAlertsNodesByMemory('memoryStatusRequested').length === 0;
        let failPods = this.getWarningPods().length === 0;
        let components = this.getAlertsComponents.length === 0;

        return this.nodesError || this.componentsError || this.podsError || !(node && usedCpu && usedMemory && usedPods && failPods && components && requestedCpu && requestedMemory);
    };
}
