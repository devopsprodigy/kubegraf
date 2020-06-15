///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import appEvents from "grafana/app/core/app_events";
import config from "grafana/app/core/config";
import {ContextSrv} from "grafana/app/core/services/context_srv";
import {TYPE_KUBEGRAF_PLUGIN} from "../common/constants";

export class DOPK8SDatasource {
    name: string;
    id: number;
    url: string;
    prometheus: string;
    nodesPromise: any;
    refreshRate: number;
    deploymentsPromise: any;
    daemonsetsPromise: any;
    statefulsetsPromise: any;
    podsPromise: any;
    accessViaToken: boolean;
    constextSrv: ContextSrv

    constructor(instanceSettings, private backendSrv, private templateSrv, private contextSrv: ContextSrv){
        this.name = instanceSettings.name;
        this.url = instanceSettings.url;
        this.id = instanceSettings.id;
        this.prometheus = instanceSettings.jsonData.prom_name;
        this.refreshRate = instanceSettings.jsonData.refresh_pods_rate;
        this.nodesPromise = null;
        this.deploymentsPromise = null;
        this.daemonsetsPromise = null;
        this.statefulsetsPromise = null;
        this.accessViaToken = instanceSettings.jsonData.access_via_token;

        this.constextSrv = contextSrv
        const teams = backendSrv.get('/api/user/teams').then(res => {
            console.log('team', res)
        });
    }

    testDatasource(silent: boolean = false){
        let url = '/api/v1/namespaces';
        let _url = this.url;
        if(this.accessViaToken)
            _url += '/__proxy';
        _url += url;
        return this.backendSrv.datasourceRequest({
            url: _url,
            method: "GET",
            headers: {"Content-Type": 'application/json'},
            silent: silent
        })
            .then(response => {
                if (response && response.status === 200) {
                    return {status: "success", message: "Data source is OK", title: "Success"};
                }
                return {status: "error", message: "Data source is not OK", title: "Error"};
            }, error => {
                if (error && error.status && error.statusText) {
                    return {status: "error", message: error.statusText, title: error.status};
                }
                return {status: "error", message: "Data source is not OK", title: "Error"};
            })
    }

    metricFindQuery(query){
        let interpolated = this.templateSrv.replace(query, {});
        let queryData = interpolated.split(" ");
        switch (queryData[0]) {
            case 'prom':
                return Promise.resolve([{
                    text: this.prometheus,
                    value: this.prometheus
                }]);

            case 'node':
                return this.getNodesSingletone()
                    .then(nodes => {
                        return  nodes.map(node => {
                            return {text: node.metadata.name, value: node.metadata.name};
                        });
                    });

            case 'namespace':
                return this.getNamespaces()
                    .then(namespaces => namespaces.map(ns => {
                        return {
                            text: ns.metadata.name,
                            value: ns.metadata.name
                        }
                    }));

            case 'pod':
                return this.getPods(queryData[1])
                    .then(pods => pods.map(pod => {
                        return {
                            text: pod.metadata.name,
                            value: pod.metadata.name
                        }
                    }));

            case 'deployment':
                return this.getDeploymentsSingletone()
                    .then(deployments => deployments
                        .filter(deployment => deployment.metadata.namespace === queryData[1])
                        .map(deployment => {
                            return {
                                text: deployment.metadata.name,
                                value: deployment.metadata.name
                            }
                        })
                    );

            case 'daemonset':
                return this.getDaemonsetsSingletone()
                    .then(daemonsets => daemonsets
                        .filter(daemonset => daemonset.metadata.namespace === queryData[1])
                        .map(daemonset => {
                            return {
                                text: daemonset.metadata.name,
                                value: daemonset.metadata.name
                            }
                        })
                    );

            case 'statefulset':
                return this.getStateFulSetsSingletone()
                    .then(statefulsets => statefulsets
                        .filter(statefulset => statefulset.metadata.namespace === queryData[1])
                        .map(statefulset => {
                            return {
                                text: statefulset.metadata.name,
                                value: statefulset.metadata.name
                            }
                        })
                    );

            case 'containers':

                let promise = null;

                switch (queryData[2]) {
                    case 'deployment':
                        promise = this.getDeploymentsSingletone();
                        break;
                    case 'daemonset':
                        promise = this.getDaemonsetsSingletone();
                        break;
                    case 'statefulset':
                        promise = this.getStateFulSetsSingletone();
                        break;
                    case 'pod':
                        promise = this.getPodsSingleton();
                        break;
                }
                return promise.then(items => {
                    return this.__parseContainers(items, queryData)
                });

            case 'nodeHost':
                return this.getNodesSingletone()
                    .then(nodes => {
                        let node = nodes.filter(item => item.metadata.name === queryData[1])[0];
                        let ip = node.status.addresses.filter(item => item.type === 'InternalIP')[0].address;
                        return [{
                            text: ip,
                            value: ip
                        }];
                    });
            case 'clusters':
                return this.getClusters()
                    .then(clusters => {
                        if(Array.isArray(clusters)) {
                            return clusters.map(cluster => {
                                return {
                                    text: cluster.name,
                                    value: cluster.name
                                }
                            })
                        }
                        return [];
                    })
            default:
                return [];
        }
    }

