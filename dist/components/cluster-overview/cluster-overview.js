System.register([], function(exports_1) {
    var ClusterOverview;
    return {
        setters:[],
        execute: function() {
            ClusterOverview = (function () {
                function ClusterOverview($location) {
                    var cluster = $location.search().clusterName;
                    if (cluster) {
                        window.location.href = 'plugins/devopsprodigy-kubegraf-app/page/applications-overview?clusterName=' + cluster;
                    }
                }
                return ClusterOverview;
            })();
            exports_1("ClusterOverview", ClusterOverview);
        }
    }
});
//# sourceMappingURL=cluster-overview.js.map