import {Pod} from "./pod";
import {__convertToGB, __roundCpu, __percentUsed, __getLastNonNullValue} from "../helpers";
import store from '../../common/store';
import {BaseModel} from '../../common/types/traits/baseModel';
import {ERROR, SUCCESS, WARNING, COLOR_YELLOW, COLOR_RED, COLOR_GREEN} from "../constants";

export class Node extends BaseModel {
    hideNs: boolean;
    namespaces: Array<{
        name: string,
        limit: number | boolean,
        pods: Array<Pod>,
        sort: string,
    }>;
    metrics: {
        cpuRequested: number|string,
        memoryRequested: number|string,
        cpuUsed: number|string,
        memoryUsed: number|string,
        podsCount: number|string,
        cpuLimit: number|string,
        memoryLimit: number|string,
    };

    cpuIndicate: boolean;
    memoryIndicate: boolean;
    podsIndicate: boolean;
    cpuRequestedIndicate: boolean;
    memoryRequestedIndicate: boolean;
    podsRequestedIndicate: boolean;
    cpuLimitIndicate: boolean;
    memoryLimitIndicate: boolean;

    constructor(data){
        super(data);
        this.namespaces = [];
        this.metrics = {
            cpuUsed: 'N/A',
            memoryUsed: 'N/A',
            podsCount: 'N/A',
            cpuRequested: 'N/A',
            memoryRequested: 'N/A',
            cpuLimit: 'N/A',
            memoryLimit: 'N/A'
        };
        this.cpuIndicate = false;
        this.memoryIndicate = false;
        this.podsIndicate = false;
        this.cpuRequestedIndicate = false;
        this.memoryRequestedIndicate = false;
        this.podsRequestedIndicate = false;
        this.cpuLimitIndicate = false;
        this.memoryLimitIndicate = false;
        this.nsListState();
        this.hideNs = store.getBool(this.name + 'NsList', false);
    }

    toggle() {
        super.toggle();
        let nodeStore = store.getObject('nodeStore');
        let index = nodeStore.findIndex(item => item.name === this.name);
        if(index || index === 0) nodeStore[index].open = this.open;
        store.setObject('nodeStore', nodeStore);
    }

    nsListState(){
        if(store.get(this.name + 'NsList') === undefined){
            store.set(this.name + 'NsList', true);
        }

        return store.get(this.name + 'NsList');
    }

    get status(){
        let type = this.data.status.conditions.filter(item => item.type === 'Ready')[0];

        if(type !== undefined && type.status === 'True'){
            return SUCCESS;
        } else {
            return ERROR;
        }
    }

    get color(){
        if(this.status === SUCCESS){
            return '#18e018';
        }else{
            return COLOR_RED;
        }
    }

    get message() {
        if(this.status === SUCCESS){
            return 'ok';
        }else{
            return 'Node isn\'t ready';
        }
    }

    get cpuStatus(){
        let cpu = this.data.status.allocatable.cpu;
        if(cpu.indexOf('m') > -1){
            cpu = parseInt(cpu)/1000;
        }
        return this.__getStatus(this.metrics.cpuUsed, cpu);
    }

    get cpuStatusRequested(){
        let cpu = this.data.status.allocatable.cpu;
        if(cpu.indexOf('m') > -1){
            cpu = parseInt(cpu)/1000;
        }
        return this.__getStatusRequested(this.metrics.cpuRequested, cpu);
    }

    get cpuLimitStatus(){
        let cpu = this.data.status.allocatable.cpu;
        if(cpu.indexOf('m') > -1){
            cpu = parseInt(cpu)/1000;
        }
        return this.__getStatusLimit(this.metrics.cpuLimit, cpu);
    }

    get memoryStatus(){
        return this.__getStatus(this.metrics.memoryUsed, this.__getBytes(this.data.status.allocatable.memory));
    }

    get memoryStatusRequested(){
        return this.__getStatusRequested(this.metrics.memoryRequested, this.__getBytes(this.data.status.allocatable.memory));
    }

    get memoryLimitStatus() {
        return this.__getStatusLimit(this.metrics.memoryLimit, this.__getBytes(this.data.status.allocatable.memory));
    }

    get podsStatus(){
        return this.__getStatus(this.metrics.podsCount, this.data.status.allocatable.pods);
    }

    get podsStatusRequested(){
        return this.__getStatusRequested(this.metrics.podsCount, this.data.status.allocatable.pods);
    }

    get hostIp(){
        return this.data.status.addresses.filter(item => item.type === 'InternalIP')[0].address;
    }

    get memoryCapacityFormatted(){
        return __convertToGB( this.__getBytes(this.data.status.capacity.memory));
    }

