System.register(["../k8s-page", "../../common/store", "../../common/helpers"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var k8s_page_1, store_1, helpers_1;
    var NodesOverview;
    return {
        setters:[
            function (k8s_page_1_1) {
                k8s_page_1 = k8s_page_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (helpers_1_1) {
                helpers_1 = helpers_1_1;
            }],
        execute: function() {
            NodesOverview = (function (_super) {
                __extends(NodesOverview, _super);
                function NodesOverview($scope, $injector, $q, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $window) {
                    var _this = this;
                    _super.call(this, $scope, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $q);
                    this.$q = $q;
                    this.backendSrv = backendSrv;
                    this.datasourceSrv = datasourceSrv;
                    this.contextSrv = contextSrv;
                    this.$location = $location;
                    this.$timeout = $timeout;
                    this.$window = $window;
                    this.pageReady = false;
                    this.version = helpers_1.__getGrafanaVersion($window);
                    this.__prepareDS().then(function () {
                        _this.getNodeMap()
                            .then(function () {
                            _this.pageReady = true;
                        })
                            .then(function () {
                            _this.getResourcesMetrics().then(function () { });
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
                NodesOverview.prototype.summary = function (ns, metric) {
                    var res = 0;
                    var postfix = null;
                    if (ns.pods) {
                        res = ns.pods.reduce(function (prevValue, pod) {
                            if (pod.metrics[metric] && pod.metrics[metric] !== 'N-A') {
                                var match = pod.metrics[metric].match(/([a-zA-Z]+)$/);
                                var value = 0;
                                if (match[1]) {
                                    switch (match[1]) {
                                        case ('m'):
                                            value = parseInt(pod.metrics[metric], 10);
                                            postfix = 'm';
                                            break;
                                        case ('MiB'):
                                            value = parseFloat(pod.metrics[metric]);
                                            if (postfix === 'GiB') {
                                                value = value / 1024;
                                            }
                                            else {
                                                postfix = 'MiB';
                                            }
                                            break;
                                        case ('GiB'):
                                            value = parseFloat(pod.metrics[metric]);
                                            if (postfix === 'MiB') {
                                                prevValue = prevValue / 1024;
                                            }
                                            postfix = 'GiB';
                                            break;
                                    }
                                }
                                return prevValue + value;
                            }
                            return prevValue;
                        }, 0);
                    }
                    if (res !== 0) {
                        switch (postfix) {
                            case "m":
                                return res + postfix;
                            case "GiB":
                                return Math.round(res * 1000) / 1000 + ' ' + postfix;
                            case "MiB":
                                if (res / 1024 > 1) {
                                    return Math.round((res / 1024) * 1000) / 1000 + ' GiB';
                                }
                                return Math.round(res * 1000) / 1000 + ' ' + postfix;
                        }
                    }
                    return 'N-A';
                };
                NodesOverview.prototype.nodeClick = function (event, node) {
                    if (event.ctrlKey) {
                        if (node.open) {
                            event.preventDefault();
                        }
                        this.toggleNodes(node);
                    }
                    else {
                        node.toggle();
                    }
                };
                NodesOverview.prototype.__showAll = function () {
                    this.toggleNodes(true);
                };
                NodesOverview.prototype.__hideAll = function () {
                    this.toggleNodes(false);
                };
                NodesOverview.prototype.toggleNodes = function (node) {
                    store_1.default.delete('nodeStore');
                    var nodeStore = [];
                    this.nodesMap.map(function (ns) {
                        ns.open = node === true || node === false ? node : node.name === ns.name;
                        nodeStore.push({ name: ns.name, open: ns.open });
                    });
                    store_1.default.setObject('nodeStore', nodeStore);
                };
                NodesOverview.prototype.podsFilterIsDeleted = function (pods) {
                    return pods.filter(function (pod) { return pod.is_deleted === false; });
                };
                NodesOverview.templateUrl = 'components/nodes-overview/nodes-overview.html';
                return NodesOverview;
            })(k8s_page_1.K8sPage);
            exports_1("NodesOverview", NodesOverview);
        }
    }
});
//# sourceMappingURL=nodes-overview.js.map