///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import appEvents from "app/core/app_events";

import {Pod} from "../common/types/pod";
import angular from "angular";
import {PrometheusProxy} from "../common/proxies/prometheusProxy";
import {ERROR, PODS_LIMIT, TERMINATING, WARNING} from "../common/constants";
import {Component} from "../common/types/component";
import {Service} from "../common/types/service";
import {Job} from "../common/types/job";
import {Cronjob} from "../common/types/cronjob";
import {Namespace} from "../common/types/namespace";
import store from "../common/store";
import {Deployment} from "../common/types/deployment";
import {Statefulset} from "../common/types/statefulset";
import {Daemonset} from "../common/types/daemonset";
import {Node} from "../common/types/node";
import {__convertToGB, __convertToMicro, __getLastNonNullValue, __roundCpu} from "../common/helpers";
import {BaseModel} from '../common/types/traits/baseModel';

const REFRESH_RATE_DEFAULT = 60000;

export  class K8sPage {
    pageReady: boolean;
    namespaceMapReady: boolean;
    nodesMapReady: boolean = false;
    $scope: any;
    cluster: any;
    prometheusDS: any;
    isAdmin: boolean;
    location: any;
    backendSrv: any;
    datasourceSrv: any;
    contextSrv: any;
    timeout: any;
    refreshRate: number;
    $q: any;

    //common store
    storePods: Array<Pod> = [];
    storeComponents: Array<Component> = [];
    storeServices: Array<Service> = [];
    storeJobs: Array<Job> = [];
    storeCronJobs: Array<Cronjob> = [];
    storeDeployments: Array<Deployment> = [];
    storeStatefulSets: Array<Statefulset> = [];
    storeDaemonSets: Array<Daemonset> = [];
    namespaceMap: Array<Namespace> = [];
    nodesMap: Array<Node> = [];
    nodesError: Boolean|Error = false;
    podsError: Boolean|Error = false;
    componentsError: Boolean|Error = false;


    updatePods(pods){

    };

    constructor(
        $scope,
        backendSrv,
        datasourceSrv,
        contextSrv,
        $location,
        timeout,
        $q
    ) {
        this.$q = $q;
        this.$scope = $scope;
        this.pageReady = false;
        this.location = $location;
        this.backendSrv = backendSrv;
        this.contextSrv = contextSrv;
        this.datasourceSrv = datasourceSrv;
        this.timeout = timeout;
        try{
            this.isAdmin = this.contextSrv.isGrafanaAdmin;
        }catch (e) {
            console.error(e);
            this.isAdmin = false;
        }
        if( ! ("clusterName" in $location.search())){
            appEvents.emit('alert-error', ['Cluster not specified']);

            return;
        }
        document.title = 'DevOpsProdigy KubeGraf';
    }

    getNodeDashboardLink(node){
        let dbUrl = 'dashboard/db/devopsprodigy-kubegraf-nodes-dashboard?orgId=1';
        dbUrl += '&' + 'var-cluster=' + this.cluster.name;
        dbUrl += '&' + 'var-node=' + node.name;
        return dbUrl;
    }

    getPodDashboardLink(pod){
        let dbUrl = 'dashboard/db/devopsprodigy-kubegraf-pods-dashboard?orgId=1';
        dbUrl += '&' + 'var-cluster=' + this.cluster.name;
        dbUrl += '&' + 'var-namespace=' + pod.data.metadata.namespace;
        dbUrl += '&' + 'var-pod=' + pod.name;
        return dbUrl;
    }

    getEntityDashboardLink(entity, name){
        let entityName = name.substring(0, name.length-1);
        let dbUrl = 'dashboard/db/devopsprodigy-kubegraf-' + name + '-dashboard?orgId=1';
        dbUrl += '&' + 'var-cluster=' + this.cluster.name;
        dbUrl += '&' + 'var-namespace=' + entity.data.metadata.namespace;
        dbUrl += '&' + 'var-'+ entityName +'=' + entity.name;
        return dbUrl;
    }


