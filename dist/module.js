define(["@grafana/data","@grafana/runtime","app/core/app_events","app/core/utils/kbn"], function(__WEBPACK_EXTERNAL_MODULE__grafana_data__, __WEBPACK_EXTERNAL_MODULE__grafana_runtime__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_app_events__, __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_kbn__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./module.ts");
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
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
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

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
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
/*! exports provided: ERROR, WARNING, TERMINATING, SUCCESS, SUCCEEDED, COLOR_YELLOW, COLOR_RED, COLOR_GREEN, PODS_LIMIT, TYPE_PROMETHEUS, TYPE_DATASOURCE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR", function() { return ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WARNING", function() { return WARNING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TERMINATING", function() { return TERMINATING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUCCESS", function() { return SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUCCEEDED", function() { return SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_YELLOW", function() { return COLOR_YELLOW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_RED", function() { return COLOR_RED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLOR_GREEN", function() { return COLOR_GREEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PODS_LIMIT", function() { return PODS_LIMIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_PROMETHEUS", function() { return TYPE_PROMETHEUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPE_DATASOURCE", function() { return TYPE_DATASOURCE; });
var ERROR = 3;
var WARNING = 2;
var TERMINATING = 1;
var SUCCESS = 0;
var SUCCEEDED = 4;
var COLOR_YELLOW = '#ffff0096';
var COLOR_RED = '#a52a2a';
var COLOR_GREEN = '#299c46';
var PODS_LIMIT = 10;
var TYPE_PROMETHEUS = 'prometheus';
var TYPE_DATASOURCE = 'devopsprodidy-kubegraf-datasource';


/***/ }),

/***/ "./common/helpers.ts":
/*!***************************!*\
  !*** ./common/helpers.ts ***!
  \***************************/
/*! exports provided: __prepare, __preparePods, __convertToGB, __roundCpu, __percentUsed, __convertToMicro, __getLastNonNullValue, __getGrafanaVersion, __convertToHours */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__prepare", function() { return __prepare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__preparePods", function() { return __preparePods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__convertToGB", function() { return __convertToGB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__roundCpu", function() { return __roundCpu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__percentUsed", function() { return __percentUsed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__convertToMicro", function() { return __convertToMicro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__getLastNonNullValue", function() { return __getLastNonNullValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__getGrafanaVersion", function() { return __getGrafanaVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__convertToHours", function() { return __convertToHours; });
/* harmony import */ var _types_pod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/pod */ "./common/types/pod.ts");
/* harmony import */ var grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/core/utils/kbn */ "grafana/app/core/utils/kbn");
/* harmony import */ var grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__);



var __prepare = function __prepare(items) {
  return items.map(function (item) {
    return {
      name: item.metadata.name,
      data: item
    };
  });
};

var __preparePods = function __preparePods(pods) {
  return pods.map(function (item) {
    return new _types_pod__WEBPACK_IMPORTED_MODULE_0__["Pod"](item);
  });
};

var __convertToGB = function __convertToGB(bytes) {
  return grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1___default.a.valueFormats['bytes'](bytes, 3, null);
};

var __convertToHours = function __convertToHours(seconds) {
  return grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1___default.a.valueFormats['ms'](seconds, 1, null);
};

var __roundCpu = function __roundCpu(cpu) {
  return parseFloat(cpu).toFixed(3);
};

var __convertToMicro = function __convertToMicro(cpu) {
  return cpu * 1000 + 'm';
};

var __getLastNonNullValue = function __getLastNonNullValue(dataset) {
  if (dataset) {
    var skiper = dataset.filter(function (item) {
      return item[0] != null;
    });
    return skiper[skiper.length - 1][0];
  }
};

var __percentUsed = function __percentUsed(used, allocatable) {
  return (parseFloat(used) / parseFloat(allocatable) * 100).toFixed(2) + '%';
};

var __getGrafanaVersion = function __getGrafanaVersion(window) {
  var version = 5;

  try {
    version = window.grafanaBootData.settings.buildInfo.version.split('.')[0];
  } catch (e) {
    console.error(e);
  }

  return version;
};



/***/ }),

/***/ "./common/proxies/prometheusProxy.ts":
/*!*******************************************!*\
  !*** ./common/proxies/prometheusProxy.ts ***!
  \*******************************************/
/*! exports provided: PrometheusProxy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrometheusProxy", function() { return PrometheusProxy; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "@grafana/data");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_data__WEBPACK_IMPORTED_MODULE_0__);
//import moment from "moment";


var PrometheusProxy =
/** @class */
function () {
  function PrometheusProxy(ds) {
    this.__getLastNonNullValue = function (item) {
      if (item.fields) {
        var valueField = item.fields.filter(function (row) {
          return row.name && row.name === 'Value';
        });

        if (valueField) {
          var vArr = valueField[0].values.buffer.filter(function (point) {
            return point != null;
          });
          var value = vArr[vArr.length - 1];

          if (value == null) {
            console.log(item);
          }

          return value;
        }
      } else if (item.datapoints) {
        var skiper = item.datapoints.filter(function (item) {
          return item[0] != null;
        });
        return skiper[skiper.length - 1][0];
      } else {
        return 0;
      }
    };

    this.__getName = function (item, query) {
      if (item.target !== undefined) {
        return item.target.substring(query.legend.length + 3, item.target.length - 2);
      }

      if (item.name !== undefined) {
        return item.name.substring(query.legend.length + 3, item.name.length - 2);
      }
    };

    this.ds = ds;
  }

  PrometheusProxy.prototype.query = function (query, debug) {
    var _this = this;

    if (debug === void 0) {
      debug = false;
    }

    var body = {
      //range: { from: moment().subtract(2, "minute"), to: moment() },
      range: {
        from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["dateTime"])().subtract(2, 'minute'),
        to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["dateTime"])()
      },
      targets: [{
        expr: query.expr,
        format: 'time_series'
      }],
      legendFormat: '{{' + query.legend + '}}',
      interval: '15s'
    };
    var res = this.ds.query(body);

    if (typeof res.then !== 'function') {
      res = res.toPromise();
    }

    return res.then(function (res) {
      if (res && res.data) {
        return _this.formData(res.data, query, debug);
      } else {
        return {};
      }
    });
  };

  PrometheusProxy.prototype.formData = function (data, query, debug) {
    var _this = this;

    if (debug === void 0) {
      debug = false;
    }

    return data.map(function (item) {
      if (debug) {
        console.log(item);
      }

      return {
        target: _this.__getName(item, query),
        datapoint: _this.__getLastNonNullValue(item)
      };
    });
  };

  return PrometheusProxy;
}();



/***/ }),

/***/ "./common/store.ts":
/*!*************************!*\
  !*** ./common/store.ts ***!
  \*************************/
/*! exports provided: Store, store, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
var Store =
/** @class */
function () {
  function Store() {}

  Store.prototype.get = function (key) {
    return window.localStorage[key];
  };

  Store.prototype.set = function (key, value) {
    window.localStorage[key] = value;
  };

  Store.prototype.getBool = function (key, def) {
    if (def !== void 0 && !this.exists(key)) {
      return def;
    }

    return window.localStorage[key] === 'true';
  };

  Store.prototype.getObject = function (key, def) {
    var ret = def;

    if (this.exists(key)) {
      var json = window.localStorage[key];

      try {
        ret = JSON.parse(json);
      } catch (error) {
        console.error("Error parsing store object: " + key + ". Returning default: " + def + ". [" + error + "]");
      }
    }

    return ret;
  }; // Returns true when successfully stored


  Store.prototype.setObject = function (key, value) {
    var json;

    try {
      json = JSON.stringify(value);
    } catch (error) {
      console.error("Could not stringify object: " + key + ". [" + error + "]");
      return false;
    }

    try {
      this.set(key, json);
    } catch (error) {
      // Likely hitting storage quota
      console.error("Could not save item in localStorage: " + key + ". [" + error + "]");
      return false;
    }

    return true;
  };

  Store.prototype.exists = function (key) {
    return window.localStorage[key] !== void 0;
  };

  Store.prototype["delete"] = function (key) {
    window.localStorage.removeItem(key);
  };

  return Store;
}();


var store = new Store();
/* harmony default export */ __webpack_exports__["default"] = (store);

/***/ }),

/***/ "./common/types/component.ts":
/*!***********************************!*\
  !*** ./common/types/component.ts ***!
  \***********************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/types/traits/baseModel */ "./common/types/traits/baseModel.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/constants */ "./common/constants.ts");




var Component =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Component, _super);

  function Component(data) {
    return _super.call(this, data) || this;
  }

  Object.defineProperty(Component.prototype, "status", {
    get: function get() {
      var type = this.data.conditions.filter(function (item) {
        return item.type === 'Healthy';
      })[0];

      if (type !== undefined && type.status === 'True') {
        return _common_constants__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"];
      } else {
        return _common_constants__WEBPACK_IMPORTED_MODULE_2__["ERROR"];
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Component.prototype, "color", {
    get: function get() {
      switch (this.status) {
        case _common_constants__WEBPACK_IMPORTED_MODULE_2__["SUCCESS"]:
          return _common_constants__WEBPACK_IMPORTED_MODULE_2__["COLOR_GREEN"];

        case _common_constants__WEBPACK_IMPORTED_MODULE_2__["ERROR"]:
          return _common_constants__WEBPACK_IMPORTED_MODULE_2__["COLOR_RED"];

        default:
          return;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Component.prototype, "message", {
    get: function get() {
      var conditions = this.data.conditions;

      if (conditions) {
        var message = conditions.filter(function (item) {
          return item.type === 'Healthy';
        })[0];
        return message && message.message;
      }
    },
    enumerable: false,
    configurable: true
  });
  return Component;
}(_common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_1__["BaseModel"]);



/***/ }),

/***/ "./common/types/cronjob.ts":
/*!*********************************!*\
  !*** ./common/types/cronjob.ts ***!
  \*********************************/
/*! exports provided: Cronjob */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cronjob", function() { return Cronjob; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/types/traits/baseModel */ "./common/types/traits/baseModel.ts");



var Cronjob =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Cronjob, _super);

  function Cronjob(data) {
    var _this = _super.call(this, data) || this;

    _this.jobs = [];
    return _this;
  }

  return Cronjob;
}(_common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_1__["BaseModel"]);



/***/ }),

/***/ "./common/types/daemonset.ts":
/*!***********************************!*\
  !*** ./common/types/daemonset.ts ***!
  \***********************************/
/*! exports provided: Daemonset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Daemonset", function() { return Daemonset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/types/traits/baseModel */ "./common/types/traits/baseModel.ts");



var Daemonset =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Daemonset, _super);

  function Daemonset(data) {
    var _this = _super.call(this, data) || this;

    _this.pods = [];
    return _this;
  }

  return Daemonset;
}(_common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_1__["BaseModel"]);



/***/ }),

/***/ "./common/types/deployment.ts":
/*!************************************!*\
  !*** ./common/types/deployment.ts ***!
  \************************************/
/*! exports provided: Deployment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Deployment", function() { return Deployment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _traits_baseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./traits/baseModel */ "./common/types/traits/baseModel.ts");



var Deployment =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Deployment, _super);

  function Deployment(data) {
    var _this = _super.call(this, data) || this;

    _this.pods = [];
    _this.services = [];
    return _this;
  }

  return Deployment;
}(_traits_baseModel__WEBPACK_IMPORTED_MODULE_1__["BaseModel"]);



/***/ }),

/***/ "./common/types/job.ts":
/*!*****************************!*\
  !*** ./common/types/job.ts ***!
  \*****************************/
/*! exports provided: Job */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Job", function() { return Job; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/types/traits/baseModel */ "./common/types/traits/baseModel.ts");



var Job =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Job, _super);

  function Job(data) {
    var _this = _super.call(this, data) || this;

    _this.pods = [];
    return _this;
  }

  return Job;
}(_common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_1__["BaseModel"]);



/***/ }),

/***/ "./common/types/namespace.ts":
/*!***********************************!*\
  !*** ./common/types/namespace.ts ***!
  \***********************************/
/*! exports provided: Namespace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Namespace", function() { return Namespace; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _common_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/store */ "./common/store.ts");
/* harmony import */ var _common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/types/traits/baseModel */ "./common/types/traits/baseModel.ts");




var Namespace =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Namespace, _super);

  function Namespace(data) {
    var _this = _super.call(this, data) || this;

    _this.deployments = [];
    _this.statefulsets = [];
    _this.daemonsets = [];
    _this.other = [{
      pods: []
    }];
    _this.sort = 'name';
    return _this;
  }

  Namespace.prototype.toggle = function () {
    var _this = this;

    _super.prototype.toggle.call(this);

    var namespaceStore = _common_store__WEBPACK_IMPORTED_MODULE_1__["default"].getObject('namespaceStore');
    var index = namespaceStore.findIndex(function (item) {
      return item.name === _this.name;
    });

    if (index || index === 0) {
      namespaceStore[index].open = this.open;
    }

    _common_store__WEBPACK_IMPORTED_MODULE_1__["default"].setObject('namespaceStore', namespaceStore);
  };

  return Namespace;
}(_common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_2__["BaseModel"]);



/***/ }),

/***/ "./common/types/node.ts":
/*!******************************!*\
  !*** ./common/types/node.ts ***!
  \******************************/
/*! exports provided: Node */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return Node; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers */ "./common/helpers.ts");
/* harmony import */ var _common_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/store */ "./common/store.ts");
/* harmony import */ var _common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/types/traits/baseModel */ "./common/types/traits/baseModel.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants */ "./common/constants.ts");






