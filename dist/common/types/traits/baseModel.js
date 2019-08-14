System.register(['../../constants'], function(exports_1) {
    var constants_1;
    var BaseModel;
    return {
        setters:[
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }],
        execute: function() {
            BaseModel = (function () {
                function BaseModel(data) {
                    this.name = data.metadata.name;
                    this.data = data;
                    this.is_deleted = false;
                    this.open = true;
                    this.limit = constants_1.PODS_LIMIT;
                }
                BaseModel.prototype.update = function (data) {
                    this.name = data.metadata.name;
                    this.data = data;
                };
                BaseModel.prototype.destroy = function () {
                    this.is_deleted = true;
                };
                BaseModel.prototype.toggle = function () {
                    this.open = !this.open;
                };
                BaseModel.prototype.showAllPods = function () {
                    this.limit = false;
                };
                return BaseModel;
            })();
            exports_1("BaseModel", BaseModel);
        }
    }
});
//# sourceMappingURL=baseModel.js.map