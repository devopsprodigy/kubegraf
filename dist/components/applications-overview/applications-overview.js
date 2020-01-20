///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(["../../common/store", "../k8s-page", "../../common/helpers"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var store_1, k8s_page_1, helpers_1;
    var ApplicationsOverview;
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
            ApplicationsOverview = (function (_super) {
                __extends(ApplicationsOverview, _super);
                function ApplicationsOverview($scope, $injector, $q, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $window) {
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
                ApplicationsOverview.prototype.__showAll = function () {
                    this.toggleNamespace(true);
                };
                ApplicationsOverview.prototype.__hideAll = function () {
                    this.toggleNamespace(false);
                };
                ApplicationsOverview.prototype.namespaceClick = function (event, namespace) {
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
                ApplicationsOverview.prototype.toggleNamespace = function (namespace) {
                    store_1.default.delete('namespaceStore');
                    var namespaceStore = [];
                    this.namespaceMap.map(function (ns) {
                        ns.open = namespace === true || namespace === false ? namespace : namespace.name === ns.name;
                        namespaceStore.push({ name: ns.name, open: ns.open });
                    });
                    store_1.default.setObject('namespaceStore', namespaceStore);
                };
                ApplicationsOverview.prototype.updatePods = function (newPods) {
                    this.refreshNamespaceMap();
                };
                ApplicationsOverview.prototype.toggleAllWarningPods = function () {
                    this.hideAllWarningPods = !this.hideAllWarningPods;
                };
                ApplicationsOverview.prototype.namespaceFilterIsDeleted = function (namespaces) {
                    return namespaces.filter(function (item) { return item.is_deleted === false; });
                };
                ApplicationsOverview.templateUrl = 'components/applications-overview/applications-overview.html';
                return ApplicationsOverview;
            })(k8s_page_1.K8sPage);
            exports_1("ApplicationsOverview", ApplicationsOverview);
        }
    }
});
//# sourceMappingURL=applications-overview.js.map