var Node =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Node, _super);

  function Node(data) {
    var _this = _super.call(this, data) || this;

    _this.namespaces = [];
    _this.metrics = {
      cpuUsed: 'N/A',
      memoryUsed: 'N/A',
      podsCount: 'N/A',
      cpuRequested: 'N/A',
      memoryRequested: 'N/A',
      cpuLimit: 'N/A',
      memoryLimit: 'N/A'
    };
    _this.cpuIndicate = false;
    _this.memoryIndicate = false;
    _this.podsIndicate = false;
    _this.cpuRequestedIndicate = false;
    _this.memoryRequestedIndicate = false;
    _this.podsRequestedIndicate = false;
    _this.cpuLimitIndicate = false;
    _this.memoryLimitIndicate = false;

    _this.nsListState();

    _this.hideNs = _common_store__WEBPACK_IMPORTED_MODULE_2__["default"].getBool(_this.name + 'NsList', false);
    return _this;
  }

  Node.prototype.toggle = function () {
    var _this = this;

    _super.prototype.toggle.call(this);

    var nodeStore = _common_store__WEBPACK_IMPORTED_MODULE_2__["default"].getObject('nodeStore');
    var index = nodeStore.findIndex(function (item) {
      return item.name === _this.name;
    });

    if (index || index === 0) {
      nodeStore[index].open = this.open;
    }

    _common_store__WEBPACK_IMPORTED_MODULE_2__["default"].setObject('nodeStore', nodeStore);
  };

  Node.prototype.nsListState = function () {
    if (_common_store__WEBPACK_IMPORTED_MODULE_2__["default"].get(this.name + 'NsList') === undefined) {
      _common_store__WEBPACK_IMPORTED_MODULE_2__["default"].set(this.name + 'NsList', true);
    }

    return _common_store__WEBPACK_IMPORTED_MODULE_2__["default"].get(this.name + 'NsList');
  };

  Object.defineProperty(Node.prototype, "status", {
    get: function get() {
      var type = this.data.status.conditions.filter(function (item) {
        return item.type === 'Ready';
      })[0];

      if (type !== undefined && type.status === 'True') {
        return _constants__WEBPACK_IMPORTED_MODULE_4__["SUCCESS"];
      } else {
        return _constants__WEBPACK_IMPORTED_MODULE_4__["ERROR"];
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "podsCount", {
    get: function get() {
      if (this.namespaces) {
        return this.namespaces.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue.pods.length;
        }, 0);
      }

      return 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "color", {
    get: function get() {
      if (this.status === _constants__WEBPACK_IMPORTED_MODULE_4__["SUCCESS"]) {
        return '#18e018';
      } else {
        return _constants__WEBPACK_IMPORTED_MODULE_4__["COLOR_RED"];
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "message", {
    get: function get() {
      if (this.status === _constants__WEBPACK_IMPORTED_MODULE_4__["SUCCESS"]) {
        return 'ok';
      } else {
        return "Node isn't ready";
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "cpuStatus", {
    get: function get() {
      var cpu = this.data.status.allocatable.cpu;

      if (cpu.indexOf('m') > -1) {
        cpu = parseInt(cpu, 10) / 1000;
      }

      return this.__getStatus(this.metrics.cpuUsed, cpu);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "cpuStatusRequested", {
    get: function get() {
      var cpu = this.data.status.allocatable.cpu;

      if (cpu.indexOf('m') > -1) {
        cpu = parseInt(cpu, 10) / 1000;
      }

      return this.__getStatusRequested(this.metrics.cpuRequested, cpu);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "cpuLimitStatus", {
    get: function get() {
      var cpu = this.data.status.allocatable.cpu;

      if (cpu.indexOf('m') > -1) {
        cpu = parseInt(cpu, 10) / 1000;
      }

      return this.__getStatusLimit(this.metrics.cpuLimit, cpu);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "memoryStatus", {
    get: function get() {
      return this.__getStatus(this.metrics.memoryUsed, this.__getBytes(this.data.status.allocatable.memory));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "memoryStatusRequested", {
    get: function get() {
      return this.__getStatusRequested(this.metrics.memoryRequested, this.__getBytes(this.data.status.allocatable.memory));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "memoryLimitStatus", {
    get: function get() {
      return this.__getStatusLimit(this.metrics.memoryLimit, this.__getBytes(this.data.status.allocatable.memory));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "podsStatus", {
    get: function get() {
      return this.__getStatus(this.metrics.podsCount, this.data.status.allocatable.pods);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "podsStatusRequested", {
    get: function get() {
      return this.__getStatusRequested(this.metrics.podsCount, this.data.status.allocatable.pods);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "hostIp", {
    get: function get() {
      return this.data.status.addresses.filter(function (item) {
        return item.type === 'InternalIP';
      })[0].address;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "memoryCapacityFormatted", {
    get: function get() {
      return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__convertToGB"])(this.__getBytes(this.data.status.capacity.memory));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "memoryAllocatableFormatted", {
    get: function get() {
      return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__convertToGB"])(this.__getBytes(this.data.status.allocatable.memory));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "cpuAllocatableFormatted", {
    get: function get() {
      var cpu = this.data.status.allocatable.cpu;

      if (cpu.indexOf('m') > -1) {
        cpu = parseInt(cpu, 10) / 1000;
      }

      return cpu;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "memoryUsedFormatted", {
    /*used format*/
    get: function get() {
      return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__convertToGB"])(this.metrics.memoryUsed) + ' (' + Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__percentUsed"])(this.metrics.memoryUsed, this.__getBytes(this.data.status.allocatable.memory)) + ')';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "memoryRequestedFormatted", {
    get: function get() {
      return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__convertToGB"])(this.metrics.memoryRequested) + ' (' + Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__percentUsed"])(this.metrics.memoryRequested, this.__getBytes(this.data.status.allocatable.memory)) + ')';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "memoryLimitFormatted", {
    get: function get() {
      return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__convertToGB"])(this.metrics.memoryLimit) + ' (' + Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__percentUsed"])(this.metrics.memoryLimit, this.__getBytes(this.data.status.allocatable.memory)) + ')';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "cpuUsedFormatted", {
    get: function get() {
      var cpu = this.data.status.allocatable.cpu;

      if (cpu.indexOf('m') > -1) {
        cpu = parseInt(cpu, 10) / 1000;
      }

      return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__roundCpu"])(this.metrics.cpuUsed) + ' (' + Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__percentUsed"])(this.metrics.cpuUsed, cpu) + ')';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "cpuRequestedFormatted", {
    get: function get() {
      var cpu = this.data.status.allocatable.cpu;

      if (cpu.indexOf('m') > -1) {
        cpu = parseInt(cpu, 10) / 1000;
      }

      return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__roundCpu"])(this.metrics.cpuRequested) + ' (' + Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__percentUsed"])(this.metrics.cpuRequested, cpu) + ')';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "cpuLimitFormatted", {
    get: function get() {
      var cpu = this.data.status.allocatable.cpu;

      if (cpu.indexOf('m') > -1) {
        cpu = parseInt(cpu, 10) / 1000;
      }

      return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__roundCpu"])(this.metrics.cpuLimit) + ' (' + Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__percentUsed"])(this.metrics.cpuLimit, cpu) + ')';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "podsUsedFormatted", {
    get: function get() {
      return this.metrics.podsCount + ' (' + Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__percentUsed"])(this.metrics.podsCount, this.data.status.allocatable.pods) + ')';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "podsRequestedFormatted", {
    get: function get() {
      return this.metrics.podsCount + ' (' + Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__percentUsed"])(this.metrics.podsCount, this.data.status.allocatable.pods) + ')';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "cpuPercentUsed", {
    /*percent used*/
    get: function get() {
      var cpu = this.data.status.allocatable.cpu;

      if (cpu.indexOf('m') > -1) {
        cpu = parseInt(cpu, 10) / 1000;
      }

      return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__roundCpu"])(this.metrics.cpuUsed) + ' / ' + cpu + ' (' + Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__percentUsed"])(this.metrics.cpuUsed, cpu) + ')';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "cpuPercentRequested", {
    get: function get() {
      var cpu = this.data.status.allocatable.cpu;

      if (cpu.indexOf('m') > -1) {
        cpu = parseInt(cpu, 10) / 1000;
      }

      return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__roundCpu"])(this.metrics.cpuRequested) + ' / ' + cpu + ' (' + Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__percentUsed"])(this.metrics.cpuRequested, cpu) + ')';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "memoryPercentUsed", {
    get: function get() {
      var used = this.metrics.memoryUsed;

      var allocatable = this.__getBytes(this.data.status.allocatable.memory);

      var percent = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__percentUsed"])(used, allocatable);

      return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__convertToGB"])(used) + ' / ' + Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__convertToGB"])(allocatable) + ' (' + percent + ') ';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "memoryPercentRequested", {
    get: function get() {
      var allocatable = this.__getBytes(this.data.status.allocatable.memory);

      var percent = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__percentUsed"])(this.metrics.memoryRequested, allocatable);

      return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__convertToGB"])(this.metrics.memoryRequested) + ' / ' + Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__convertToGB"])(allocatable) + ' (' + percent + ') ';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "podsPercentUsed", {
    get: function get() {
      var used = this.metrics.podsCount;
      var allocatable = this.data.status.allocatable.pods;

      var percent = Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["__percentUsed"])(used, allocatable);

      return used + ' / ' + allocatable + ' (' + percent + ') ';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "rowCpuColor", {
    /*color*/
    get: function get() {
      return this.__getColor(this.cpuStatus);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "rowCpuRequestedColor", {
    get: function get() {
      return this.__getColor(this.cpuStatusRequested);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "rowCpuLimitColor", {
    get: function get() {
      return this.__getColor(this.cpuLimitStatus);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "rowMemoryColor", {
    get: function get() {
      return this.__getColor(this.memoryStatus);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "rowMemoryRequestedColor", {
    get: function get() {
      return this.__getColor(this.memoryStatusRequested);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "rowMemoryLimitColor", {
    get: function get() {
      return this.__getColor(this.memoryLimitStatus);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "rowPodsColor", {
    get: function get() {
      return this.__getColor(this.podsStatus);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Node.prototype, "rowPodsRequestedColor", {
    get: function get() {
      return this.__getColor(this.podsStatusRequested);
    },
    enumerable: false,
    configurable: true
  });

  Node.prototype.parseMetrics = function (cpuReq, memoryReq, pods, cpuUsed, memoryUsed, cpuLimit, memoryLimit) {
    var currentStatus = {
      podsStatus: this.podsStatus,
      podsStatusRequested: this.podsStatusRequested,
      cpuStatus: this.cpuStatus,
      cpuStatusRequested: this.cpuStatusRequested,
      cpuLimitStatus: this.cpuLimitStatus,
      memoryStatus: this.memoryStatus,
      memoryStatusRequested: this.memoryStatusRequested,
      memoryLimitStatus: this.memoryLimitStatus
    };
    this.metrics.cpuRequested = this.__getLastMetric(cpuReq);
    this.metrics.memoryRequested = this.__getLastMetric(memoryReq);
    this.metrics.podsCount = this.__getLastMetricByInstance(pods);
    this.metrics.cpuUsed = this.__getLastMetricByInstance(cpuUsed);
    this.metrics.memoryUsed = this.__getLastMetricByInstance(memoryUsed);
    this.metrics.cpuLimit = this.__getLastMetricByInstance(cpuLimit);
    this.metrics.memoryLimit = this.__getLastMetricByInstance(memoryLimit);

    for (var type in currentStatus) {
      if (currentStatus.hasOwnProperty(type) && this.hasOwnProperty(type)) {
        if (currentStatus[type] !== undefined && currentStatus[type] !== this[type]) {
          this.setMetricIndicated(type);
        }
      }
    }
  };

  Node.prototype.setMetricIndicated = function (metricStatus) {
    var _this = this;

    var map = {
      podsStatus: 'podsIndicate',
      podsStatusRequested: 'podsRequestedIndicate',
      cpuStatus: 'cpuIndicate',
      cpuStatusRequested: 'cpuRequestedIndicate',
      cpuLimitStatus: 'cpuLimitIndicate',
      memoryStatus: 'memoryIndicate',
      memoryStatusRequested: 'memoryRequestedIndicate',
      memoryLimitStatus: 'memoryLimitIndicate'
    };

    if (map[metricStatus] && this.hasOwnProperty(map[metricStatus])) {
      this[map[metricStatus]] = true;
      setTimeout(function () {
        _this[map[metricStatus]] = false;
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

    return 'N/A';
  };

  Node.prototype.__getLastMetric = function (metrics) {
    var _this = this;

    var datapoints = metrics.filter(function (item) {
      return item.target === _this.name;
    })[0];

    if (datapoints !== undefined) {
      return datapoints.datapoint;
    }

    return 'N/A';
  };

  Node.prototype.__getBytes = function (str) {
    var bytes = this.__parseInt(str) * 1024;

    if (str.indexOf('Mi') > -1) {
      bytes = bytes * 1024;
    }

    return bytes;
  };

  Node.prototype.__parseInt = function (str) {
    return parseInt(str, 10);
  };

  Node.prototype.__getStatus = function (used, allocatable) {
    var diff = used / allocatable;

    if (diff <= 0.5) {
      return _constants__WEBPACK_IMPORTED_MODULE_4__["SUCCESS"];
    } else if (diff > 0.5 && diff <= 0.8) {
      return _constants__WEBPACK_IMPORTED_MODULE_4__["WARNING"];
    } else if (diff > 0.8) {
      return _constants__WEBPACK_IMPORTED_MODULE_4__["ERROR"];
    } else {
      return;
    }
  };

  Node.prototype.__getStatusRequested = function (requested, allocatable) {
    var diff = requested / allocatable;

    if (diff <= 0.5) {
      return _constants__WEBPACK_IMPORTED_MODULE_4__["SUCCESS"];
    } else if (diff > 0.5 && diff <= 0.8) {
      return _constants__WEBPACK_IMPORTED_MODULE_4__["WARNING"];
    } else if (diff > 0.8) {
      return _constants__WEBPACK_IMPORTED_MODULE_4__["ERROR"];
    } else {
      return;
    }
  };

  Node.prototype.__getStatusLimit = function (limit, allocatable) {
    var diff = limit / allocatable;

    if (diff <= 0.9) {
      return _constants__WEBPACK_IMPORTED_MODULE_4__["SUCCESS"];
    } else if (diff > 0.9 && diff <= 1) {
      return _constants__WEBPACK_IMPORTED_MODULE_4__["WARNING"];
    } else if (diff > 1) {
      return _constants__WEBPACK_IMPORTED_MODULE_4__["ERROR"];
    }

    return;
  };

  Node.prototype.__getColor = function (status) {
    switch (status) {
      case _constants__WEBPACK_IMPORTED_MODULE_4__["SUCCESS"]:
        return _constants__WEBPACK_IMPORTED_MODULE_4__["COLOR_GREEN"];

      case _constants__WEBPACK_IMPORTED_MODULE_4__["WARNING"]:
        return _constants__WEBPACK_IMPORTED_MODULE_4__["COLOR_YELLOW"];

      case _constants__WEBPACK_IMPORTED_MODULE_4__["ERROR"]:
        return _constants__WEBPACK_IMPORTED_MODULE_4__["COLOR_RED"];

      default:
        return;
    }
  };

  return Node;
}(_common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_3__["BaseModel"]);



/***/ }),

/***/ "./common/types/pod.ts":
/*!*****************************!*\
  !*** ./common/types/pod.ts ***!
  \*****************************/
/*! exports provided: Pod */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pod", function() { return Pod; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./common/constants.ts");
/* harmony import */ var _traits_baseModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./traits/baseModel */ "./common/types/traits/baseModel.ts");




var Pod =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Pod, _super);

  function Pod(data) {
    var _this = _super.call(this, data) || this;

    _this.eventMessage = null;
    _this.metrics = {
      cpuUsed: 'N-A',
      memoryUsed: 'N-A',
      cpuRequested: 'N-A',
      memoryRequested: 'N-A',
      cpuLimit: 'N-A',
      memoryLimit: 'N-A'
    };
    _this.sourceMetrics = {
      cpuUsed: null,
      memoryUsed: null,
      cpuRequested: null,
      memoryRequested: null,
      cpuLimit: null,
      memoryLimit: null
    };
    _this.used = false;
    return _this;
  }

  Object.defineProperty(Pod.prototype, "status", {
    get: function get() {
      if (this.data.metadata.deletionTimestamp) {
        return _constants__WEBPACK_IMPORTED_MODULE_1__["TERMINATING"];
      } else if (this.data.status.phase === 'Running') {
        var conditionStatus = void 0;
        var containerStatuses = void 0;
        var initContainerStatuses = void 0;

        if (this.data.status.conditions) {
          conditionStatus = this.data.status.conditions.filter(function (item) {
            return item.status === 'False';
          });
          conditionStatus.length > 0 ? conditionStatus = true : conditionStatus = false;
        }

        if (this.data.status.containerStatuses) {
          containerStatuses = this.data.status.containerStatuses.filter(function (item) {
            return item.ready === false;
          });
          containerStatuses.length > 0 ? containerStatuses = true : containerStatuses = false;
        }

        if (this.data.status.initContainerStatuses) {
          initContainerStatuses = this.data.status.initContainerStatuses.filter(function (item) {
            return item.ready === false;
          });
          initContainerStatuses.length > 0 ? initContainerStatuses = true : initContainerStatuses = false;
        }

        if (conditionStatus || containerStatuses || initContainerStatuses) {
          return _constants__WEBPACK_IMPORTED_MODULE_1__["ERROR"];
        } else {
          return _constants__WEBPACK_IMPORTED_MODULE_1__["SUCCESS"];
        }
      } else {
        switch (this.data.status.phase) {
          case 'Pending':
            return _constants__WEBPACK_IMPORTED_MODULE_1__["WARNING"];

          case 'Succeeded':
            return _constants__WEBPACK_IMPORTED_MODULE_1__["SUCCEEDED"];

          case 'Failed':
            return _constants__WEBPACK_IMPORTED_MODULE_1__["ERROR"];

          case 'Unknown':
            return _constants__WEBPACK_IMPORTED_MODULE_1__["ERROR"];

          default:
            return _constants__WEBPACK_IMPORTED_MODULE_1__["ERROR"];
        }
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Pod.prototype, "color", {
    get: function get() {
      switch (this.status) {
        case _constants__WEBPACK_IMPORTED_MODULE_1__["ERROR"]:
          return 'error';

        case _constants__WEBPACK_IMPORTED_MODULE_1__["WARNING"]:
          return 'warning';

        case _constants__WEBPACK_IMPORTED_MODULE_1__["TERMINATING"]:
          return 'terminating';

        case _constants__WEBPACK_IMPORTED_MODULE_1__["SUCCESS"]:
          return 'success';

        case _constants__WEBPACK_IMPORTED_MODULE_1__["SUCCEEDED"]:
          return 'succeeded';

        default:
          return 'success';
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Pod.prototype, "message", {
    get: function get() {
      if (this.eventMessage) {
        return this.eventMessage;
      }

      var status = this.status;
      var data = this.data;
      var phase = this.data.status.phase;
      var message = 'Pod is ' + phase;

      if (status === _constants__WEBPACK_IMPORTED_MODULE_1__["ERROR"]) {
        if (data.status.containerStatuses) {
          var d = data.status.containerStatuses.filter(function (item) {
            return item.ready === false;
          })[0];

          if (d && d.state && d.state.waiting) {
            if (d.state.waiting.message && d.state.waiting.reason) {
              message = d.state.waiting.reason + '. ' + d.state.waiting.message;
              return message;
            }
          }
        } else if (data.status.conditions) {
          var d = data.status.conditions.filter(function (item) {
            return item.ready === false || item.type === 'PodScheduled' && item.status === 'False';
          })[0];

          if (d !== undefined) {
            return d.message;
          }
        } else if (data.status.message) {
          return data.status.message;
        }

        return 'Undefined error';
      } else {
        if (this.data.metadata.deletionTimestamp) {
          return 'Pod is Terminating';
        } else if (phase === 'Running' || phase === 'Succeeded') {
          return 'Pod is ' + phase;
        } else {
          if (data.status.containerStatuses) {
            var d = data.status.containerStatuses.filter(function (item) {
              return item.ready === false;
            })[0];

            if (d.state.waiting.message && d.state.waiting.message.length > 0) {
              message = d.state.waiting.message;
            }
          } else if (data.status.conditions) {
            var d = data.status.conditions.filter(function (item) {
              return item.ready === false || item.type === 'PodScheduled' && item.status === 'False';
            })[0];

            if (d !== undefined) {
              message = d.message;
            }
          } else if (data.status.message) {
            message = data.status.message;
          }

          return message;
        }
      }
    },
    set: function set(msg) {
      this.eventMessage = msg;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Pod.prototype, "NaMessage", {
    get: function get() {
      return 'Prometheus metrics unavailable';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Pod.prototype, "usageCpuColor", {
    get: function get() {
      if (this.sourceMetrics.cpuUsed === null) {
        return '';
      }

      if (this.sourceMetrics.cpuRequested && this.sourceMetrics.cpuLimit) {
        var min = (this.sourceMetrics.cpuLimit - this.sourceMetrics.cpuRequested) * 0.5 + this.sourceMetrics.cpuRequested;
        var max = (this.sourceMetrics.cpuLimit - this.sourceMetrics.cpuRequested) * 0.8 + this.sourceMetrics.cpuRequested;

        if (this.sourceMetrics.cpuUsed < min) {
          return 'green';
        } else if (this.sourceMetrics.cpuUsed >= max) {
          return 'red';
        } else {
          return 'yellow';
        }
      }

      return 'red';
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Pod.prototype, "usageMemoryColor", {
    get: function get() {
      if (this.sourceMetrics.memoryUsed === null) {
        return '';
      }

      if (this.sourceMetrics.memoryRequested && this.sourceMetrics.memoryLimit) {
        var min = (this.sourceMetrics.memoryLimit - this.sourceMetrics.memoryRequested) * 0.5 + this.sourceMetrics.memoryRequested;
        var max = (this.sourceMetrics.memoryLimit - this.sourceMetrics.memoryRequested) * 0.8 + this.sourceMetrics.memoryRequested;

        if (this.sourceMetrics.memoryUsed < min) {
          return 'green';
        } else if (this.sourceMetrics.memoryUsed >= max) {
          return 'red';
        } else {
          return 'yellow';
        }
      }

      return 'red';
    },
    enumerable: false,
    configurable: true
  });
  return Pod;
}(_traits_baseModel__WEBPACK_IMPORTED_MODULE_2__["BaseModel"]);



/***/ }),

/***/ "./common/types/service.ts":
/*!*********************************!*\
  !*** ./common/types/service.ts ***!
  \*********************************/
/*! exports provided: Service */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Service", function() { return Service; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/types/traits/baseModel */ "./common/types/traits/baseModel.ts");



var Service =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Service, _super);

  function Service(data) {
    return _super.call(this, data) || this;
  }

  return Service;
}(_common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_1__["BaseModel"]);



/***/ }),

/***/ "./common/types/statefulset.ts":
/*!*************************************!*\
  !*** ./common/types/statefulset.ts ***!
  \*************************************/
/*! exports provided: Statefulset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Statefulset", function() { return Statefulset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/types/traits/baseModel */ "./common/types/traits/baseModel.ts");



var Statefulset =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Statefulset, _super);

  function Statefulset(data) {
    var _this = _super.call(this, data) || this;

    _this.pods = [];
    return _this;
  }

  return Statefulset;
}(_common_types_traits_baseModel__WEBPACK_IMPORTED_MODULE_1__["BaseModel"]);



/***/ }),

/***/ "./common/types/traits/baseModel.ts":
/*!******************************************!*\
  !*** ./common/types/traits/baseModel.ts ***!
  \******************************************/
/*! exports provided: BaseModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseModel", function() { return BaseModel; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants */ "./common/constants.ts");


var BaseModel =
/** @class */
function () {
  function BaseModel(data) {
    this.name = data.metadata.name;
    this.data = data;
    this.is_deleted = false;
    this.open = true;
    this.limit = _constants__WEBPACK_IMPORTED_MODULE_0__["PODS_LIMIT"];
  }

  BaseModel.prototype.update = function (data) {
    this.name = data.metadata.name;
    this.data = data;
  };

  BaseModel.prototype.destroy = function () {
    this.is_deleted = true;
  };

  BaseModel.prototype.toggle = function () {
    this.open = !this.open;
  };

  BaseModel.prototype.showAllPods = function () {
    this.limit = false;
  };

  return BaseModel;
}();



/***/ }),

/***/ "./components/applications-overview/applications-overview.ts":
/*!*******************************************************************!*\
  !*** ./components/applications-overview/applications-overview.ts ***!
  \*******************************************************************/
/*! exports provided: ApplicationsOverview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationsOverview", function() { return ApplicationsOverview; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _common_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/store */ "./common/store.ts");
/* harmony import */ var _k8s_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../k8s-page */ "./components/k8s-page.ts");
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/helpers */ "./common/helpers.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/constants */ "./common/constants.ts");






var ApplicationsOverview =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ApplicationsOverview, _super);

  function ApplicationsOverview($scope, $injector, $q, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $window) {
    var _this = _super.call(this, $scope, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $q, $window) || this;

    _this.$q = $q;
    _this.backendSrv = backendSrv;
    _this.datasourceSrv = datasourceSrv;
    _this.contextSrv = contextSrv;
    _this.$location = $location;
    _this.$timeout = $timeout;
    _this.$window = $window;
    _this.storageOpenKey = 'application-overview-open';
    _this.storageShowColumnKey = 'application-overview-show-column';
    _this.showScrollButton = false;
    _this.pageReady = false;
    _this.version = Object(_common_helpers__WEBPACK_IMPORTED_MODULE_3__["__getGrafanaVersion"])($window);

    _this.__prepareDS().then(function () {
      _this.getEvents();

      _this.getClusters();

      _this.getClusterComponents();

      _this.getNamespaceMap();
    });

    _this.columnNames = [{
      colName: 'Deployments',
      nsKey: 'deployments'
    }, {
      colName: 'Statefulsets',
      nsKey: 'statefulsets'
    }, {
      colName: 'Daemonsets',
      nsKey: 'daemonsets'
    }, {
      colName: 'Other pods',
      nsKey: 'other'
    }, {
      colName: 'Cron Jobs',
      nsKey: 'cronJobs'
    }, {
      colName: 'Jobs',
      nsKey: 'jobs'
    }];
    _this.hideAllWarningPods = true;
    var openFromStorage = localStorage.getItem(_this.storageOpenKey);
    _this.open = openFromStorage ? JSON.parse(openFromStorage) : {}; //const showColumnFromStorage = localStorage.getItem(this.storageShowColumnKey);

    var showColumnFromStorage = false;
    _this.showColumn = showColumnFromStorage ? JSON.parse(showColumnFromStorage) : {
      cronJobs: {},
      jobs: {},
      other: {}
    };

    if (typeof _this.showColumn.other === 'undefined') {
      _this.showColumn.other = {};
    }

    var elem = document.querySelector('.scroll-canvas');
    elem.addEventListener('scroll', function () {
      _this.showScrollButton = elem.scrollTop > 64;
      $scope.$apply();
    });
    return _this;
  }

  ApplicationsOverview.prototype.getClusters = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var datasources, type, clusters_1;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.datasourceSrv.getAll()];

          case 1:
            datasources = _a.sent();
            type = _common_constants__WEBPACK_IMPORTED_MODULE_4__["TYPE_DATASOURCE"];

            if (Array.isArray(datasources)) {
              this.clusters = datasources.filter(function (item) {
                return item.type === type;
              });
            } else {
              clusters_1 = [];
              Object.keys(datasources).forEach(function (key) {
                if (datasources[key].type === type) {
                  clusters_1.push(datasources[key]);
                }
              });
              this.clusters = clusters_1;
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  ApplicationsOverview.prototype.__showAll = function () {
    this.toggleNamespace(true);
  };

  ApplicationsOverview.prototype.__hideAll = function () {
    this.toggleNamespace(false);
  };

  ApplicationsOverview.prototype.namespaceClick = function (event, namespace) {
    if (event.ctrlKey || event.metaKey) {
      if (namespace.open) {
        event.preventDefault();
      }

      this.toggleNamespace(namespace);
    } else {
      namespace.toggle();
    }
  };

  ApplicationsOverview.prototype.toggleNamespace = function (namespace) {
    _common_store__WEBPACK_IMPORTED_MODULE_1__["default"]["delete"]('namespaceStore');
    var namespaceStore = [];
    this.namespaceMap.map(function (ns) {
      ns.open = namespace === true || namespace === false ? namespace : namespace.name === ns.name;
      namespaceStore.push({
        name: ns.name,
        open: ns.open
      });
    });
    _common_store__WEBPACK_IMPORTED_MODULE_1__["default"].setObject('namespaceStore', namespaceStore);
  };

  ApplicationsOverview.prototype.updatePods = function (newPods) {
    this.refreshNamespaceMap();
  };

  ApplicationsOverview.prototype.toggleAllWarningPods = function () {
    this.hideAllWarningPods = !this.hideAllWarningPods;
  };

  ApplicationsOverview.prototype.namespaceFilterIsDeleted = function (namespaces) {
    return namespaces.filter(function (item) {
      return item.is_deleted === false || typeof item.is_deleted === 'undefined';
    });
  };

  ApplicationsOverview.prototype.namespaceCount = function () {
    return this.namespaceMap ? this.namespaceMap.length : 0;
  };

  ApplicationsOverview.prototype.namespaceActiveCount = function () {
    return this.namespaceMap ? this.namespaceMap.filter(function (namespace) {
      return namespace.open;
    }).length : 0;
  };

  ApplicationsOverview.prototype.toggleTab = function (namespace) {
    if (this.open[namespace] === undefined) {
      this.open[namespace] = false;
    } else {
      this.open[namespace] = !this.open[namespace];
    }

    localStorage.setItem(this.storageOpenKey, JSON.stringify(this.open));
  };

  ApplicationsOverview.prototype.toggleColumn = function (columnName, namespace) {
    if (this.showColumn[columnName][namespace] === undefined) {
      this.showColumn[columnName][namespace] = true;
    } else {
      this.showColumn[columnName][namespace] = !this.showColumn[columnName][namespace];
    } //localStorage.setItem(this.storageShowColumnKey, JSON.stringify(this.showColumn));

  };

  ApplicationsOverview.prototype.showCheck = function (columnName, namespace) {
    return columnName !== 'jobs' && columnName !== 'cronJobs' && columnName !== 'other' || this.showColumn[columnName][namespace] !== undefined && this.showColumn[columnName][namespace] !== false;
  };

  ApplicationsOverview.$inject = ['$scope', '$injector', '$q', 'backendSrv', 'datasourceSrv', 'contextSrv', '$location', '$timeout', '$window'];
  ApplicationsOverview.templateUrl = 'components/applications-overview/applications-overview.html';
  return ApplicationsOverview;
}(_k8s_page__WEBPACK_IMPORTED_MODULE_2__["K8sPage"]);



/***/ }),

/***/ "./components/cluster-alerts/cluster-alerts.ts":
/*!*****************************************************!*\
  !*** ./components/cluster-alerts/cluster-alerts.ts ***!
  \*****************************************************/
/*! exports provided: ClusterAlerts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClusterAlerts", function() { return ClusterAlerts; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _k8s_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../k8s-page */ "./components/k8s-page.ts");
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/helpers */ "./common/helpers.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/constants */ "./common/constants.ts");





var ClusterAlerts =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ClusterAlerts, _super);

  function ClusterAlerts($scope, $injector, $q, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $window) {
    var _this = _super.call(this, $scope, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $q, $window) || this;

    _this.$q = $q;
    _this.backendSrv = backendSrv;
    _this.datasourceSrv = datasourceSrv;
    _this.contextSrv = contextSrv;
    _this.$location = $location;
    _this.$timeout = $timeout;
    _this.$window = $window;
    _this.showScrollButton = false;
    _this.pageReady = false;
    _this.version = Object(_common_helpers__WEBPACK_IMPORTED_MODULE_2__["__getGrafanaVersion"])($window);

    _this.__prepareDS().then(function () {
      var _promises = [];

      _promises.push(_this.getEvents());

      _promises.push(_this.getPods());

      _promises.push(_this.getClusterComponents());

      _promises.push(_this.getClusters());

      _promises.push(_this.getNodeMap(true).then(function () {
        _this.getResourcesMetrics().then(function () {
          _this.nodesMapReady = true;
        });
      }));

      _this.$q.all(_promises).then(function () {
        _this.pageReady = true;
      });
    });

    var elem = document.querySelector('.scroll-canvas');
    elem.addEventListener('scroll', function () {
      _this.showScrollButton = elem.scrollTop > 64;
      $scope.$apply();
    });
    return _this;
  }

  ClusterAlerts.prototype.getAlertsNodesByCPU2 = function (status) {
    if (status === void 0) {
      status = 'cpuStatus';
    }
  };

  ClusterAlerts.prototype.getClusters = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var datasources, type, clusters_1;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.datasourceSrv.getAll()];

          case 1:
            datasources = _a.sent();
            type = _common_constants__WEBPACK_IMPORTED_MODULE_3__["TYPE_DATASOURCE"];

            if (Array.isArray(datasources)) {
              this.clusters = datasources.filter(function (item) {
                return item.type === type;
              });
            } else {
              clusters_1 = [];
              Object.keys(datasources).forEach(function (key) {
                if (datasources[key].type === type) {
                  clusters_1.push(datasources[key]);
                }
              });
              this.clusters = clusters_1;
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  ClusterAlerts.prototype.getAlertsNodesByResources = function () {
    var _this = this;

    return this.nodesMap.filter(this.resourceProblem).map(function (node) {
      if (node.cpuStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"] || node.cpuStatusRequested === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"] || node.memoryStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"] || node.memoryStatusRequested === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"] || node.podsStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"]) {
        node.statusColor = _common_constants__WEBPACK_IMPORTED_MODULE_3__["COLOR_RED"];
        node.statusForSort = _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"];
      } else {
        node.statusColor = _common_constants__WEBPACK_IMPORTED_MODULE_3__["COLOR_YELLOW"];
        node.statusForSort = _common_constants__WEBPACK_IMPORTED_MODULE_3__["WARNING"];
      }

      node.statusMessage = _this.nodeMessages(node).join(';<br/>');
      return node;
    }).sort(function (a, b) {
      return b.statusForSort - a.statusForSort;
    });
  };

  ClusterAlerts.prototype.clusterProblem = function () {
    var warnings = [this.getWarningNodes().length === 0, this.getAlertsNodesByCPU().length === 0, this.getAlertsNodesByMemory().length === 0, this.getAlertsNodesByPods().length === 0, this.getAlertsNodesByCPU('cpuStatusRequested').length === 0, this.getAlertsNodesByMemory('memoryStatusRequested').length === 0, this.getWarningPods().length === 0, this.getAlertsComponents.length === 0];
    return this.nodesError || this.componentsError || this.podsError || warnings.some(function (w) {
      return w !== true;
    });
  };

  ClusterAlerts.prototype.resourceProblem = function (node) {
    return node.cpuStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["WARNING"] || node.cpuStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"] || node.cpuStatusRequested === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"] || node.cpuStatusRequested === _common_constants__WEBPACK_IMPORTED_MODULE_3__["WARNING"] || node.memoryStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"] || node.memoryStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["WARNING"] || node.memoryStatusRequested === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"] || node.memoryStatusRequested === _common_constants__WEBPACK_IMPORTED_MODULE_3__["WARNING"] || node.podsStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["WARNING"] || node.podsStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"];
  };

  ClusterAlerts.prototype.nodeMessages = function (node) {
    var messages = [];

    if (node.cpuStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"] || node.cpuStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["WARNING"]) {
      messages.push("CPU used: " + node.cpuPercentUsed);
    }

    if (node.cpuStatusRequested === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"] || node.cpuStatusRequested === _common_constants__WEBPACK_IMPORTED_MODULE_3__["WARNING"]) {
      messages.push("CPU requested: " + node.cpuPercentRequested);
    }

    if (node.memoryStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"] || node.memoryStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["WARNING"]) {
      messages.push("Memory used: " + node.memoryPercentUsed);
    }

    if (node.memoryStatusRequested === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"] || node.memoryStatusRequested === _common_constants__WEBPACK_IMPORTED_MODULE_3__["WARNING"]) {
      messages.push("Memory requested: " + node.memoryPercentUsed);
    }

    if (node.podsStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["ERROR"] || node.podsStatus === _common_constants__WEBPACK_IMPORTED_MODULE_3__["WARNING"]) {
      messages.push("Pods count used: " + node.podsPercentUsed);
    }

    return messages;
  };

  ClusterAlerts.templateUrl = 'components/cluster-alerts/cluster-alerts.html';
  ClusterAlerts.$inject = ['$scope', '$injector', '$q', 'backendSrv', 'datasourceSrv', 'contextSrv', '$location', '$timeout', '$window'];
  return ClusterAlerts;
}(_k8s_page__WEBPACK_IMPORTED_MODULE_1__["K8sPage"]);



/***/ }),

/***/ "./components/cluster-config/cluster-config.ts":
/*!*****************************************************!*\
  !*** ./components/cluster-config/cluster-config.ts ***!
  \*****************************************************/
/*! exports provided: ClusterConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClusterConfig", function() { return ClusterConfig; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/core/app_events */ "grafana/app/core/app_events");
/* harmony import */ var grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/constants */ "./common/constants.ts");
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/helpers */ "./common/helpers.ts");





var ClusterConfig =
/** @class */
function () {
  function ClusterConfig($scope, $injector, backendSrv, datasourceSrv, alertSrv, $q, $location, $window) {
    var _this = this;

    this.backendSrv = backendSrv;
    this.datasourceSrv = datasourceSrv;
    this.alertSrv = alertSrv;
    this.$q = $q;
    this.$location = $location;
    this.$window = $window;
    this.retry = 3;
    this.pageReady = false;
    this.$scope = $scope;
    this.busy = false;
    this.version = Object(_common_helpers__WEBPACK_IMPORTED_MODULE_3__["__getGrafanaVersion"])($window);
    this.getCluster()["finally"](function () {
      _this.pageReady = true;

      _this.$scope.$apply();
    });
  }

  ClusterConfig.prototype.getCluster = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!('clusterId' in this.$location.search())) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this.getDatasource(this.$location.search().clusterId)];

          case 1:
            _a.sent();

            document.title = 'DevOpsProdigy KubeGraf | Edit cluster';
            return [3
            /*break*/
            , 3];

          case 2:
            this.cluster = {
              type: _common_constants__WEBPACK_IMPORTED_MODULE_2__["TYPE_DATASOURCE"],
              access: 'proxy',
              jsonData: {
                refresh_pods_rate: '60',
                access_via_token: false,
                prom_name: ''
              }
            };
            document.title = 'DevOpsProdigy KubeGraf | New cluster';
            _a.label = 3;

          case 3:
            return [4
            /*yield*/
            , this.getPrometheusList()];

          case 4:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  ClusterConfig.prototype.getPrometheusList = function () {
    var _this = this;

    return this.backendSrv.get('/api/datasources').then(function (datasources) {
      _this.prometheusList = datasources.filter(function (item) {
        return item.type === _common_constants__WEBPACK_IMPORTED_MODULE_2__["TYPE_PROMETHEUS"];
      });

      var defProm = _this.prometheusList.filter(function (item) {
        return item.isDefault;
      });

      if (defProm.length > 0 && _this.cluster.jsonData.prom_name === '') {
        _this.cluster.jsonData.prom_name = defProm[0].name;
      }
    });
  };

  ClusterConfig.prototype.saveCluster = function () {
    var _this = this;

    if (this.busy) {
      return;
    }

    this.busy = true;
    this.cluster.jsonData.cluster_url = this.cluster.url;
    return this.saveDatasource().then(function (res) {
      if (res && res.datasource) {
        _this.cluster = res.datasource;

        _this.testCluster();
      }
    })["finally"](function () {
      _this.busy = false;
    });
  };

  ClusterConfig.prototype.check = function () {
    return !this.pageReady ? false : this.$scope.clusterForm.$valid;
  };

  ClusterConfig.prototype.saveDatasource = function () {
    return this.cluster.id ? this.updateDatasource() : this.createDatasource();
  };

  ClusterConfig.prototype.createDatasource = function () {
    var _this = this;

    return this.backendSrv.post('/api/datasources', this.cluster).then(function (res) {
      return _this.$q.resolve(res);
    }, function (err) {
      return _this.$q.reject(err);
    });
  };

  ClusterConfig.prototype.updateDatasource = function () {
    var _this = this;

    return this.backendSrv.put('/api/datasources/' + this.cluster.id, this.cluster).then(function (res) {
      return _this.$q.resolve(res);
    }, function (err) {
      return _this.$q.reject(err);
    });
  };

  ClusterConfig.prototype.getDatasource = function (id) {
    var _this = this;

    return this.backendSrv.get('/api/datasources/' + id).then(function (result) {
      if (!result.jsonData.prom_name) {
        result.jsonData.prom_name = '';
      }

      if (!result.jsonData.refresh_pods_rate) {
        result.jsonData.refresh_pods_rate = '60';
      }

      _this.cluster = result;
    });
  };

  ClusterConfig.prototype.testCluster = function () {
    var url = '/api/v1/namespaces';

    var _url = '/api/datasources/proxy/' + this.cluster.id;

    if (this.cluster.jsonData.access_via_token) {
      _url += '/__proxy';
    }

    _url += url;
    this.backendSrv.datasourceRequest({
      url: _url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response && response.status === 200) {
        setTimeout(function () {
          window.history.back();
        }, 800);
      } else {
        grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1___default.a.emit('alert-error', ['Unhandled error']);
      }
    }, function (error) {
      if (error && error.status && error.statusText) {
        grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1___default.a.emit('alert-error', [error.status + ' ' + error.statusText]);
      } else {
        grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1___default.a.emit('alert-error', ['Unhandled error']);
      }
    });
  };

  ClusterConfig.templateUrl = 'components/cluster-config/cluster-config.html';
  ClusterConfig.$inject = ['$scope', '$injector', 'backendSrv', 'datasourceSrv', 'alertSrv', '$q', '$location', '$window'];
  return ClusterConfig;
}();



/***/ }),

/***/ "./components/cluster-overview/cluster-overview.ts":
/*!*********************************************************!*\
  !*** ./components/cluster-overview/cluster-overview.ts ***!
  \*********************************************************/
/*! exports provided: ClusterOverview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClusterOverview", function() { return ClusterOverview; });
var ClusterOverview =
/** @class */
function () {
  function ClusterOverview($location) {
    var cluster = $location.search().clusterName;

    if (cluster) {
      window.location.href = 'plugins/devopsprodigy-kubegraf-app/page/applications-overview?clusterName=' + cluster;
    }
  }

  ClusterOverview.$inject = ['$location'];
  return ClusterOverview;
}();



/***/ }),

/***/ "./components/clusters-list/clusters-list.ts":
/*!***************************************************!*\
  !*** ./components/clusters-list/clusters-list.ts ***!
  \***************************************************/
/*! exports provided: ClustersList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClustersList", function() { return ClustersList; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/core/app_events */ "grafana/app/core/app_events");
/* harmony import */ var grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/helpers */ "./common/helpers.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/constants */ "./common/constants.ts");





var ClustersList =
/** @class */
function () {
  function ClustersList($scope, $injector, backendSrv, datasourceSrv, contextSrv, utilSrv, $window) {
    var _this = this;

    this.backendSrv = backendSrv;
    this.datasourceSrv = datasourceSrv;
    this.contextSrv = contextSrv;
    this.utilSrv = utilSrv;
    this.$window = $window;
    this.showScrollButton = false;
    this.isReady = false;
    this.$scope = $scope;
    this.version = Object(_common_helpers__WEBPACK_IMPORTED_MODULE_2__["__getGrafanaVersion"])($window);
    document.title = 'DevOpsProdigy KubeGraf';

    try {
      this.getClusters().then(function () {
        _this.isReady = true;

        _this.$scope.$apply();
      });
    } catch (e) {
      console.error(e);
    }

    try {
      this.isAdmin = this.contextSrv.hasRole('Admin');
    } catch (e) {
      console.error(e);
      this.isAdmin = false;
    }

    var elem = document.querySelector('.scroll-canvas');
    elem.addEventListener('scroll', function () {
      _this.showScrollButton = elem.scrollTop > 64;
      $scope.$apply();
    });
  }

  ClustersList.prototype.getClusters = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var datasources, type, clusters_1;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.datasourceSrv.getAll()];

          case 1:
            datasources = _a.sent();
            type = _common_constants__WEBPACK_IMPORTED_MODULE_3__["TYPE_DATASOURCE"];

            if (Array.isArray(datasources)) {
              this.clusters = datasources.filter(function (item) {
                return item.type === type;
              });
            } else {
              clusters_1 = [];
              Object.keys(datasources).forEach(function (key) {
                if (datasources[key].type === type) {
                  clusters_1.push(datasources[key]);
                }
              });
              this.clusters = clusters_1;
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  ClustersList.prototype.deleteCluster = function (cluster) {
    var _this = this;

    grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1___default.a.emit('confirm-modal', {
      title: 'Delete',
      text: 'Are you sure you want to delete this cluster?',
      yesText: 'Delete',
      icon: 'fa-trash',
      onConfirm: function onConfirm() {
        _this.confirmDelete(cluster.id);
      }
    });
  };

  ClustersList.prototype.confirmDelete = function (id) {
    var _this = this;

    this.backendSrv["delete"]('/api/datasources/' + id).then(function () {
      _this.clusters = _this.clusters.filter(function (item) {
        return item.id !== id;
      });

      _this.$scope.$apply();
    });
  };

  ClustersList.$inject = ['$scope', '$injector', 'backendSrv', 'datasourceSrv', 'contextSrv', 'utilSrv', '$window'];
  ClustersList.templateUrl = 'components/clusters-list/clusters-list.html';
  return ClustersList;
}();



/***/ }),

/***/ "./components/k8s-page.ts":
/*!********************************!*\
  !*** ./components/k8s-page.ts ***!
  \********************************/
/*! exports provided: K8sPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "K8sPage", function() { return K8sPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/core/app_events */ "grafana/app/core/app_events");
/* harmony import */ var grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_types_pod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/types/pod */ "./common/types/pod.ts");
/* harmony import */ var _common_proxies_prometheusProxy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/proxies/prometheusProxy */ "./common/proxies/prometheusProxy.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/constants */ "./common/constants.ts");
/* harmony import */ var _common_types_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../common/types/component */ "./common/types/component.ts");
/* harmony import */ var _common_types_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/types/service */ "./common/types/service.ts");
/* harmony import */ var _common_types_job__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common/types/job */ "./common/types/job.ts");
/* harmony import */ var _common_types_cronjob__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common/types/cronjob */ "./common/types/cronjob.ts");
/* harmony import */ var _common_types_namespace__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common/types/namespace */ "./common/types/namespace.ts");
/* harmony import */ var _common_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../common/store */ "./common/store.ts");
/* harmony import */ var _common_types_deployment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common/types/deployment */ "./common/types/deployment.ts");
/* harmony import */ var _common_types_statefulset__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../common/types/statefulset */ "./common/types/statefulset.ts");
/* harmony import */ var _common_types_daemonset__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../common/types/daemonset */ "./common/types/daemonset.ts");
/* harmony import */ var _common_types_node__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../common/types/node */ "./common/types/node.ts");
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../common/helpers */ "./common/helpers.ts");
















var REFRESH_RATE_DEFAULT = 60000;
var ERROR_MSG_MEMORY_REQUESTS_LIMITS = 'Memory limits and requests not configured';
var ERROR_MSG_CPU_REQUESTS_LIMITS = 'CPU limits and requests not configured';

var K8sPage =
/** @class */
function () {
  function K8sPage($scope, backendSrv, datasourceSrv, contextSrv, $location, timeout, $q, $window) {
    this.nodesMapReady = false; //common store

    this.storePods = [];
    this.storeEvents = null;
    this.storeComponents = [];
    this.storeServices = [];
    this.storeJobs = [];
    this.storeCronJobs = [];
    this.storeDeployments = [];
    this.storeStatefulSets = [];
    this.storeDaemonSets = [];
    this.namespaceMap = [];
    this.nodesMap = [];
    this.nodesError = false;
    this.podsError = false;
    this.componentsError = false;
    this.orgId = 1;
    this.showMenu = false;
    this.$q = $q;
    this.$scope = $scope;
    this.pageReady = false;
    this.location = $location;
    this.backendSrv = backendSrv;
    this.contextSrv = contextSrv;
    this.datasourceSrv = datasourceSrv;
    this.timeout = timeout;
    this.orgId = $window.grafanaBootData && $window.grafanaBootData.user ? $window.grafanaBootData.user.orgId : 1;

    try {
      this.isAdmin = this.contextSrv.hasRole('Admin');
    } catch (e) {
      console.error(e);
      this.isAdmin = false;
    }

    if (!('clusterName' in $location.search())) {
      grafana_app_core_app_events__WEBPACK_IMPORTED_MODULE_1___default.a.emit('alert-error', ['Cluster not specified']);
      return;
    }

    document.title = 'DevOpsProdigy KubeGraf';
    var elem = document.querySelector('.scroll-canvas');

    this.scrollToTop = function () {
      elem.scrollTo({
        top: 0,
        left: elem.scrollLeft,
        behavior: 'smooth'
      });
    };
  }

  K8sPage.prototype.updatePods = function (pods) {};

  K8sPage.prototype.__getServersInfo = function (nodes) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var info, instance, result, _loop_1, nodes_1, nodes_1_1, node;

      var e_1, _a;

      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
        switch (_b.label) {
          case 0:
            info = [];
            instance = nodes.reduce(function (accumulator, node) {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(accumulator, [node.name + "|" + node.hostIp + ":.+"]);
            }, []).join('|');
            return [4
            /*yield*/
            , Promise.all([this.prometheusDS.query({
              expr: "count(count(node_cpu_seconds_total{instance=~\"" + instance + "\"}) by (cpu, instance)) by (instance)",
              legend: 'instance'
            }, false), this.prometheusDS.query({
              expr: "sum(node_memory_MemTotal_bytes{instance=~\"" + instance + "\"}) by (instance)",
              legend: 'instance'
            }, false), this.prometheusDS.query({
              expr: "sum(node_memory_SwapTotal_bytes{instance=~\"" + instance + "\"}) by (instance)",
              legend: 'instance'
            }, false), this.prometheusDS.query({
              expr: "sum(node_filesystem_size_bytes{instance=~\"" + instance + "\",mountpoint=\"/\",fstype!=\"rootfs\"}) by (instance)",
              legend: 'instance'
            }, false), this.prometheusDS.query({
              expr: "sum(node_load1{instance=~\"" + instance + "\"}) by (instance)",
              legend: 'instance'
            }, false), this.prometheusDS.query({
              expr: "sum(node_time_seconds{instance=~\"" + instance + "\"} - node_boot_time_seconds{instance=~\"" + instance + "\"}) by (instance)",
              legend: 'instance'
            }, false)])];

          case 1:
            result = _b.sent();

            _loop_1 = function _loop_1(node) {
              var datapoints = result.map(function (item) {
                return item.find(function (element) {
                  return element.target === node.name || element.target.indexOf(node.hostIp + ":") === 0;
                });
              });
              info[node.name] = {
                cpuCores: datapoints[0] && datapoints[0].datapoint,
                ramTotal: datapoints[1] && Object(_common_helpers__WEBPACK_IMPORTED_MODULE_15__["__convertToGB"])(datapoints[1].datapoint),
                swapTotal: datapoints[2] && Object(_common_helpers__WEBPACK_IMPORTED_MODULE_15__["__convertToGB"])(datapoints[2].datapoint),
                rootFSTotal: datapoints[3] && Object(_common_helpers__WEBPACK_IMPORTED_MODULE_15__["__convertToGB"])(datapoints[3].datapoint),
                sysLoad: datapoints[4] && datapoints[4].datapoint,
                uptime: datapoints[5] && Object(_common_helpers__WEBPACK_IMPORTED_MODULE_15__["__convertToHours"])(datapoints[5].datapoint * 1000)
              };
            };

            try {
              for (nodes_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                node = nodes_1_1.value;

                _loop_1(node);
              }
            } catch (e_1_1) {
              e_1 = {
                error: e_1_1
              };
            } finally {
              try {
                if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1["return"])) _a.call(nodes_1);
              } finally {
                if (e_1) throw e_1.error;
              }
            }

            return [2
            /*return*/
            , info];
        }
      });
    });
  };

  K8sPage.prototype.getNodeDashboardLink = function (node) {
    var dbUrl = 'dashboard/db/devopsprodigy-kubegraf-nodes-dashboard?orgId=' + this.orgId;
    dbUrl += '&' + 'var-cluster=' + this.cluster.name;
    dbUrl += '&' + 'var-node=' + node.name;
    return dbUrl;
  };

  K8sPage.prototype.getPodDashboardLink = function (pod) {
    var dbUrl = 'dashboard/db/devopsprodigy-kubegraf-pods-dashboard?orgId=' + this.orgId;
    dbUrl += '&' + 'var-cluster=' + this.cluster.name;
    dbUrl += '&' + 'var-namespace=' + pod.data.metadata.namespace;
    dbUrl += '&' + 'var-pod=' + pod.name;
    return dbUrl;
  };

  K8sPage.prototype.getEntityDashboardLink = function (entity, name) {
    var entityName = name.substring(0, name.length - 1);
    var dbUrl = 'dashboard/db/devopsprodigy-kubegraf-' + name + '-dashboard?orgId=' + this.orgId;
    dbUrl += '&' + 'var-cluster=' + this.cluster.name;
    dbUrl += '&' + 'var-namespace=' + entity.data.metadata.namespace;
    dbUrl += '&' + 'var-' + entityName + '=' + entity.name;
    return dbUrl;
  };

  K8sPage.prototype.getNodeMap = function (withoutPods) {
    var _this = this;

    if (withoutPods === void 0) {
      withoutPods = false;
    }

    var _promises = [];

    _promises.push(this.getNodes());

    if (!withoutPods) {
      _promises.push(this.getPods(true));
    }

    return this.$q.all(_promises).then(function () {
      if (!withoutPods) {
        _this.insertPodsToNodesMap(_this.storePods);

        _this.getPodsMetrics();
      }

      _this.timeout(function () {
        _this.refreshNodes();
      }, _this.refreshRate);
    });
  };

  K8sPage.prototype.getResourcesMetrics = function () {
    var _this = this;

    var _promises = [];

    _promises.push(this.__getCpuMetricsRequested());

    _promises.push(this.__getMemoryMetricsRequested());

    _promises.push(this.__getPodsCountMetrics());

    _promises.push(this.__getCpuMetricsUsed());

    _promises.push(this.__getMemoryMetricsUsed());

    _promises.push(this.__getCpuLimitMetrics());

    _promises.push(this.__getMemoryLimitMetrics());

    return this.$q.all(_promises).then(function (results) {
      _this.nodesMap.forEach(function (node) {
        node.parseMetrics(results[0], results[1], results[2], results[3], results[4], results[5], results[6]);
      });

      _this.timeout(function () {
        _this.getResourcesMetrics();
      }, _this.refreshRate);
    });
  };

  K8sPage.prototype.__getCpuMetricsUsed = function () {
    var promQuery = {
      expr: 'sum(rate(container_cpu_usage_seconds_total{id="/"}[2m])) by (instance)',
      legend: 'instance'
    };
    return this.prometheusDS.query(promQuery, false).then(function (res) {
      return res;
    });
  };

  K8sPage.prototype.__getCpuMetricsRequested = function () {
    var promQuery = {
      expr: 'sum(sum(kube_pod_container_resource_requests{resource="cpu",unit="core"}) by (namespace, pod, node) * on (pod, namespace) group_left()  (sum(kube_pod_status_phase{phase="Running"}) by (pod, namespace) == 1)) by (node)',
      legend: 'node'
    };
    return this.prometheusDS.query(promQuery, false).then(function (res) {
      return res;
    });
  };

  K8sPage.prototype.__getCpuLimitMetrics = function () {
    var promQuery = {
      expr: 'sum(sum(kube_pod_container_resource_limits{resource="cpu", unit="core"}) by (namespace, pod, node) * on (pod, namespace) group_left()  (sum(kube_pod_status_phase{phase="Running"}) by (pod, namespace) == 1)) by (node)',
      legend: 'node'
    };
    return this.prometheusDS.query(promQuery, false).then(function (res) {
      return res;
    });
  };

  K8sPage.prototype.__getMemoryMetricsRequested = function () {
    var promQuery = {
      expr: 'sum(sum(kube_pod_container_resource_requests{resource="memory", unit="byte"}) by (namespace, pod, node) * on (pod, namespace) group_left() (sum(kube_pod_status_phase{phase="Running"}) by (pod, namespace) == 1)) by (node)',
      legend: 'node'
    };
    return this.prometheusDS.query(promQuery, false).then(function (res) {
      return res;
    });
  };

  K8sPage.prototype.__getMemoryLimitMetrics = function () {
    var promQuery = {
      expr: 'sum(sum(kube_pod_container_resource_limits{resource="memory", unit="byte"}) by (namespace, pod, node) * on (pod, namespace) group_left()  (sum(kube_pod_status_phase{phase="Running"}) by (pod, namespace) == 1)) by (node)',
      legend: 'node'
    };
    return this.prometheusDS.query(promQuery, false).then(function (res) {
      return res;
    });
  };

  K8sPage.prototype.__getMemoryMetricsUsed = function () {
    var promQuery = {
      expr: 'sum(node_memory_MemTotal_bytes) by (instance) - sum(node_memory_MemFree_bytes) by (instance) - sum(node_memory_Buffers_bytes) by (instance) - sum(node_memory_Cached_bytes) by (instance) ',
      legend: 'instance'
    };
    return this.prometheusDS.query(promQuery, false).then(function (res) {
      return res;
    });
  };

  K8sPage.prototype.__getPodsCountMetrics = function () {
    var promQuery = {
      expr: 'sum(kubelet_running_pod_count) by (instance)',
      legend: 'instance'
    };
    return this.prometheusDS.query(promQuery, false).then(function (res) {
      return res;
    });
  };

  K8sPage.prototype.getNodes = function () {
    var _this = this;

    return this.cluster.getNodes().then(function (nodes) {
      var nodeStore = [];
      var getStore = _common_store__WEBPACK_IMPORTED_MODULE_10__["default"].getObject('nodeStore');

      if (getStore) {
        nodeStore = getStore;
      }

      if (nodes instanceof Array) {
        _this.nodesError = false;
        nodes.forEach(function (node) {
          var nd = new _common_types_node__WEBPACK_IMPORTED_MODULE_14__["Node"](node);

          _this.nodesMap.push(nd);

          var index = nodeStore.findIndex(function (item) {
            return item.name === nd.name;
          });

          if (index > -1) {
            nd.open = nodeStore[index].open;
          } else {
            nodeStore.push({
              name: nd.name,
              open: nd.open
            });
          }
        });
        _common_store__WEBPACK_IMPORTED_MODULE_10__["default"].setObject('nodeStore', nodeStore);
      } else if (nodes instanceof Error) {
        _this.nodesError = nodes;
      }
    });
  };

  K8sPage.prototype.getPodsMetrics = function () {
    var _this = this;

    var _promises = [];

    _promises.push(this.__getPodsUsedCpu());

    _promises.push(this.__getPodsUsedMemory());

    _promises.push(this.__getPodsRequestedCpu());

    _promises.push(this.__getPodsRequestedMemory());

    _promises.push(this.__getPodsLimitCpu());

    _promises.push(this.__getPodsLimitMemory());

    this.$q.all(_promises).then(function (results) {
      _this.nodesMap.forEach(function (node) {
        node.namespaces.map(function (namespace) {
          namespace.pods.map(function (pod) {
            var cpu = results[0].find(function (item) {
              return item.target === pod.name;
            });
            var mem = results[1].find(function (item) {
              return item.target === pod.name;
            });
            var cpuReq = results[2].find(function (item) {
              return item.target === pod.name;
            });
            var memReq = results[3].find(function (item) {
              return item.target === pod.name;
            });
            var cpuLimit = results[4].find(function (item) {
              return item.target === pod.name;
            });
            var memLimit = results[5].find(function (item) {
              return item.target === pod.name;
            });

            if (cpu !== undefined) {
              pod.sourceMetrics.cpuUsed = cpu.datapoint;
              pod.metrics.cpuUsed = Object(_common_helpers__WEBPACK_IMPORTED_MODULE_15__["__convertToMicro"])(cpu.datapoint.toFixed(3));
            }

            if (mem !== undefined) {
              pod.sourceMetrics.memoryUsed = mem.datapoint;
              pod.metrics.memoryUsed = Object(_common_helpers__WEBPACK_IMPORTED_MODULE_15__["__convertToGB"])(mem.datapoint);
            }

            if (cpuReq !== undefined) {
              pod.sourceMetrics.cpuRequested = cpuReq.datapoint;
              pod.metrics.cpuRequested = Object(_common_helpers__WEBPACK_IMPORTED_MODULE_15__["__convertToMicro"])(Object(_common_helpers__WEBPACK_IMPORTED_MODULE_15__["__roundCpu"])(cpuReq.datapoint));
            }

            if (memReq !== undefined) {
              pod.sourceMetrics.memoryRequested = memReq.datapoint;
              pod.metrics.memoryRequested = Object(_common_helpers__WEBPACK_IMPORTED_MODULE_15__["__convertToGB"])(memReq.datapoint);
            }

            if (cpuLimit !== undefined) {
              pod.sourceMetrics.cpuLimit = cpuLimit.datapoint;
              pod.metrics.cpuLimit = Object(_common_helpers__WEBPACK_IMPORTED_MODULE_15__["__convertToMicro"])(Object(_common_helpers__WEBPACK_IMPORTED_MODULE_15__["__roundCpu"])(cpuLimit.datapoint));
            }

            if (memLimit !== undefined) {
              pod.sourceMetrics.memoryLimit = memLimit.datapoint;
              pod.metrics.memoryLimit = Object(_common_helpers__WEBPACK_IMPORTED_MODULE_15__["__convertToGB"])(memLimit.datapoint);
            }
          });
        });
      });

      _this.timeout(function () {
        _this.getPodsMetrics();
      }, _this.refreshRate);
    });
  };

  K8sPage.prototype.__getPodsUsedCpu = function () {
    var podsUsedCpu = {
      //expr: 'sum(rate(container_cpu_usage_seconds_total{pod_name!="", container_name!="", container_name!="POD"}[2m])) by (pod_name)',
      expr: 'sum(rate(container_cpu_usage_seconds_total{pod!="", container!="", container!="POD"}[2m])) by (pod) or ' + 'sum(label_replace(rate(container_cpu_usage_seconds_total{pod_name!="", container_name!="", container_name!="POD"}[2m]), "pod", "$1", "pod_name", "(.*)")) by (pod)',
      legend: 'pod'
    };
    return this.prometheusDS.query(podsUsedCpu, false).then(function (res) {
      return res;
    });
  };

  K8sPage.prototype.__getPodsUsedMemory = function () {
    var podsUsedMemory = {
      //expr: 'sum(container_memory_usage_bytes{container_name!="", container_name!="POD"}) by (pod_name)'
      expr: 'sum(container_memory_working_set_bytes{container!="", container!="POD"}) by (pod) or ' + 'sum(label_replace(container_memory_working_set_bytes{container_name!="", container_name!="POD"}, "pod", "$1", "pod_name", "(.*)")) by (pod)',
      legend: 'pod'
    };
    return this.prometheusDS.query(podsUsedMemory, false).then(function (res) {
      return res;
    });
  };

  K8sPage.prototype.__getPodsRequestedCpu = function () {
    var podsUsedCpu = {
      expr: 'sum(kube_pod_container_resource_requests{resource="cpu",unit="core"}) by (pod)',
      legend: 'pod'
    };
    return this.prometheusDS.query(podsUsedCpu, false).then(function (res) {
      return res;
    });
  };

  K8sPage.prototype.__getPodsLimitCpu = function () {
    var podsLimitCpu = {
      expr: 'sum(kube_pod_container_resource_limits{resource="cpu", unit="core"}) by (pod)',
      legend: 'pod'
    };
    return this.prometheusDS.query(podsLimitCpu, false).then(function (res) {
      return res;
    });
  };

  K8sPage.prototype.__getPodsRequestedMemory = function () {
    var podsUsedMemory = {
      expr: 'sum(kube_pod_container_resource_requests{resource="memory", unit="byte"}) by (pod)',
      legend: 'pod'
    };
    return this.prometheusDS.query(podsUsedMemory, false).then(function (res) {
      return res;
    });
  };

  K8sPage.prototype.__getPodsLimitMemory = function () {
    var podsLimitMemory = {
      expr: 'sum(kube_pod_container_resource_limits{resource="memory", unit="byte"}) by (pod)',
      legend: 'pod'
    };
    return this.prometheusDS.query(podsLimitMemory, false).then(function (res) {
      return res;
    });
  };

  K8sPage.prototype.insertPodsToNodesMap = function (pods) {
    this.nodesMap.forEach(function (node) {
      var filterPods = pods.filter(function (pod) {
        return pod.data.status.hostIP === node.hostIp;
      });
      filterPods.forEach(function (pod) {
        var _nsIsset = node.namespaces.filter(function (item) {
          return item.name === pod.data.metadata.namespace;
        });

        if (_nsIsset.length === 0) {
          var _ns_1 = {
            name: pod.data.metadata.namespace,
            pods: [],
            limit: _common_constants__WEBPACK_IMPORTED_MODULE_4__["PODS_LIMIT"],
            sort: 'name'
          };
          node.namespaces.push(_ns_1);
        }

        var _ns = node.namespaces.filter(function (item) {
          return item.name === pod.data.metadata.namespace;
        })[0];

        _ns.pods.push(pod);
      });
    });
  };

  K8sPage.prototype.refreshNodes = function () {
    var _this = this;

    this.cluster.getNodes().then(function (nodes) {
      return _this.nodesMap.forEach(function (issetNode) {
        var equalNode = nodes.filter(function (item) {
          return item.metadata.uid === issetNode.data.metadata.uid;
        });

        if (equalNode.length > 0) {
          equalNode = equalNode[0];
          issetNode.update(equalNode);
        }
      });
    }).then(function () {
      _this.timeout(function () {
        _this.refreshNodes();
      }, _this.refreshRate);
    });
  };

  K8sPage.prototype.getNamespaceMap = function () {
    var _this = this;

    this.cluster.getNamespaces().then(function (namespaces) {
      var namespaceStore = [];
      var getStore = _common_store__WEBPACK_IMPORTED_MODULE_10__["default"].getObject('namespaceStore');

      if (getStore) {
        namespaceStore = getStore;
      }

      namespaces.forEach(function (namespace) {
        var ns = new _common_types_namespace__WEBPACK_IMPORTED_MODULE_9__["Namespace"](namespace);

        _this.namespaceMap.push(ns);

        var index = namespaceStore.findIndex(function (item) {
          return item.name === ns.name;
        });

        if (index > -1) {
          ns.open = namespaceStore[index].open;
        } else {
          namespaceStore.push({
            name: ns.name,
            open: ns.open
          });
        }
      });
      _common_store__WEBPACK_IMPORTED_MODULE_10__["default"].setObject('namespaceStore', namespaceStore);
      var _promises = [];

      _promises.push(_this.attachDeployments());

      _promises.push(_this.attachStatefulsets());

      _promises.push(_this.attachDaemonsets());

      _promises.push(_this.getClusterCronJobs());

      _promises.push(_this.getClusterJobs());

      _this.$q.all(_promises).then(function () {
        _this.attachJobs();

        _this.attachCronJobs();

        var _psPromises = [];

        _psPromises.push(_this.getAllServices());

        _psPromises.push(_this.getPods());

        _this.$q.all(_psPromises).then(function () {
          _this.attachPodsToMap();

          _this.namespaceMapReady = true;
        });
      });
    });
  };

  K8sPage.prototype.refreshNamespaceMap = function () {
    var _this = this;

    this.cluster.getNamespaces().then(function (namespaces) {
      var namespaceStore = [];
      namespaces.forEach(function (namespace) {
        var ns = new _common_types_namespace__WEBPACK_IMPORTED_MODULE_9__["Namespace"](namespace);

        if (_this.namespaceMap.every(function (item) {
          return item.name !== ns.name;
        })) {
          _this.namespaceMap.push(ns);

          var storeIndex = namespaceStore.findIndex(function (item) {
            return item.name === ns.name;
          });

          if (storeIndex > -1) {
            ns.open = namespaceStore[storeIndex].open;
          } else {
            namespaceStore.push({
              name: ns.name,
              open: ns.open
            });
          }
        }
      });

      _this.namespaceMap.forEach(function (ns, index) {
        if (namespaces.every(function (item) {
          return item.metadata.name !== ns.name;
        })) {
          _this.namespaceMap.splice(index, 1);

          var storeIndex = namespaceStore.findIndex(function (item) {
            return item.name === ns.name;
          });

          if (storeIndex > -1) {
            namespaceStore.splice(storeIndex, 1);
          }
        }
      });

      _common_store__WEBPACK_IMPORTED_MODULE_10__["default"].setObject('namespaceStore', namespaceStore);
      var _promises = [];

      _promises.push(_this.refreshDeployments());

      _promises.push(_this.refreshStatefulsets());

      _promises.push(_this.refreshDaemonsets());

      _promises.push(_this.getClusterCronJobs());

      _promises.push(_this.refreshJobs());

      _this.$q.all(_promises).then(function () {
        var _psPromises = [];

        _psPromises.push(_this.getAllServices());

        _this.$q.all(_psPromises).then(function () {
          _this.attachPodsToMap();

          _this.namespaceMapReady = true;
        });
      });
    });
  };

  K8sPage.prototype.attachDeployments = function () {
    var _this = this;

    return this.cluster.getDeployments().then(function (deployments) {
      deployments.forEach(function (item) {
        var deploy = new _common_types_deployment__WEBPACK_IMPORTED_MODULE_11__["Deployment"](item);

        var _ns = _this.__getNamespace(item.metadata.namespace);

        _this.storeDeployments.push(deploy);

        _ns.deployments.push(deploy);
      });
    });
  };

  K8sPage.prototype.refreshDeployments = function () {
    var _this = this;

    this.cluster.getDeployments().then(function (newDeployments) {
      _this.storeDeployments.filter(function (deployment) {
        return !deployment.is_deleted;
      }).forEach(function (issetDeployment) {
        var equalDeployment = newDeployments.filter(function (item) {
          return item.metadata.uid === issetDeployment.data.metadata.uid;
        });

        if (equalDeployment.length > 0) {
          equalDeployment = equalDeployment[0];
        } else {
          equalDeployment = false;
        }

        if (equalDeployment !== false) {
          issetDeployment.update(equalDeployment);
          newDeployments.splice(newDeployments.indexOf(equalDeployment), 1);
        } else {
          issetDeployment.destroy();
        }
      });

      newDeployments = newDeployments.map(function (newDeployment) {
        return new _common_types_deployment__WEBPACK_IMPORTED_MODULE_11__["Deployment"](newDeployment);
      });
      _this.storeDeployments = _this.storeDeployments.concat(newDeployments);
      newDeployments.forEach(function (newDeployment) {
        var _ns = _this.__getNamespace(newDeployment.data.metadata.namespace);

        _ns.deployments.push(newDeployment);
      });
    });
  };

  K8sPage.prototype.attachStatefulsets = function () {
    var _this = this;

    return this.cluster.getStatefulsets().then(function (statefulsets) {
      statefulsets.forEach(function (item) {
        var _ns = _this.__getNamespace(item.metadata.namespace);

        var ss = new _common_types_statefulset__WEBPACK_IMPORTED_MODULE_12__["Statefulset"](item);

        _ns.statefulsets.push(ss);

        _this.storeStatefulSets.push(ss);
      });
    });
  };

  K8sPage.prototype.refreshStatefulsets = function () {
    var _this = this;

    this.cluster.getStatefulsets().then(function (Statefulsets) {
      _this.storeStatefulSets.filter(function (statefulset) {
        return !statefulset.is_deleted;
      }).forEach(function (issetStatefulset) {
        var equalStatefulset = Statefulsets.filter(function (item) {
          return item.metadata.uid === issetStatefulset.data.metadata.uid;
        });

        if (equalStatefulset.length > 0) {
          equalStatefulset = equalStatefulset[0];
        } else {
          equalStatefulset = false;
        }

        if (equalStatefulset !== false) {
          issetStatefulset.update(equalStatefulset);
          Statefulsets.splice(Statefulsets.indexOf(equalStatefulset), 1);
        } else {
          issetStatefulset.destroy();
        }
      });

      Statefulsets = Statefulsets.map(function (newStatefulset) {
        return new _common_types_statefulset__WEBPACK_IMPORTED_MODULE_12__["Statefulset"](newStatefulset);
      });
      _this.storeStatefulSets = _this.storeStatefulSets.concat(Statefulsets);
      Statefulsets.forEach(function (newStatefulset) {
        var _ns = _this.__getNamespace(newStatefulset.data.metadata.namespace);

        _ns.statefulsets.push(newStatefulset);
      });
    });
  };

  K8sPage.prototype.attachDaemonsets = function () {
    var _this = this;

    return this.cluster.getDaemonsets().then(function (daemonsets) {
      daemonsets.forEach(function (item) {
        var _ns = _this.__getNamespace(item.metadata.namespace);

        var ds = new _common_types_daemonset__WEBPACK_IMPORTED_MODULE_13__["Daemonset"](item);

        _ns.daemonsets.push(ds);

        _this.storeDaemonSets.push(ds);
      });
    });
  };

  K8sPage.prototype.refreshDaemonsets = function () {
    var _this = this;

    this.cluster.getDaemonsets().then(function (Daemonsets) {
      _this.storeDaemonSets.filter(function (daemonset) {
        return !daemonset.is_deleted;
      }).forEach(function (issetDaemonSet) {
        var equalDaemonSet = Daemonsets.filter(function (item) {
          return item.metadata.uid === issetDaemonSet.data.metadata.uid;
        });

        if (equalDaemonSet.length > 0) {
          equalDaemonSet = equalDaemonSet[0];
        } else {
          equalDaemonSet = false;
        }

        if (equalDaemonSet !== false) {
          issetDaemonSet.update(equalDaemonSet);
          Daemonsets.splice(Daemonsets.indexOf(equalDaemonSet), 1);
        } else {
          issetDaemonSet.destroy();
        }
      });

      Daemonsets = Daemonsets.map(function (newDaemonset) {
        return new _common_types_daemonset__WEBPACK_IMPORTED_MODULE_13__["Daemonset"](newDaemonset);
      });
      _this.storeDaemonSets = _this.storeDaemonSets.concat(Daemonsets);
      Daemonsets.forEach(function (newDaemonset) {
        var _ns = _this.__getNamespace(newDaemonset.data.metadata.namespace);

        _ns.daemonsets.push(newDaemonset);
      });
    });
  };

  K8sPage.prototype.attachJobs = function () {
    var _this = this;

    this.namespaceMap.forEach(function (ns) {
      var jobsList = _this.storeJobs.filter(function (job) {
        return !job.data.metadata.ownerReferences && job.data.metadata.namespace === ns.name;
      });

      var ns_crons = _this.storeCronJobs.filter(function (cron) {
        return cron.data.metadata.namespace === ns;
      });

      ns_crons.forEach(function (cj) {
        var uid = cj.data.metadata.uid;

        _this.storeJobs.forEach(function (job) {
          if (job.data.metadata.ownerReferences) {
            if (!job.data.metadata.ownerReferences.filter(function (item) {
              return item.kind === 'CronJob' && item.uid === uid;
            })[0]) {
              jobsList.push(job);
            }
          }
        });
      });
      ns.jobs = jobsList;
    });
  };

  K8sPage.prototype.attachCronJobs = function () {
    var _this = this;

    this.namespaceMap.forEach(function (ns) {
      ns.cronJobs = _this.storeCronJobs.filter(function (cron) {
        return cron.data.metadata.namespace === ns.name;
      });
      ns.cronJobs.forEach(function (cj) {
        var uid = cj.data.metadata.uid;
        var jobsList = [];

        _this.storeJobs.forEach(function (job) {
          if (job.data.metadata.ownerReferences) {
            if (job.data.metadata.ownerReferences.filter(function (item) {
              return item.kind === 'CronJob' && item.uid === uid;
            })[0]) {
              jobsList.push(job);
            }
          }
        });

        cj.jobs = jobsList;
      });
    });
  };

  K8sPage.prototype.attachPodsToMap = function () {
    var _this = this;

    this.namespaceMap.forEach(function (ns) {
      ns.deployments.forEach(function (deployment) {
        deployment.pods = _this.__findPodsBySelector(deployment.data.spec.selector.matchLabels, ns.name);
        deployment.services = _this.__findServices(deployment);
      });
      ns.statefulsets.forEach(function (statefulset) {
        statefulset.pods = _this.__findPodsBySelector(statefulset.data.spec.selector.matchLabels, ns.name);
        statefulset.services = _this.__findServices(statefulset);
      });
      ns.daemonsets.forEach(function (daemonset) {
        daemonset.pods = _this.__findPodsBySelector(daemonset.data.spec.selector.matchLabels, ns.name);
        daemonset.services = _this.__findServices(daemonset);
      });
      ns.jobs.forEach(function (job) {
        job.pods = _this.__findPodsBySelector(job.data.metadata.labels, ns.name);
      });
      ns.cronJobs.forEach(function (cron) {
        cron.jobs.map(function (job) {
          job.pods = _this.__findPodsBySelector(job.data.metadata.labels, ns.name);
        });
      });
      ns.other[0].pods = _this.storePods.filter(function (item) {
        return !item.used && item.data.metadata.namespace === ns.name;
      });
    });
  };

  K8sPage.prototype.updateJobs = function () {
    var _this = this;

    var _promises = [];

    _promises.push(this.refreshJobs());

    this.$q.all(_promises).then(function () {
      _this.attachJobs();

      _this.attachCronJobs();
    });
  };

  K8sPage.prototype.__findPodsBySelector = function (filter, namespace, pods) {
    if (pods === void 0) {
      pods = this.storePods;
    }

    return pods.filter(function (item) {
      return item.data.metadata.namespace === namespace;
    }).filter(function (item) {
      var labels = item.data.metadata.labels;

      if (typeof labels === 'undefined') {
        return false;
      } else {
        for (var prop in filter) {
          if (!labels.hasOwnProperty(prop)) {
            return false;
          }

          if (labels[prop] !== filter[prop]) {
            return false;
          }
        }
      }

      item.used = true;
      return true;
    });
  };

  K8sPage.prototype.__findServices = function (entity) {
    var _this = this;

    return this.storeServices.filter(function (item) {
      if (!item.data.spec || !item.data.spec.selector) {
        return false;
      }

      var matchLabels = item.data.spec.selector;

      var result = _this.__findPodsBySelector(matchLabels, item.data.metadata.namespace, entity.pods);

      if (result.length > 0) {
        return true;
      }

      return false;
    });
  };

  K8sPage.prototype.__prepareDS = function () {
    var _this = this;

    return this.datasourceSrv.get(this.location.search().clusterName).then(function (ds) {
      _this.cluster = ds;

      _this.__setRefreshRate(_this.cluster.refreshRate);

      return _this.getPrometheusDS(_this.cluster.prometheus).then(function () {
        _this.pageReady = true;
      });
    });
  };

  K8sPage.prototype.getPrometheusDS = function (name) {
    var _this = this;

    return this.datasourceSrv.get(name).then(function (ds) {
      _this.prometheusDS = new _common_proxies_prometheusProxy__WEBPACK_IMPORTED_MODULE_3__["PrometheusProxy"](ds);
    });
  };

  K8sPage.prototype.getPods = function (skipEmptyHost) {
    var _this = this;

    if (skipEmptyHost === void 0) {
      skipEmptyHost = false;
    }

    return this.cluster.getPods().then(function (pods) {
      if (pods instanceof Array) {
        _this.podsError = false;

        if (skipEmptyHost) {
          pods = pods.filter(function (pod) {
            return typeof pod.status.hostIP !== 'undefined';
          });
        }

        _this.storePods = pods.map(function (pod) {
          return new _common_types_pod__WEBPACK_IMPORTED_MODULE_2__["Pod"](pod);
        });
      } else if (pods instanceof Error) {
        _this.podsError = pods;
      }

      _this.timeout(function () {
        _this.refreshPods(skipEmptyHost);
      }, _this.refreshRate);
    });
  };

  K8sPage.prototype.refreshPods = function (skipEmptyHost) {
    var _this = this;

    if (skipEmptyHost === void 0) {
      skipEmptyHost = false;
    }

    this.cluster.getPods().then(function (pods) {
      if (pods instanceof Array) {
        _this.podsError = false;

        if (skipEmptyHost) {
          pods = pods.filter(function (pod) {
            return typeof pod.status.hostIP !== 'undefined';
          });
        }

        _this.storePods.filter(function (pod) {
          return !pod.is_deleted;
        }).forEach(function (issetPod) {
          var equalPod = pods.filter(function (item) {
            return item.metadata.uid === issetPod.data.metadata.uid;
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

        pods = pods.map(function (pod) {
          return new _common_types_pod__WEBPACK_IMPORTED_MODULE_2__["Pod"](pod);
        });
        _this.storePods = _this.storePods.concat(pods);

        _this.updatePods(pods);
      } else if (pods instanceof Error) {
        _this.podsError = pods;
      }
    });
    this.timeout(function () {
      _this.refreshPods(skipEmptyHost);
    }, this.refreshRate);
  };

  K8sPage.prototype.getClusterComponents = function () {
    var _this = this;

    this.cluster.getComponents().then(function (components) {
      if (components instanceof Array) {
        _this.componentsError = false;
        _this.storeComponents = components.map(function (component) {
          return new _common_types_component__WEBPACK_IMPORTED_MODULE_5__["Component"](component);
        });
      } else if (components instanceof Error) {
        _this.componentsError = components;
      }

      _this.timeout(function () {
        _this.refreshClusterComponents();
      }, _this.refreshRate);
    });
  };

  K8sPage.prototype.refreshClusterComponents = function () {
    var _this = this;

    this.cluster.getComponents().then(function (components) {
      if (components instanceof Array) {
        _this.componentsError = false;
        _this.storeComponents = components.map(function (component) {
          return new _common_types_component__WEBPACK_IMPORTED_MODULE_5__["Component"](component);
        });
      } else if (components instanceof Error) {
        _this.componentsError = components;
      }

      _this.timeout(function () {
        _this.refreshClusterComponents();
      }, _this.refreshRate);
    });
  };

  K8sPage.prototype.getAllServices = function () {
    var _this = this;

    return this.cluster.getServices().then(function (services) {
      _this.storeServices = services.map(function (service) {
        return new _common_types_service__WEBPACK_IMPORTED_MODULE_6__["Service"](service);
      });
    });
  };

  K8sPage.prototype.getClusterJobs = function () {
    var _this = this;

    return this.cluster.getJobs().then(function (jobs) {
      _this.storeJobs = jobs.map(function (job) {
        return new _common_types_job__WEBPACK_IMPORTED_MODULE_7__["Job"](job);
      });
    });
  };

  K8sPage.prototype.getClusterCronJobs = function () {
    var _this = this;

    return this.cluster.getCronJobs().then(function (cronjobs) {
      _this.storeCronJobs = cronjobs.map(function (cronjob) {
        return new _common_types_cronjob__WEBPACK_IMPORTED_MODULE_8__["Cronjob"](cronjob);
      });
    });
  };

  K8sPage.prototype.refreshJobs = function () {
    var _this = this;

    return this.cluster.getJobs().then(function (newJobs) {
      _this.storeJobs.filter(function (job) {
        return !job.is_deleted;
      }).forEach(function (issetJob) {
        var equalPod = newJobs.filter(function (item) {
          return item.metadata.uid === issetJob.data.metadata.uid;
        });

        if (equalPod.length > 0) {
          equalPod = equalPod[0];
        } else {
          equalPod = false;
        }

        if (equalPod !== false) {
          issetJob.update(equalPod);
          newJobs.splice(newJobs.indexOf(equalPod), 1);
        } else {
          issetJob.destroy();
        }
      });

      newJobs = newJobs.map(function (newJob) {
        return new _common_types_job__WEBPACK_IMPORTED_MODULE_7__["Job"](newJob);
      });
      _this.storeJobs = _this.storeJobs.concat(newJobs);
    });
  };

  K8sPage.prototype.__getNamespace = function (namespace) {
    return this.namespaceMap.filter(function (ns) {
      return ns.name === namespace;
    })[0];
  };

  K8sPage.prototype.__setRefreshRate = function (rate) {
    if (rate === undefined) {
      this.refreshRate = REFRESH_RATE_DEFAULT;
    } else {
      this.refreshRate = rate * 1000;
    }
  };

  K8sPage.prototype.__getPodsLength = function (pods) {
    if (pods === void 0) {
      pods = [];
    }

    return pods.filter(function (item) {
      return !item.is_deleted;
    }).length;
  };

  K8sPage.prototype.getWarningPods = function () {
    var _this = this;

    var warningPods = this.storePods.filter(function (item) {
      return _this.podIsWarning(item);
    });

    if (warningPods.length > 0 && warningPods.filter(function (pod) {
      return pod.message === 'Undefined error';
    }).length > 0) {
      this.storePods.forEach(function (pod, index) {
        if (_this.podIsWarning(pod) && pod.message === 'Undefined error' && _this.storeEvents) {
          var event = _this.storeEvents.find(function (event) {
            return event.involvedObject.name === pod.name;
          });

          if (event !== undefined) {
            _this.storePods[index].message = event.message;
          }
        }
      });
    }

    return this.sortByStatus(warningPods);
  };

  K8sPage.prototype.sortByStatus = function (array, rule) {
    if (rule === void 0) {
      rule = [_common_constants__WEBPACK_IMPORTED_MODULE_4__["ERROR"], _common_constants__WEBPACK_IMPORTED_MODULE_4__["WARNING"], _common_constants__WEBPACK_IMPORTED_MODULE_4__["SUCCESS"], _common_constants__WEBPACK_IMPORTED_MODULE_4__["SUCCEEDED"], _common_constants__WEBPACK_IMPORTED_MODULE_4__["TERMINATING"]];
    }

    var sorted = [];
    rule.forEach(function (status) {
      sorted.push.apply(sorted, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(array.filter(function (pod) {
        return pod.status === status;
      })));
    });
    return sorted;
  };

  K8sPage.prototype.getWarningNodes = function () {
    return this.nodesMap.filter(function (item) {
      return item.status === _common_constants__WEBPACK_IMPORTED_MODULE_4__["ERROR"];
    });
  };

  K8sPage.prototype.goTo = function (id) {
    var pod = null;

    if (id) {
      pod = document.getElementsByClassName(id)[0];
    }

    if (pod) {
      pod.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    }
  };

  K8sPage.prototype.getAlertsNodesByCPU = function (status) {
    if (status === void 0) {
      status = 'cpuStatus';
    }

    return this.nodesMap.filter(function (item) {
      return item[status] === _common_constants__WEBPACK_IMPORTED_MODULE_4__["WARNING"] || item[status] === _common_constants__WEBPACK_IMPORTED_MODULE_4__["ERROR"];
    });
  };

  K8sPage.prototype.getAlertsNodesByMemory = function (status) {
    if (status === void 0) {
      status = 'memoryStatus';
    }

    return this.nodesMap.filter(function (item) {
      return item[status] === _common_constants__WEBPACK_IMPORTED_MODULE_4__["WARNING"] || item[status] === _common_constants__WEBPACK_IMPORTED_MODULE_4__["ERROR"];
    });
  };

  K8sPage.prototype.getAlertsNodesByPods = function (status) {
    if (status === void 0) {
      status = 'podsStatus';
    }

    return this.nodesMap.filter(function (item) {
      return item[status] === _common_constants__WEBPACK_IMPORTED_MODULE_4__["WARNING"] || item[status] === _common_constants__WEBPACK_IMPORTED_MODULE_4__["ERROR"];
    });
  };

  K8sPage.prototype.getAlertsComponents = function () {
    return this.storeComponents.filter(function (item) {
      return item.status === _common_constants__WEBPACK_IMPORTED_MODULE_4__["ERROR"];
    });
  };

  K8sPage.prototype.getEvents = function () {
    var _this = this;

    this.cluster.getEvents().then(function (events) {
      _this.storeEvents = events;

      _this.timeout(function () {
        _this.getEvents();
      }, _this.refreshRate);
    });
  };

  K8sPage.prototype.podIsWarning = function (pod) {
    if (!pod.is_deleted) {
      if (pod.status === _common_constants__WEBPACK_IMPORTED_MODULE_4__["WARNING"] || pod.status === _common_constants__WEBPACK_IMPORTED_MODULE_4__["ERROR"] || pod.status === _common_constants__WEBPACK_IMPORTED_MODULE_4__["TERMINATING"]) {
        return true;
      }

      return !this.validResources(pod);
    }

    return false;
  };

  K8sPage.prototype.validResources = function (pod) {
    return pod.data.spec.containers.every(function (container) {
      var msgCpu = [];
      var msgMemory = [];

      if (pod.data.metadata.namespace !== 'kube-system' && pod.status !== _common_constants__WEBPACK_IMPORTED_MODULE_4__["SUCCEEDED"]) {
        if (!container.resources.requests || !container.resources.requests.cpu) {
          msgCpu.push('CPU request');
        }

        if (!container.resources.limits || !container.resources.limits.cpu) {
          msgCpu.push('CPU limit');
        }

        if (!container.resources.requests || !container.resources.requests.memory) {
          msgMemory.push('Memory request');
        }

        if (!container.resources.limits || !container.resources.limits.memory) {
          msgMemory.push('Memory limit');
        }
      }

      if (msgCpu.length > 0 || msgMemory.length > 0) {
        pod.message = "Container \"" + container.name + "\":\n                 " + (msgCpu.length && 'Specify ' + msgCpu.join(' and ') + ';') + "\n                 " + (msgMemory.length && 'Specify ' + msgMemory.join(' and ') + ';');
        return false;
      }

      return true;
    });
  };

  K8sPage.prototype.toggleMenu = function () {
    this.showMenu = !this.showMenu;
  };

  return K8sPage;
}();



/***/ }),

/***/ "./components/nodes-overview/nodes-overview.ts":
/*!*****************************************************!*\
  !*** ./components/nodes-overview/nodes-overview.ts ***!
  \*****************************************************/
/*! exports provided: NodesOverview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodesOverview", function() { return NodesOverview; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _k8s_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../k8s-page */ "./components/k8s-page.ts");
/* harmony import */ var _common_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/store */ "./common/store.ts");
/* harmony import */ var _common_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/helpers */ "./common/helpers.ts");
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/constants */ "./common/constants.ts");






