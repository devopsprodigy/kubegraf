export class DOPK8SDatasource {
    name: string;
    url: string;
    prometheus: string;
    nodesPromise: any;
    deploymentsPromise: any;
    daemonsetsPromise: any;
    statefulsetsPromise: any;
    accessViaToken: boolean;

    constructor(instanceSettings, private backendSrv, private templateSrv){
        this.name = instanceSettings.name;
        this.url = instanceSettings.url;
        this.prometheus = instanceSettings.jsonData.prom_name;
        this.nodesPromise = null;
        this.deploymentsPromise = null;
        this.daemonsetsPromise = null;
        this.statefulsetsPromise = null;
        this.accessViaToken = instanceSettings.jsonData.access_via_token;
    }

    testDatasource(){
        return this.backendSrv.datasourceRequest({
            url: this.url + '/',
            method: "GET"
        }).then(response => {
            if (response.status === 200) {
                return { status: "success", message: "Data source is working", title: "Success" };
            }
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
                }
                return promise.then(items => this.__parseContainers(items, queryData));

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
        let containers = _item.spec.template.spec.containers.map(
            cont => cont.name
        );

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
                return result.items;
            });
    }

    getDeployments(namespace = null){
        return this.__get('/apis/extensions/v1beta1/' + this.__addNamespace(namespace) + 'deployments')
            .then(result => {
                return result.items;
            });
    }

    getStatefulsets(namespace = null){
        return this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'statefulsets')
            .then(result => {
                return result.items;
            })
    }

    getDaemonsets(namespace = null){
        return this.__get('/apis/extensions/v1beta1/' + this.__addNamespace(namespace) + 'daemonsets')
            .then(result => {
                return result.items;
            })
    }

    getPods(namespace){
        return this.__get('/api/v1/' + this.__addNamespace(namespace) + 'pods')
            .then(result => {
                return result.items;
            })
    }

    getServices(namespace){
        return this.__get('/api/v1/' + this.__addNamespace(namespace) + 'services')
            .then(result => {
                return result.items;
            })
    }

    getComponents(){
        return this.__get('/api/v1/componentstatuses')
            .then(result => {
                return result.items;
            })
    }

    getNodesSingletone(){
        if(!this.nodesPromise){
            this.nodesPromise = this.__get('/api/v1/nodes')
                .then(nodes => {
                    return nodes.items;
                })
        }
        return this.nodesPromise;
    }


    getDeploymentsSingletone(namespace = null){
        if(!this.deploymentsPromise){
            this.deploymentsPromise = this.__get('/apis/extensions/v1beta1/' + this.__addNamespace(namespace) + 'deployments')
                .then(result => {
                    return result.items;
                });
        }

        return this.deploymentsPromise;
    }

    getDaemonsetsSingletone(namespace = null){
        if(!this.daemonsetsPromise){
            this.daemonsetsPromise = this.__get('/apis/extensions/v1beta1/' + this.__addNamespace(namespace) + 'daemonsets')
                .then(result => {
                    return result.items;
                });
        }

        return this.daemonsetsPromise;
    }

    getStateFulSetsSingletone(namespace = null){
        if(!this.statefulsetsPromise){
            this.statefulsetsPromise = this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'statefulsets')
                .then(result => {
                    return result.items;
                });
        }

        return this.statefulsetsPromise;
    }

    getNodes(){
        return this.__get('/api/v1/nodes')
            .then(nodes => {
                return nodes.items;
            })
    }

    getJobs(){
        return this.__get('/apis/batch/v1/jobs')
            .then(result => {
                return result.items;
            })
    }
    getCronJobs(){
        return this.__get('/apis/batch/v1beta1/cronjobs')
            .then(result => {
                return result.items;
            })
    }
}
