import {K8sPage} from "../k8s-page";
import {Node} from "../../common/types/node";
import store from "../../common/store";
import {__convertToGB, __roundCpu, __convertToMicro} from "../../common/helpers";

export class NodesOverview extends K8sPage {

    static templateUrl = 'components/nodes-overview/nodes-overview.html';

    constructor(
        $scope,
        $injector,
        public $q,
        public backendSrv,
        public datasourceSrv,
        public contextSrv,
        public $location,
        public $timeout
    ) {
        super($scope, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $q);
        this.pageReady = false;

        this.__prepareDS().then(() => {
            this.getNodeMap().then(() => {
                this.pageReady = true;
            })
                .then(() => {
                    this.getResourcesMetrics().then(() => {

                    })
                });
        });

    }

    showAllPodsNS(ns) {
        ns.limit = false;
    }

    toggleNsList(node) {

        node.hideNs = !node.hideNs;

        let key = node.name + 'NsList';
        let state = store.get(key);

        if (state === 'false') {
            state = false;
        } else if (state === 'true') {
            state = true;
        }

        store.set(key, !state);
    };

    updatePods(newPods): void {
        this.insertPodsToNodesMap(newPods);
    }

    summary(ns, metric) {
        let res = 0;
        let postfix = null;
        if (ns.pods) {
            res = ns.pods.reduce((prevValue, pod) => {
                if (pod.metrics[metric] && pod.metrics[metric] !== 'N-A') {
                    const match = pod.metrics[metric].match(/([a-zA-Z]+)$/)
                    let value = 0
                    if (match[1]) {
                        switch (match[1]) {
                            case('m'):
                                value = parseInt(pod.metrics[metric], 10);
                                postfix = 'm';
                                break;
                            case('MiB'):
                                value = parseFloat(pod.metrics[metric]);
                                if (postfix === 'GiB') {
                                    value = value / 1024;
                                } else {
                                    postfix = 'MiB';
                                }
                                break;
                            case('GiB'):
                                value = parseFloat(pod.metrics[metric]);
                                if (postfix === 'MiB') {
                                    prevValue = prevValue / 1024
                                }
                                postfix = 'GiB';
                                break;
                        }
                    }
                    return prevValue + value
                }
                return prevValue
            }, 0)
        }

        if (res !== 0) {
            switch (postfix) {
                case "m":
                    return res + postfix;
                case "GiB":
                    return Math.round(res * 1000) / 1000 + ' ' + postfix;
                case "MiB":
                    if(res / 1024 > 1){
                        return Math.round((res / 1024) * 1000) / 1000 + ' GiB';
                    }
                    return Math.round(res * 1000) / 1000 + ' ' + postfix;
            }
        }

        return 'N-A'
    }

    nodeClick(event, node) {
        if (event.ctrlKey) {
            if(node.open) {
                event.preventDefault();
            }

            store.delete('nodeStore');
            let nodeStore = [];
            this.nodesMap.map(ns => {
                ns.open = node.name === ns.name;
                nodeStore.push({name: ns.name, open: ns.open});
            });
            store.setObject('nodeStore', nodeStore);
        } else {
            node.toggle();
        }
    }

    __showAll(){
        store.delete('nodeStore');
        let nodeStore = [];
        this.nodesMap.map(ns => {
            ns.open = true;
            nodeStore.push({name: ns.name, open: ns.open});
        });
        store.setObject('nodeStore', nodeStore);
    }

    __hideAll(){
        store.delete('nodeStore');
        let nodeStore = [];
        this.nodesMap.map(ns => {
            ns.open = false;
            nodeStore.push({name: ns.name, open: ns.open});
        });
        store.setObject('nodeStore', nodeStore);
    }
}