var NodesOverview =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(NodesOverview, _super);

  function NodesOverview($scope, $injector, $q, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $window) {
    var _this = _super.call(this, $scope, backendSrv, datasourceSrv, contextSrv, $location, $timeout, $q, $window) || this;

    _this.$q = $q;
    _this.backendSrv = backendSrv;
    _this.datasourceSrv = datasourceSrv;
    _this.contextSrv = contextSrv;
    _this.$location = $location;
    _this.$timeout = $timeout;
    _this.$window = $window;
    _this.storageOpenKey = 'nodes-overview-open';
    _this.serverInfo = null;
    _this.hideAllWarningPods = true;
    _this.showScrollButton = false;
    _this.pageReady = false;
    _this.version = Object(_common_helpers__WEBPACK_IMPORTED_MODULE_3__["__getGrafanaVersion"])($window);

    _this.__prepareDS().then(function () {
      _this.getEvents();

      _this.getClusters();

      _this.getNodeMap().then(function () {
        if (_this.nodesMap.length > 0 && _this.serverInfo === null) {
          _this.getServerInfo();
        }

        _this.pageReady = true;
      }).then(function () {
        _this.getResourcesMetrics().then(function () {});
      });
    });

    var openFromStorage = localStorage.getItem(_this.storageOpenKey);
    _this.open = openFromStorage ? JSON.parse(openFromStorage) : {};
    var elem = document.querySelector('.scroll-canvas');
    elem.addEventListener('scroll', function () {
      _this.showScrollButton = elem.scrollTop > 64;
      $scope.$apply();
    });
    return _this;
  }

  NodesOverview.prototype.getClusters = function () {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
      var datasources, type, clusters_1;
      return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.datasourceSrv.getAll()];

          case 1:
            datasources = _a.sent();
            type = _common_constants__WEBPACK_IMPORTED_MODULE_4__["TYPE_DATASOURCE"];

            if (Array.isArray(datasources)) {
              this.clusters = datasources.filter(function (item) {
                return item.type === type;
              });
            } else {
              clusters_1 = [];
              Object.keys(datasources).forEach(function (key) {
                if (datasources[key].type === type) {
                  clusters_1.push(datasources[key]);
                }
              });
              this.clusters = clusters_1;
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  NodesOverview.prototype.getServerInfo = function () {
    var _this = this;

    this.serverInfo = {};

    this.__getServersInfo(this.nodesMap).then(function (res) {
      _this.serverInfo = res;
    });
  };

  NodesOverview.prototype.showAllPodsNS = function (ns) {
    ns.limit = false;
  };

  NodesOverview.prototype.toggleNsList = function (node) {
    node.hideNs = !node.hideNs;
    /*let key = node.name + 'NsList';
        let state = store.get(key);
             if (state === 'false') {
            state = false;
        } else if (state === 'true') {
            state = true;
        }
             store.set(key, !state);*/
  };

  NodesOverview.prototype.updatePods = function (newPods) {
    this.insertPodsToNodesMap(newPods);
  };

  NodesOverview.prototype.summary = function (ns, metric) {
    var res = 0;

    if (ns.pods) {
      res = ns.pods.reduce(function (prevValue, pod) {
        if (pod.sourceMetrics[metric]) {
          return prevValue + pod.sourceMetrics[metric];
        }

        return prevValue;
      }, 0);
    }

    switch (metric) {
      case 'cpuUsed':
        return Object(_common_helpers__WEBPACK_IMPORTED_MODULE_3__["__convertToMicro"])(res.toFixed(3));

      case 'cpuRequested':
        return Object(_common_helpers__WEBPACK_IMPORTED_MODULE_3__["__convertToMicro"])(Object(_common_helpers__WEBPACK_IMPORTED_MODULE_3__["__roundCpu"])(res));

      case 'cpuLimit':
        return Object(_common_helpers__WEBPACK_IMPORTED_MODULE_3__["__convertToMicro"])(Object(_common_helpers__WEBPACK_IMPORTED_MODULE_3__["__roundCpu"])(res));

      case 'memoryUsed':
        return Object(_common_helpers__WEBPACK_IMPORTED_MODULE_3__["__convertToGB"])(res);

      case 'memoryRequested':
        return Object(_common_helpers__WEBPACK_IMPORTED_MODULE_3__["__convertToGB"])(res);

      case 'memoryLimit':
        return Object(_common_helpers__WEBPACK_IMPORTED_MODULE_3__["__convertToGB"])(res);

      default:
        return 'N-A';
    }
  };

  NodesOverview.prototype.nodeClick = function (event, node) {
    if (event.ctrlKey) {
      if (node.open) {
        event.preventDefault();
      }

      this.toggleNodes(node);
    } else {
      node.toggle();
    }
  };

  NodesOverview.prototype.__showAll = function () {
    this.toggleNodes(true);
  };

  NodesOverview.prototype.__hideAll = function () {
    this.toggleNodes(false);
  };

  NodesOverview.prototype.toggleNodes = function (node) {
    _common_store__WEBPACK_IMPORTED_MODULE_2__["default"]["delete"]('nodeStore');
    var nodeStore = [];
    this.nodesMap.map(function (ns) {
      ns.open = node === true || node === false ? node : node.name === ns.name;
      nodeStore.push({
        name: ns.name,
        open: ns.open
      });
    });
    _common_store__WEBPACK_IMPORTED_MODULE_2__["default"].setObject('nodeStore', nodeStore);
  };

  NodesOverview.prototype.podsFilterIsDeleted = function (pods) {
    return pods.filter(function (pod) {
      return pod.is_deleted === false;
    });
  };

  NodesOverview.prototype.sort = function (key, nsIndex, nodeIndex) {
    if (this.nodesMap[nodeIndex] && this.nodesMap[nodeIndex].namespaces[nsIndex]) {
      if (this.nodesMap[nodeIndex].namespaces[nsIndex].sort.indexOf(key) === 0) {
        this.nodesMap[nodeIndex].namespaces[nsIndex].sort = '-' + key;
      } else {
        this.nodesMap[nodeIndex].namespaces[nsIndex].sort = key;
      }
    }
  };

  NodesOverview.prototype.icon = function (key, nsIndex, nodeIndex) {
    if (this.nodesMap[nodeIndex] && this.nodesMap[nodeIndex].namespaces[nsIndex]) {
      if (this.nodesMap[nodeIndex].namespaces[nsIndex].sort.indexOf(key) === 0) {
        return '<i class="fa fa-long-arrow-down"></i>';
      } else if (this.nodesMap[nodeIndex].namespaces[nsIndex].sort.indexOf('-' + key) === 0) {
        return '<i class="fa fa-long-arrow-up"></i>';
      }
    }

    return '<i class="fa fa-long-arrow-up grey"></i>';
  };

  NodesOverview.prototype.toggleAllWarningPods = function () {
    this.hideAllWarningPods = !this.hideAllWarningPods;
  };

  NodesOverview.prototype.nodeCount = function () {
    return this.nodesMap ? this.nodesMap.length : 0;
  };

  NodesOverview.prototype.nodeActiveCount = function () {
    return this.nodesMap ? this.nodesMap.filter(function (node) {
      return node.open;
    }).length : 0;
  };

  NodesOverview.prototype.toggleTab = function (nodeName) {
    if (this.open[nodeName] === undefined) {
      this.open[nodeName] = false;
    } else {
      this.open[nodeName] = !this.open[nodeName];
    }

    localStorage.setItem(this.storageOpenKey, JSON.stringify(this.open));
  };

  NodesOverview.templateUrl = 'components/nodes-overview/nodes-overview.html';
  NodesOverview.$inject = ['$scope', '$injector', '$q', 'backendSrv', 'datasourceSrv', 'contextSrv', '$location', '$timeout', '$window'];
  return NodesOverview;
}(_k8s_page__WEBPACK_IMPORTED_MODULE_1__["K8sPage"]);



