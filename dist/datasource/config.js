System.register(["../common/constants"], function(exports_1) {
    var constants_1;
    var DOPK8SConfig;
    return {
        setters:[
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }],
        execute: function() {
            DOPK8SConfig = (function () {
                function DOPK8SConfig($scope, $injector, backendSrv, $window) {
                    var _this = this;
                    this.backendSrv = backendSrv;
                    this.$window = $window;
                    this.pageReady = false;
                    if (this.current.id) {
                        if (!(this.current.jsonData.prom_name))
                            this.current.jsonData.prom_name = '';
                        if (!(this.current.jsonData.refresh_pods_rate))
                            this.current.jsonData.refresh_pods_rate = '60';
                        this.current.jsonData.cluster_url = this.current.url;
                    }
                    else {
                        this.current = {
                            type: 'devopsprodidy-kubegraf-datasource',
                            access: 'proxy',
                            jsonData: {
                                refresh_pods_rate: '60',
                                access_via_token: false,
                                prom_name: ''
                            }
                        };
                    }
                    this.setGrafanaVersion($window);
                    this.getPrometheusList()
                        .then(function () {
                        _this.pageReady = true;
                    });
                    $scope.$watch('ctrl.current', function () {
                        _this.setUrl();
                    });
                }
                DOPK8SConfig.prototype.setGrafanaVersion = function (window) {
                    var _v = window.grafanaBootData.settings.buildInfo.version.split('.')[0];
                    console.log(_v);
                    this.version = _v;
                };
                DOPK8SConfig.prototype.setUrl = function () {
                    this.current.jsonData.cluster_url = this.current.url;
                };
                DOPK8SConfig.prototype.getPrometheusList = function () {
                    var _this = this;
                    return this.backendSrv.get('/api/datasources')
                        .then(function (datasources) {
                        _this.prometheusList = datasources.filter(function (item) {
                            return item.type === constants_1.TYPE_PROMETHEUS;
                        });
                        var defProm = _this.prometheusList.filter(function (item) {
                            return item.isDefault;
                        });
                        if (defProm.length > 0 && _this.current.jsonData.prom_name == '') {
                            _this.current.jsonData.prom_name = defProm[0].name;
                        }
                    });
                };
                DOPK8SConfig.templateUrl = 'datasource/partials/config.html';
                return DOPK8SConfig;
            })();
            exports_1("DOPK8SConfig", DOPK8SConfig);
        }
    }
});
//# sourceMappingURL=config.js.map