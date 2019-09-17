System.register(["../../common/constants"], function(exports_1) {
    var constants_1;
    var ClusterConfig;
    return {
        setters:[
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }],
        execute: function() {
            ClusterConfig = (function () {
                function ClusterConfig($scope, $injector, backendSrv, alertSrv, $q, $location) {
                    this.backendSrv = backendSrv;
                    this.alertSrv = alertSrv;
                    this.$q = $q;
                    this.$location = $location;
                    this.pageReady = false;
                    this.$scope = $scope;
                    this.busy = false;
                    this.getCluster();
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
                    promises.push(this.getPrometheusList());
                    this.$q.all(promises)
                        .then(function () {
                        _this.pageReady = true;
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
                    return this.saveDatasource()
                        .then(function (res) {
                        window.location.href = 'plugins/devopsprodigy-kubegraf-app/page/clusters';
                    }, function (err) {
                        _this.busy = false;
                    });
                };
                ClusterConfig.prototype.check = function () {
                    if (!this.pageReady)
                        return false;
                    return this.$scope.clusterForm.$valid;
                };
                ClusterConfig.prototype.saveDatasource = function () {
                    if (!this.cluster.id) {
                        return this.createDatasource();
                    }
                    else {
                        return this.updateDatasource();
                    }
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
                ClusterConfig.templateUrl = 'components/cluster-config/cluster-config.html';
                return ClusterConfig;
            })();
            exports_1("ClusterConfig", ClusterConfig);
        }
    }
});
//# sourceMappingURL=cluster-config.js.map