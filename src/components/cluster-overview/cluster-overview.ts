export class ClusterOverview {
  static $inject = ['$location'];
  constructor($location) {
    const cluster = $location.search().clusterName;
    if (cluster) {
      window.location.href = 'plugins/devopsprodigy-kubegraf-app/page/applications-overview?clusterName=' + cluster;
    }
  }
}
