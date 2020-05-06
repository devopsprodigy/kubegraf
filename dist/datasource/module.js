define(["app/core/app_events"], function(__WEBPACK_EXTERNAL_MODULE_grafana_app_core_app_events__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./datasource/module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./common/constants.ts":
/*!*****************************!*\
  !*** ./common/constants.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ERROR = 3;
var WARNING = 2;
var TERMINATING = 1;
var SUCCESS = 0;
var COLOR_YELLOW = '#ffff0096';
var COLOR_RED = '#a52a2a';
var COLOR_GREEN = '#299c46';
var PODS_LIMIT = 10;
var TYPE_PROMETHEUS = "prometheus";
exports.ERROR = ERROR;
exports.WARNING = WARNING;
exports.TERMINATING = TERMINATING;
exports.SUCCESS = SUCCESS;
exports.COLOR_YELLOW = COLOR_YELLOW;
exports.COLOR_RED = COLOR_RED;
exports.COLOR_GREEN = COLOR_GREEN;
exports.PODS_LIMIT = PODS_LIMIT;
exports.TYPE_PROMETHEUS = TYPE_PROMETHEUS;

/***/ }),

/***/ "./datasource/config.ts":
/*!******************************!*\
  !*** ./datasource/config.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOPK8SConfig = undefined;

var _constants = __webpack_require__(/*! ../common/constants */ "./common/constants.ts");

var DOPK8SConfig =
/** @class */
function () {
  function DOPK8SConfig($scope, $injector, backendSrv, $window) {
    var _this = this;

    this.backendSrv = backendSrv;
    this.$window = $window;
    this.$scope = $scope;
    this.pageReady = false;

    if (this.current.id) {
      if (!this.current.jsonData.prom_name) this.current.jsonData.prom_name = '';
      if (!this.current.jsonData.refresh_pods_rate) this.current.jsonData.refresh_pods_rate = '60';
      this.current.jsonData.cluster_url = this.current.url;
    } else {
      this.current = {
        type: 'devopsprodidy-kubegraf-datasource',
        access: 'proxy',
        jsonData: {
          refresh_pods_rate: '60',
          access_via_token: false,
          prom_name: ''
        }
      };
    }

    this.setGrafanaVersion($window);
    this.getPrometheusList().then(function () {
      _this.pageReady = true;

      _this.$scope.$apply();
    });
    $scope.$watch('ctrl.current', function () {
      _this.setUrl();
    });
  }

  DOPK8SConfig.prototype.setGrafanaVersion = function (window) {
    var _v;

    try {
      _v = window.grafanaBootData.settings.buildInfo.version.split('.')[0];
    } catch (e) {
      console.error(e);
      _v = 5;
    }

    this.version = _v;
  };

  DOPK8SConfig.prototype.setUrl = function () {
    this.current.jsonData.cluster_url = this.current.url;
  };

  DOPK8SConfig.prototype.getPrometheusList = function () {
    var _this = this;

    return this.backendSrv.get('/api/datasources').then(function (datasources) {
      _this.prometheusList = datasources.filter(function (item) {
        return item.type === _constants.TYPE_PROMETHEUS;
      });

      var defProm = _this.prometheusList.filter(function (item) {
        return item.isDefault;
      });

      if (defProm.length > 0 && _this.current.jsonData.prom_name == '') {
        _this.current.jsonData.prom_name = defProm[0].name;
      }
    });
  };

  DOPK8SConfig.templateUrl = 'datasource/partials/config.html';
  return DOPK8SConfig;
}();

exports.DOPK8SConfig = DOPK8SConfig;

/***/ }),

/***/ "./datasource/datasource.ts":
/*!**********************************!*\
  !*** ./datasource/datasource.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOPK8SDatasource = undefined;

var _app_events = __webpack_require__(/*! grafana/app/core/app_events */ "grafana/app/core/app_events");

