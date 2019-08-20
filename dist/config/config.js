System.register([], function(exports_1) {
    var DOPKubeGrafAppConfig;
    return {
        setters:[],
        execute: function() {
            DOPKubeGrafAppConfig = (function () {
                function DOPKubeGrafAppConfig($scope, $injector, $q) {
                    this.$q = $q;
                    this.enabled = false;
                    this.appEditCtrl.setPostUpdateHook();
                }
                DOPKubeGrafAppConfig.prototype.postUpdate = function () {
                    var _this = this;
                    if (!this.appModel.enabled) {
                        return this.$q.resolve();
                    }
                    return this.appEditCtrl.importDashboards().then(function () {
                        _this.enabled = true;
                        return {
                            url: "plugins/devopsprodigy-kubegraf-app/page/clusters",
                            message: "DevOpsProdigy KubeGraf enabled!"
                        };
                    });
                };
                DOPKubeGrafAppConfig.templateUrl = 'config/config.html';
                return DOPKubeGrafAppConfig;
            })();
            exports_1("DOPKubeGrafAppConfig", DOPKubeGrafAppConfig);
        }
    }
});
//# sourceMappingURL=config.js.map