import { Pod } from './types/pod';
import kbn from 'grafana/app/core/utils/kbn';

let __prepare = (items) => {
  return items.map((item) => {
    return {
      name: item.metadata.name,
      data: item,
    };
  });
};

let __preparePods = (pods) => {
  return pods.map((item) => {
    return new Pod(item);
  });
};

let __convertToGB = (bytes) => {
  return kbn.valueFormats['bytes'](bytes, 3, null);
};

let __convertToHours = (seconds) => {
  return kbn.valueFormats['ms'](seconds, 1, null);
};

let __roundCpu = (cpu) => {
  return parseFloat(cpu).toFixed(3);
};

let __convertToMicro = (cpu) => {
  return cpu * 1000 + 'm';
};

let __getLastNonNullValue = (dataset) => {
  if (dataset) {
    let skiper = dataset.filter((item) => item[0] != null);
    return skiper[skiper.length - 1][0];
  }
};

let __percentUsed = (used, allocatable) => {
  return ((parseFloat(used) / parseFloat(allocatable)) * 100).toFixed(2) + '%';
};

const __getGrafanaVersion = (window) => {
  let version = 5;

  try {
    version = window.grafanaBootData.settings.buildInfo.version.split('.')[0];
  } catch (e) {
    console.error(e);
  }

  return version;
};

export {
  __prepare,
  __preparePods,
  __convertToGB,
  __roundCpu,
  __percentUsed,
  __convertToMicro,
  __getLastNonNullValue,
  __getGrafanaVersion,
  __convertToHours,
};
