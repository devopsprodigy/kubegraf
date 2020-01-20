export class ClusterOverview {

    constructor($location) {
        const cluster = $location.search().clusterName;
        if (cluster) {
            window.location.href = 'plugins/devopsprodigy-kubegraf-app/page/applications-overview?clusterName=' + cluster
        }
    }
}
