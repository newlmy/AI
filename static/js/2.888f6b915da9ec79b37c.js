webpackJsonp([2],{

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(197)
}
var Component = __webpack_require__(162)(
  /* script */
  __webpack_require__(189),
  /* template */
  __webpack_require__(206),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0a30088a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(167);

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

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(43)
  , TAG = __webpack_require__(8)('toStringTag')
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

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(70)
  , invoke             = __webpack_require__(173)
  , html               = __webpack_require__(72)
  , cel                = __webpack_require__(44)
  , global             = __webpack_require__(3)
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
  if(__webpack_require__(43)(process) == 'process'){
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

/***/ 162:
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

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(170), __esModule: true };

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fixType */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return autoDownload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fileTransformDataURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return textTransformDataURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return toXml; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return canvasTransformDataURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return dataTransformJSONDataURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return fileTransformJSON; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__);



function fixType(type) {
  return 'image/' + type.toLocaleLowerCase().replace(/jpg/i, 'jpeg').match(/png|jpeg|bmp|gif/)[0];
}
function isImage(path) {
  return (/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(path)
  );
}
function isJSON(path) {
  return (/\.(json)$/.test(path)
  );
}
function getFile(_ref) {
  var e = _ref.e,
      type = _ref.type;

  var files = e.target.files;
  if (files.length <= 0) return false;
  if (type === 'multiple') {
    var arr = [];
    files.forEach(function (file) {
      var index = file.name.lastIndexOf('.');
      arr.push({
        file: file,
        name: file.name.substring(0, index),
        ext: file.name.substr(index)
      });
    });
    return arr;
  } else {
    var file = files[0];
    var index = file.name.lastIndexOf('.');
    return {
      file: file,
      name: file.name.substring(0, index),
      ext: file.name.substr(index)
    };
  }
}
function fileTransformDataURL(file) {
  return URL.createObjectURL(file);
}
function canvasTransformDataURL(_ref2) {
  var canvas = _ref2.canvas,
      _ref2$imgType = _ref2.imgType,
      imgType = _ref2$imgType === undefined ? 'png' : _ref2$imgType;

  var promise = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    canvas.toBlob(function (blob) {
      var d = URL.createObjectURL(blob);
      resolve(d);
    });
  });
  return promise;
}
function dataTransformJSONDataURL(data) {
  return URL.createObjectURL(new Blob([__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify___default()(data)]));
}
function fileTransformJSON(file) {
  var promise = new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    var oFReader = new FileReader();
    oFReader.onload = function (result) {
      resolve(result);
    };
    oFReader.readAsText(file);
  });
  return promise;
}
function textTransformDataURL(text) {
  return URL.createObjectURL(new Blob([text]));
}
function toXml(obj, arrTagKey, inTag) {
  if (obj === null || obj === undefined) return '';
  var type = typeof obj === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(obj);
  switch (type) {
    case 'boolean':
    case 'number':
    case 'string':
      return inTag ? obj.toString() : '<value>' + obj + '</value>';
    case 'object':
      var innerXml = '';
      if (obj instanceof Array) {
        for (var index in obj) {
          var item = obj[index];
          var key = arrTagKey && item[arrTagKey];
          innerXml += key ? '<' + key + '>' + toXml(item, arrTagKey, true) + '</' + key + '>' : toXml(item, arrTagKey, false);
        }
      } else {
        for (var _key in obj) {
          if (_key !== arrTagKey) innerXml += '<' + _key + '>' + toXml(obj[_key], arrTagKey, true) + '</' + _key + '>';
        }
      }
      return innerXml;
    default:
      throw new TypeError('unsupport type:' + type);
  }
}

function autoDownload(_ref3) {
  var dataURL = _ref3.dataURL,
      filename = _ref3.filename;

  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  eleLink.href = dataURL;
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}


/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatTime; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);



var DateFormat = function () {
  function DateFormat(date) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, DateFormat);

    this.date = date;
    this.y = '';
    this.m = '';
    this.d = '';
    this.hh = '';
    this.mm = '';
    this.ss = '';
    this.init();
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(DateFormat, [{
    key: 'init',
    value: function init() {
      var date = this.date ? new Date(this.date) : new Date();
      this.y = date.getFullYear();
      this.m = date.getMonth() + 1;
      this.d = date.getDate();
      this.hh = date.getHours();
      this.mm = date.getMinutes();
      this.ss = date.getSeconds();
    }
  }, {
    key: 'format',
    value: function format(fmt) {
      var o = {
        'M+': this.m,
        'd+': this.d,
        'h+': this.hh,
        'm+': this.mm,
        's+': this.ss
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.y + '').substr(4 - RegExp.$1.length));
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
      return fmt;
    }
  }]);

  return DateFormat;
}();