var _app_events2 = _interopRequireDefault(_app_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
var DOPK8SDatasource =
/** @class */
function () {
  function DOPK8SDatasource(instanceSettings, backendSrv, templateSrv) {
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
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
  }

  DOPK8SDatasource.prototype.testDatasource = function (silent) {
    if (silent === void 0) {
      silent = false;
    }

    var url = '/api/v1/namespaces';
    var _url = this.url;
    if (this.accessViaToken) _url += '/__proxy';
    _url += url;
    return this.backendSrv.datasourceRequest({
      url: _url,
      method: "GET",
      headers: {
        "Content-Type": 'application/json'
      },
      silent: silent
    }).then(function (response) {
      if (response && response.status === 200) {
        return {
          status: "success",
          message: "Data source is OK",
          title: "Success"
        };
      }

      return {
        status: "error",
        message: "Data source is not OK",
        title: "Error"
      };
    }, function (error) {
      if (error && error.status && error.statusText) {
        return {
          status: "error",
          message: error.statusText,
          title: error.status
        };
      }

      return {
        status: "error",
        message: "Data source is not OK",
        title: "Error"
      };
    });
  };

  DOPK8SDatasource.prototype.metricFindQuery = function (query) {
    var _this = this;

    var interpolated = this.templateSrv.replace(query, {});
    var queryData = interpolated.split(" ");

    switch (queryData[0]) {
      case 'prom':
        return Promise.resolve([{
          text: this.prometheus,
          value: this.prometheus
        }]);

      case 'node':
        return this.getNodesSingletone().then(function (nodes) {
          return nodes.map(function (node) {
            return {
              text: node.metadata.name,
              value: node.metadata.name
            };
          });
        });

      case 'namespace':
        return this.getNamespaces().then(function (namespaces) {
          return namespaces.map(function (ns) {
            return {
              text: ns.metadata.name,
              value: ns.metadata.name
            };
          });
        });

      case 'pod':
        return this.getPods(queryData[1]).then(function (pods) {
          return pods.map(function (pod) {
            return {
              text: pod.metadata.name,
              value: pod.metadata.name
            };
          });
        });

      case 'deployment':
        return this.getDeploymentsSingletone().then(function (deployments) {
          return deployments.filter(function (deployment) {
            return deployment.metadata.namespace === queryData[1];
          }).map(function (deployment) {
            return {
              text: deployment.metadata.name,
              value: deployment.metadata.name
            };
          });
        });

      case 'daemonset':
        return this.getDaemonsetsSingletone().then(function (daemonsets) {
          return daemonsets.filter(function (daemonset) {
            return daemonset.metadata.namespace === queryData[1];
          }).map(function (daemonset) {
            return {
              text: daemonset.metadata.name,
              value: daemonset.metadata.name
            };
          });
        });

      case 'statefulset':
        return this.getStateFulSetsSingletone().then(function (statefulsets) {
          return statefulsets.filter(function (statefulset) {
            return statefulset.metadata.namespace === queryData[1];
          }).map(function (statefulset) {
            return {
              text: statefulset.metadata.name,
              value: statefulset.metadata.name
            };
          });
        });

      case 'containers':
        var promise = null;

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

        return promise.then(function (items) {
          return _this.__parseContainers(items, queryData);
        });

      case 'nodeHost':
        return this.getNodesSingletone().then(function (nodes) {
          var node = nodes.filter(function (item) {
            return item.metadata.name === queryData[1];
          })[0];
          var ip = node.status.addresses.filter(function (item) {
            return item.type === 'InternalIP';
          })[0].address;
          return [{
            text: ip,
            value: ip
          }];
        });

      default:
        return [];
    }
  };

  DOPK8SDatasource.prototype.__get = function (url) {
    var _url = this.url;
    if (this.accessViaToken) _url += '/__proxy';
    _url += url;
    return this.backendSrv.datasourceRequest({
      url: _url,
      method: "GET",
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(function (response) {
      return response.data;
    }, function (error) {
      return error;
    });
  };

  DOPK8SDatasource.prototype.__parseContainers = function (items, queryData) {
    var _item = items.filter(function (item) {
      return item.metadata.namespace === queryData[1];
    }).filter(function (item) {
      return item.metadata.name === queryData[3];
    });

    if (!_item.length) {
      return [{
        text: '',
        value: ''
      }];
    }

    _item = _item[0];
    var containers = [];

    if (_item.spec.template) {
      containers = _item.spec.template.spec.containers.map(function (cont) {
        return cont.name;
      });
    } else if (_item.spec.containers) {
      containers = _item.spec.containers.map(function (cont) {
        return cont.name;
      });
    }

    var result = [];

    if (containers.length > 1) {
      var names = containers.join('|');
      result.push({
        text: 'All',
        value: names
      });
    }

    containers.forEach(function (cont) {
      result.push({
        text: cont,
        value: cont
      });
    });
    return result;
  };

  DOPK8SDatasource.prototype.__addNamespace = function (namespace) {
    return namespace ? 'namespaces/' + namespace + '/' : '';
  };

  DOPK8SDatasource.prototype.getNamespaces = function () {
    return this.__get('/api/v1/namespaces').then(function (result) {
      if (!result.items) {
        _app_events2.default.emit('alert-error', ["Namespaces not received"]);

        return [];
      }

      return result.items;
    });
  };

  DOPK8SDatasource.prototype.getDeployments = function (namespace) {
    if (namespace === void 0) {
      namespace = null;
    }

    return this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'deployments').then(function (result) {
      if (!result.items) {
        _app_events2.default.emit('alert-error', ["Deployments not received"]);

        return [];
      }

      return result.items;
    });
  };

  DOPK8SDatasource.prototype.getStatefulsets = function (namespace) {
    if (namespace === void 0) {
      namespace = null;
    }

    return this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'statefulsets').then(function (result) {
      if (!result.items) {
        _app_events2.default.emit('alert-error', ["Statefulsets not received"]);

        return [];
      }

      return result.items;
    });
  };

  DOPK8SDatasource.prototype.getDaemonsets = function (namespace) {
    if (namespace === void 0) {
      namespace = null;
    }

    return this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'daemonsets').then(function (result) {
      if (!result.items) {
        _app_events2.default.emit('alert-error', ["Daemonsets not received"]);

        return [];
      }

      return result.items;
    });
  };

  DOPK8SDatasource.prototype.getPods = function (namespace) {
    return this.__get('/api/v1/' + this.__addNamespace(namespace) + 'pods').then(function (result) {
      if (!result.items) {
        var message = "Pods not received";

        _app_events2.default.emit('alert-error', [message]);

        return new Error(message);
      }

      return result.items;
    });
  };

  DOPK8SDatasource.prototype.getServices = function (namespace) {
    return this.__get('/api/v1/' + this.__addNamespace(namespace) + 'services').then(function (result) {
      if (!result.items) {
        _app_events2.default.emit('alert-error', ["Services not received"]);

        return [];
      }

      return result.items;
    });
  };

  DOPK8SDatasource.prototype.getComponents = function () {
    return this.__get('/api/v1/componentstatuses').then(function (result) {
      if (!result.items) {
        var message = "Component statuses not received";

        _app_events2.default.emit('alert-error', [message]);

        return new Error(message);
      }

      return result.items;
    });
  };

  DOPK8SDatasource.prototype.getNodesSingletone = function () {
    if (!this.nodesPromise) {
      this.nodesPromise = this.__get('/api/v1/nodes').then(function (result) {
        if (!result.items) {
          _app_events2.default.emit('alert-error', ["Nodes (singleton) not received"]);

          return [];
        }

        return result.items;
      });
    }

    return this.nodesPromise;
  };

  DOPK8SDatasource.prototype.getDeploymentsSingletone = function (namespace) {
    if (namespace === void 0) {
      namespace = null;
    }

    if (!this.deploymentsPromise) {
      this.deploymentsPromise = this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'deployments').then(function (result) {
        if (!result.items) {
          _app_events2.default.emit('alert-error', ["Deployments (singleton) not received"]);

          return [];
        }

        return result.items;
      });
    }

    return this.deploymentsPromise;
  };

  DOPK8SDatasource.prototype.getDaemonsetsSingletone = function (namespace) {
    if (namespace === void 0) {
      namespace = null;
    }

    if (!this.daemonsetsPromise) {
      this.daemonsetsPromise = this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'daemonsets').then(function (result) {
        if (!result.items) {
          _app_events2.default.emit('alert-error', ["Daemonsets (singleton) not received"]);

          return [];
        }

        return result.items;
      });
    }

    return this.daemonsetsPromise;
  };

  DOPK8SDatasource.prototype.getStateFulSetsSingletone = function (namespace) {
    if (namespace === void 0) {
      namespace = null;
    }

    if (!this.statefulsetsPromise) {
      this.statefulsetsPromise = this.__get('/apis/apps/v1/' + this.__addNamespace(namespace) + 'statefulsets').then(function (result) {
        if (!result.items) {
          _app_events2.default.emit('alert-error', ["Statefulsets (singleton) not received"]);

          return [];
        }

        return result.items;
      });
    }

    return this.statefulsetsPromise;
  };

  DOPK8SDatasource.prototype.getPodsSingleton = function (namespace) {
    if (namespace === void 0) {
      namespace = null;
    }

    if (!this.podsPromise) {
      this.podsPromise = this.__get('/api/v1/' + this.__addNamespace(namespace) + 'pods').then(function (result) {
        if (!result.items) {
          _app_events2.default.emit('alert-error', ["Pods (singleton) not received"]);

          return [];
        }

        return result.items;
      });
    }

    return this.podsPromise;
  };

  DOPK8SDatasource.prototype.getNodes = function () {
    return this.__get('/api/v1/nodes').then(function (result) {
      if (!result.items) {
        var message = 'Nodes not received';

        _app_events2.default.emit('alert-error', [message]);

        return new Error(message);
      }

      return result.items;
    });
  };

  DOPK8SDatasource.prototype.getJobs = function () {
    return this.__get('/apis/batch/v1/jobs').then(function (result) {
      if (!result.items) {
        _app_events2.default.emit('alert-error', ["Jobs not received"]);

        return [];
      }

      return result.items;
    });
  };

  DOPK8SDatasource.prototype.getCronJobs = function () {
    return this.__get('/apis/batch/v1beta1/cronjobs').then(function (result) {
      if (!result.items) {
        _app_events2.default.emit('alert-error', ["CronJobs not received"]);

        return [];
      }

      return result.items;
    });
  };

  DOPK8SDatasource.prototype.getEvents = function () {
    return this.__get('/api/v1/events').then(function (result) {
      if (result.status === 403) {
        _app_events2.default.emit('alert-error', [result.status + ' ' + result.statusText, "Please, update ClusterRole to get new permissions"]);

        return [];
      }

      if (!result.items) {
        _app_events2.default.emit('alert-error', ["Events not received"]);

        return [];
      }

      return result.items;
    });
  };

  return DOPK8SDatasource;
}();

exports.DOPK8SDatasource = DOPK8SDatasource;

/***/ }),

/***/ "./datasource/module.ts":
/*!******************************!*\
  !*** ./datasource/module.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigCtrl = exports.Datasource = undefined;

var _datasource = __webpack_require__(/*! ./datasource */ "./datasource/datasource.ts");

var _config = __webpack_require__(/*! ./config */ "./datasource/config.ts");

exports.Datasource = _datasource.DOPK8SDatasource;
exports.ConfigCtrl = _config.DOPK8SConfig;

/***/ }),

/***/ "grafana/app/core/app_events":
/*!**************************************!*\
  !*** external "app/core/app_events" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_app_events__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map