/***/ }),

/***/ "./config/config.ts":
/*!**************************!*\
  !*** ./config/config.ts ***!
  \**************************/
/*! exports provided: DOPKubeGrafAppConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOPKubeGrafAppConfig", function() { return DOPKubeGrafAppConfig; });
var DOPKubeGrafAppConfig =
/** @class */
function () {
  function DOPKubeGrafAppConfig($scope, $injector, $q) {
    this.$q = $q;
    this.enabled = false;
    this.appEditCtrl.setPostUpdateHook();
  }

  DOPKubeGrafAppConfig.prototype.postUpdate = function () {
    var _this = this;

    if (!this.appModel.enabled) {
      return this.$q.resolve();
    }

    return this.appEditCtrl.importDashboards().then(function () {
      _this.enabled = true;
      return {
        url: 'plugins/devopsprodigy-kubegraf-app/page/clusters',
        message: 'DevOpsProdigy KubeGraf enabled!'
      };
    });
  };

  DOPKubeGrafAppConfig.templateUrl = 'config/config.html';
  DOPKubeGrafAppConfig.$inject = ['$scope', '$injector', '$q'];
  return DOPKubeGrafAppConfig;
}();



/***/ }),

/***/ "./module.ts":
/*!*******************!*\
  !*** ./module.ts ***!
  \*******************/
