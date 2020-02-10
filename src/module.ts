import {ApplicationsOverview} from "./components/applications-overview/applications-overview";
import {ClustersList} from "./components/clusters-list/clusters-list";
import {ClusterConfig} from "./components/cluster-config/cluster-config";
import {ClusterOverview} from "./components/cluster-overview/cluster-overview";
import {NodesOverview} from "./components/nodes-overview/nodes-overview";
import {ClusterAlerts} from "./components/cluster-alerts/cluster-alerts";
import {DOPKubeGrafAppConfig} from "./config/config";

import {loadPluginCss} from 'grafana/app/plugins/sdk';

loadPluginCss({
    dark: 'plugins/devopsprodigy-kubegraf-app/css/dark.css',
    light: 'plugins/devopsprodigy-kubegraf-app/css/light.css'
});

export {
    ApplicationsOverview,
    ClusterAlerts,
    ClusterConfig,
    ClusterOverview,
    ClustersList,
    NodesOverview,
    DOPKubeGrafAppConfig as ConfigCtrl
}