    __get(url){
        let _url = this.url;
        if(this.accessViaToken)
            _url += '/__proxy';
        _url += url;
        return this.backendSrv.datasourceRequest({
            url: _url,
            method: "GET",
            headers: {"Content-Type": 'application/json'}
        })
            .then(response => {
                return response.data;
            }, error => {
                return error;
            })
    }

    __parseContainers(items, queryData){
        let _item = items
            .filter(item => item.metadata.namespace === queryData[1])
            .filter(item => item.metadata.name === queryData[3]);
        if(!_item.length){
            return [{
                text: '',
                value: ''
            }];
        }
        _item = _item[0];

        let containers = [];
        if(_item.spec.template){
            containers = _item.spec.template.spec.containers.map(
                cont => cont.name
            );
        } else if (_item.spec.containers){
            containers = _item.spec.containers.map(
                cont => cont.name
            );
        }

        let result = [];

        if(containers.length > 1){
            let names = containers.join('|');
            result.push(
                {
                    text: 'All',
                    value: names
                }
            );
        }
        containers.forEach(cont => {
            result.push({
                text: cont,
                value: cont
            })
        });
        return result;
    }

    __addNamespace(namespace){
        return namespace ? 'namespaces/' + namespace + '/' : '';
    }


    getNamespaces(){
        return this.__get('/api/v1/namespaces')
            .then(result => {
                if(!result.items){
                    appEvents.emit('alert-error', [`Namespaces not received`]);
                    return [];
                }
                return result.items;
            });
    }