/*! exports provided: ApplicationsOverview, ClusterAlerts, ClusterConfig, ClusterOverview, ClustersList, NodesOverview, ConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/runtime */ "@grafana/runtime");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_applications_overview_applications_overview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/applications-overview/applications-overview */ "./components/applications-overview/applications-overview.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ApplicationsOverview", function() { return _components_applications_overview_applications_overview__WEBPACK_IMPORTED_MODULE_1__["ApplicationsOverview"]; });

/* harmony import */ var _components_clusters_list_clusters_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/clusters-list/clusters-list */ "./components/clusters-list/clusters-list.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClustersList", function() { return _components_clusters_list_clusters_list__WEBPACK_IMPORTED_MODULE_2__["ClustersList"]; });

/* harmony import */ var _components_cluster_config_cluster_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/cluster-config/cluster-config */ "./components/cluster-config/cluster-config.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClusterConfig", function() { return _components_cluster_config_cluster_config__WEBPACK_IMPORTED_MODULE_3__["ClusterConfig"]; });

/* harmony import */ var _components_cluster_overview_cluster_overview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/cluster-overview/cluster-overview */ "./components/cluster-overview/cluster-overview.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClusterOverview", function() { return _components_cluster_overview_cluster_overview__WEBPACK_IMPORTED_MODULE_4__["ClusterOverview"]; });

