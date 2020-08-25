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
        const warnings = [
            this.getWarningNodes().length === 0,
            this.getAlertsNodesByCPU().length === 0,
            this.getAlertsNodesByMemory().length === 0,
            this.getAlertsNodesByPods().length === 0,
            this.getAlertsNodesByCPU('cpuStatusRequested').length === 0,
            this.getAlertsNodesByMemory('memoryStatusRequested').length === 0,
            this.getWarningPods().length === 0,
            this.getAlertsComponents.length === 0
        ];

        return this.nodesError || this.componentsError || this.podsError || warnings.some(w => w !== true);
    };
}
