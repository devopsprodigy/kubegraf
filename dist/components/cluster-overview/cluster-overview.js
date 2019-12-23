///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(["../../common/store", "../k8s-page", "../../common/helpers"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var store_1, k8s_page_1, helpers_1;
    var ClusterOverview;
    return {
        setters:[
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (k8s_page_1_1) {
                k8s_page_1 = k8s_page_1_1;
            },
            function (helpers_1_1) {
                helpers_1 = helpers_1_1;
            }],
        execute: function() {
            ClusterOverview = (function (_super) {
                __extends(ClusterOverview, _super);
                function ClusterOverview($scope, $injector, $q, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $window) {
                    var _this = this;
                    _super.call(this, $scope, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $q);
                    this.$q = $q;
                    this.backendSrv = backendSrv;
                    this.datasourceSrv = datasourceSrv;
                    this.contextSrv = contextSrv;
                    this.$location = $location;
                    this.$timeout = $timeout;
                    this.$window = $window;
                    this.pageReady = false;
                    this.version = helpers_1.__getGrafanaVersion($window);
                    this.__prepareDS().then(function () {
                        _this.getClusterComponents();
                        _this.getNamespaceMap();
                    });
                    this.columnNames = [
                        {
                            colName: 'Deployments',
                            nsKey: 'deployments'
                        },
                        {
                            colName: 'Statefulsets',
                            nsKey: 'statefulsets'
                        },
                        {
                            colName: 'Daemonsets',
                            nsKey: 'daemonsets'
                        },
                        {
                            colName: 'Cron Jobs',
                            nsKey: 'cronJobs'
                        },
                        {
                            colName: 'Jobs',
                            nsKey: 'jobs'
                        },
                        {
                            colName: 'Other',
                            nsKey: 'other'
                        },
                    ];
                    this.hideAllWarningPods = true;
                }
                ClusterOverview.prototype.__showAll = function () {
                    this.toggleNamespace(true);
                };
                ClusterOverview.prototype.__hideAll = function () {
                    this.toggleNamespace(false);
                };
                ClusterOverview.prototype.namespaceClick = function (event, namespace) {
                    if (event.ctrlKey) {
                        if (namespace.open) {
                            event.preventDefault();
                        }
                        this.toggleNamespace(namespace);
                    }
                    else {
                        namespace.toggle();
                    }
                };
                ClusterOverview.prototype.toggleNamespace = function (namespace) {
                    store_1.default.delete('namespaceStore');
                    var namespaceStore = [];
                    this.namespaceMap.map(function (ns) {
                        ns.open = namespace === true || namespace === false ? namespace : namespace.name === ns.name;
                        namespaceStore.push({ name: ns.name, open: ns.open });
                    });
                    store_1.default.setObject('namespaceStore', namespaceStore);
                };
                ClusterOverview.prototype.updatePods = function (newPods) {
                    var _this = this;
                    this.updateJobs();
                    this.namespaceMap.forEach(function (ns) {
                        ns.deployments.forEach(function (deployment) {
                            var pods = _this.__findPodsBySelector(deployment.data.spec.selector.matchLabels, ns.name, newPods);
                            deployment.pods = deployment.pods.concat(pods);
                        });
                        ns.statefulsets.forEach(function (statefulset) {
                            var pods = _this.__findPodsBySelector(statefulset.data.spec.selector.matchLabels, ns.name, newPods);
                            statefulset.pods = statefulset.pods.concat(pods);
                        });
                        ns.daemonsets.forEach(function (daemonset) {
                            var pods = _this.__findPodsBySelector(daemonset.data.spec.selector.matchLabels, ns.name, newPods);
                            daemonset.pods = daemonset.pods.concat(pods);
                        });
                        ns.jobs.forEach(function (job) {
                            job.pods = _this.__findPodsBySelector(job.data.metadata.labels, ns.name);
                        });
                        ns.cronJobs.forEach(function (cron) {
                            cron.jobs.map(function (job) {
                                job.pods = _this.__findPodsBySelector(job.data.metadata.labels, ns.name);
                            });
                        });
                        ns.other[0].pods = ns.other[0].pods.concat(newPods.filter(function (item) { return !item.used && item.data.metadata.namespace === ns.name; }));
                    });
                };
                ClusterOverview.prototype.toggleAllWarningPods = function () {
                    this.hideAllWarningPods = !this.hideAllWarningPods;
                };
                ClusterOverview.templateUrl = 'components/cluster-overview/cluster-overview.html';
                return ClusterOverview;
            })(k8s_page_1.K8sPage);
            exports_1("ClusterOverview", ClusterOverview);
        }
    }
});
//# sourceMappingURL=cluster-overview.js.map