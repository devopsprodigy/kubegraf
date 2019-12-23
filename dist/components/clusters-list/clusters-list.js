///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(["app/core/app_events", "../../common/helpers"], function(exports_1) {
    var app_events_1, helpers_1;
    var ClustersList;
    return {
        setters:[
            function (app_events_1_1) {
                app_events_1 = app_events_1_1;
            },
            function (helpers_1_1) {
                helpers_1 = helpers_1_1;
            }],
        execute: function() {
            ClustersList = (function () {
                function ClustersList($scope, $injector, backendSrv, datasourceSrv, contextSrv, utilSrv, $window) {
                    this.backendSrv = backendSrv;
                    this.datasourceSrv = datasourceSrv;
                    this.contextSrv = contextSrv;
                    this.utilSrv = utilSrv;
                    this.$window = $window;
                    this.isReady = false;
                    this.$scope = $scope;
                    this.version = helpers_1.__getGrafanaVersion($window);
                    document.title = 'DevOpsProdigy KubeGraf';
                    try {
                        this.getClusters();
                    }
                    catch (e) {
                        console.error(e);
                    }
                    finally {
                        this.isReady = true;
                    }
                    try {
                        this.isAdmin = this.contextSrv.isGrafanaAdmin;
                    }
                    catch (e) {
                        console.error(e);
                        this.isAdmin = false;
                    }
                }
                ClustersList.prototype.getClusters = function () {
                    var list = this.datasourceSrv.getAll();
                    var type = 'devopsprodidy-kubegraf-datasource';
                    console.log(list);
                    if (Array.isArray(list)) {
                        this.clusters = list.filter(function (item) {
                            return item.type === type;
                        });
                    }
                    else {
                        var clusters = [];
                        Object.keys(list).forEach(function (key) {
                            if (list[key].type === type) {
                                clusters.push(list[key]);
                            }
                        });
                        this.clusters = clusters;
                    }
                };
                ClustersList.prototype.deleteCluster = function (cluster) {
                    var _this = this;
                    app_events_1.default.emit('confirm-modal', {
                        title: 'Delete',
                        text: 'Are you sure you want to delete this cluster?',
                        yesText: "Delete",
                        icon: "fa-trash",
                        onConfirm: function () {
                            _this.confirmDelete(cluster.id);
                        }
                    });
                };
                ClustersList.prototype.confirmDelete = function (id) {
                    var _this = this;
                    this.backendSrv.delete('/api/datasources/' + id)
                        .then(function () {
                        _this.clusters = _this.clusters.filter(function (item) {
                            return item.id !== id;
                        });
                        // this.getClusters();
                    });
                };
                ClustersList.templateUrl = 'components/clusters-list/clusters-list.html';
                return ClustersList;
            })();
            exports_1("ClustersList", ClustersList);
        }
    }
});
//# sourceMappingURL=clusters-list.js.map