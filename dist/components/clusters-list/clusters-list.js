///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(["app/core/app_events"], function(exports_1) {
    var app_events_1;
    var ClustersList;
    return {
        setters:[
            function (app_events_1_1) {
                app_events_1 = app_events_1_1;
            }],
        execute: function() {
            ClustersList = (function () {
                function ClustersList($scope, $injector, backendSrv, utilSrv) {
                    var _this = this;
                    this.backendSrv = backendSrv;
                    this.utilSrv = utilSrv;
                    this.isReady = false;
                    this.$scope = $scope;
                    document.title = 'DevOpsProdigy KubeGraf';
                    this.getClusters().then(function () {
                        _this.isReady = true;
                    });
                }
                ClustersList.prototype.getClusters = function () {
                    var _this = this;
                    return this.backendSrv.get('/api/datasources')
                        .then(function (res) {
                        _this.clusters = res.filter(function (item) {
                            return item.type === 'devopsprodidy-kubegraf-datasource';
                        });
                    });
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
                        _this.getClusters();
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