    getNodeMap(withoutPods = false){
        let _promises = [];
        _promises.push(this.getNodes());

        if(!withoutPods)
            _promises.push(this.getPods(true));

        return this.$q.all(_promises)
            .then(() => {
                if(!withoutPods){
                    this.insertPodsToNodesMap(this.storePods);
                    this.getPodsMetrics();
                }

                this.timeout(() => {
                    this.refreshNodes();
                }, this.refreshRate);
            })

    }

    getResourcesMetrics(){
        let _promises = [];
        _promises.push(this.__getCpuMetricsRequested());
        _promises.push(this.__getMemoryMetricsRequested());
        _promises.push(this.__getPodsCountMetrics());
        _promises.push(this.__getCpuMetricsUsed());
        _promises.push(this.__getMemoryMetricsUsed());

        return this.$q.all(_promises)
            .then((results) => {
                this.nodesMap.forEach(node => {
                    node.parseMetrics(results[0], results[1], results[2], results[3], results[4]);
                });

                this.timeout(() => {
                    this.getResourcesMetrics();
                }, this.refreshRate);
            })
    }

    __getCpuMetricsUsed(){
        const promQuery = {
            expr: 'sum(rate(container_cpu_usage_seconds_total{id="/", job="kubelet"}[1m])) by (node)',
            legend: 'node'
        }
        return this.prometheusDS.query(promQuery)
            .then(res => res)
    }

    __getCpuMetricsRequested(){
        const promQuery = {
            expr: 'sum(kube_pod_container_resource_requests_cpu_cores) by (node)',
            legend: 'node'
        };

        return this.prometheusDS.query(promQuery)
            .then(res => res);
    }

    __getMemoryMetricsRequested(){
        const promQuery = {
            expr: 'sum(kube_pod_container_resource_requests_memory_bytes) by (node)',
            legend: "node"
        };

        return this.prometheusDS.query(promQuery)
            .then(res => res);
    }

    __getMemoryMetricsUsed(){
        const promQuery = {
            expr: 'sum(node_memory_MemTotal_bytes{job="node-exporter"}) by (instance) - sum(node_memory_MemAvailable_bytes{job="node-exporter"}) by (instance)',
            legend: 'instance'
        };

        return this.prometheusDS.query(promQuery)
            .then(res => res);
    }

    __getPodsCountMetrics(){
        const promQuery = {
            expr: 'sum(kubelet_running_pod_count) by (node)',
            legend: 'node'
        };

        return this.prometheusDS.query(promQuery)
            .then(res => res);
    }

    getNodes(){
        return this.cluster.getNodes()
            .then(nodes => {

                let nodeStore = [];
                let getStore = store.getObject('nodeStore');

                if(getStore){
                    nodeStore = getStore;
                }

                if(nodes instanceof Array) {
                    this.nodesError = false;
                    nodes.forEach(node => {

                        let nd = new Node(node);
                        this.nodesMap.push(nd);

                        let index = nodeStore.findIndex(item => item.name === nd.name);

                        if (index > -1) {
                            nd.open = nodeStore[index].open;
                        } else {
                            nodeStore.push({name: nd.name, open: nd.open});
                        }

                    });
                    store.setObject('nodeStore', nodeStore);
                } else if (nodes instanceof Error){
                    this.nodesError = nodes;
                }
            })
    }

