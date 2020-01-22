System.register(['../constants', '../../common/types/traits/baseModel'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var constants_1, baseModel_1;
    var Pod;
    return {
        setters:[
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (baseModel_1_1) {
                baseModel_1 = baseModel_1_1;
            }],
        execute: function() {
            Pod = (function (_super) {
                __extends(Pod, _super);
                function Pod(data) {
                    _super.call(this, data);
                    this.eventMessage = null;
                    this.metrics = {
                        cpuUsed: 'N-A',
                        memoryUsed: 'N-A',
                        cpuRequested: 'N-A',
                        memoryRequested: 'N-A'
                    };
                    this.used = false;
                }
                Object.defineProperty(Pod.prototype, "status", {
                    get: function () {
                        if (this.data.metadata.deletionTimestamp) {
                            return constants_1.TERMINATING;
                        }
                        else if (this.data.status.phase === 'Running') {
                            var conditionStatus;
                            var containerStatuses;
                            var initContainerStatuses;
                            if (this.data.status.conditions) {
                                conditionStatus = this.data.status.conditions.filter(function (item) { return item.status === 'False'; });
                                conditionStatus.length > 0 ? conditionStatus = true : conditionStatus = false;
                            }
                            if (this.data.status.containerStatuses) {
                                containerStatuses = this.data.status.containerStatuses.filter(function (item) { return item.ready == false; });
                                containerStatuses.length > 0 ? containerStatuses = true : containerStatuses = false;
                            }
                            if (this.data.status.initContainerStatuses) {
                                initContainerStatuses = this.data.status.initContainerStatuses.filter(function (item) { return item.ready == false; });
                                initContainerStatuses.length > 0 ? initContainerStatuses = true : initContainerStatuses = false;
                            }
                            if (conditionStatus || containerStatuses || initContainerStatuses) {
                                return constants_1.ERROR;
                            }
                            else {
                                return constants_1.SUCCESS;
                            }
                        }
                        else {
                            switch (this.data.status.phase) {
                                case 'Pending':
                                    return constants_1.WARNING;
                                case 'Succeeded':
                                    return constants_1.SUCCESS;
                                case 'Failed':
                                case 'Unknow':
                                    return constants_1.ERROR;
                                default:
                                    return constants_1.ERROR;
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pod.prototype, "color", {
                    get: function () {
                        switch (this.status) {
                            case constants_1.ERROR:
                                return 'error';
                            case constants_1.WARNING:
                                return 'warning';
                            case constants_1.TERMINATING:
                                return 'terminating';
                            case constants_1.SUCCESS:
                                return 'success';
                            default:
                                return 'success';
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pod.prototype, "message", {
                    get: function () {
                        if (this.eventMessage) {
                            return this.eventMessage;
                        }
                        var status = this.status;
                        var data = this.data;
                        var phase = this.data.status.phase;
                        var message = 'Pod is ' + phase;
                        if (status === constants_1.ERROR) {
                            if (data.status.containerStatuses) {
                                var d = data.status.containerStatuses.filter(function (item) { return item.ready === false; })[0];
                                if (d && d.state && d.state.waiting) {
                                    if (d.state.waiting.message && d.state.waiting.reason) {
                                        message = d.state.waiting.reason + '. ' + d.state.waiting.message;
                                        return message;
                                    }
                                }
                            }
                            else if (data.status.conditions) {
                                var d = data.status.conditions.filter(function (item) { return item.ready === false || (item.type === 'PodScheduled' && item.status === 'False'); })[0];
                                if (d != undefined) {
                                    return d.message;
                                }
                            }
                            else if (data.status.message) {
                                return data.status.message;
                            }
                            return 'Undefined error';
                        }
                        else {
                            if (this.data.metadata.deletionTimestamp) {
                                return 'Pod is Terminating';
                            }
                            else if (phase === 'Running' || phase === 'Succeeded') {
                                return 'Pod is ' + phase;
                            }
                            else {
                                if (data.status.containerStatuses) {
                                    var d = data.status.containerStatuses.filter(function (item) { return item.ready === false; })[0];
                                    if (d.state.waiting.message && d.state.waiting.message.length > 0) {
                                        message = d.state.waiting.message;
                                    }
                                }
                                else if (data.status.conditions) {
                                    var d = data.status.conditions.filter(function (item) { return item.ready === false || (item.type === 'PodScheduled' && item.status === 'False'); })[0];
                                    if (d != undefined)
                                        message = d.message;
                                }
                                else if (data.status.message) {
                                    message = data.status.message;
                                }
                                return message;
                            }
                        }
                    },
                    set: function (msg) {
                        this.eventMessage = msg;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Pod.prototype, "NaMessage", {
                    get: function () {
                        return "Prometheus metrics unavailable";
                    },
                    enumerable: true,
                    configurable: true
                });
                return Pod;
            })(baseModel_1.BaseModel);
            exports_1("Pod", Pod);
        }
    }
});
//# sourceMappingURL=pod.js.map