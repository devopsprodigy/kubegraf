import {K8sPage} from '../k8s-page';
import { __getGrafanaVersion } from "../../common/helpers";
import { COLOR_GREEN, COLOR_RED, COLOR_YELLOW, ERROR, WARNING } from "../../common/constants";

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
                        this.nodesMapReady = true
                    })
                })
            );

            this.$q.all(_promises)
                .then(()=> {
                    this.pageReady = true
                });
        })
    }
    getAlertsNodesByCPU2(status: 'cpuStatus'|'cpuStatusRequested' = 'cpuStatus'){

    }

    getAlertsNodesByResources(): any[] {
        return this.nodesMap
            .filter(this.resourceProblem)
            .map((node: any) => {
                if (node.cpuStatus === ERROR
                    || node.cpuStatusRequested === ERROR
                    || node.memoryStatus === ERROR
                    || node.memoryStatusRequested === ERROR
                    || node.podsStatus === ERROR) {
                    node.statusColor = COLOR_RED
                    node.statusForSort = ERROR
                } else {
                    node.statusColor = COLOR_YELLOW
                    node.statusForSort = WARNING
                }
                node.statusMessage = this.nodeMessages(node).join(';<br/>');
                return node
            })
            .sort((a, b) => b.statusForSort - a.statusForSort);
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

    resourceProblem(node): boolean {
        return (
            node.cpuStatus === WARNING
            || node.cpuStatus === ERROR
            || node.cpuStatusRequested === ERROR
            || node.cpuStatusRequested === WARNING
            || node.memoryStatus === ERROR
            || node.memoryStatus === WARNING
            || node.memoryStatusRequested === ERROR
            || node.memoryStatusRequested === WARNING
            || node.podsStatus === WARNING
            || node.podsStatus === ERROR)
    }

    nodeMessages(node): string[] {
        const messages: string[] = [];
        if (node.cpuStatus === ERROR || node.cpuStatus === WARNING) {
            messages.push(`CPU used: ${node.cpuPercentUsed}`)
        }
        if (node.cpuStatusRequested === ERROR || node.cpuStatusRequested === WARNING) {
            messages.push(`CPU requested: ${node.cpuPercentRequested}`)
        }
        if (node.memoryStatus === ERROR || node.memoryStatus === WARNING) {
            messages.push(`Memory used: ${node.memoryPercentUsed}`)
        }
        if (node.memoryStatusRequested === ERROR || node.memoryStatusRequested === WARNING) {
            messages.push(`Memory requested: ${node.memoryPercentUsed}`)
        }
        if (node.podsStatus === ERROR || node.podsStatus === WARNING) {
            messages.push(`Pods count used: ${node.podsPercentUsed}`)
        }
        return messages
    }
}