    getPodsMetrics(){
        let _promises = [];
        _promises.push(this.__getPodsUsedCpu());
        _promises.push(this.__getPodsUsedMemory());
        _promises.push(this.__getPodsRequestedCpu());
        _promises.push(this.__getPodsRequestedMemory());


        this.$q.all(_promises)
            .then(results => {
                this.nodesMap.forEach(node => {
                    node.namespaces.map(namespace => {
                        namespace.pods.map(pod => {
                            let cpu = results[0].filter(item => item.target === pod.name)[0];
                            let mem = results[1].filter(item => item.target === pod.name)[0];
                            let cpuReq = results[2].filter(item => item.target === pod.name)[0];
                            let memReq = results[3].filter(item => item.target === pod.name)[0];

                            if (cpu !== undefined) {
                                pod.metrics.cpuUsed = __convertToMicro(cpu.datapoint.toFixed(3));
                            }
                            if (mem !== undefined) {
                                pod.metrics.memoryUsed = __convertToGB(mem.datapoint);
                            }

                            if(cpuReq !== undefined){
                                pod.metrics.cpuRequested = __convertToMicro(__roundCpu(cpuReq.datapoint));
                            }

                            if(memReq !== undefined){
                                pod.metrics.memoryRequested = __convertToGB(memReq.datapoint);
                            }
                        });
                    });
                });

                this.timeout(() => {
                    this.getPodsMetrics();
                }, this.refreshRate);

            })
    }

    __getPodsUsedCpu(){
        const podsUsedCpu = {
            expr: 'sum(rate(container_cpu_usage_seconds_total{pod_name!="", container!="", container!="POD"}[1m])) by (pod_name)',
            legend: 'pod_name'
        };

        return this.prometheusDS.query(podsUsedCpu)
            .then(res => res);
    }

    __getPodsUsedMemory(){
        const podsUsedMemory = {
            expr: 'sum (container_memory_usage_bytes{container_name!="", container_name!="POD"}) by (pod_name)',
            legend: 'pod_name'
        };

        return this.prometheusDS.query(podsUsedMemory)
            .then(res => res);
    }

    __getPodsRequestedCpu(){
        const podsUsedCpu = {
            expr: 'sum(kube_pod_container_resource_requests_cpu_cores) by (pod)',
            legend: 'pod'
        };

        return this.prometheusDS.query(podsUsedCpu)
            .then(res => res);
    }

    __getPodsRequestedMemory(){
        const podsUsedMemory = {
            expr: 'sum(kube_pod_container_resource_requests_memory_bytes) by (pod)',
            legend: 'pod'
        };

        return this.prometheusDS.query(podsUsedMemory)
            .then(res => res);
    }

    insertPodsToNodesMap(pods){
        this.nodesMap.forEach(node => {


            let filterPods = pods.filter(pod => pod.data.status.hostIP === node.hostIp);

            filterPods.forEach(pod => {
                let _nsIsset = node.namespaces.filter(item => {
                    return item.name === pod.data.metadata.namespace;
                });

                if(_nsIsset.length === 0){
                    let _ns = {
                        name: pod.data.metadata.namespace,
                        pods: [],
                        limit: PODS_LIMIT
                    };
                    node.namespaces.push(_ns);
                }

                let _ns = node.namespaces.filter(item => {
                    return item.name === pod.data.metadata.namespace;
                })[0];
                _ns.pods.push(pod);
            });
        });
    }



    refreshNodes(){
        this.cluster.getNodes()
            .then(nodes => {
                return this.nodesMap.forEach(issetNode => {
                    let equalNode = nodes.filter(item => {
                        return item.metadata.uid === issetNode.data.metadata.uid
                    });
                    if(equalNode.length > 0){
                        equalNode = equalNode[0];
                        issetNode.update(equalNode);
                    }
                })
            })
            .then(() => {
                this.timeout(() => {
                    this.refreshNodes();
                }, this.refreshRate);
            });
    }

