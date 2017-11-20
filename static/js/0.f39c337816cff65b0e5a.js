webpackJsonp([0],Array(77).concat([
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(203)
}
var Component = __webpack_require__(98)(
  /* script */
  __webpack_require__(158),
  /* template */
  __webpack_require__(208),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0a30088a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 78 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(87)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(113)('wks')
  , uid        = __webpack_require__(105)
  , Symbol     = __webpack_require__(78).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(122);
var isBuffer = __webpack_require__(206);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 82 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(84)
  , IE8_DOM_DEFINE = __webpack_require__(101)
  , toPrimitive    = __webpack_require__(97)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(79) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(86);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(83)
  , createDesc = __webpack_require__(92);
module.exports = __webpack_require__(79) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 88 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(174)
  , defined = __webpack_require__(109);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(93);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(78)
  , core      = __webpack_require__(82)
  , ctx       = __webpack_require__(90)
  , hide      = __webpack_require__(85)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 94 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(86)
  , document = __webpack_require__(78).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(86);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 98 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(107);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(79) && !__webpack_require__(87)(function(){
  return Object.defineProperty(__webpack_require__(95)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(129)
  , enumBugKeys = __webpack_require__(110);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(83).f
  , has = __webpack_require__(88)
  , TAG = __webpack_require__(80)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 105 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(81);
var normalizeHeaderName = __webpack_require__(151);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(118);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(118);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(207)))

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(117);
var $Object = __webpack_require__(82).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 109 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 110 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 111 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(113)('keys')
  , uid    = __webpack_require__(105);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(78)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 114 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(78)
  , core           = __webpack_require__(82)
  , LIBRARY        = __webpack_require__(102)
  , wksExt         = __webpack_require__(116)
  , defineProperty = __webpack_require__(83).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(80);

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(91);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(79), 'Object', {defineProperty: __webpack_require__(83).f});

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(81);
var settle = __webpack_require__(143);
var buildURL = __webpack_require__(146);
var parseHeaders = __webpack_require__(152);
var isURLSameOrigin = __webpack_require__(150);
var createError = __webpack_require__(121);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(145);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("production" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(148);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(142);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(94)
  , TAG = __webpack_require__(80)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(78).document && document.documentElement;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(102)
  , $export        = __webpack_require__(91)
  , redefine       = __webpack_require__(130)
  , hide           = __webpack_require__(85)
  , has            = __webpack_require__(88)
  , Iterators      = __webpack_require__(96)
  , $iterCreate    = __webpack_require__(178)
  , setToStringTag = __webpack_require__(104)
  , getPrototypeOf = __webpack_require__(187)
  , ITERATOR       = __webpack_require__(80)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(84)
  , dPs         = __webpack_require__(184)
  , enumBugKeys = __webpack_require__(110)
  , IE_PROTO    = __webpack_require__(112)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(95)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(124).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(129)
  , hiddenKeys = __webpack_require__(110).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 128 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(88)
  , toIObject    = __webpack_require__(89)
  , arrayIndexOf = __webpack_require__(170)(false)
  , IE_PROTO     = __webpack_require__(112)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(85);

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(90)
  , invoke             = __webpack_require__(173)
  , html               = __webpack_require__(124)
  , cel                = __webpack_require__(95)
  , global             = __webpack_require__(78)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(94)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(114)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 133 */
/***/ (function(module, exports) {



/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(191)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(125)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(195);
var global        = __webpack_require__(78)
  , hide          = __webpack_require__(85)
  , Iterators     = __webpack_require__(96)
  , TO_STRING_TAG = __webpack_require__(80)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(137);

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(81);
var bind = __webpack_require__(122);
var Axios = __webpack_require__(139);
var defaults = __webpack_require__(106);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(119);
axios.CancelToken = __webpack_require__(138);
axios.isCancel = __webpack_require__(120);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(153);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(119);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(106);
var utils = __webpack_require__(81);
var InterceptorManager = __webpack_require__(140);
var dispatchRequest = __webpack_require__(141);
var isAbsoluteURL = __webpack_require__(149);
var combineURLs = __webpack_require__(147);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(81);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(81);
var transformData = __webpack_require__(144);
var isCancel = __webpack_require__(120);
var defaults = __webpack_require__(106);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(121);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(81);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(81);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(81);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(81);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(81);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(81);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isEmpty; });
/* unused harmony export reject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);


var isEmpty = function isEmpty(val) {
  if (val === undefined) {
    return true;
  } else if (val === null) {
    return true;
  } else {
    switch (typeof val === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(val)) {
      case 'string':
        return !val;
      case 'object':
        if (Array.isArray(val)) {
          return !val.length;
        } else {
          for (var i in val) {
            if (i) return false;
          }
          return true;
        }
      default:
        return false;
    }
  }
};


var reject = function reject(msg) {
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.reject({ msg: msg });
};


/***/ }),
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_utils_index__ = __webpack_require__(154);








var DrawBard = function () {
  function DrawBard(_ref) {
    var _ref$width = _ref.width,
        width = _ref$width === undefined ? 0 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 0 : _ref$height,
        _ref$startClientX = _ref.startClientX,
        startClientX = _ref$startClientX === undefined ? 0 : _ref$startClientX,
        _ref$startClientY = _ref.startClientY,
        startClientY = _ref$startClientY === undefined ? 0 : _ref$startClientY,
        _ref$imgBoxW = _ref.imgBoxW,
        imgBoxW = _ref$imgBoxW === undefined ? 0 : _ref$imgBoxW,
        _ref$imgBoxH = _ref.imgBoxH,
        imgBoxH = _ref$imgBoxH === undefined ? 0 : _ref$imgBoxH,
        _ref$moveX = _ref.moveX,
        moveX = _ref$moveX === undefined ? 0 : _ref$moveX,
        _ref$moveY = _ref.moveY,
        moveY = _ref$moveY === undefined ? 0 : _ref$moveY;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, DrawBard);

    this.w = width;
    this.h = height;
    this.x = startClientX;
    this.y = startClientY;
    this.imgBoxW = imgBoxW;
    this.imgBoxH = imgBoxH;
    this.maxDrawWidth = this.w;
    this.maxDrawHeight = this.h;
    this.moveX = moveX;
    this.moveY = moveY;
    this.scale = 1;
    this.canScale = false;
    this.editing = false;
    this.moving = false;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(DrawBard, [{
    key: 'startScale',
    value: function startScale() {
      this.canScale = true;
    }
  }, {
    key: 'changeSize',
    value: function changeSize(_ref2) {
      var change = _ref2.change;

      var coe = 0.2;
      coe = coe / this.imgBoxW > coe / this.imgBoxH ? coe / this.imgBoxH : coe / this.imgBoxW;
      var num = coe * change;
      num < 0 ? this.scale += Math.abs(num) : this.scale > Math.abs(num) ? this.scale -= Math.abs(num) : this.scale;
    }
  }, {
    key: 'endScale',
    value: function endScale() {
      this.canScale = false;
    }
  }, {
    key: 'startMove',
    value: function startMove(startX, startY) {
      this.moving = true;
      this.moveX = startX - this.x;
      this.moveY = startY - this.y;
    }
  }, {
    key: 'move',
    value: function move(nowX, nowY, vue) {
      var _this = this;

      this.moving && vue.$nextTick(function () {
        _this.x = ~~(nowX - _this.moveX);
        _this.y = ~~(nowY - _this.moveY);
      });
    }
  }, {
    key: 'endMove',
    value: function endMove() {
      this.moving = false;
    }
  }, {
    key: 'imgReload',
    value: function imgReload(_ref3) {
      var _this2 = this;

      var vue = _ref3.vue;

      vue.$refs.targetImg.onload = function () {
        _this2.w = ~~window.getComputedStyle(vue.$refs.canvas).width.replace('px', '');
        _this2.h = ~~window.getComputedStyle(vue.$refs.canvas).height.replace('px', '');
        _this2.imgBoxW = vue.$refs.targetImg.width;
        _this2.imgBoxH = vue.$refs.targetImg.height;
        _this2.maxDrawWidth = _this2.imgBoxW;
        _this2.maxDrawHeight = _this2.imgBoxH;
        _this2.rotate = 0;
      };
    }
  }]);

  return DrawBard;
}();

var DrawSquareness = function () {
  function DrawSquareness(_ref4) {
    var _ref4$width = _ref4.width,
        width = _ref4$width === undefined ? 0 : _ref4$width,
        _ref4$height = _ref4.height,
        height = _ref4$height === undefined ? 0 : _ref4$height,
        _ref4$startClientX = _ref4.startClientX,
        startClientX = _ref4$startClientX === undefined ? 0 : _ref4$startClientX,
        _ref4$startClientY = _ref4.startClientY,
        startClientY = _ref4$startClientY === undefined ? 0 : _ref4$startClientY,
        _ref4$startOffsetX = _ref4.startOffsetX,
        startOffsetX = _ref4$startOffsetX === undefined ? 0 : _ref4$startOffsetX,
        _ref4$startOffsetY = _ref4.startOffsetY,
        startOffsetY = _ref4$startOffsetY === undefined ? 0 : _ref4$startOffsetY,
        _ref4$info = _ref4.info,
        info = _ref4$info === undefined ? '' : _ref4$info,
        _ref4$style = _ref4.style,
        style = _ref4$style === undefined ? {} : _ref4$style,
        _ref4$className = _ref4.className,
        className = _ref4$className === undefined ? 'vue-selected-square' : _ref4$className;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, DrawSquareness);

    this.w = width;
    this.h = height;
    this.startClientX = startClientX;
    this.startClientY = startClientY;
    this.startOffsetX = startOffsetX;
    this.startOffsetY = startOffsetY;
    this.defaultOffsetX = 0;
    this.defaultOffsetY = 0;
    this.ableChangeX = true;
    this.ableChangeY = true;
    this.dragPositionX = '';
    this.dragPositionY = '';
    this.drawing = false;
    this.isChange = false;
    this.isMove = false;
    this.info = this.w + '*' + this.h;
    this.style = '';
    this.className = '';
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(DrawSquareness, [{
    key: 'startChange',
    value: function startChange(_ref5) {
      var startClientX = _ref5.startClientX,
          startClientY = _ref5.startClientY,
          startOffsetX = _ref5.startOffsetX,
          startOffsetY = _ref5.startOffsetY,
          _ref5$ableChangeX = _ref5.ableChangeX,
          ableChangeX = _ref5$ableChangeX === undefined ? true : _ref5$ableChangeX,
          _ref5$ableChangeY = _ref5.ableChangeY,
          ableChangeY = _ref5$ableChangeY === undefined ? true : _ref5$ableChangeY,
          _ref5$dragPositionX = _ref5.dragPositionX,
          dragPositionX = _ref5$dragPositionX === undefined ? 'right' : _ref5$dragPositionX,
          _ref5$dragPositionY = _ref5.dragPositionY,
          dragPositionY = _ref5$dragPositionY === undefined ? 'bottom' : _ref5$dragPositionY;

      if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_utils_index__["a" /* isEmpty */])(startOffsetX)) this.startOffsetX = startOffsetX;
      if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_utils_index__["a" /* isEmpty */])(startOffsetY)) this.startOffsetY = startOffsetY;
      this.drawing = true;
      this.isChange = true;
      this.startClientX = startClientX;
      this.startClientY = startClientY;
      this.defaultOffsetX = this.startOffsetX;
      this.defaultOffsetY = this.startOffsetY;
      this.ableChangeX = ableChangeX;
      this.ableChangeY = ableChangeY;
      this.dragPositionX = dragPositionX;
      this.dragPositionY = dragPositionY;
      this.oldW = this.w;
      this.oldH = this.h;
    }
  }, {
    key: 'draw',
    value: function draw(_ref6) {
      var _this3 = this;

      var nowClientX = _ref6.nowClientX,
          nowClientY = _ref6.nowClientY,
          vue = _ref6.vue,
          drawBard = _ref6.drawBard;

      this.drawing && vue.$nextTick(function () {
        var fw = ~~(nowClientX - _this3.startClientX);
        var fh = ~~(nowClientY - _this3.startClientY);
        if (_this3.ableChangeX) {
          if (_this3.dragPositionX === 'right') {
            if (fw > 0) {
              _this3.w = _this3.oldW + fw > drawBard.maxDrawWidth - _this3.defaultOffsetX ? drawBard.maxDrawWidth - _this3.defaultOffsetX : _this3.oldW + fw;
            } else {
              _this3.w = Math.abs(fw) < _this3.oldW ? _this3.oldW - Math.abs(fw) : Math.abs(fw) - _this3.oldW > _this3.defaultOffsetX ? _this3.defaultOffsetX : Math.abs(fw) - _this3.oldW;
              _this3.startOffsetX = Math.abs(fw) < _this3.oldW ? _this3.defaultOffsetX : Math.abs(fw) - _this3.oldW > _this3.defaultOffsetX ? 0 : _this3.defaultOffsetX - Math.abs(fw) + _this3.oldW;
            }
          } else if (_this3.dragPositionX === 'left') {
            if (fw > 0) {
              _this3.w = _this3.oldW - fw > 0 ? _this3.oldW - fw : fw - _this3.oldW > drawBard.maxDrawWidth - _this3.defaultOffsetX - _this3.oldW ? drawBard.maxDrawWidth - _this3.defaultOffsetX - _this3.oldW : fw - _this3.oldW;
              _this3.startOffsetX = _this3.oldW - fw > 0 ? _this3.defaultOffsetX + fw : _this3.defaultOffsetX + _this3.oldW;
            } else {
              _this3.w = Math.abs(fw) > _this3.defaultOffsetX ? _this3.oldW + _this3.defaultOffsetX : _this3.oldW + Math.abs(fw);
              _this3.startOffsetX = Math.abs(fw) > _this3.defaultOffsetX ? 0 : _this3.defaultOffsetX - Math.abs(fw);
            }
          }
        }
        if (_this3.ableChangeY) {
          if (_this3.dragPositionY === 'top') {
            if (fh > 0) {
              _this3.h = _this3.oldH - fh > 0 ? _this3.oldH - fh : fh - _this3.oldH > drawBard.maxDrawHeight - _this3.oldH - _this3.defaultOffsetY ? drawBard.maxDrawHeight - _this3.defaultOffsetY - _this3.oldH : fh - _this3.oldH;
              _this3.startOffsetY = _this3.oldH - fh > 0 ? _this3.defaultOffsetY + fh : _this3.defaultOffsetY + _this3.oldH;
            } else {
              _this3.h = Math.abs(fh) > _this3.defaultOffsetY ? _this3.oldH + _this3.defaultOffsetY : _this3.oldH + Math.abs(fh);
              _this3.startOffsetY = Math.abs(fh) > _this3.defaultOffsetY ? 0 : _this3.defaultOffsetY - Math.abs(fh);
            }
          } else if (_this3.dragPositionY === 'bottom') {
            if (fh > 0) {
              _this3.h = _this3.oldH + fh > drawBard.maxDrawHeight - _this3.defaultOffsetY ? drawBard.maxDrawHeight - _this3.defaultOffsetY : _this3.oldH + fh;
            } else {
              _this3.h = Math.abs(fh) < _this3.oldH ? _this3.oldH - Math.abs(fh) : Math.abs(fh) - _this3.oldH > _this3.defaultOffsetY ? _this3.defaultOffsetY : Math.abs(fh) - _this3.oldH;
              _this3.startOffsetY = Math.abs(fh) < _this3.oldH ? _this3.defaultOffsetY : Math.abs(fh) - _this3.oldH > _this3.defaultOffsetY ? 0 : _this3.defaultOffsetY - Math.abs(fh) + _this3.oldH;
            }
          }
        }
      });
    }
  }, {
    key: 'endDraw',
    value: function endDraw() {
      this.drawing = false;
    }
  }, {
    key: 'startMove',
    value: function startMove(_ref7) {
      var startClientX = _ref7.startClientX,
          startClientY = _ref7.startClientY;

      this.startClientX = startClientX;
      this.startClientY = startClientY;
      this.defaultOffsetX = this.startOffsetX;
      this.defaultOffsetY = this.startOffsetY;
      this.isMove = true;
    }
  }, {
    key: 'move',
    value: function move(_ref8) {
      var _this4 = this;

      var nowClientX = _ref8.nowClientX,
          nowClientY = _ref8.nowClientY,
          vue = _ref8.vue,
          drawBard = _ref8.drawBard;

      this.isMove && vue.$nextTick(function () {
        var moveW = ~~(nowClientX - _this4.startClientX);
        var moveH = ~~(nowClientY - _this4.startClientY);
        if (moveW > 0) {
          _this4.startOffsetX = moveW > drawBard.imgBoxW - _this4.w - _this4.defaultOffsetX ? drawBard.imgBoxW - _this4.w : _this4.defaultOffsetX + moveW;
        } else {
          _this4.startOffsetX = Math.abs(moveW) < _this4.defaultOffsetX ? _this4.defaultOffsetX + moveW : 0;
        }
        if (moveH > 0) {
          _this4.startOffsetY = moveH > drawBard.imgBoxH - _this4.h - _this4.defaultOffsetY ? drawBard.imgBoxH - _this4.h : _this4.defaultOffsetY + moveH;
        } else {
          _this4.startOffsetY = Math.abs(moveH) < _this4.defaultOffsetY ? _this4.defaultOffsetY + moveH : 0;
        }
      });
    }
  }, {
    key: 'endMove',
    value: function endMove() {
      this.isMove = false;
    }
  }]);

  return DrawSquareness;
}();

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'test',
  data: function data() {
    return {
      a: 1,
      b: '',
      rotate: 0,
      count: '',
      open: true,
      editing: false,
      img: '',
      squareness: [],
      support: '',
      drawBard: {},
      currentSquare: {}
    };
  },

  watch: {
    img: function img(oldVal, newVal) {
      if (newVal !== oldVal) {
        this.initDrawbard();
      }
    },
    'drawBard.editing': function drawBardEditing(oldVal, newVal) {
      if (newVal) this.currentSquare.isChange = false;
    }
  },
  methods: {
    scaleImg: function scaleImg(e) {
      var change = e.deltaY || e.wheelDelta;
      this.drawBard.changeSize({ change: change });
    },
    cancleScale: function cancleScale() {},
    mousedownTarget: function mousedownTarget(e) {
      e.preventDefault();
      var startX = e.clientX;
      var startY = e.clientY;
      var offsetX = e.offsetX;
      var offsetY = e.offsetY;
      if (!this.drawBard.editing) {
        this.drawBard.startMove(startX, startY, this);
      } else {
        if (this.currentSquare.isChange && !!this.currentSquare.isChange) {
          this.currentSquare.isChange = false;
        }
        this.currentSquare = new DrawSquareness({});
        this.currentSquare.startChange({
          startClientX: startX,
          startClientY: startY,
          startOffsetX: offsetX,
          startOffsetY: offsetY
        });
        this.squareness.push(this.currentSquare);
      }
    },
    mousemoveTarget: function mousemoveTarget(e) {
      e.preventDefault();
      var nowX = e.clientX;
      var nowY = e.clientY;
      if (!this.drawBard.editing) {
        this.drawBard.move(nowX, nowY, this);
      } else {
        if (this.currentSquare.isMove) {
          this.currentSquare.move({ nowClientX: nowX, nowClientY: nowY, vue: this, drawBard: this.drawBard });
        } else {
          this.currentSquare.drawing && this.currentSquare.isChange && this.currentSquare.draw({ nowClientX: nowX, nowClientY: nowY, vue: this, drawBard: this.drawBard });
        }
      }
    },
    mouseupTarget: function mouseupTarget(e) {
      if (!this.drawBard.editing) {
        this.drawBard.endMove();
      } else {
        this.currentSquare.isMove && this.currentSquare.endMove();
        this.currentSquare.drawing && this.currentSquare.endDraw();
      }
    },
    mouseoutTarget: function mouseoutTarget(e) {
      if (!this.drawBard.editing) {
        this.drawBard.endMove();
      }
    },
    changeSquareSize: function changeSquareSize(_ref9) {
      var e = _ref9.e,
          target = _ref9.target,
          ableChangeX = _ref9.ableChangeX,
          ableChangeY = _ref9.ableChangeY,
          dragPositionX = _ref9.dragPositionX,
          dragPositionY = _ref9.dragPositionY;

      var startClientX = e.clientX;
      var startClientY = e.clientY;
      this.currentSquare = target;
      this.currentSquare.startChange({ startClientX: startClientX, startClientY: startClientY, ableChangeX: ableChangeX, ableChangeY: ableChangeY, dragPositionX: dragPositionX, dragPositionY: dragPositionY });
    },
    clickSquare: function clickSquare(_ref10) {
      var e = _ref10.e,
          target = _ref10.target;

      if (!this.drawBard.editing) return;
      if (target.isChange && !!target.isChange) return;
      if (this.currentSquare.isChange && !!this.currentSquare.isChange) {
        this.currentSquare.isChange = false;
      }
      this.currentSquare = target;
      this.currentSquare.isChange = true;
    },
    mousedownSquare: function mousedownSquare(_ref11) {
      var e = _ref11.e,
          target = _ref11.target;

      if (!this.drawBard.editing) return;
      var startClientX = e.clientX;
      var startClientY = e.clientY;
      if (this.currentSquare.isChange && !!this.currentSquare.isChange) {
        this.currentSquare.isChange = false;
      }
      this.currentSquare = target;
      this.currentSquare.isChange = true;
      this.currentSquare.startMove({ startClientX: startClientX, startClientY: startClientY });
    },
    mouseoutSquare: function mouseoutSquare(e) {
      this.currentSquare.isMove && this.currentSquare.endMove();
    },
    uploadImg: function uploadImg(e) {
      var _this5 = this;

      this.file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$alert('请选择以下图片类型：.gif/jpeg/jpg/png/bmp', '提示');
        return false;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        _this5.img = e.target.result;
      };
      reader.readAsDataURL(this.file);
      this.open = true;
    },
    clickEdit: function clickEdit() {
      this.drawBard.editing = !this.drawBard.editing;
    },
    clickDel: function clickDel(index) {
      this.squareness.splice(index, 1);
    },
    clearMarks: function clearMarks() {
      this.squareness.length && this.squareness.splice(0, this.squareness.length);
    },
    send: function send() {
      if (!this.squareness.length) return false;
      var obj = [];
      this.squareness.forEach(function (item) {
        if (item.w > 0 && item.h > 0) obj.push({ w: item.w, h: item.h, x: item.startOffsetX, y: item.startOffsetY, label: '' });
      });
      this.editing = false;
      var formdata = new FormData();
      formdata.append('file', this.file);
      formdata.append('marks', __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(obj));
      __WEBPACK_IMPORTED_MODULE_3_axios___default.a.post('http://192.168.10.117:93/app/add_image', formdata).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    },
    initDrawbard: function initDrawbard() {
      this.drawBard.w = 0;
      this.drawBard.h = 0;
      this.drawBard.x = 0;
      this.drawBard.y = 0;
      this.drawBard.imgBoxW = 0;
      this.drawBard.imgBoxH = 0;
      this.drawBard.maxDrawWidth = 0;
      this.drawBard.maxDrawHeight = 0;
      this.drawBard.moveX = 0;
      this.drawBard.moveY = 0;
      this.drawBard.editing = false;
      this.drawBard.moving = false;
      this.currentSquare = {};
      this.clearMarks();
    }
  },
  mounted: function mounted() {
    this.b = this.a;
    this.drawBard = new DrawBard({});
    this.drawBard.imgReload({ vue: this });
  },
  destroyed: function destroyed() {
    this.editing = false;
  }
});

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(164), __esModule: true };

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(165), __esModule: true };

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(166), __esModule: true };

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(167), __esModule: true };

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(162);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(161);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(82)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(133);
__webpack_require__(134);
__webpack_require__(135);
__webpack_require__(196);
module.exports = __webpack_require__(82).Promise;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(197);
__webpack_require__(133);
__webpack_require__(198);
__webpack_require__(199);
module.exports = __webpack_require__(82).Symbol;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(134);
__webpack_require__(135);
module.exports = __webpack_require__(116).f('iterator');

