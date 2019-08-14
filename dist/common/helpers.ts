///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import {Pod} from './types/pod';
import kbn from 'app/core/utils/kbn';


let __prepare = items => {
    return items.map(item => {
        return {
            name: item.metadata.name,
            data: item
        }
    })
};

let __preparePods = pods => {
    return pods.map(item => {
        return new Pod(item);
    })
};

let __convertToGB = bytes => {
    return kbn.valueFormats['bytes'](bytes, 3, null);
};

let __roundCpu = cpu => {
    return parseFloat(cpu).toFixed(3);
};

let __convertToMicro = cpu => {
    return (cpu * 1000) + 'm';
};

let __getLastNonNullValue = dataset => {
    if(dataset){
        let skiper = dataset.filter(item => item[0]!= null);
        return skiper[skiper.length-1][0];
    }
};

let __percentUsed = (used, allocatable) => {
  return ((parseFloat(used) / parseFloat(allocatable))*100).toFixed(2) + ' %';
};

export { __prepare, __preparePods, __convertToGB, __roundCpu, __percentUsed, __convertToMicro, __getLastNonNullValue }
