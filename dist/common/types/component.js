System.register(['../../common/types/traits/baseModel', '../../common/constants'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var baseModel_1, constants_1;
    var Component;
    return {
        setters:[
            function (baseModel_1_1) {
                baseModel_1 = baseModel_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }],
        execute: function() {
            Component = (function (_super) {
                __extends(Component, _super);
                function Component(data) {
                    _super.call(this, data);
                }
                Object.defineProperty(Component.prototype, "status", {
                    get: function () {
                        var type = this.data.conditions.filter(function (item) { return item.type === 'Healthy'; })[0];
                        if (type !== undefined && type.status === 'True') {
                            return constants_1.SUCCESS;
                        }
                        else {
                            return constants_1.ERROR;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Component.prototype, "color", {
                    get: function () {
                        switch (this.status) {
                            case constants_1.SUCCESS:
                                return constants_1.COLOR_GREEN;
                            case constants_1.ERROR:
                                return constants_1.COLOR_RED;
                            default:
                                return;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Component.prototype, "message", {
                    get: function () {
                        var conditions = this.data.conditions;
                        if (conditions) {
                            var message = conditions.filter(function (item) { return item.type === 'Healthy'; })[0];
                            return message && message.message;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Component;
            })(baseModel_1.BaseModel);
            exports_1("Component", Component);
        }
    }
});
//# sourceMappingURL=component.js.map