    get memoryAllocatableFormatted(){
        return __convertToGB( this.__getBytes(this.data.status.allocatable.memory));
    }

    get cpuAllocatableFormatted(){
        let cpu = this.data.status.allocatable.cpu;
        if(cpu.indexOf('m') > -1){
            cpu = parseInt(cpu)/1000;
        }
        return cpu;
    }

    /*used format*/

    get memoryUsedFormatted(){
        return __convertToGB(this.metrics.memoryUsed) +  ' (' +  __percentUsed(this.metrics.memoryUsed, this.__getBytes(this.data.status.allocatable.memory)) + ')';
    }

    get memoryRequestedFormatted(){
        return __convertToGB(this.metrics.memoryRequested) +  ' (' +  __percentUsed(this.metrics.memoryRequested, this.__getBytes(this.data.status.allocatable.memory)) + ')';
    }

    get memoryLimitFormatted(){
        return __convertToGB(this.metrics.memoryLimit) +  ' (' +  __percentUsed(this.metrics.memoryLimit, this.__getBytes(this.data.status.allocatable.memory)) + ')';
    }

    get cpuUsedFormatted(){
        let cpu = this.data.status.allocatable.cpu;
        if(cpu.indexOf('m') > -1){
            cpu = parseInt(cpu)/1000;
        }

        return __roundCpu(this.metrics.cpuUsed) + ' (' + __percentUsed(this.metrics.cpuUsed, cpu) + ')';
    }

    get cpuRequestedFormatted(){
        let cpu = this.data.status.allocatable.cpu;
        if(cpu.indexOf('m') > -1){
            cpu = parseInt(cpu)/1000;
        }

        return __roundCpu(this.metrics.cpuRequested) + ' (' + __percentUsed(this.metrics.cpuRequested, cpu) + ')';
    }

    get cpuLimitFormatted(){
        let cpu = this.data.status.allocatable.cpu;
        if(cpu.indexOf('m') > -1){
            cpu = parseInt(cpu)/1000;
        }

        return __roundCpu(this.metrics.cpuLimit) + ' (' + __percentUsed(this.metrics.cpuLimit, cpu) + ')';
    }

    get podsUsedFormatted() {
        return this.metrics.podsCount + ' ('+ __percentUsed(this.metrics.podsCount, this.data.status.allocatable.pods) + ')';
    }

    get podsRequestedFormatted(){
        return this.metrics.podsCount + ' ('+ __percentUsed(this.metrics.podsCount, this.data.status.allocatable.pods) + ')';
    }

    /*percent used*/

    get cpuPercentUsed(){
        let cpu = this.data.status.allocatable.cpu;
        if (cpu.indexOf('m') > -1) {
            cpu = parseInt(cpu)/1000;
        }
        return __roundCpu(this.metrics.cpuUsed) + ' / ' + cpu + ' ('+ __percentUsed(this.metrics.cpuUsed, cpu) + ')';
    }

    get cpuPercentRequested(){
        let cpu = this.data.status.allocatable.cpu;
        if (cpu.indexOf('m') > -1){
            cpu = parseInt(cpu)/1000;
        }
        return __roundCpu(this.metrics.cpuRequested) + ' / ' + cpu + ' ('+ __percentUsed(this.metrics.cpuRequested, cpu) + ')';
    }

    get memoryPercentUsed(){
        let used = this.metrics.memoryUsed;
        let allocatable = this.__getBytes(this.data.status.allocatable.memory);
        let percent = __percentUsed(used, allocatable);
        return __convertToGB(used) + ' / ' + __convertToGB(allocatable) + ' (' + percent + ') ';
    }

    get memoryPercentRequested(){
        let allocatable = this.__getBytes(this.data.status.allocatable.memory);
        let percent = __percentUsed(this.metrics.memoryRequested, allocatable);
        return __convertToGB(this.metrics.memoryRequested) + ' / ' + __convertToGB(allocatable) + ' (' + percent + ') ';
    }

    get podsPercentUsed(){
        let used = this.metrics.podsCount;
        let allocatable = this.data.status.allocatable.pods;
        let percent = __percentUsed(used, allocatable);
        return used + ' / ' + allocatable + ' (' + percent + ') ';
    }

    /*color*/

    get rowCpuColor(){
        return this.__getColor(this.cpuStatus);
    }

    get rowCpuRequestedColor(){
        return this.__getColor(this.cpuStatusRequested);
    }

    get rowCpuLimitColor(){
        return this.__getColor(this.cpuLimitStatus);
    }

    get rowMemoryColor(){
        return this.__getColor(this.memoryStatus);
    }

