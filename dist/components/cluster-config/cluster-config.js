System.register(["app/core/app_events", "../../common/constants"], function(exports_1) {
    var app_events_1, constants_1;
    var ClusterConfig;
    return {
        setters:[
            function (app_events_1_1) {
                app_events_1 = app_events_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }],
        execute: function() {
            ClusterConfig = (function () {
                function ClusterConfig($scope, $injector, backendSrv, datasourceSrv, alertSrv, $q, $location, $window) {
                    this.backendSrv = backendSrv;
                    this.datasourceSrv = datasourceSrv;
                    this.alertSrv = alertSrv;
                    this.$q = $q;
                    this.$location = $location;
                    this.$window = $window;
                    this.pageReady = false;
                    this.$scope = $scope;
                    this.busy = false;
                    this.getCluster();
                    this.setGrafanaVersion($window);
                }
                ClusterConfig.prototype.getCluster = function () {
                    var _this = this;
                    var promises = [];
                    if ("clusterId" in this.$location.search()) {
                        promises.push(this.getDatasource(this.$location.search().clusterId)
                            .then(function () {
                            document.title = 'DevOpsProdigy KubeGraf | Edit cluster';
                        }));
                    }
                    else {
                        this.cluster = {
                            type: 'devopsprodidy-kubegraf-datasource',
                            access: 'proxy',
                            jsonData: {
                                refresh_pods_rate: '60',
                                access_via_token: false,
                                prom_name: ''
                            }
                        };
                        document.title = 'DevOpsProdigy KubeGraf | New cluster';
                    }
                    this.$q.all(promises)
                        .then(function () {
                        _this.getPrometheusList().then(function () {
                            _this.pageReady = true;
                        });
                    });
                };
                ClusterConfig.prototype.getPrometheusList = function () {
                    var _this = this;
                    return this.backendSrv.get('/api/datasources')
                        .then(function (datasources) {
                        _this.prometheusList = datasources.filter(function (item) {
                            return item.type === constants_1.TYPE_PROMETHEUS;
                        });
                        var defProm = _this.prometheusList.filter(function (item) {
                            return item.isDefault;
                        });
                        if (defProm.length > 0 && _this.cluster.jsonData.prom_name == '') {
                            _this.cluster.jsonData.prom_name = defProm[0].name;
                        }
                    });
                };
                ClusterConfig.prototype.setGrafanaVersion = function (window) {
                    var _v;
                    try {
                        _v = window.grafanaBootData.settings.buildInfo.version.split('.')[0];
                    }
                    catch (e) {
                        console.error(e);
                        _v = 5;
                    }
                    this.version = _v;
                };
                ClusterConfig.prototype.saveCluster = function () {
                    var _this = this;
                    if (this.busy)
                        return;
                    this.busy = true;
                    this.cluster.jsonData.cluster_url = this.cluster.url;
                    return this.saveDatasource()
                        .then(function (res) {
                        if (res && res.datasource) {
                            //this.cluster = res.datasource;
                            _this.cluster.version = res.datasource.version;
                            _this.testCluster();
                        }
                    })
                        .finally(function () {
                        _this.busy = false;
                    });
                };
                ClusterConfig.prototype.check = function () {
                    if (!this.pageReady)
                        return false;
                    return this.$scope.clusterForm.$valid;
                };
                ClusterConfig.prototype.saveDatasource = function () {
                    return this.cluster.id ? this.updateDatasource() : this.createDatasource();
                    /* */
                };
                ClusterConfig.prototype.createDatasource = function () {
                    var _this = this;
                    return this.backendSrv.post('/api/datasources', this.cluster)
                        .then(function (res) {
                        return _this.$q.resolve(res);
                    }, function (err) {
                        return _this.$q.reject(err);
                    });
                };
                ClusterConfig.prototype.updateDatasource = function () {
                    var _this = this;
                    return this.backendSrv.put('/api/datasources/' + this.cluster.id, this.cluster)
                        .then(function (res) {
                        return _this.$q.resolve(res);
                    }, function (err) {
                        return _this.$q.reject(err);
                    });
                };
                ClusterConfig.prototype.getDatasource = function (id) {
                    var _this = this;
                    return this.backendSrv.get('/api/datasources/' + id)
                        .then(function (result) {
                        if (!(result.jsonData.prom_name))
                            result.jsonData.prom_name = '';
                        if (!(result.jsonData.refresh_pods_rate))
                            result.jsonData.refresh_pods_rate = '60';
                        _this.cluster = result;
                    });
                };
                ClusterConfig.prototype.testCluster = function () {
                    this.datasourceSrv.get(this.cluster.name)
                        .then(function (clusterDS) {
                        clusterDS.testDatasource(true)
                            .then(function (res) {
                            if (res.status && res.status === 'success') {
                                window.location.href = 'plugins/devopsprodigy-kubegraf-app/page/clusters';
                            }
                            else if (res.status && res.status === 'error') {
                                app_events_1.default.emit('alert-error', [res.title + ' ' + res.message]);
                            }
                        });
                    });
                };
                ClusterConfig.templateUrl = 'components/cluster-config/cluster-config.html';
                return ClusterConfig;
            })();
            exports_1("ClusterConfig", ClusterConfig);
        }
    }
});
//# sourceMappingURL=cluster-config.js.map