/* harmony import */ var _components_nodes_overview_nodes_overview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/nodes-overview/nodes-overview */ "./components/nodes-overview/nodes-overview.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NodesOverview", function() { return _components_nodes_overview_nodes_overview__WEBPACK_IMPORTED_MODULE_5__["NodesOverview"]; });

/* harmony import */ var _components_cluster_alerts_cluster_alerts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/cluster-alerts/cluster-alerts */ "./components/cluster-alerts/cluster-alerts.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClusterAlerts", function() { return _components_cluster_alerts_cluster_alerts__WEBPACK_IMPORTED_MODULE_6__["ClusterAlerts"]; });

/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./config/config */ "./config/config.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return _config_config__WEBPACK_IMPORTED_MODULE_7__["DOPKubeGrafAppConfig"]; });









Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["loadPluginCss"])({
  dark: 'plugins/devopsprodigy-kubegraf-app/styles/dark.css',
  light: 'plugins/devopsprodigy-kubegraf-app/styles/light.css'
});


/***/ }),

/***/ "@grafana/data":
/*!********************************!*\
  !*** external "@grafana/data" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_data__;

/***/ }),

/***/ "@grafana/runtime":
/*!***********************************!*\
  !*** external "@grafana/runtime" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__grafana_runtime__;

/***/ }),

/***/ "grafana/app/core/app_events":
/*!**************************************!*\
  !*** external "app/core/app_events" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_app_events__;

/***/ }),

/***/ "grafana/app/core/utils/kbn":
/*!*************************************!*\
  !*** external "app/core/utils/kbn" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_kbn__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map