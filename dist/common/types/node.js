System.register(["../helpers", '../../common/store', '../../common/types/traits/baseModel', "../constants"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var helpers_1, store_1, baseModel_1, constants_1;
    var Node;
    return {
        setters:[
            function (helpers_1_1) {
                helpers_1 = helpers_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (baseModel_1_1) {
                baseModel_1 = baseModel_1_1;
            },
            function (constants_1_1) {
                constants_1 = constants_1_1;
            }],
        execute: function() {
            Node = (function (_super) {
                __extends(Node, _super);
                function Node(data) {
                    _super.call(this, data);
                    this.namespaces = [];
                    this.metrics = {
                        cpuUsed: 'N/A',
                        memoryUsed: 'N/A',
                        podsCount: 'N/A',
                        cpuRequested: 'N/A',
                        memoryRequested: 'N/A'
                    };
                    this.cpuIndicate = false;
                    this.memoryIndicate = false;
                    this.podsIndicate = false;
                    this.cpuRequestedIndicate = false;
                    this.memoryRequestedIndicate = false;
                    this.podsRequestedIndicate = false;
                    this.nsListState();
                    this.hideNs = store_1.default.getBool(this.name + 'NsList', false);
                }
                Node.prototype.toggle = function () {
                    var _this = this;
                    _super.prototype.toggle.call(this);
                    var nodeStore = store_1.default.getObject('nodeStore');
                    var index = nodeStore.findIndex(function (item) { return item.name === _this.name; });
                    if (index || index === 0)
                        nodeStore[index].open = this.open;
                    store_1.default.setObject('nodeStore', nodeStore);
                };
                Node.prototype.nsListState = function () {
                    var state = store_1.default.get(this.name + 'NsList');
                    if (state === undefined) {
                        store_1.default.set(this.name + 'NsList', false);
                        return store_1.default.get(this.name + 'NsList');
                    }
                    else {
                        return store_1.default.get(this.name + 'NsList');
                    }
                };
                Object.defineProperty(Node.prototype, "status", {
                    get: function () {
                        var type = this.data.status.conditions.filter(function (item) { return item.type === 'Ready'; })[0];
                        if (type !== undefined && type.status === 'True') {
                            return constants_1.SUCCESS;
                        }
                        else {
                            return constants_1.ERROR;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "color", {
                    get: function () {
                        if (this.status === constants_1.SUCCESS) {
                            return '#18e018';
                        }
                        else {
                            return constants_1.COLOR_RED;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "message", {
                    get: function () {
                        if (this.status === constants_1.SUCCESS) {
                            return 'ok';
                        }
                        else {
                            return 'Node isn\'t ready';
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "cpuStatus", {
                    get: function () {
                        var cpu = this.data.status.allocatable.cpu;
                        if (cpu.indexOf('m') > -1) {
                            cpu = parseInt(cpu) / 1000;
                        }
                        return this.__getStatus(this.metrics.cpuUsed, cpu);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "cpuStatusRequested", {
                    get: function () {
                        var cpu = this.data.status.allocatable.cpu;
                        if (cpu.indexOf('m') > -1) {
                            cpu = parseInt(cpu) / 1000;
                        }
                        return this.__getStatusRequested(this.metrics.cpuRequested, cpu);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "memoryStatus", {
                    get: function () {
                        return this.__getStatus(this.metrics.memoryUsed, this.__getBytes(this.data.status.allocatable.memory));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "memoryStatusRequested", {
                    get: function () {
                        return this.__getStatusRequested(this.metrics.memoryRequested, this.__getBytes(this.data.status.allocatable.memory));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "podsStatus", {
                    get: function () {
                        return this.__getStatus(this.metrics.podsCount, this.data.status.allocatable.pods);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "podsStatusRequested", {
                    get: function () {
                        return this.__getStatusRequested(this.metrics.podsCount, this.data.status.allocatable.pods);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "hostIp", {
                    get: function () {
                        return this.data.status.addresses.filter(function (item) { return item.type === 'InternalIP'; })[0].address;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "memoryCapacityFormatted", {
                    get: function () {
                        return helpers_1.__convertToGB(this.__getBytes(this.data.status.capacity.memory));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "memoryAllocatableFormatted", {
                    get: function () {
                        return helpers_1.__convertToGB(this.__getBytes(this.data.status.allocatable.memory));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "cpuAllocatableFormatted", {
                    get: function () {
                        var cpu = this.data.status.allocatable.cpu;
                        if (cpu.indexOf('m') > -1) {
                            cpu = parseInt(cpu) / 1000;
                        }
                        return cpu;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "memoryUsedFormatted", {
                    /*used format*/
                    get: function () {
                        return helpers_1.__convertToGB(this.metrics.memoryUsed) + ' (' + helpers_1.__percentUsed(this.metrics.memoryUsed, this.__getBytes(this.data.status.allocatable.memory)) + ')';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "memoryRequestedFormatted", {
                    get: function () {
                        return helpers_1.__convertToGB(this.metrics.memoryRequested) + ' (' + helpers_1.__percentUsed(this.metrics.memoryRequested, this.__getBytes(this.data.status.allocatable.memory)) + ')';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "cpuUsedFormatted", {
                    get: function () {
                        var cpu = this.data.status.allocatable.cpu;
                        if (cpu.indexOf('m') > -1) {
                            cpu = parseInt(cpu) / 1000;
                        }
                        return helpers_1.__roundCpu(this.metrics.cpuUsed) + ' (' + helpers_1.__percentUsed(this.metrics.cpuUsed, cpu) + ')';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "cpuRequestedFormatted", {
                    get: function () {
                        var cpu = this.data.status.allocatable.cpu;
                        if (cpu.indexOf('m') > -1) {
                            cpu = parseInt(cpu) / 1000;
                        }
                        return helpers_1.__roundCpu(this.metrics.cpuRequested) + ' (' + helpers_1.__percentUsed(this.metrics.cpuRequested, cpu) + ')';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "podsUsedFormatted", {
                    get: function () {
                        return this.metrics.podsCount + ' (' + helpers_1.__percentUsed(this.metrics.podsCount, this.data.status.allocatable.pods) + ')';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "podsRequestedFormatted", {
                    get: function () {
                        return this.metrics.podsCount + ' (' + helpers_1.__percentUsed(this.metrics.podsCount, this.data.status.allocatable.pods) + ')';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "cpuPercentUsed", {
                    /*percent used*/
                    get: function () {
                        var cpu = this.data.status.allocatable.cpu;
                        if (cpu.indexOf('m') > -1) {
                            cpu = parseInt(cpu) / 1000;
                        }
                        return helpers_1.__roundCpu(this.metrics.cpuUsed) + ' / ' + this.data.status.allocatable.cpu + ' ( ' + helpers_1.__percentUsed(this.metrics.cpuUsed, cpu) + ' )';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "memoryPercentUsed", {
                    get: function () {
                        var used = this.metrics.memoryUsed;
                        var allocatable = this.__getBytes(this.data.status.allocatable.memory);
                        var percent = helpers_1.__percentUsed(used, allocatable);
                        return helpers_1.__convertToGB(used) + ' / ' + helpers_1.__convertToGB(allocatable) + ' ( ' + percent + ' ) ';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "podsPercentUsed", {
                    get: function () {
                        var used = this.metrics.podsCount;
                        var allocatable = this.data.status.allocatable.pods;
                        var percent = helpers_1.__percentUsed(used, allocatable);
                        return used + ' / ' + allocatable + ' ( ' + percent + ' ) ';
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "rowCpuColor", {
                    /*color*/
                    get: function () {
                        return this.__getColor(this.cpuStatus);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "rowCpuRequestedColor", {
                    get: function () {
                        return this.__getColor(this.cpuStatusRequested);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "rowMemoryColor", {
                    get: function () {
                        return this.__getColor(this.memoryStatus);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "rowMemoryRequestedColor", {
                    get: function () {
                        return this.__getColor(this.memoryStatusRequested);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "rowPodsColor", {
                    get: function () {
                        return this.__getColor(this.podsStatus);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Node.prototype, "rowPodsRequestedColor", {
                    get: function () {
                        return this.__getColor(this.podsStatusRequested);
                    },
                    enumerable: true,
                    configurable: true
                });
                Node.prototype.parseMetrics = function (cpuReq, memoryReq, pods, cpuUsed, memoryUsed) {
                    var currentCpuStatus = this.cpuStatus;
                    var currentMemoryStatus = this.memoryStatus;
                    var currentPodsStatus = this.podsStatus;
                    var currentCpuStatusRequested = this.cpuStatusRequested;
                    var currentMemoryStatusRequested = this.memoryStatusRequested;
                    var currentPodsStatusRequested = this.podsStatusRequested;
                    this.metrics.cpuRequested = this.__getLastMetric(cpuReq);
                    this.metrics.memoryRequested = this.__getLastMetric(memoryReq);
                    this.metrics.podsCount = this.__getLastMetricByInstance(pods);
                    this.metrics.cpuUsed = this.__getLastMetricByInstance(cpuUsed);
                    this.metrics.memoryUsed = this.__getLastMetricByInstance(memoryUsed);
                    currentCpuStatus !== undefined && currentCpuStatus != this.cpuStatus && this.setCpuMetricIndicated();
                    currentMemoryStatus !== undefined && currentMemoryStatus != this.memoryStatus && this.setMemoryMetricIndicated();
                    currentPodsStatus !== undefined && currentPodsStatus != this.podsStatus && this.setPodsMetricIndicated();
                    currentCpuStatusRequested !== undefined && currentCpuStatusRequested != this.cpuStatusRequested && this.setCpuMetricIndicated(true);
                    currentMemoryStatusRequested !== undefined && currentMemoryStatusRequested != this.memoryStatusRequested && this.setMemoryMetricIndicated(true);
                    currentPodsStatusRequested !== undefined && currentPodsStatusRequested != this.podsStatusRequested && this.setPodsMetricIndicated(true);
                };
                Node.prototype.setCpuMetricIndicated = function (requested) {
                    var _this = this;
                    if (requested === void 0) { requested = false; }
                    if (requested) {
                        this.cpuRequestedIndicate = true;
                        setTimeout(function () {
                            _this.cpuRequestedIndicate = false;
                        }, 10000);
                    }
                    else {
                        this.cpuIndicate = true;
                        setTimeout(function () {
                            _this.cpuIndicate = false;
                        }, 10000);
                    }
                };
                Node.prototype.setMemoryMetricIndicated = function (requested) {
                    var _this = this;
                    if (requested === void 0) { requested = false; }
                    if (requested) {
                        this.memoryRequestedIndicate = true;
                        setTimeout(function () {
                            _this.memoryRequestedIndicate = false;
                        }, 10000);
                    }
                    else {
                        this.memoryIndicate = true;
                        setTimeout(function () {
                            _this.memoryIndicate = false;
                        }, 10000);
                    }
                };
                Node.prototype.setPodsMetricIndicated = function (requested) {
                    var _this = this;
                    if (requested === void 0) { requested = false; }
                    if (requested) {
                        this.podsRequestedIndicate = true;
                        setTimeout(function () {
                            _this.podsRequestedIndicate = false;
                        }, 10000);
                    }
                    else {
                        this.podsIndicate = true;
                        setTimeout(function () {
                            _this.podsIndicate = false;
                        }, 10000);
                    }
                };
                Node.prototype.__getLastMetricByInstance = function (metrics) {
                    var _this = this;
                    var datapoints = metrics.filter(function (item) {
                        return item.target.includes(_this.hostIp) || item.target.includes(_this.name);
                    })[0];
                    if (datapoints !== undefined) {
                        return datapoints.datapoint;
                    }
                    else {
                        return 'N/A';
                    }
                };
                Node.prototype.__getLastMetric = function (metrics) {
                    var _this = this;
                    var datapoints = metrics.filter(function (item) {
                        return item.target === _this.name;
                    })[0];
                    if (datapoints !== undefined) {
                        return datapoints.datapoint;
                    }
                    else {
                        return 'N/A';
                    }
                };
                Node.prototype.__getBytes = function (str) {
                    var bytes = this.__parseInt(str) * 1024;
                    if (str.indexOf('Mi') > -1) {
                        bytes = bytes * 1024;
                    }
                    return bytes;
                };
                Node.prototype.__parseInt = function (str) {
                    return parseInt(str);
                };
                Node.prototype.__getStatus = function (used, allocatable) {
                    var diff = used / allocatable;
                    if (diff <= 0.5) {
                        return constants_1.SUCCESS;
                    }
                    else if (diff > 0.5 && diff <= 0.8) {
                        return constants_1.WARNING;
                    }
                    else if (diff > 0.8) {
                        return constants_1.ERROR;
                    }
                    else {
                        return;
                    }
                };
                Node.prototype.__getStatusRequested = function (requested, allocatable) {
                    var diff = requested / allocatable;
                    if (diff <= 0.9) {
                        return constants_1.SUCCESS;
                    }
                    else if (diff > 0.9 && diff <= 1) {
                        return constants_1.WARNING;
                    }
                    else if (diff > 1) {
                        return constants_1.ERROR;
                    }
                    else {
                        return;
                    }
                };
                Node.prototype.__getColor = function (status) {
                    switch (status) {
                        case constants_1.SUCCESS:
                            return constants_1.COLOR_GREEN;
                        case constants_1.WARNING:
                            return constants_1.COLOR_YELLOW;
                        case constants_1.ERROR:
                            return constants_1.COLOR_RED;
                        default:
                            return;
                    }
                };
                return Node;
            })(baseModel_1.BaseModel);
            exports_1("Node", Node);
        }
    }
});
//# sourceMappingURL=node.js.map