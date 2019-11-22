System.register(['moment'], function(exports_1) {
    var moment_1;
    var PrometheusProxy;
    return {
        setters:[
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            PrometheusProxy = (function () {
                function PrometheusProxy(ds) {
                    this.__getLastNonNullValue = function (dataset) {
                        if (dataset) {
                            var skiper = dataset.filter(function (item) { return item[0] != null; });
                            return skiper[skiper.length - 1][0];
                        }
                    };
                    this.ds = ds;
                }
                PrometheusProxy.prototype.query = function (query) {
                    var _this = this;
                    var body = {
                        range: { from: moment_1.default().subtract(2, 'minute'), to: moment_1.default() },
                        targets: [{ expr: query.expr, format: 'time_series' }],
                        legendFormat: '{{' + query.legend + '}}',
                        interval: '15s'
                    };
                    var res = this.ds.query(body);
                    if (typeof res.then !== "function") {
                        res = res.toPromise();
                    }
                    return res.then(function (res) {
                        if (res && res.data) {
                            return _this.formData(res.data, query);
                        }
                        else {
                            return {};
                        }
                    });
                };
                PrometheusProxy.prototype.formData = function (data, query) {
                    var _this = this;
                    return data.map(function (item) {
                        return {
                            target: item.target.substring(query.legend.length + 3, item.target.length - 2),
                            datapoint: _this.__getLastNonNullValue(item.datapoints)
                        };
                    });
                };
                return PrometheusProxy;
            })();
            exports_1("PrometheusProxy", PrometheusProxy);
        }
    }
});
//# sourceMappingURL=prometheusProxy.js.map