function formatTime(date) {
  return new DateFormat(date);
}



/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(168), __esModule: true };

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(169), __esModule: true };

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(15)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(182);
var $Object = __webpack_require__(15).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
__webpack_require__(75);
__webpack_require__(76);
__webpack_require__(183);
module.exports = __webpack_require__(15).Promise;

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(70)
  , call        = __webpack_require__(175)
  , isArrayIter = __webpack_require__(174)
  , anObject    = __webpack_require__(16)
  , toLength    = __webpack_require__(73)
  , getIterFn   = __webpack_require__(181)
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

/***/ 173:
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

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(24)
  , ITERATOR   = __webpack_require__(8)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(16);
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

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(8)('iterator')
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

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(3)
  , macrotask = __webpack_require__(161).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(43)(process) == 'process';

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

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(11);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(3)
  , core        = __webpack_require__(15)
  , dP          = __webpack_require__(10)
  , DESCRIPTORS = __webpack_require__(9)
  , SPECIES     = __webpack_require__(8)('species');

module.exports = function(KEY){
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(16)
  , aFunction = __webpack_require__(71)
  , SPECIES   = __webpack_require__(8)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(160)
  , ITERATOR  = __webpack_require__(8)('iterator')
  , Iterators = __webpack_require__(24);
module.exports = __webpack_require__(15).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(23);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(9), 'Object', {defineProperty: __webpack_require__(10).f});

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(25)
  , global             = __webpack_require__(3)
  , ctx                = __webpack_require__(70)
  , classof            = __webpack_require__(160)
  , $export            = __webpack_require__(23)
  , isObject           = __webpack_require__(18)
  , aFunction          = __webpack_require__(71)
  , anInstance         = __webpack_require__(171)
  , forOf              = __webpack_require__(172)
  , speciesConstructor = __webpack_require__(180)
  , task               = __webpack_require__(161).set
  , microtask          = __webpack_require__(177)()
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
      , FakePromise = (promise.constructor = {})[__webpack_require__(8)('species')] = function(exec){ exec(empty, empty); };
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
  Internal.prototype = __webpack_require__(178)($Promise.prototype, {
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
__webpack_require__(26)($Promise, PROMISE);
__webpack_require__(179)(PROMISE);
Wrapper = __webpack_require__(15)[PROMISE];

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
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(176)(function(iter){
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

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isEmpty; });
/* unused harmony export reject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(17);
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

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_utils_util__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_utils_file__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_utils_index__ = __webpack_require__(185);








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

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, DrawBard);

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
    this.editing = false;
    this.moving = false;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(DrawBard, [{
    key: 'changeSize',
    value: function changeSize(_ref2) {
      var change = _ref2.change;

      var coe = 0.2;
      coe = coe / this.imgBoxW > coe / this.imgBoxH ? coe / this.imgBoxH : coe / this.imgBoxW;
      var num = coe * change;
      num < 0 ? this.scale += Math.abs(num) : this.scale > Math.abs(num) ? this.scale -= Math.abs(num) : this.scale;
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
      var _this2 = this;

      this.moving && vue.$nextTick(function () {
        _this2.x = ~~(nowX - _this2.moveX);
        _this2.y = ~~(nowY - _this2.moveY);
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
      var _this3 = this;

      var vue = _ref3.vue;

      vue.$refs.targetImg.onload = function () {
        _this3.w = ~~window.getComputedStyle(vue.$refs.canvas).width.replace('px', '');
        _this3.h = ~~window.getComputedStyle(vue.$refs.canvas).height.replace('px', '');
        _this3.imgBoxW = vue.$refs.targetImg.width;
        _this3.imgBoxH = vue.$refs.targetImg.height;
        _this3.maxDrawWidth = _this3.imgBoxW;
        _this3.maxDrawHeight = _this3.imgBoxH;
        _this3.rotate = 0;
        if (_this3.imgBoxW > _this3.w) _this3.scale = _this3.w / _this3.imgBoxW;
        if (_this3.imgBoxH * _this3.scale > _this3.h) _this3.scale = _this3.h / _this3.imgBoxH;
        console.log(_this3.scale);
        _this3.x = (_this3.w - _this3.imgBoxW) / 2;
        _this3.y = (_this3.h - _this3.imgBoxH) / 2;
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

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, DrawSquareness);

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

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(DrawSquareness, [{
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
      var _this4 = this;

      var nowClientX = _ref6.nowClientX,
          nowClientY = _ref6.nowClientY,
          vue = _ref6.vue,
          drawBard = _ref6.drawBard;

      this.drawing && vue.$nextTick(function () {
        var fw = ~~(nowClientX - _this4.startClientX);
        var fh = ~~(nowClientY - _this4.startClientY);
        if (_this4.ableChangeX) {
          if (_this4.dragPositionX === 'right') {
            if (fw > 0) {
              _this4.w = _this4.oldW + fw > drawBard.maxDrawWidth - _this4.defaultOffsetX ? drawBard.maxDrawWidth - _this4.defaultOffsetX : _this4.oldW + fw;
            } else {
              _this4.w = Math.abs(fw) < _this4.oldW ? _this4.oldW - Math.abs(fw) : Math.abs(fw) - _this4.oldW > _this4.defaultOffsetX ? _this4.defaultOffsetX : Math.abs(fw) - _this4.oldW;
              _this4.startOffsetX = Math.abs(fw) < _this4.oldW ? _this4.defaultOffsetX : Math.abs(fw) - _this4.oldW > _this4.defaultOffsetX ? 0 : _this4.defaultOffsetX - Math.abs(fw) + _this4.oldW;
            }
          } else if (_this4.dragPositionX === 'left') {
            if (fw > 0) {
              _this4.w = _this4.oldW - fw > 0 ? _this4.oldW - fw : fw - _this4.oldW > drawBard.maxDrawWidth - _this4.defaultOffsetX - _this4.oldW ? drawBard.maxDrawWidth - _this4.defaultOffsetX - _this4.oldW : fw - _this4.oldW;
              _this4.startOffsetX = _this4.oldW - fw > 0 ? _this4.defaultOffsetX + fw : _this4.defaultOffsetX + _this4.oldW;
            } else {
              _this4.w = Math.abs(fw) > _this4.defaultOffsetX ? _this4.oldW + _this4.defaultOffsetX : _this4.oldW + Math.abs(fw);
              _this4.startOffsetX = Math.abs(fw) > _this4.defaultOffsetX ? 0 : _this4.defaultOffsetX - Math.abs(fw);
            }
          }
        }
        if (_this4.ableChangeY) {
          if (_this4.dragPositionY === 'top') {
            if (fh > 0) {
              _this4.h = _this4.oldH - fh > 0 ? _this4.oldH - fh : fh - _this4.oldH > drawBard.maxDrawHeight - _this4.oldH - _this4.defaultOffsetY ? drawBard.maxDrawHeight - _this4.defaultOffsetY - _this4.oldH : fh - _this4.oldH;
              _this4.startOffsetY = _this4.oldH - fh > 0 ? _this4.defaultOffsetY + fh : _this4.defaultOffsetY + _this4.oldH;
            } else {
              _this4.h = Math.abs(fh) > _this4.defaultOffsetY ? _this4.oldH + _this4.defaultOffsetY : _this4.oldH + Math.abs(fh);
              _this4.startOffsetY = Math.abs(fh) > _this4.defaultOffsetY ? 0 : _this4.defaultOffsetY - Math.abs(fh);
            }
          } else if (_this4.dragPositionY === 'bottom') {
            if (fh > 0) {
              _this4.h = _this4.oldH + fh > drawBard.maxDrawHeight - _this4.defaultOffsetY ? drawBard.maxDrawHeight - _this4.defaultOffsetY : _this4.oldH + fh;
            } else {
              _this4.h = Math.abs(fh) < _this4.oldH ? _this4.oldH - Math.abs(fh) : Math.abs(fh) - _this4.oldH > _this4.defaultOffsetY ? _this4.defaultOffsetY : Math.abs(fh) - _this4.oldH;
              _this4.startOffsetY = Math.abs(fh) < _this4.oldH ? _this4.defaultOffsetY : Math.abs(fh) - _this4.oldH > _this4.defaultOffsetY ? 0 : _this4.defaultOffsetY - Math.abs(fh) + _this4.oldH;
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
      var _this5 = this;

      var nowClientX = _ref8.nowClientX,
          nowClientY = _ref8.nowClientY,
          vue = _ref8.vue,
          drawBard = _ref8.drawBard;

      this.isMove && vue.$nextTick(function () {
        var moveW = ~~(nowClientX - _this5.startClientX);
        var moveH = ~~(nowClientY - _this5.startClientY);
        if (moveW > 0) {
          _this5.startOffsetX = moveW > drawBard.imgBoxW - _this5.w - _this5.defaultOffsetX ? drawBard.imgBoxW - _this5.w : _this5.defaultOffsetX + moveW;
        } else {
          _this5.startOffsetX = Math.abs(moveW) < _this5.defaultOffsetX ? _this5.defaultOffsetX + moveW : 0;
        }
        if (moveH > 0) {
          _this5.startOffsetY = moveH > drawBard.imgBoxH - _this5.h - _this5.defaultOffsetY ? drawBard.imgBoxH - _this5.h : _this5.defaultOffsetY + moveH;
        } else {
          _this5.startOffsetY = Math.abs(moveH) < _this5.defaultOffsetY ? _this5.defaultOffsetY + moveH : 0;
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
      rotate: 0,
      count: '',
      editing: false,
      img: '',
      file: '',
      squareness: [],
      support: '',
      drawBard: {},
      currentSquare: {},
      xmlObj: {
        annotation: {
          folder: 'OXIIIT',
          filename: '',
          source: {
            database: 'OXFORD_IIIT Pet Datase',
            annotation: 'OXIIIT',
            image: 'flickr'
          },
          size: {
            width: '',
            height: '',
            depth: '3'
          },
          objects: []
        }
      }
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
      this.file = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_utils_file__["a" /* getFile */])({ e: e });
      if (!this.file || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_utils_file__["b" /* isImage */])(this.file.ext)) {
        this.$alert('请选择以下图片类型：.gif/jpeg/jpg/png/bmp', '提示');
        return false;
      }
      this.img = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_utils_file__["c" /* fileTransformDataURL */])(this.file.file);
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
      this.editing = false;
      this.xmlObj.annotation.filename = this.file.file.name;
      this.xmlObj.annotation.size.width = this.drawBard.imgBoxW;
      this.xmlObj.annotation.size.height = this.drawBard.imgBoxH;
      var obj = [];
      this.squareness.forEach(function (item) {
        if (item.w > 0 && item.h > 0) {
          obj.push({
            key: 'object',
            name: '可乐',
            pose: 'Frontal',
            truncated: 0,
            occluded: 0,
            bndbox: {
              xmin: item.startOffsetX,
              ymin: item.startOffsetY,
              xmax: item.startOffsetX * 1 + item.w * 1,
              ymax: item.startOffsetY * 1 + item.h * 1
            }
          });
        }
      });
      this.xmlObj.annotation.objects = obj;
      var text = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_utils_file__["d" /* toXml */])(this.xmlObj, 'key');
      var dataURL = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_utils_file__["e" /* textTransformDataURL */])(text);
      var filename = '' + this.file.name + '_' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_utils_util__["a" /* formatTime */])().format('yyyyMMdd') + '.xml';
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_utils_file__["f" /* autoDownload */])({ dataURL: dataURL, filename: filename });
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
      this.drawBard.scale = 1;
      this.drawBard.editing = false;
      this.drawBard.moving = false;
      this.currentSquare = {};
      this.clearMarks();
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.drawBard = new DrawBard({});
    this.drawBard.imgReload({ vue: this });
    document.onkeydown = function (e) {
      e.preventDefault();
      if (e && (e.ctrlKey || e.metaKey) && e.keyCode === 68) _this.send();
      if (e && e.key === 'Shift' || e.keyCode === 16) _this.clickEdit();
    };
  },
  destroyed: function destroyed() {
    this.editing = false;
  }
});

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(153)(true);
// imports