/***/ }),
/* 168 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 169 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(89)
  , toLength  = __webpack_require__(132)
  , toIndex   = __webpack_require__(192);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(103)
  , gOPS    = __webpack_require__(128)
  , pIE     = __webpack_require__(111);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(90)
  , call        = __webpack_require__(177)
  , isArrayIter = __webpack_require__(175)
  , anObject    = __webpack_require__(84)
  , toLength    = __webpack_require__(132)
  , getIterFn   = __webpack_require__(194)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 173 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(94);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(96)
  , ITERATOR   = __webpack_require__(80)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(94);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(84);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(126)
  , descriptor     = __webpack_require__(92)
  , setToStringTag = __webpack_require__(104)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(85)(IteratorPrototype, __webpack_require__(80)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(80)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(103)
  , toIObject = __webpack_require__(89);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(105)('meta')
  , isObject = __webpack_require__(86)
  , has      = __webpack_require__(88)
  , setDesc  = __webpack_require__(83).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(87)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(78)
  , macrotask = __webpack_require__(131).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(94)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(83)
  , anObject = __webpack_require__(84)
  , getKeys  = __webpack_require__(103);

module.exports = __webpack_require__(79) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(111)
  , createDesc     = __webpack_require__(92)
  , toIObject      = __webpack_require__(89)
  , toPrimitive    = __webpack_require__(97)
  , has            = __webpack_require__(88)
  , IE8_DOM_DEFINE = __webpack_require__(101)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(79) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(89)
  , gOPN      = __webpack_require__(127).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(88)
  , toObject    = __webpack_require__(193)
  , IE_PROTO    = __webpack_require__(112)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(85);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(78)
  , core        = __webpack_require__(82)
  , dP          = __webpack_require__(83)
  , DESCRIPTORS = __webpack_require__(79)
  , SPECIES     = __webpack_require__(80)('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(84)
  , aFunction = __webpack_require__(93)
  , SPECIES   = __webpack_require__(80)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(114)
  , defined   = __webpack_require__(109);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(114)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(109);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(123)
  , ITERATOR  = __webpack_require__(80)('iterator')
  , Iterators = __webpack_require__(96);
module.exports = __webpack_require__(82).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(168)
  , step             = __webpack_require__(180)
  , Iterators        = __webpack_require__(96)
  , toIObject        = __webpack_require__(89);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(125)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(102)
  , global             = __webpack_require__(78)
  , ctx                = __webpack_require__(90)
  , classof            = __webpack_require__(123)
  , $export            = __webpack_require__(91)
  , isObject           = __webpack_require__(86)
  , aFunction          = __webpack_require__(93)
  , anInstance         = __webpack_require__(169)
  , forOf              = __webpack_require__(172)
  , speciesConstructor = __webpack_require__(190)
  , task               = __webpack_require__(131).set
  , microtask          = __webpack_require__(183)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(80)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(188)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(104)($Promise, PROMISE);
__webpack_require__(189)(PROMISE);
Wrapper = __webpack_require__(82)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(179)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(78)
  , has            = __webpack_require__(88)
  , DESCRIPTORS    = __webpack_require__(79)
  , $export        = __webpack_require__(91)
  , redefine       = __webpack_require__(130)
  , META           = __webpack_require__(182).KEY
  , $fails         = __webpack_require__(87)
  , shared         = __webpack_require__(113)
  , setToStringTag = __webpack_require__(104)
  , uid            = __webpack_require__(105)
  , wks            = __webpack_require__(80)
  , wksExt         = __webpack_require__(116)
  , wksDefine      = __webpack_require__(115)
  , keyOf          = __webpack_require__(181)
  , enumKeys       = __webpack_require__(171)
  , isArray        = __webpack_require__(176)
  , anObject       = __webpack_require__(84)
  , toIObject      = __webpack_require__(89)
  , toPrimitive    = __webpack_require__(97)
  , createDesc     = __webpack_require__(92)
  , _create        = __webpack_require__(126)
  , gOPNExt        = __webpack_require__(186)
  , $GOPD          = __webpack_require__(185)
  , $DP            = __webpack_require__(83)
  , $keys          = __webpack_require__(103)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(127).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(111).f  = $propertyIsEnumerable;
  __webpack_require__(128).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(102)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(85)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(115)('asyncIterator');

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(115)('observable');

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(73)(true);
// imports


// module
exports.push([module.i, ".draw-container[data-v-0a30088a]{display:-ms-flexbox;display:-webkit-box;display:flex;-ms-flex-pack:center;-webkit-box-pack:center;justify-content:center;-ms-flex-align:center;-webkit-box-align:center;align-items:center;position:absolute;left:0;top:0;right:0;bottom:0}.vue-canvas[data-v-0a30088a]{width:90%;height:80%;overflow:hidden;position:relative;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;direction:ltr;-ms-touch-action:none;touch-action:none;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC\")}.vue-canvas-drag-box[data-v-0a30088a]{position:absolute;left:0;top:0;right:0;bottom:0}.vue-canvas-target img[data-v-0a30088a]{position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:none;transform:none}.cursor-move[data-v-0a30088a]{cursor:move}.img-draw[data-v-0a30088a]{cursor:crosshair}.vue-selected-square[data-v-0a30088a]{position:absolute;left:0;top:0;border:1px solid red}.square-info[data-v-0a30088a]{position:absolute;left:-3px;top:-23px;min-width:65px;text-align:center;color:#fff;line-height:20px;background-color:rgba(0,0,0,.5);font-size:12px}.square-face[data-v-0a30088a]{cursor:default;position:absolute;top:0;right:0;bottom:0;left:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#fff;opacity:.1}.del-btn[data-v-0a30088a]{cursor:pointer;position:absolute;right:-10px;top:-23px;height:20px;width:20px;text-align:center;line-height:20px;border-radius:20px;color:#fff;background-color:rgba(0,0,0,.5);font-size:12px}.square-line[data-v-0a30088a]{position:absolute;display:block;width:100%;height:100%;opacity:.1}.line-w[data-v-0a30088a]{top:-3px;left:0;height:5px;cursor:n-resize}.line-a[data-v-0a30088a]{top:0;left:-3px;width:5px;cursor:w-resize}.line-s[data-v-0a30088a]{bottom:-3px;left:0;height:5px;cursor:s-resize}.line-d[data-v-0a30088a]{top:0;right:-3px;width:5px;cursor:e-resize}.square-move-point[data-v-0a30088a]{position:absolute;width:8px;height:8px;opacity:.75;background-color:#ff514c;border-radius:100%}.point1[data-v-0a30088a]{top:-4px;left:-4px;cursor:nw-resize}.point2[data-v-0a30088a]{top:-5px;left:50%;margin-left:-3px;cursor:n-resize}.point3[data-v-0a30088a]{top:-4px;right:-4px;cursor:ne-resize}.point4[data-v-0a30088a]{top:50%;left:-4px;margin-top:-3px;cursor:w-resize}.point5[data-v-0a30088a]{top:50%;right:-4px;margin-top:-3px;cursor:w-resize}.point6[data-v-0a30088a]{bottom:-5px;left:-4px;cursor:sw-resize}.point7[data-v-0a30088a]{bottom:-5px;left:50%;margin-left:-3px;cursor:s-resize}.point8[data-v-0a30088a]{bottom:-5px;right:-4px;cursor:nw-resize}@media screen and (max-width:500px){.square-move-point[data-v-0a30088a]{position:absolute;width:20px;height:20px;opacity:.45;background-color:#39f;border-radius:100%}.point1[data-v-0a30088a]{top:-10px;left:-10px}.point2[data-v-0a30088a],.point4[data-v-0a30088a],.point5[data-v-0a30088a],.point7[data-v-0a30088a]{display:none}.point3[data-v-0a30088a]{top:-10px;right:-10px}.point4[data-v-0a30088a]{top:0;left:0}.point6[data-v-0a30088a]{bottom:-10px;left:-10px}.point8[data-v-0a30088a]{bottom:-10px;right:-10px}}", "", {"version":3,"sources":["/Applications/XAMPP/xamppfiles/htdocs/XaircraftProject/web/AI/src/views/test/index.vue"],"names":[],"mappings":"AACA,iCACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,qBAAsB,AACd,wBAAyB,AAC7B,uBAAwB,AAC5B,sBAAuB,AACf,yBAA0B,AAC9B,mBAAoB,AACxB,kBAAmB,AACnB,OAAQ,AACR,MAAO,AACP,QAAS,AACT,QAAU,CACX,AACD,6BACE,UAAW,AACX,WAAY,AACZ,gBAAiB,AACjB,kBAAmB,AACnB,sBAAuB,AACvB,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,iBAAkB,AAC1B,cAAe,AACf,sBAAuB,AACnB,kBAAmB,AACvB,8QAAgR,CACjR,AACD,sCACE,kBAAmB,AACnB,OAAQ,AACR,MAAO,AACP,QAAS,AACT,QAAU,CACX,AACD,wCACE,kBAAmB,AACnB,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,iBAAkB,AAC1B,uBAAwB,AAChB,cAAgB,CACzB,AACD,8BACE,WAAa,CACd,AACD,2BACE,gBAAkB,CACnB,AACD,sCACE,kBAAmB,AACnB,OAAQ,AACR,MAAO,AACP,oBAAqB,CACtB,AACD,8BACE,kBAAmB,AACnB,UAAW,AACX,UAAW,AACX,eAAgB,AAChB,kBAAmB,AACnB,WAAa,AACb,iBAAkB,AAClB,gCAAqC,AACrC,cAAgB,CACjB,AACD,8BACE,eAAgB,AAChB,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,SAAU,AACV,OAAQ,AACR,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,iBAAkB,AAC1B,sBAAuB,AACvB,UAAa,CACd,AACD,0BACE,eAAgB,AAChB,kBAAmB,AACnB,YAAa,AACb,UAAW,AACX,YAAa,AACb,WAAY,AACZ,kBAAmB,AACnB,iBAAkB,AAClB,mBAAoB,AACpB,WAAa,AACb,gCAAqC,AACrC,cAAgB,CACjB,AACD,8BACE,kBAAmB,AACnB,cAAe,AACf,WAAY,AACZ,YAAa,AACb,UAAY,CACb,AACD,yBACE,SAAU,AACV,OAAQ,AACR,WAAY,AACZ,eAAiB,CAClB,AACD,yBACE,MAAO,AACP,UAAW,AACX,UAAW,AACX,eAAiB,CAClB,AACD,yBACE,YAAa,AACb,OAAQ,AACR,WAAY,AACZ,eAAiB,CAClB,AACD,yBACE,MAAO,AACP,WAAY,AACZ,UAAW,AACX,eAAiB,CAClB,AACD,oCACE,kBAAmB,AACnB,UAAW,AACX,WAAY,AACZ,YAAa,AACb,yBAA0B,AAC1B,kBAAoB,CACrB,AACD,yBACE,SAAU,AACV,UAAW,AACX,gBAAkB,CACnB,AACD,yBACE,SAAU,AACV,SAAU,AACV,iBAAkB,AAClB,eAAiB,CAClB,AACD,yBACE,SAAU,AACV,WAAY,AACZ,gBAAkB,CACnB,AACD,yBACE,QAAS,AACT,UAAW,AACX,gBAAiB,AACjB,eAAiB,CAClB,AACD,yBACE,QAAS,AACT,WAAY,AACZ,gBAAiB,AACjB,eAAiB,CAClB,AACD,yBACE,YAAa,AACb,UAAW,AACX,gBAAkB,CACnB,AACD,yBACE,YAAa,AACb,SAAU,AACV,iBAAkB,AAClB,eAAiB,CAClB,AACD,yBACE,YAAa,AACb,WAAY,AACZ,gBAAkB,CACnB,AACD,oCACA,oCACI,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,YAAa,AACb,sBAAuB,AACvB,kBAAoB,CACvB,AACD,yBACI,UAAW,AACX,UAAY,CACf,AACD,oGACI,YAAc,CACjB,AACD,yBACI,UAAW,AACX,WAAa,CAChB,AACD,yBACI,MAAO,AACP,MAAQ,CACX,AACD,yBACI,aAAc,AACd,UAAY,CACf,AACD,yBACI,aAAc,AACd,WAAa,CAChB,CACA","file":"index.vue","sourcesContent":["\n.draw-container[data-v-0a30088a]{\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n  -ms-flex-pack: center;\n          -webkit-box-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n          -webkit-box-align: center;\n      align-items: center;\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n.vue-canvas[data-v-0a30088a] {\n  width: 90%;\n  height: 80%;\n  overflow: hidden;\n  position: relative;\n  box-sizing: border-box;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  direction: ltr;\n  -ms-touch-action: none;\n      touch-action: none;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');\n}\n.vue-canvas-drag-box[data-v-0a30088a] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n.vue-canvas-target img[data-v-0a30088a] {\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transform: none;\n          transform: none;\n}\n.cursor-move[data-v-0a30088a] {\n  cursor: move;\n}\n.img-draw[data-v-0a30088a] {\n  cursor: crosshair;\n}\n.vue-selected-square[data-v-0a30088a] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  border: 1px solid red\n}\n.square-info[data-v-0a30088a] {\n  position: absolute;\n  left: -3px;\n  top: -23px;\n  min-width: 65px;\n  text-align: center;\n  color: white;\n  line-height: 20px;\n  background-color: rgba(0, 0, 0, 0.5);\n  font-size: 12px;\n}\n.square-face[data-v-0a30088a] {\n  cursor: default;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #fff;\n  opacity: 0.1;\n}\n.del-btn[data-v-0a30088a] {\n  cursor: pointer;\n  position: absolute;\n  right: -10px;\n  top: -23px;\n  height: 20px;\n  width: 20px;\n  text-align: center;\n  line-height: 20px;\n  border-radius: 20px;\n  color: white;\n  background-color: rgba(0, 0, 0, 0.5);\n  font-size: 12px;\n}\n.square-line[data-v-0a30088a] {\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100%;\n  opacity: .1;\n}\n.line-w[data-v-0a30088a] {\n  top: -3px;\n  left: 0;\n  height: 5px;\n  cursor: n-resize;\n}\n.line-a[data-v-0a30088a] {\n  top: 0;\n  left: -3px;\n  width: 5px;\n  cursor: w-resize;\n}\n.line-s[data-v-0a30088a] {\n  bottom: -3px;\n  left: 0;\n  height: 5px;\n  cursor: s-resize;\n}\n.line-d[data-v-0a30088a] {\n  top: 0;\n  right: -3px;\n  width: 5px;\n  cursor: e-resize;\n}\n.square-move-point[data-v-0a30088a] {\n  position: absolute;\n  width: 8px;\n  height: 8px;\n  opacity: .75;\n  background-color: #ff514c;\n  border-radius: 100%;\n}\n.point1[data-v-0a30088a] {\n  top: -4px;\n  left: -4px;\n  cursor: nw-resize;\n}\n.point2[data-v-0a30088a] {\n  top: -5px;\n  left: 50%;\n  margin-left: -3px;\n  cursor: n-resize;\n}\n.point3[data-v-0a30088a] {\n  top: -4px;\n  right: -4px;\n  cursor: ne-resize;\n}\n.point4[data-v-0a30088a] {\n  top: 50%;\n  left: -4px;\n  margin-top: -3px;\n  cursor: w-resize;\n}\n.point5[data-v-0a30088a] {\n  top: 50%;\n  right: -4px;\n  margin-top: -3px;\n  cursor: w-resize;\n}\n.point6[data-v-0a30088a] {\n  bottom: -5px;\n  left: -4px;\n  cursor: sw-resize;\n}\n.point7[data-v-0a30088a] {\n  bottom: -5px;\n  left: 50%;\n  margin-left: -3px;\n  cursor: s-resize;\n}\n.point8[data-v-0a30088a] {\n  bottom: -5px;\n  right: -4px;\n  cursor: nw-resize;\n}\n@media screen and (max-width: 500px) {\n.square-move-point[data-v-0a30088a] {\n    position: absolute;\n    width: 20px;\n    height: 20px;\n    opacity: .45;\n    background-color: #39f;\n    border-radius: 100%;\n}\n.point1[data-v-0a30088a] {\n    top: -10px;\n    left: -10px;\n}\n.point2[data-v-0a30088a], .point4[data-v-0a30088a], .point5[data-v-0a30088a], .point7[data-v-0a30088a] {\n    display: none;\n}\n.point3[data-v-0a30088a] {\n    top: -10px;\n    right: -10px;\n}\n.point4[data-v-0a30088a] {\n    top: 0;\n    left: 0;\n}\n.point6[data-v-0a30088a] {\n    bottom: -10px;\n    left: -10px;\n}\n.point8[data-v-0a30088a] {\n    bottom: -10px;\n    right: -10px;\n}\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 201 */,
/* 202 */,
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(200);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(74)("ab543186", content, true);

