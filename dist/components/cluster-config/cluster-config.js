System.register(["app/core/app_events", "../../common/constants", "../../common/helpers"], function(exports_1) {
    var app_events_1, constants_1, helpers_1;
    var ClusterConfig;
    return {
        setters:[
            function (app_events_1_1) {
                app_events_1 = app_events_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (helpers_1_1) {
                helpers_1 = helpers_1_1;
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
                    this.retry = 3;
                    this.pageReady = false;
                    this.$scope = $scope;
                    this.busy = false;
                    this.getCluster();
                    this.version = helpers_1.__getGrafanaVersion($window);
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
                ClusterConfig.prototype.saveCluster = function () {
                    var _this = this;
                    if (this.busy)
                        return;
                    this.busy = true;
                    this.cluster.jsonData.cluster_url = this.cluster.url;
                    return this.saveDatasource()
                        .then(function (res) {
                        if (res && res.datasource) {
                            _this.cluster = res.datasource;
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
                    var url = '/api/v1/namespaces';
                    var _url = '/api/datasources/proxy/' + this.cluster.id;
                    if (this.cluster.jsonData.access_via_token) {
                        _url += '/__proxy';
                    }
                    _url += url;
                    this.backendSrv.datasourceRequest({
                        url: _url,
                        method: "GET",
                        headers: { "Content-Type": 'application/json' },
                    })
                        .then(function (response) {
                        if (response && response.status === 200) {
                            //window.location.href = 'plugins/devopsprodigy-kubegraf-app/page/clusters';
                            setTimeout(function () { window.history.back(); }, 800);
                        }
                        else {
                            app_events_1.default.emit('alert-error', ['Unhandled error']);
                        }
                    }, function (error) {
                        if (error && error.status && error.statusText) {
                            app_events_1.default.emit('alert-error', [error.status + ' ' + error.statusText]);
                        }
                        else {
                            app_events_1.default.emit('alert-error', ['Unhandled error']);
                        }
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