    getNamespaceMap(){
        this.cluster.getNamespaces()
            .then(namespaces => {
                let namespaceStore = [];
                let getStore = store.getObject('namespaceStore');
                if(getStore){
                    namespaceStore = getStore;
                }
                namespaces.forEach(namespace => {
                    let ns = new Namespace(namespace);
                    this.namespaceMap.push(ns);
                    let index = namespaceStore.findIndex(item => item.name === ns.name);

                    if(index > -1){
                        ns.open = namespaceStore[index].open;
                    }else{
                        namespaceStore.push({name: ns.name, open: ns.open});
                    }
                });
                store.setObject('namespaceStore', namespaceStore);

                let _promises = [];
                _promises.push(this.attachDeployments());
                _promises.push(this.attachStatefulsets());
                _promises.push(this.attachDaemonsets());
                _promises.push(this.getClusterCronJobs());
                _promises.push(this.getClusterJobs());

                this.$q.all(_promises)
                    .then(() => {
                        this.attachJobs();
                        this.attachCronJobs();

                        let _psPromises = [];
                        _psPromises.push(this.getAllServices());
                        _psPromises.push(this.getPods());
                        this.$q.all(_psPromises)
                            .then(() => {
                                this.attachPodsToMap();
                                this.namespaceMapReady = true;
                            });
                    })
            });
    }

    attachDeployments(){
        return this.cluster.getDeployments()
            .then(deployments => {
                deployments.forEach(item => {
                    let deploy = new Deployment(item);
                    let _ns = this.__getNamespace(item.metadata.namespace);
                    this.storeDeployments.push(deploy);
                    _ns.deployments.push(deploy);
                });
            }).then(
                this.timeout(()=> {
                    this.refreshDeployments();
                }, this.refreshRate)
            );
    }

    refreshDeployments(){
        this.cluster.getDeployments()
            .then( newDeployments => {
                this.storeDeployments.filter(deployment => {
                    return !deployment.is_deleted;
                }).forEach(issetDeployment => {
                    let equalDeployment = newDeployments.filter(item => {
                        return item.metadata.uid === issetDeployment.data.metadata.uid
                    });
                    if(equalDeployment.length > 0){
                        equalDeployment = equalDeployment[0];
                    }else{
                        equalDeployment = false;
                    }

                    if(equalDeployment !== false){
                        issetDeployment.update(equalDeployment);
                        newDeployments.splice(newDeployments.indexOf(equalDeployment), 1);
                    }else{
                        issetDeployment.destroy();
                    }
                });
                newDeployments = newDeployments.map(newDeployment => new Deployment(newDeployment));
                this.storeDeployments = this.storeDeployments.concat(newDeployments);

                newDeployments.forEach(newDeployment => {
                    let _ns = this.__getNamespace(newDeployment.data.metadata.namespace);
                    _ns.deployments.push(newDeployment);
                });
            }).then(
            this.timeout(()=> {
                this.refreshDeployments();
            }, this.refreshRate)
        );
    };

    attachStatefulsets(){
        return this.cluster.getStatefulsets()
            .then(statefulsets => {
                statefulsets.forEach(item => {
                    let _ns = this.__getNamespace(item.metadata.namespace);
                    let ss = new Statefulset(item);
                    _ns.statefulsets.push(ss);
                    this.storeStatefulSets.push(ss);
                });
            }).then(
                this.timeout(()=> {
                    this.refreshStatefulsets();
                }, this.refreshRate)
            );
    }

    refreshStatefulsets(){
        this.cluster.getStatefulsets()
            .then( Statefulsets => {
                this.storeStatefulSets.filter(statefulset => {
                    return !statefulset.is_deleted;
                }).forEach(issetStatefulset => {
                    let equalStatefulset = Statefulsets.filter(item => {
                        return item.metadata.uid === issetStatefulset.data.metadata.uid
                    });
                    if(equalStatefulset.length > 0){
                        equalStatefulset = equalStatefulset[0];
                    }else{
                        equalStatefulset = false;
                    }

                    if(equalStatefulset !== false){
                        issetStatefulset.update(equalStatefulset);
                        Statefulsets.splice(Statefulsets.indexOf(equalStatefulset), 1);
                    }else{
                        issetStatefulset.destroy();
                    }
                });
                Statefulsets = Statefulsets.map(newStatefulset => new Statefulset(newStatefulset));
                this.storeStatefulSets = this.storeStatefulSets.concat(Statefulsets);

                Statefulsets.forEach(newStatefulset => {
                    let _ns = this.__getNamespace(newStatefulset.data.metadata.namespace);
                    _ns.statefulsets.push(newStatefulset);
                });
            }).then(
            this.timeout(()=> {
                this.refreshStatefulsets();            //expr: 'sum(kube_pod_container_resource_requests_memory_bytes) by (pod)',
            }, this.refreshRate)
        );
    };

