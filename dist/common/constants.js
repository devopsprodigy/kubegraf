System.register([], function(exports_1) {
    var ERROR, WARNING, TERMINATING, SUCCESS, COLOR_YELLOW, COLOR_RED, COLOR_GREEN, PODS_LIMIT, CLUSTER_ACCESS_TOKEN, CLUSTER_ACCESS_HTTP, TYPE_PROMETHEUS;
    return {
        setters:[],
        execute: function() {
            ERROR = 3;
            WARNING = 2;
            TERMINATING = 1;
            SUCCESS = 0;
            COLOR_YELLOW = '#ffff0096';
            COLOR_RED = '#a52a2a';
            COLOR_GREEN = '#299c46';
            PODS_LIMIT = 10;
            CLUSTER_ACCESS_TOKEN = 1;
            CLUSTER_ACCESS_HTTP = 2;
            TYPE_PROMETHEUS = "prometheus";
            exports_1("ERROR", ERROR);
            exports_1("WARNING", WARNING);
            exports_1("TERMINATING", TERMINATING);
            exports_1("SUCCESS", SUCCESS);
            exports_1("COLOR_YELLOW", COLOR_YELLOW);
            exports_1("COLOR_RED", COLOR_RED);
            exports_1("COLOR_GREEN", COLOR_GREEN);
            exports_1("PODS_LIMIT", PODS_LIMIT);
            exports_1("CLUSTER_ACCESS_HTTP", CLUSTER_ACCESS_HTTP);
            exports_1("CLUSTER_ACCESS_TOKEN", CLUSTER_ACCESS_TOKEN);
            exports_1("TYPE_PROMETHEUS", TYPE_PROMETHEUS);
        }
    }
});
//# sourceMappingURL=constants.js.map