///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['./types/pod', 'app/core/utils/kbn'], function(exports_1) {
    var pod_1, kbn_1;
    var __prepare, __preparePods, __convertToGB, __roundCpu, __convertToMicro, __getLastNonNullValue, __percentUsed;
    return {
        setters:[
            function (pod_1_1) {
                pod_1 = pod_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            }],
        execute: function() {
            __prepare = function (items) {
                return items.map(function (item) {
                    return {
                        name: item.metadata.name,
                        data: item
                    };
                });
            };
            __preparePods = function (pods) {
                return pods.map(function (item) {
                    return new pod_1.Pod(item);
                });
            };
            __convertToGB = function (bytes) {
                return kbn_1.default.valueFormats['bytes'](bytes, 3, null);
            };
            __roundCpu = function (cpu) {
                return parseFloat(cpu).toFixed(3);
            };
            __convertToMicro = function (cpu) {
                return (cpu * 1000) + 'm';
            };
            __getLastNonNullValue = function (dataset) {
                if (dataset) {
                    var skiper = dataset.filter(function (item) { return item[0] != null; });
                    return skiper[skiper.length - 1][0];
                }
            };
            __percentUsed = function (used, allocatable) {
                return ((parseFloat(used) / parseFloat(allocatable)) * 100).toFixed(2) + ' %';
            };
            exports_1("__prepare", __prepare);
            exports_1("__preparePods", __preparePods);
            exports_1("__convertToGB", __convertToGB);
            exports_1("__roundCpu", __roundCpu);
            exports_1("__percentUsed", __percentUsed);
            exports_1("__convertToMicro", __convertToMicro);
            exports_1("__getLastNonNullValue", __getLastNonNullValue);
        }
    }
});
//# sourceMappingURL=helpers.js.map