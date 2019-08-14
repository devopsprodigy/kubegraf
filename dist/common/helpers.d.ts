/// <reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
declare let __prepare: (items: any) => any;
declare let __preparePods: (pods: any) => any;
declare let __convertToGB: (bytes: any) => any;
declare let __roundCpu: (cpu: any) => string;
declare let __convertToMicro: (cpu: any) => string;
declare let __getLastNonNullValue: (dataset: any) => any;
declare let __percentUsed: (used: any, allocatable: any) => string;
export { __prepare, __preparePods, __convertToGB, __roundCpu, __percentUsed, __convertToMicro, __getLastNonNullValue };
