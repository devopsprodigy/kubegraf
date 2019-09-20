import {K8sPage} from '../k8s-page';

export class ClusterAlerts extends K8sPage{
    static templateUrl = 'components/cluster-alerts/cluster-alerts.html';

    constructor(
        $scope,
        $injector,
        public $q,
        public backendSrv,
        public datasourceSrv,
        public $location,
        public $timeout
    ){
        super($scope, backendSrv, datasourceSrv, $location, $timeout, $q);
        this.pageReady = false;

        this.__prepareDS().then(() => {
            let _promises = [];

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
        let failPods = this.getWarningPods().length === 0;
        let components = this.getAlertsComponents.length === 0;

        return !(node && usedCpu && usedMemory && usedPods && failPods && components);
    };
}
