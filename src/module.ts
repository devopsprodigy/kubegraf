import { loadPluginCss } from '@grafana/runtime';
import { ApplicationsOverview } from './components/applications-overview/applications-overview';
import { ClustersList } from './components/clusters-list/clusters-list';
import { ClusterConfig } from './components/cluster-config/cluster-config';
import { ClusterOverview } from './components/cluster-overview/cluster-overview';
import { NodesOverview } from './components/nodes-overview/nodes-overview';
import { ClusterAlerts } from './components/cluster-alerts/cluster-alerts';
import { DOPKubeGrafAppConfig } from './config/config';

loadPluginCss({
  dark: 'plugins/devopsprodigy-kubegraf-app/styles/dark.css',
  light: 'plugins/devopsprodigy-kubegraf-app/styles/light.css',
});

export {
  ApplicationsOverview,
  ClusterAlerts,
  ClusterConfig,
  ClusterOverview,
  ClustersList,
  NodesOverview,
  DOPKubeGrafAppConfig as ConfigCtrl,
};
