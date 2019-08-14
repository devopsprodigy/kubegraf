System.register(['../../common/types/traits/baseModel'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var baseModel_1;
    var Cronjob;
    return {
        setters:[
            function (baseModel_1_1) {
                baseModel_1 = baseModel_1_1;
            }],
        execute: function() {
            Cronjob = (function (_super) {
                __extends(Cronjob, _super);
                function Cronjob(data) {
                    _super.call(this, data);
                    this.jobs = [];
                }
                return Cronjob;
            })(baseModel_1.BaseModel);
            exports_1("Cronjob", Cronjob);
        }
    }
});
//# sourceMappingURL=cronjob.js.map