    attachDaemonsets(){
        return this.cluster.getDaemonsets()
            .then(daemonsets => {
                daemonsets.forEach(item => {
                    let _ns = this.__getNamespace(item.metadata.namespace);
                    let ds = new Daemonset(item);
                    _ns.daemonsets.push(ds);
                    this.storeDaemonSets.push(ds);
                });
            }).then(
                this.timeout(()=> {
                    this.refreshDaemonsets();
                }, this.refreshRate)
            );
    }

    refreshDaemonsets(){
        this.cluster.getDaemonsets()
            .then( Daemonsets => {
                this.storeDaemonSets.filter(daemonset => {
                    return !daemonset.is_deleted;
                }).forEach(issetDaemonSet => {
                    let equalDaemonSet = Daemonsets.filter(item => {
                        return item.metadata.uid === issetDaemonSet.data.metadata.uid
                    });
                    if(equalDaemonSet.length > 0){
                        equalDaemonSet = equalDaemonSet[0];
                    }else{
                        equalDaemonSet = false;
                    }

                    if(equalDaemonSet !== false){
                        issetDaemonSet.update(equalDaemonSet);
                        Daemonsets.splice(Daemonsets.indexOf(equalDaemonSet), 1);
                    }else{
                        issetDaemonSet.destroy();
                    }
                });
                Daemonsets = Daemonsets.map(newDaemonset => new Daemonset(newDaemonset));
                this.storeDaemonSets = this.storeDaemonSets.concat(Daemonsets);

                Daemonsets.forEach(newDaemonset => {
                    let _ns = this.__getNamespace(newDaemonset.data.metadata.namespace);
                    _ns.daemonsets.push(newDaemonset);
                });
            }).then(
            this.timeout(()=> {
                this.refreshDaemonsets();
            }, this.refreshRate)
        );
    };

    attachJobs(){
        this.namespaceMap.forEach(ns => {
            let jobsList = this.storeJobs.filter(job => !job.data.metadata.ownerReferences && job.data.metadata.namespace === ns.name);
            let ns_crons = this.storeCronJobs.filter(cron => cron.data.metadata.namespace === ns);
            ns_crons.forEach(cj => {
                let uid = cj.data.metadata.uid;
                this.storeJobs.forEach(job => {
                    if(job.data.metadata.ownerReferences){
                        if(!job.data.metadata.ownerReferences.filter(item => item.kind === 'CronJob' && item.uid === uid)[0]){
                            jobsList.push(job)
                        }
                    }
                });
            });

            ns.jobs = jobsList;
        });
    }

    attachCronJobs(){
        this.namespaceMap.forEach(ns=> {
            ns.cronJobs = this.storeCronJobs.filter(cron => cron.data.metadata.namespace === ns.name);

            ns.cronJobs.forEach(cj => {

                let uid = cj.data.metadata.uid;
                let jobsList = [];

                this.storeJobs.forEach(job => {
                    if(job.data.metadata.ownerReferences){
                        if(job.data.metadata.ownerReferences.filter(item => item.kind === 'CronJob' && item.uid === uid)[0]){
                            jobsList.push(job);
                        }
                    }
                });

                cj.jobs = jobsList;
            });
        });
    }

