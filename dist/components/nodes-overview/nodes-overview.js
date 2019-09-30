System.register(["../k8s-page", "../../common/store"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var k8s_page_1, store_1;
    var NodesOverview;
    return {
        setters:[
            function (k8s_page_1_1) {
                k8s_page_1 = k8s_page_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            NodesOverview = (function (_super) {
                __extends(NodesOverview, _super);
                function NodesOverview($scope, $injector, $q, backendSrv, datasourceSrv, contextSrv, $location, $timeout) {
                    var _this = this;
                    _super.call(this, $scope, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $q);
                    this.$q = $q;
                    this.backendSrv = backendSrv;
                    this.datasourceSrv = datasourceSrv;
                    this.contextSrv = contextSrv;
                    this.$location = $location;
                    this.$timeout = $timeout;
                    this.pageReady = false;
                    this.__prepareDS().then(function () {
                        _this.getNodeMap().then(function () {
                            _this.pageReady = true;
                        })
                            .then(function () {
                            _this.getResourcesMetrics().then(function () {
                            });
                        });
                    });
                }
                NodesOverview.prototype.showAllPodsNS = function (ns) {
                    ns.limit = false;
                };
                NodesOverview.prototype.toggleNsList = function (node) {
                    node.hideNs = !node.hideNs;
                    var key = node.name + 'NsList';
                    var state = store_1.default.get(key);
                    if (state === 'false') {
                        state = false;
                    }
                    else if (state === 'true') {
                        state = true;
                    }
                    store_1.default.set(key, !state);
                };
                ;
                NodesOverview.prototype.updatePods = function (newPods) {
                    this.insertPodsToNodesMap(newPods);
                };
                NodesOverview.prototype.__showAll = function () {
                    store_1.default.delete('nodeStore');
                    var nodeStore = [];
                    this.nodesMap.map(function (ns) {
                        ns.open = true;
                        nodeStore.push({ name: ns.name, open: ns.open });
                    });
                    store_1.default.setObject('namespaceStore', nodeStore);
                };
                NodesOverview.templateUrl = 'components/nodes-overview/nodes-overview.html';
                return NodesOverview;
            })(k8s_page_1.K8sPage);
            exports_1("NodesOverview", NodesOverview);
        }
    }
});
//# sourceMappingURL=nodes-overview.js.map