    getDeployments(namespace = null){
        return this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'deployments')
            .then(result => {
                if(!result.items){
                    appEvents.emit('alert-error', [`Deployments not received`]);
                    return [];
                }
                return result.items;
            });
    }

    getStatefulsets(namespace = null){
        return this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'statefulsets')
            .then(result => {
                if(!result.items){
                    appEvents.emit('alert-error', [`Statefulsets not received`]);
                    return [];
                }
                return result.items;
            })
    }

    getDaemonsets(namespace = null){
        return this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'daemonsets')
            .then(result => {
                if(!result.items){
                    appEvents.emit('alert-error', [`Daemonsets not received`]);
                    return [];
                }
                return result.items;
            })
    }

    getPods(namespace){
        return this.__get('/api/v1/' + this.__addNamespace(namespace) + 'pods')
            .then(result => {
                if(!result.items){
                    const message = `Pods not received`;
                    appEvents.emit('alert-error', [message]);
                    return new Error(message);
                }
                return result.items;
            })
    }

    getServices(namespace){
        return this.__get('/api/v1/' + this.__addNamespace(namespace) + 'services')
            .then(result => {
                if(!result.items){
                    appEvents.emit('alert-error', [`Services not received`]);
                    return [];
                }
                return result.items;
            })
    }

    getComponents(){
        return this.__get('/api/v1/componentstatuses')
            .then(result => {
                if(!result.items){
                    const message = `Component statuses not received`;
                    appEvents.emit('alert-error', [message]);
                    return new Error(message);
                }
                return result.items;
            })
    }

    getNodesSingletone(){
        if(!this.nodesPromise){
            this.nodesPromise = this.__get('/api/v1/nodes')
                .then(result => {
                    if(!result.items){
                        appEvents.emit('alert-error', [`Nodes (singleton) not received`]);
                        return [];
                    }
                    return result.items;
                })
        }
        return this.nodesPromise;
    }


    getDeploymentsSingletone(namespace = null){
        if(!this.deploymentsPromise){
            this.deploymentsPromise = this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'deployments')
                .then(result => {
                    if(!result.items){
                        appEvents.emit('alert-error', [`Deployments (singleton) not received`]);
                        return [];
                    }
                    return result.items;
                });
        }

        return this.deploymentsPromise;
    }

    getDaemonsetsSingletone(namespace = null){
        if(!this.daemonsetsPromise){
            this.daemonsetsPromise = this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'daemonsets')
                .then(result => {
                    if(!result.items){
                        appEvents.emit('alert-error', [`Daemonsets (singleton) not received`]);
                        return [];
                    }
                    return result.items;
                });
        }

        return this.daemonsetsPromise;
    }

    getStateFulSetsSingletone(namespace = null){
        if(!this.statefulsetsPromise){
            this.statefulsetsPromise = this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'statefulsets')
                .then(result => {
                    if(!result.items){
                        appEvents.emit('alert-error', [`Statefulsets (singleton) not received`]);
                        return [];
                    }
                    return result.items;
                });
        }

        return this.statefulsetsPromise;
    }

    getPodsSingleton(namespace = null){
        if(!this.podsPromise){
            this.podsPromise = this.__get('/api/v1/' + this.__addNamespace(namespace) + 'pods')
                .then(result => {
                    if(!result.items){
                        appEvents.emit('alert-error', [`Pods (singleton) not received`]);
                        return [];
                    }
                    return result.items;
                });
        }

        return this.podsPromise;
    }

    getNodes(){
        return this.__get('/api/v1/nodes')
            .then(result => {
                if(!result.items){
                    const message = 'Nodes not received';
                    appEvents.emit('alert-error', [message]);
                    return new Error(message);
                }
                return result.items;
            })
    }

    getJobs(){
        return this.__get('/apis/batch/v1/jobs')
            .then(result => {
                if(!result.items){
                    appEvents.emit('alert-error', [`Jobs not received`]);
                    return [];
                }
                return result.items;
            })
    }
    getCronJobs(){
        return this.__get('/apis/batch/v1beta1/cronjobs')
            .then(result => {
                if(!result.items){
                    appEvents.emit('alert-error', [`CronJobs not received`]);
                    return [];
                }
                return result.items;
            })
    }

    getEvents() {
        return this.__get('/api/v1/events')
            .then(result => {
                if (result.status === 403) {
                    appEvents.emit('alert-error', [result.status+' '+result.statusText, `Please, update ClusterRole to get new permissions`]);
                    return [];
                }
                if (!result.items) {
                    appEvents.emit('alert-error', [`Events not received`]);
                    return [];
                }
                return result.items;
            })
    }

    checkPermission(permissions: any[]): boolean {
        console.log(this.contextSrv)

        if (this.contextSrv.isGrafanaAdmin || this.contextSrv.hasRole('Admin')) {
            return true
        }

        return permissions.findIndex(permission => {
            if(this.contextSrv.hasRole('Editor') && permission.type === "Editor"){
                return true
            }

            if (this.contextSrv.hasRole('Viewer') && permission.type === "Viewer") {
                return true
            }
            // @ts-ignore
            if(permission.type === "User" && permission.user.id === this.contextSrv.user.id){
                return true
            }

            if (permission.type === "Team"){

            }

            return false
        }) > -1
    }

    getClusters() {
        const datasources = config.datasources
        return new Promise((resolve, reject) => {
            if(datasources) {
                const clusters = Object.keys(datasources)
                    .filter(key => datasources[key].type === TYPE_KUBEGRAF_PLUGIN)
                    .map(key => datasources[key])

                resolve(clusters.filter(cluster => {
                    return cluster.jsonData.permissions ? this.checkPermission(cluster.jsonData.permissions) : true
                }));
            } else {
                reject('Datasources not found')
            }
        })
    }
}
