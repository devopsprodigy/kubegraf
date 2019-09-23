System.register(['../k8s-page'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var k8s_page_1;
    var ClusterAlerts;
    return {
        setters:[
            function (k8s_page_1_1) {
                k8s_page_1 = k8s_page_1_1;
            }],
        execute: function() {
            ClusterAlerts = (function (_super) {
                __extends(ClusterAlerts, _super);
                function ClusterAlerts($scope, $injector, $q, backendSrv, datasourceSrv, $location, $timeout) {
                    var _this = this;
                    _super.call(this, $scope, backendSrv, datasourceSrv, $location, $timeout, $q);
                    this.$q = $q;
                    this.backendSrv = backendSrv;
                    this.datasourceSrv = datasourceSrv;
                    this.$location = $location;
                    this.$timeout = $timeout;
                    this.pageReady = false;
                    this.__prepareDS().then(function () {
                        var _promises = [];
                        _promises.push(_this.getPods());
                        _promises.push(_this.getClusterComponents());
                        _promises.push(_this.getNodeMap(true).then(function () {
                            _this.getResourcesMetrics().then(function () {
                                _this.nodesMapReady = true;
                            });
                        }));
                        _this.$q.all(_promises)
                            .then(function () {
                            _this.pageReady = true;
                        });
                    });
                }
                ClusterAlerts.prototype.clusterProblem = function () {
                    var node = this.getWarningNodes().length === 0;
                    var usedCpu = this.getAlertsNodesByCPU().length === 0;
                    var usedMemory = this.getAlertsNodesByMemory().length === 0;
                    var usedPods = this.getAlertsNodesByPods().length === 0;
                    var failPods = this.getWarningPods().length === 0;
                    var components = this.getAlertsComponents.length === 0;
                    return this.nodesError || this.componentsError || this.podsError || !(node && usedCpu && usedMemory && usedPods && failPods && components);
                };
                ;
                ClusterAlerts.templateUrl = 'components/cluster-alerts/cluster-alerts.html';
                return ClusterAlerts;
            })(k8s_page_1.K8sPage);
            exports_1("ClusterAlerts", ClusterAlerts);
        }
    }
});
//# sourceMappingURL=cluster-alerts.js.map