    get rowMemoryRequestedColor(){
        return this.__getColor(this.memoryStatusRequested);
    }

    get rowMemoryLimitColor(){
        return this.__getColor(this.memoryLimitStatus);
    }

    get rowPodsColor(){
        return this.__getColor(this.podsStatus);
    }

    get rowPodsRequestedColor(){
        return this.__getColor(this.podsStatusRequested);
    }

    parseMetrics(cpuReq, memoryReq, pods, cpuUsed, memoryUsed, cpuLimit, memoryLimit) {
        const currentStatus = {
            "podsStatus": this.podsStatus,
            "podsStatusRequested": this.podsStatusRequested,
            "cpuStatus": this.cpuStatus,
            "cpuStatusRequested": this.cpuStatusRequested,
            "cpuLimitStatus": this.cpuLimitStatus,
            "memoryStatus": this.memoryStatus,
            "memoryStatusRequested": this.memoryStatusRequested,
            "memoryLimitStatus": this.memoryLimitStatus
        }

        this.metrics.cpuRequested = this.__getLastMetric(cpuReq);
        this.metrics.memoryRequested = this.__getLastMetric(memoryReq);
        this.metrics.podsCount = this.__getLastMetricByInstance(pods);
        this.metrics.cpuUsed = this.__getLastMetricByInstance(cpuUsed);
        this.metrics.memoryUsed = this.__getLastMetricByInstance(memoryUsed);
        this.metrics.cpuLimit = this.__getLastMetricByInstance(cpuLimit);
        this.metrics.memoryLimit = this.__getLastMetricByInstance(memoryLimit);

        for (const type in currentStatus) {
            if(currentStatus.hasOwnProperty(type) && this.hasOwnProperty(type)) {
                if (currentStatus[type] !== undefined && currentStatus[type] != this[type]) {
                    this.setMetricIndicated(type);
                }
            }
        }
    }

    setMetricIndicated(metricStatus){
        const map = {
            "podsStatus": "podsIndicate",
            "podsStatusRequested": "podsRequestedIndicate",
            "cpuStatus": "cpuIndicate",
            "cpuStatusRequested": "cpuRequestedIndicate",
            "cpuLimitStatus": "cpuLimitIndicate",
            "memoryStatus": "memoryIndicate",
            "memoryStatusRequested": "memoryRequestedIndicate",
            "memoryLimitStatus": "memoryLimitIndicate"
        }
        if (map[metricStatus] && this.hasOwnProperty(map[metricStatus])) {
            this[map[metricStatus]] = true;
            setTimeout(() => {
                this[map[metricStatus]] = false
            }, 10000);
        }
    }

    __getLastMetricByInstance(metrics){
        const datapoints = metrics.filter(item => {
            return item.target.includes(this.hostIp) || item.target.includes(this.name);
        })[0];

        if(datapoints !== undefined){
            return datapoints.datapoint;
        }
        return 'N/A';
    }

    __getLastMetric(metrics){
        const datapoints = metrics.filter(item => {
            return item.target === this.name;
        })[0];

        if (datapoints !== undefined) {
            return datapoints.datapoint;
        }
        return 'N/A';
    }

    __getBytes(str: string): number{
        let bytes = this.__parseInt(str) * 1024;
        if (str.indexOf('Mi') > -1) {
            bytes = bytes * 1024;
        }
        return bytes;
    }

    __parseInt(str: string): number{
        return parseInt(str);
    }

    __getStatus(used, allocatable){

        let diff = used/allocatable;

        if(diff <= 0.5){
            return SUCCESS;
        }
        else if(diff > 0.5 && diff <= 0.8){
            return WARNING;
        }
        else if(diff > 0.8){
            return ERROR;
        }
        else {
            return;
        }
    }

    __getStatusRequested(requested, allocatable){

        let diff = requested/allocatable;

        if(diff <= 0.5){
            return SUCCESS;
        }
        else if(diff > 0.5 && diff <= 0.8){
            return WARNING;
        }
        else if(diff > 0.8){
            return ERROR;
        }
        else {
            return;
        }
    }

    __getStatusLimit(limit, allocatable): number{
        let diff = limit/allocatable;

        if(diff <= 0.9){
            return SUCCESS
        } else if(diff > 0.9 && diff <= 1){
            return WARNING
        } else if(diff > 1){
            return ERROR
        }
        return
    }

    __getColor(status): string{
        switch (status) {
            case SUCCESS:
                return COLOR_GREEN;
            case WARNING:
                return COLOR_YELLOW;
            case ERROR:
                return COLOR_RED;
            default:
                return;
        }
    }

}
