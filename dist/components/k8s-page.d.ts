/// <reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
import { Pod } from "../common/types/pod";
import { Component } from "../common/types/component";
import { Service } from "../common/types/service";
import { Job } from "../common/types/job";
import { Cronjob } from "../common/types/cronjob";
import { Namespace } from "../common/types/namespace";
import { Deployment } from "../common/types/deployment";
import { Statefulset } from "../common/types/statefulset";
import { Daemonset } from "../common/types/daemonset";
import { Node } from "../common/types/node";
export declare class K8sPage {
    pageReady: boolean;
    namespaceMapReady: boolean;
    nodesMapReady: boolean;
    $scope: any;
    cluster: any;
    prometheusDS: any;
    location: any;
    backendSrv: any;
    datasourceSrv: any;
    timeout: any;
    refreshRate: number;
    $q: any;
    storePods: Array<Pod>;
    storeComponents: Array<Component>;
    storeServices: Array<Service>;
    storeJobs: Array<Job>;
    storeCronJobs: Array<Cronjob>;
    storeDeployments: Array<Deployment>;
    storeStatefulSets: Array<Statefulset>;
    storeDaemonSets: Array<Daemonset>;
    namespaceMap: Array<Namespace>;
    nodesMap: Array<Node>;
    nodesError: Boolean | Error;
    podsError: Boolean | Error;
    componentsError: Boolean | Error;
    updatePods(pods: any): void;
    constructor($scope: any, backendSrv: any, datasourceSrv: any, $location: any, timeout: any, $q: any);
    getNodeDashboardLink(node: any): string;
    getPodDashboardLink(pod: any): string;
    getEntityDashboardLink(entity: any, name: any): string;
    getNodeMap(withoutPods?: boolean): any;
    getResourcesMetrics(): any;
    __getCpuMetricsUsed(): any;
    __getCpuMetricsRequested(): any;
    __getMemoryMetricsRequested(): any;
    __getMemoryMetricsUsed(): any;
    __getPodsCountMetrics(): any;
    getNodes(): any;
    getPodsMetrics(): void;
    __getPodsUsedCpu(): any;
    __getPodsUsedMemory(): any;
    __getPodsRequestedCpu(): any;
    __getPodsRequestedMemory(): any;
    insertPodsToNodesMap(pods: any): void;
    refreshNodes(): void;
    getNamespaceMap(): void;
    attachDeployments(): any;
    refreshDeployments(): void;
    attachStatefulsets(): any;
    refreshStatefulsets(): void;
    attachDaemonsets(): any;
    refreshDaemonsets(): void;
    attachJobs(): void;
    attachCronJobs(): void;
    attachPodsToMap(): void;
    updateJobs(): void;
    __findPodsBySelector(filter: any, namespace: any, pods?: Pod[]): Pod[];
    __findServices(entity: any): Service[];
    __prepareDS(): any;
    getPrometheusDS(name: any): any;
    getPods(skipEmptyHost?: boolean): any;
    refreshPods(skipEmptyHost?: boolean): void;
    getClusterComponents(): void;
    refreshClusterComponents(): void;
    getAllServices(): any;
    getClusterJobs(): any;
    getClusterCronJobs(): any;
    refreshJobs(): any;
    __getNamespace(namespace: any): Namespace;
    __setRefreshRate(rate: any): void;
    __getPodsLength(pods?: any[]): number;
    getWarningPods(): Pod[];
    getWarningNodes(): Node[];
    goTo(id: any): void;
    getAlertsNodesByCPU(): Node[];
    getAlertsNodesByMemory(): Node[];
    getAlertsNodesByPods(): Node[];
    getAlertsComponents(): Component[];
}
