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

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

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
var SUCCEEDED = 4;
var COLOR_YELLOW = '#ffff0096';
var COLOR_RED = '#a52a2a';
var COLOR_GREEN = '#299c46';
var PODS_LIMIT = 10;
var TYPE_PROMETHEUS = "prometheus";
exports.ERROR = ERROR;
exports.WARNING = WARNING;
exports.TERMINATING = TERMINATING;
exports.SUCCESS = SUCCESS;
exports.SUCCEEDED = SUCCEEDED;
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

var _tslib = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");

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
          return (0, _tslib.__awaiter)(_this, void 0, void 0, function () {
            var _a, deployments, deploymentsNamespace_1, statefulsets, statefulsetsNamespace_1, daemonsets, daemonsetsNamespace_1;

            return (0, _tslib.__generator)(this, function (_b) {
              switch (_b.label) {
                case 0:
                  _a = queryData[1];

                  switch (_a) {
                    case 'deployment':
                      return [3
                      /*break*/
                      , 1];

                    case 'statefulset':
                      return [3
                      /*break*/
                      , 3];

                    case 'daemonset':
                      return [3
                      /*break*/
                      , 5];
                  }

                  return [3
                  /*break*/
                  , 7];

                case 1:
                  return [4
                  /*yield*/
                  , this.getDeployments()];

                case 2:
                  deployments = _b.sent();
                  deploymentsNamespace_1 = deployments.map(function (deployment) {
                    return deployment.metadata.namespace;
                  });
                  return [2
                  /*return*/
                  , namespaces.filter(function (ns) {
                    return deploymentsNamespace_1.includes(ns.metadata.name);
                  }).map(function (ns) {
                    return {
                      text: ns.metadata.name,
                      value: ns.metadata.name
                    };
                  })];

                case 3:
                  return [4
                  /*yield*/
                  , this.getStatefulsets()];

                case 4:
                  statefulsets = _b.sent();
                  statefulsetsNamespace_1 = statefulsets.map(function (statefulset) {
                    return statefulset.metadata.namespace;
                  });
                  return [2
                  /*return*/
                  , namespaces.filter(function (ns) {
                    return statefulsetsNamespace_1.includes(ns.metadata.name);
                  }).map(function (ns) {
                    return {
                      text: ns.metadata.name,
                      value: ns.metadata.name
                    };
                  })];

                case 5:
                  return [4
                  /*yield*/
                  , this.getDaemonsets()];

                case 6:
                  daemonsets = _b.sent();
                  daemonsetsNamespace_1 = daemonsets.map(function (daemonset) {
                    return daemonset.metadata.namespace;
                  });
                  return [2
                  /*return*/
                  , namespaces.filter(function (ns) {
                    return daemonsetsNamespace_1.includes(ns.metadata.name);
                  }).map(function (ns) {
                    return {
                      text: ns.metadata.name,
                      value: ns.metadata.name
                    };
                  })];

                case 7:
                  return [2
                  /*return*/
                  , namespaces.map(function (ns) {
                    return {
                      text: ns.metadata.name,
                      value: ns.metadata.name
                    };
                  })];
              }
            });
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