    attachPodsToMap(){
        this.namespaceMap.forEach(ns => {
            ns.deployments.forEach(deployment => {
                deployment.pods =  this.__findPodsBySelector(
                    deployment.data.spec.selector.matchLabels,
                    ns.name
                );
                deployment.services = this.__findServices(deployment);
            });
            ns.statefulsets.forEach(statefulset => {
                statefulset.pods =  this.__findPodsBySelector(
                    statefulset.data.spec.selector.matchLabels,
                    ns.name
                );
                statefulset.services = this.__findServices(statefulset);
            });
            ns.daemonsets.forEach(daemonset => {
                daemonset.pods =  this.__findPodsBySelector(
                    daemonset.data.spec.selector.matchLabels,
                    ns.name
                );
                daemonset.services = this.__findServices(daemonset);
            });

            ns.jobs.forEach(job =>{
                job.pods = this.__findPodsBySelector(
                    job.data.metadata.labels,
                    ns.name
                );
            });

            ns.cronJobs.forEach(cron =>{
                cron.jobs.map(job => {
                    job.pods = this.__findPodsBySelector(
                        job.data.metadata.labels,
                        ns.name
                    );
                });
            });

            ns.other[0].pods = this.storePods.filter(item => !item.used && item.data.metadata.namespace === ns.name);
        });
    }

    updateJobs() {
        let _promises = [];

        _promises.push(this.refreshJobs());

        this.$q.all(_promises)
            .then(() => {
                this.attachJobs();
                this.attachCronJobs();
            });
    }


    __findPodsBySelector(filter, namespace, pods = this.storePods){
        return pods.filter(item => {
            return item.data.metadata.namespace === namespace;
        }).filter(item => {
            let labels = item.data.metadata.labels;
            for(let prop in filter){
                if(!labels.hasOwnProperty(prop))
                    return false;
                if(labels[prop] != filter[prop])
                    return false;
            }
            item.used = true;
            return true;
        })
    }

    __findServices(entity){
        return this.storeServices.filter(item => {
            if(!item.data.spec || !item.data.spec.selector)
                return false;
            let matchLabels = item.data.spec.selector;
            let result = this.__findPodsBySelector(matchLabels, item.data.metadata.namespace, entity.pods);
            if(result.length > 0)
                return true;

            return false;
        })
    }

    __prepareDS(){
        return this.datasourceSrv.get(this.location.search().clusterName)
            .then(ds => {
                this.cluster = ds;
                this.__setRefreshRate(this.cluster.refreshRate);
                this.getPrometheusDS(this.cluster.prometheus)
                    .then(() => {
                        this.pageReady = true;
                    })
            })
    }

    getPrometheusDS(name){
        return this.datasourceSrv.get(name)
            .then(ds => {
                this.prometheusDS = new PrometheusProxy(ds);
            })
    }


    getPods(skipEmptyHost = false){
        return this.cluster.getPods()
            .then(pods => {
                if(pods instanceof Array) {
                    this.podsError = false;
                    if(skipEmptyHost)
                        pods = pods.filter(pod => pod.status.hostIP != undefined);

                    this.storePods = pods.map(pod => new Pod(pod));
                } else if (pods instanceof Error){
                    this.podsError = pods;
                }

                this.timeout(() => {
                    this.refreshPods(skipEmptyHost);
                },this.refreshRate)
            })
    }



    refreshPods(skipEmptyHost = false){

        this.cluster.getPods()
            .then(pods => {
                if(pods instanceof Array) {
                    this.podsError = false;

                    if (skipEmptyHost)
                        pods = pods.filter(pod => pod.status.hostIP != undefined);

                    this.storePods.filter(pod => {
                        return !pod.is_deleted;
                    }).forEach(issetPod => {
                        let equalPod = pods.filter(item => {
                            return item.metadata.uid === issetPod.data.metadata.uid
                        });
                        if (equalPod.length > 0) {
                            equalPod = equalPod[0];
                        } else {
                            equalPod = false;
                        }

                        if (equalPod !== false) {
                            issetPod.update(equalPod);
                            pods.splice(pods.indexOf(equalPod), 1);
                        } else {
                            issetPod.destroy();
                        }

                    });
                    pods = pods.map(pod => new Pod(pod));
                    this.storePods = this.storePods.concat(pods);
                    this.updatePods(pods);
                } else if (pods instanceof Error){
                    this.podsError = pods;
                }
           });

        this.timeout(() => {
            this.refreshPods(skipEmptyHost);
        }, this.refreshRate)
    }

