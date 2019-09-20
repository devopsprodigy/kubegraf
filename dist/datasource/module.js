System.register(["./datasource", "./config"], function(exports_1) {
    var datasource_1, config_1;
    return {
        setters:[
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            exports_1("Datasource", datasource_1.DOPK8SDatasource);
            exports_1("ConfigCtrl", config_1.DOPK8SConfig);
        }
    }
});
//# sourceMappingURL=module.js.map