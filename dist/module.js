System.register(["./components/clusters-list/clusters-list", "./components/cluster-config/cluster-config", "./components/cluster-overview/cluster-overview", "./components/nodes-overview/nodes-overview", "./components/cluster-alerts/cluster-alerts", "./config/config", 'app/plugins/sdk'], function(exports_1) {
    var clusters_list_1, cluster_config_1, cluster_overview_1, nodes_overview_1, cluster_alerts_1, config_1, sdk_1;
    return {
        setters:[
            function (clusters_list_1_1) {
                clusters_list_1 = clusters_list_1_1;
            },
            function (cluster_config_1_1) {
                cluster_config_1 = cluster_config_1_1;
            },
            function (cluster_overview_1_1) {
                cluster_overview_1 = cluster_overview_1_1;
            },
            function (nodes_overview_1_1) {
                nodes_overview_1 = nodes_overview_1_1;
            },
            function (cluster_alerts_1_1) {
                cluster_alerts_1 = cluster_alerts_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }],
        execute: function() {
            sdk_1.loadPluginCss({
                dark: 'plugins/devopsprodigy-kubegraf-app/css/dark.css',
                light: 'plugins/devopsprodigy-kubegraf-app/css/light.css'
            });
            exports_1("ClustersList", clusters_list_1.ClustersList);
            exports_1("ClusterConfig", cluster_config_1.ClusterConfig);
            exports_1("ClusterOverview", cluster_overview_1.ClusterOverview);
            exports_1("NodesOverview", nodes_overview_1.NodesOverview);
            exports_1("ClusterAlerts", cluster_alerts_1.ClusterAlerts);
            exports_1("ConfigCtrl", config_1.DOPKubeGrafAppConfig);
        }
    }
});
//# sourceMappingURL=module.js.map