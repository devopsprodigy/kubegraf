import {K8sPage} from "../k8s-page";
import {Node} from "../../common/types/node";
import store from "../../common/store";
import {__convertToGB, __roundCpu, __convertToMicro} from "../../common/helpers";

export class NodesOverview extends K8sPage{

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
    ){
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

    showAllPodsNS(ns){
        ns.limit = false;
    }

    toggleNsList(node){

        node.hideNs = !node.hideNs;

        let key = node.name + 'NsList';
        let state = store.get(key);

        if(state === 'false'){
            state = false;
        }else if(state === 'true'){
            state = true;
        }

        store.set(key, !state);
    };

    updatePods(newPods): void {
        this.insertPodsToNodesMap(newPods);
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
