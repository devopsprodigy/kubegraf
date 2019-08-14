System.register(["./datasource"], function(exports_1) {
    var datasource_1;
    var DOPK8SConfigCtrl;
    return {
        setters:[
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            }],
        execute: function() {
            DOPK8SConfigCtrl = (function () {
                function DOPK8SConfigCtrl() {
                }
                DOPK8SConfigCtrl.templateUrl = 'datasource/partials/config.html';
                return DOPK8SConfigCtrl;
            })();
            exports_1("Datasource", datasource_1.DOPK8SDatasource);
            exports_1("ConfigCtrl", DOPK8SConfigCtrl);
        }
    }
});
//# sourceMappingURL=module.js.map