/***/ }),
/* 204 */,
/* 205 */,
/* 206 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 207 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 208 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticStyle: {
      "position": "absolute",
      "z-index": "1",
      "left": "5%",
      "top": "3%"
    }
  }, [_c('label', {
    staticClass: "el-button el-button--primary",
    attrs: {
      "for": "file_input"
    }
  }, [_vm._v("\n      选择图片\n      "), _c('input', {
    staticStyle: {
      "position": "absolute",
      "clip": "rect(0 0 0 0)",
      "left": "-1000px",
      "top": "0"
    },
    attrs: {
      "type": "file",
      "id": "file_input"
    },
    on: {
      "change": _vm.uploadImg
    }
  })]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.clickEdit
    }
  }, [_vm._v("\n      " + _vm._s(_vm.drawBard.editing ? '结束标记' : '开始标记') + "\n    ")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.clearMarks
    }
  }, [_vm._v("\n      清除全部标记\n    ")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.send
    }
  }, [_vm._v("\n      完成提交\n    ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "draw-container",
    on: {
      "mousemove": _vm.mousemoveTarget,
      "mouseup": _vm.mouseupTarget
    }
  }, [_c('div', {
    ref: "canvas",
    staticClass: "vue-canvas"
  }, [_c('div', {
    staticClass: "vue-canvas-target",
    class: {
      'cursor-move': !_vm.drawBard.editing, 'img-draw': _vm.drawBard.editing
    },
    style: ({
      'width': _vm.drawBard.imgBoxW + 'px',
      'height': _vm.drawBard.imgBoxH + 'px',
      'transform': 'scale(' + _vm.drawBard.scale + ',' + _vm.drawBard.scale + ') ' + 'translate3d(' + _vm.drawBard.x / _vm.drawBard.scale + 'px,' + _vm.drawBard.y / _vm.drawBard.scale + 'px,' + '0)' +
        'rotateZ(' + _vm.rotate * 90 + 'deg)'
    }),
    on: {
      "mousedown": _vm.mousedownTarget,
      "mouseout": _vm.mouseoutTarget
    }
  }, [_c('img', {
    ref: "targetImg",
    attrs: {
      "src": _vm.img
    }
  }), _vm._v(" "), _vm._l((_vm.squareness), function(item, index) {
    return _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (item.w > 0 && item.h > 0),
        expression: "item.w>0 && item.h>0"
      }],
      staticClass: "vue-selected-square",
      style: ({
        'width': item.w + 'px',
        'height': item.h + 'px',
        'transform': 'translate3d(' + item.startOffsetX / _vm.drawBard.scale + 'px,' + item.startOffsetY / _vm.drawBard.scale + 'px,' + '0)'
      })
    }, [(item.w > 0) ? _c('span', {
      staticClass: "square-info"
    }, [_vm._v(_vm._s(item.w) + " × " + _vm._s(item.h))]) : _vm._e(), _vm._v(" "), (!item.isChange) ? _c('span', {
      staticClass: "del-btn"
    }, [_c('i', {
      staticClass: "ali-icon-shanchu",
      on: {
        "click": function($event) {
          _vm.clickDel(index)
        }
      }
    })]) : _vm._e(), _vm._v(" "), _c('span', {
      staticClass: "square-face",
      class: {
        'cursor-move': item.isMove
      },
      on: {
        "dblclick": function($event) {
          $event.stopPropagation();
          _vm.clickSquare({
            e: $event,
            target: item
          })
        },
        "mousedown": function($event) {
          $event.stopPropagation();
          _vm.mousedownSquare({
            e: $event,
            target: item
          })
        },
        "mouseout": function($event) {
          $event.stopPropagation();
          _vm.mouseoutSquare($event)
        }
      }
    }), _vm._v(" "), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (item.isChange),
        expression: "item.isChange"
      }]
    }, [_c('span', {
      staticClass: "square-line line-w",
      on: {
        "mousedown": function($event) {
          $event.stopPropagation();
          _vm.changeSquareSize({
            e: $event,
            target: item,
            ableChangeX: false,
            ableChangeY: true,
            dragPositionY: 'top'
          })
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "square-line line-a",
      on: {
        "mousedown": function($event) {
          $event.stopPropagation();
          _vm.changeSquareSize({
            e: $event,
            target: item,
            ableChangeX: true,
            ableChangeY: false,
            dragPositionX: 'left'
          })
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "square-line line-s",
      on: {
        "mousedown": function($event) {
          $event.stopPropagation();
          _vm.changeSquareSize({
            e: $event,
            target: item,
            ableChangeX: false,
            ableChangeY: true,
            dragPositionY: 'bottom'
          })
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "square-line line-d",
      on: {
        "mousedown": function($event) {
          $event.stopPropagation();
          _vm.changeSquareSize({
            e: $event,
            target: item,
            ableChangeX: true,
            ableChangeY: false,
            dragPositionX: 'right'
          })
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "square-move-point point1",
      on: {
        "mousedown": function($event) {
          $event.stopPropagation();
          _vm.changeSquareSize({
            e: $event,
            target: item,
            ableChangeX: true,
            ableChangeY: true,
            dragPositionX: 'left',
            dragPositionY: 'top'
          })
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "square-move-point point2",
      on: {
        "mousedown": function($event) {
          $event.stopPropagation();
          _vm.changeSquareSize({
            e: $event,
            target: item,
            ableChangeX: false,
            ableChangeY: true,
            dragPositionY: 'top'
          })
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "square-move-point point3",
      on: {
        "mousedown": function($event) {
          $event.stopPropagation();
          _vm.changeSquareSize({
            e: $event,
            target: item,
            ableChangeX: true,
            ableChangeY: true,
            dragPositionX: 'right',
            dragPositionY: 'top'
          })
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "square-move-point point4",
      on: {
        "mousedown": function($event) {
          $event.stopPropagation();
          _vm.changeSquareSize({
            e: $event,
            target: item,
            ableChangeX: true,
            ableChangeY: false,
            dragPositionX: 'left'
          })
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "square-move-point point5",
      on: {
        "mousedown": function($event) {
          $event.stopPropagation();
          _vm.changeSquareSize({
            e: $event,
            target: item,
            ableChangeX: true,
            ableChangeY: false,
            dragPositionX: 'right'
          })
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "square-move-point point6",
      on: {
        "mousedown": function($event) {
          $event.stopPropagation();
          _vm.changeSquareSize({
            e: $event,
            target: item,
            ableChangeX: true,
            ableChangeY: true,
            dragPositionX: 'left',
            dragPositionY: 'bottom'
          })
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "square-move-point point7",
      on: {
        "mousedown": function($event) {
          $event.stopPropagation();
          _vm.changeSquareSize({
            e: $event,
            target: item,
            ableChangeX: false,
            ableChangeY: true,
            dragPositionY: 'bottom'
          })
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "square-move-point point8",
      on: {
        "mousedown": function($event) {
          $event.stopPropagation();
          _vm.changeSquareSize({
            e: $event,
            target: item,
            ableChangeX: true,
            ableChangeY: true,
            dragPositionX: 'right',
            dragPositionY: 'bottom'
          })
        }
      }
    })])])
  })], 2)])])])
},staticRenderFns: []}

/***/ })
]));
//# sourceMappingURL=0.f39c337816cff65b0e5a.js.map