// module
exports.push([module.i, ".draw-container[data-v-0a30088a]{display:-ms-flexbox;display:-webkit-box;display:flex;-ms-flex-pack:center;-webkit-box-pack:center;justify-content:center;-ms-flex-align:center;-webkit-box-align:center;align-items:center;position:absolute;left:0;top:0;right:0;bottom:0}.vue-canvas[data-v-0a30088a]{width:90%;height:80%;overflow:hidden;position:relative;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;direction:ltr;-ms-touch-action:none;touch-action:none;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC\")}.vue-canvas-drag-box[data-v-0a30088a]{position:absolute;left:0;top:0;right:0;bottom:0}.vue-canvas-target img[data-v-0a30088a]{position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:none;transform:none}.cursor-move[data-v-0a30088a]{cursor:move}.img-draw[data-v-0a30088a]{cursor:crosshair}.vue-selected-square[data-v-0a30088a]{position:absolute;left:0;top:0;border:1px solid red}.square-info[data-v-0a30088a]{position:absolute;left:-3px;top:-23px;min-width:65px;text-align:center;color:#fff;line-height:20px;background-color:rgba(0,0,0,.5);font-size:12px}.square-face[data-v-0a30088a]{cursor:default;position:absolute;top:0;right:0;bottom:0;left:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#fff;opacity:.1}.del-btn[data-v-0a30088a]{cursor:pointer;position:absolute;right:-10px;top:-23px;height:20px;width:20px;text-align:center;line-height:20px;border-radius:20px;color:#fff;background-color:rgba(0,0,0,.5);font-size:12px}.square-line[data-v-0a30088a]{position:absolute;display:block;width:100%;height:100%;opacity:.1}.line-w[data-v-0a30088a]{top:-3px;left:0;height:5px;cursor:n-resize}.line-a[data-v-0a30088a]{top:0;left:-3px;width:5px;cursor:w-resize}.line-s[data-v-0a30088a]{bottom:-3px;left:0;height:5px;cursor:s-resize}.line-d[data-v-0a30088a]{top:0;right:-3px;width:5px;cursor:e-resize}.square-move-point[data-v-0a30088a]{position:absolute;width:8px;height:8px;opacity:.75;background-color:#ff514c;border-radius:100%}.point1[data-v-0a30088a]{top:-4px;left:-4px;cursor:nw-resize}.point2[data-v-0a30088a]{top:-5px;left:50%;margin-left:-3px;cursor:n-resize}.point3[data-v-0a30088a]{top:-4px;right:-4px;cursor:ne-resize}.point4[data-v-0a30088a]{top:50%;left:-4px;margin-top:-3px;cursor:w-resize}.point5[data-v-0a30088a]{top:50%;right:-4px;margin-top:-3px;cursor:w-resize}.point6[data-v-0a30088a]{bottom:-5px;left:-4px;cursor:sw-resize}.point7[data-v-0a30088a]{bottom:-5px;left:50%;margin-left:-3px;cursor:s-resize}.point8[data-v-0a30088a]{bottom:-5px;right:-4px;cursor:nw-resize}@media screen and (max-width:500px){.square-move-point[data-v-0a30088a]{position:absolute;width:20px;height:20px;opacity:.45;background-color:#39f;border-radius:100%}.point1[data-v-0a30088a]{top:-10px;left:-10px}.point2[data-v-0a30088a],.point4[data-v-0a30088a],.point5[data-v-0a30088a],.point7[data-v-0a30088a]{display:none}.point3[data-v-0a30088a]{top:-10px;right:-10px}.point4[data-v-0a30088a]{top:0;left:0}.point6[data-v-0a30088a]{bottom:-10px;left:-10px}.point8[data-v-0a30088a]{bottom:-10px;right:-10px}}", "", {"version":3,"sources":["/Applications/XAMPP/xamppfiles/htdocs/XaircraftProject/web/AI/src/views/test/index.vue"],"names":[],"mappings":"AACA,iCACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,qBAAsB,AACd,wBAAyB,AAC7B,uBAAwB,AAC5B,sBAAuB,AACf,yBAA0B,AAC9B,mBAAoB,AACxB,kBAAmB,AACnB,OAAQ,AACR,MAAO,AACP,QAAS,AACT,QAAU,CACX,AACD,6BACE,UAAW,AACX,WAAY,AACZ,gBAAiB,AACjB,kBAAmB,AACnB,sBAAuB,AACvB,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,iBAAkB,AAC1B,cAAe,AACf,sBAAuB,AACnB,kBAAmB,AACvB,8QAAgR,CACjR,AACD,sCACE,kBAAmB,AACnB,OAAQ,AACR,MAAO,AACP,QAAS,AACT,QAAU,CACX,AACD,wCACE,kBAAmB,AACnB,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,iBAAkB,AAC1B,uBAAwB,AAChB,cAAgB,CACzB,AACD,8BACE,WAAa,CACd,AACD,2BACE,gBAAkB,CACnB,AACD,sCACE,kBAAmB,AACnB,OAAQ,AACR,MAAO,AACP,oBAAqB,CACtB,AACD,8BACE,kBAAmB,AACnB,UAAW,AACX,UAAW,AACX,eAAgB,AAChB,kBAAmB,AACnB,WAAa,AACb,iBAAkB,AAClB,gCAAqC,AACrC,cAAgB,CACjB,AACD,8BACE,eAAgB,AAChB,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,SAAU,AACV,OAAQ,AACR,yBAA0B,AACvB,sBAAuB,AACtB,qBAAsB,AAClB,iBAAkB,AAC1B,sBAAuB,AACvB,UAAa,CACd,AACD,0BACE,eAAgB,AAChB,kBAAmB,AACnB,YAAa,AACb,UAAW,AACX,YAAa,AACb,WAAY,AACZ,kBAAmB,AACnB,iBAAkB,AAClB,mBAAoB,AACpB,WAAa,AACb,gCAAqC,AACrC,cAAgB,CACjB,AACD,8BACE,kBAAmB,AACnB,cAAe,AACf,WAAY,AACZ,YAAa,AACb,UAAY,CACb,AACD,yBACE,SAAU,AACV,OAAQ,AACR,WAAY,AACZ,eAAiB,CAClB,AACD,yBACE,MAAO,AACP,UAAW,AACX,UAAW,AACX,eAAiB,CAClB,AACD,yBACE,YAAa,AACb,OAAQ,AACR,WAAY,AACZ,eAAiB,CAClB,AACD,yBACE,MAAO,AACP,WAAY,AACZ,UAAW,AACX,eAAiB,CAClB,AACD,oCACE,kBAAmB,AACnB,UAAW,AACX,WAAY,AACZ,YAAa,AACb,yBAA0B,AAC1B,kBAAoB,CACrB,AACD,yBACE,SAAU,AACV,UAAW,AACX,gBAAkB,CACnB,AACD,yBACE,SAAU,AACV,SAAU,AACV,iBAAkB,AAClB,eAAiB,CAClB,AACD,yBACE,SAAU,AACV,WAAY,AACZ,gBAAkB,CACnB,AACD,yBACE,QAAS,AACT,UAAW,AACX,gBAAiB,AACjB,eAAiB,CAClB,AACD,yBACE,QAAS,AACT,WAAY,AACZ,gBAAiB,AACjB,eAAiB,CAClB,AACD,yBACE,YAAa,AACb,UAAW,AACX,gBAAkB,CACnB,AACD,yBACE,YAAa,AACb,SAAU,AACV,iBAAkB,AAClB,eAAiB,CAClB,AACD,yBACE,YAAa,AACb,WAAY,AACZ,gBAAkB,CACnB,AACD,oCACA,oCACI,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,YAAa,AACb,sBAAuB,AACvB,kBAAoB,CACvB,AACD,yBACI,UAAW,AACX,UAAY,CACf,AACD,oGACI,YAAc,CACjB,AACD,yBACI,UAAW,AACX,WAAa,CAChB,AACD,yBACI,MAAO,AACP,MAAQ,CACX,AACD,yBACI,aAAc,AACd,UAAY,CACf,AACD,yBACI,aAAc,AACd,WAAa,CAChB,CACA","file":"index.vue","sourcesContent":["\n.draw-container[data-v-0a30088a]{\n  display: -ms-flexbox;\n  display: -webkit-box;\n  display: flex;\n  -ms-flex-pack: center;\n          -webkit-box-pack: center;\n      justify-content: center;\n  -ms-flex-align: center;\n          -webkit-box-align: center;\n      align-items: center;\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n.vue-canvas[data-v-0a30088a] {\n  width: 90%;\n  height: 80%;\n  overflow: hidden;\n  position: relative;\n  box-sizing: border-box;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  direction: ltr;\n  -ms-touch-action: none;\n      touch-action: none;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');\n}\n.vue-canvas-drag-box[data-v-0a30088a] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n.vue-canvas-target img[data-v-0a30088a] {\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-transform: none;\n          transform: none;\n}\n.cursor-move[data-v-0a30088a] {\n  cursor: move;\n}\n.img-draw[data-v-0a30088a] {\n  cursor: crosshair;\n}\n.vue-selected-square[data-v-0a30088a] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  border: 1px solid red\n}\n.square-info[data-v-0a30088a] {\n  position: absolute;\n  left: -3px;\n  top: -23px;\n  min-width: 65px;\n  text-align: center;\n  color: white;\n  line-height: 20px;\n  background-color: rgba(0, 0, 0, 0.5);\n  font-size: 12px;\n}\n.square-face[data-v-0a30088a] {\n  cursor: default;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #fff;\n  opacity: 0.1;\n}\n.del-btn[data-v-0a30088a] {\n  cursor: pointer;\n  position: absolute;\n  right: -10px;\n  top: -23px;\n  height: 20px;\n  width: 20px;\n  text-align: center;\n  line-height: 20px;\n  border-radius: 20px;\n  color: white;\n  background-color: rgba(0, 0, 0, 0.5);\n  font-size: 12px;\n}\n.square-line[data-v-0a30088a] {\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: 100%;\n  opacity: .1;\n}\n.line-w[data-v-0a30088a] {\n  top: -3px;\n  left: 0;\n  height: 5px;\n  cursor: n-resize;\n}\n.line-a[data-v-0a30088a] {\n  top: 0;\n  left: -3px;\n  width: 5px;\n  cursor: w-resize;\n}\n.line-s[data-v-0a30088a] {\n  bottom: -3px;\n  left: 0;\n  height: 5px;\n  cursor: s-resize;\n}\n.line-d[data-v-0a30088a] {\n  top: 0;\n  right: -3px;\n  width: 5px;\n  cursor: e-resize;\n}\n.square-move-point[data-v-0a30088a] {\n  position: absolute;\n  width: 8px;\n  height: 8px;\n  opacity: .75;\n  background-color: #ff514c;\n  border-radius: 100%;\n}\n.point1[data-v-0a30088a] {\n  top: -4px;\n  left: -4px;\n  cursor: nw-resize;\n}\n.point2[data-v-0a30088a] {\n  top: -5px;\n  left: 50%;\n  margin-left: -3px;\n  cursor: n-resize;\n}\n.point3[data-v-0a30088a] {\n  top: -4px;\n  right: -4px;\n  cursor: ne-resize;\n}\n.point4[data-v-0a30088a] {\n  top: 50%;\n  left: -4px;\n  margin-top: -3px;\n  cursor: w-resize;\n}\n.point5[data-v-0a30088a] {\n  top: 50%;\n  right: -4px;\n  margin-top: -3px;\n  cursor: w-resize;\n}\n.point6[data-v-0a30088a] {\n  bottom: -5px;\n  left: -4px;\n  cursor: sw-resize;\n}\n.point7[data-v-0a30088a] {\n  bottom: -5px;\n  left: 50%;\n  margin-left: -3px;\n  cursor: s-resize;\n}\n.point8[data-v-0a30088a] {\n  bottom: -5px;\n  right: -4px;\n  cursor: nw-resize;\n}\n@media screen and (max-width: 500px) {\n.square-move-point[data-v-0a30088a] {\n    position: absolute;\n    width: 20px;\n    height: 20px;\n    opacity: .45;\n    background-color: #39f;\n    border-radius: 100%;\n}\n.point1[data-v-0a30088a] {\n    top: -10px;\n    left: -10px;\n}\n.point2[data-v-0a30088a], .point4[data-v-0a30088a], .point5[data-v-0a30088a], .point7[data-v-0a30088a] {\n    display: none;\n}\n.point3[data-v-0a30088a] {\n    top: -10px;\n    right: -10px;\n}\n.point4[data-v-0a30088a] {\n    top: 0;\n    left: 0;\n}\n.point6[data-v-0a30088a] {\n    bottom: -10px;\n    left: -10px;\n}\n.point8[data-v-0a30088a] {\n    bottom: -10px;\n    right: -10px;\n}\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(192);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(154)("ab543186", content, true);

/***/ }),

/***/ 206:
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
      "mouseout": _vm.mouseoutTarget,
      "mousewheel": _vm.scaleImg
    }
  }, [_c('img', {
    ref: "targetImg",
    staticStyle: {
      "display": "block"
    },
    attrs: {
      "src": _vm.img,
      "alt": ""
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
        'transform': 'translate3d(' + item.startOffsetX + 'px,' + item.startOffsetY + 'px,' + '0)'
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

});
//# sourceMappingURL=2.888f6b915da9ec79b37c.js.map