    getClusterComponents(){
        this.cluster.getComponents()
            .then(components => {

                if(components instanceof Array) {
                    this.componentsError = false;
                    this.storeComponents = components.map(component => new Component(component));
                } else if (components instanceof Error){
                    this.componentsError = components;
                }

                this.timeout(() => {
                    this.refreshClusterComponents();
                },this.refreshRate);
            });
    }

    refreshClusterComponents() {
        this.cluster.getComponents()
            .then(components => {

                if(components instanceof Array) {
                    this.componentsError = false;
                    this.storeComponents = components.map(component => new Component(component));
                } else if (components instanceof Error){
                    this.componentsError = components;
                }

                this.timeout(() => {
                    this.refreshClusterComponents();
                }, this.refreshRate);
            });
    }


    getAllServices(){
        return this.cluster.getServices()
            .then(services => {
                this.storeServices = services.map(service => new Service(service));
            });
    }



    getClusterJobs(){
        return this.cluster.getJobs()
            .then( jobs => {
                this.storeJobs = jobs.map(job => new Job(job));
            });
    }

    getClusterCronJobs(){
        return this.cluster.getCronJobs()
            .then( cronjobs => {
                this.storeCronJobs = cronjobs.map(cronjob => new Cronjob(cronjob));
            });
    }


    refreshJobs() {
        return this.cluster.getJobs()
            .then( newJobs => {
                this.storeJobs.filter(job => {
                    return !job.is_deleted;
                }).forEach(issetJob => {
                    let equalPod = newJobs.filter(item => {
                        return item.metadata.uid === issetJob.data.metadata.uid
                    });
                    if(equalPod.length > 0){
                        equalPod = equalPod[0];
                    }else{
                        equalPod = false;
                    }

                    if(equalPod !== false){
                        issetJob.update(equalPod);
                        newJobs.splice(newJobs.indexOf(equalPod), 1);
                    }else{
                        issetJob.destroy();
                    }
                });
                newJobs = newJobs.map(newJob => new Job(newJob));
                this.storeJobs = this.storeJobs.concat(newJobs);
            });
    }

    __getNamespace(namespace){
        return this.namespaceMap.filter(ns => {
            return ns.name === namespace;
        })[0];
    }

    __setRefreshRate(rate){
        if (rate === undefined){
            this.refreshRate = REFRESH_RATE_DEFAULT;
        }else{
            this.refreshRate = rate * 1000;
        }
    }

    __getPodsLength(pods = []){
        return pods.filter(item => !item.is_deleted).length;
    }

    getWarningPods(){
        return this.storePods.filter(item =>
            (item.status === WARNING || item.status === ERROR || item.status === TERMINATING)
            &&
            !item.is_deleted
        );
    }

    getWarningNodes(){
        return this.nodesMap.filter(item => item.status === ERROR);
    }

    goTo(id){
        let pod = null;
        if(id) {
            pod = document.getElementsByClassName(id)[0];
        }
        if(pod){
            pod.scrollIntoView({block: 'center', behavior: 'smooth'});
        }
    }

    getAlertsNodesByCPU(){
        return this.nodesMap.filter(item => item.cpuStatus === WARNING || item.cpuStatus === ERROR);
    }
    getAlertsNodesByMemory(){
        return this.nodesMap.filter(item => item.memoryStatus === WARNING || item.memoryStatus === ERROR);
    }

    getAlertsNodesByPods(){
        return this.nodesMap.filter(item => item.podsStatus === WARNING || item.podsStatus === ERROR);
    }

    getAlertsComponents(){
        return this.storeComponents.filter(item => item.status === ERROR);
    }

}
