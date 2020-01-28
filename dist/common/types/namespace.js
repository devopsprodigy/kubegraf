System.register(["../../common/store", '../../common/types/traits/baseModel'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var store_1, baseModel_1;
    var Namespace;
    return {
        setters:[
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (baseModel_1_1) {
                baseModel_1 = baseModel_1_1;
            }],
        execute: function() {
            Namespace = (function (_super) {
                __extends(Namespace, _super);
                function Namespace(data) {
                    _super.call(this, data);
                    this.deployments = [];
                    this.statefulsets = [];
                    this.daemonsets = [];
                    this.other = [{ pods: [] }];
                    this.sort = 'name';
                }
                Namespace.prototype.toggle = function () {
                    var _this = this;
                    _super.prototype.toggle.call(this);
                    var namespaceStore = store_1.default.getObject('namespaceStore');
                    var index = namespaceStore.findIndex(function (item) { return item.name === _this.name; });
                    if (index || index === 0)
                        namespaceStore[index].open = this.open;
                    store_1.default.setObject('namespaceStore', namespaceStore);
                };
                return Namespace;
            })(baseModel_1.BaseModel);
            exports_1("Namespace", Namespace);
        }
    }
});
//# sourceMappingURL=namespace.js.map