export class DOPKubeGrafAppConfig {
  static templateUrl = 'config/config.html';
  static $inject = ['$scope', '$injector', '$q'];
  enabled: boolean;
  appModel: any;
  appEditCtrl: any;

  constructor($scope, $injector, private $q) {
    this.enabled = false;
    this.appEditCtrl.setPostUpdateHook();
  }

  postUpdate() {
    if (!this.appModel.enabled) {
      return this.$q.resolve();
    }
    return this.appEditCtrl.importDashboards().then(() => {
      this.enabled = true;
      return {
        url: 'plugins/devopsprodigy-kubegraf-app/page/clusters',
        message: 'DevOpsProdigy KubeGraf enabled!',
      };
    });
  }
}
