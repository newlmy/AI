webpackJsonp([2],{

/***/ 152:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 153:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(152)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(199)
}
var Component = __webpack_require__(180)(
  /* script */
  __webpack_require__(188),
  /* template */
  __webpack_require__(206),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2297f758",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 159:
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

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(70)
  , invoke             = __webpack_require__(170)
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

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(182);

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

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(167), __esModule: true };

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_json_stringify__ = __webpack_require__(165);
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
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(166), __esModule: true };

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(15)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
__webpack_require__(75);
__webpack_require__(76);
__webpack_require__(179);
module.exports = __webpack_require__(15).Promise;

/***/ }),

/***/ 168:
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(70)
  , call        = __webpack_require__(172)
  , isArrayIter = __webpack_require__(171)
  , anObject    = __webpack_require__(16)
  , toLength    = __webpack_require__(73)
  , getIterFn   = __webpack_require__(178)
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

/***/ 170:
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

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(23)
  , ITERATOR   = __webpack_require__(8)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),

/***/ 172:
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

/***/ 173:
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

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(3)
  , macrotask = __webpack_require__(160).set
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

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(11);
module.exports = function(target, src, safe){
  for(var key in src){
    if(safe && target[key])target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

/***/ }),

/***/ 176:
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

/***/ 177:
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

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(159)
  , ITERATOR  = __webpack_require__(8)('iterator')
  , Iterators = __webpack_require__(23);
module.exports = __webpack_require__(15).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(25)
  , global             = __webpack_require__(3)
  , ctx                = __webpack_require__(70)
  , classof            = __webpack_require__(159)
  , $export            = __webpack_require__(24)
  , isObject           = __webpack_require__(18)
  , aFunction          = __webpack_require__(71)
  , anInstance         = __webpack_require__(168)
  , forOf              = __webpack_require__(169)
  , speciesConstructor = __webpack_require__(177)
  , task               = __webpack_require__(160).set
  , microtask          = __webpack_require__(174)()
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
  Internal.prototype = __webpack_require__(175)($Promise.prototype, {
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
__webpack_require__(176)(PROMISE);
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
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(173)(function(iter){
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

/***/ 180:
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

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatTime; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(162);
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

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(183), __esModule: true };

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(184);
var $Object = __webpack_require__(15).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(24);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(9), 'Object', {defineProperty: __webpack_require__(10).f});

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/star-bg.ba93415.svg";

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_utils_util__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_utils_file__ = __webpack_require__(164);







var Polygon = function () {
  function Polygon(_ref) {
    var ctx = _ref.ctx,
        _ref$lineWidth = _ref.lineWidth,
        lineWidth = _ref$lineWidth === undefined ? 2 : _ref$lineWidth,
        _ref$strokeStyle = _ref.strokeStyle,
        strokeStyle = _ref$strokeStyle === undefined ? 'rgba(255, 113, 98, 1)' : _ref$strokeStyle,
        _ref$fillStyle = _ref.fillStyle,
        fillStyle = _ref$fillStyle === undefined ? 'rgba(79, 205, 66, .5)' : _ref$fillStyle,
        _ref$dotRadius = _ref.dotRadius,
        dotRadius = _ref$dotRadius === undefined ? 3 : _ref$dotRadius;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Polygon);

    this.ctx = ctx;
    this.dotRadius = dotRadius;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
    this.fillStyle = fillStyle;
    this.dots = [];
    this.startX = '';
    this.startY = '';
    this.lastX = '';
    this.lastY = '';
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Polygon, [{
    key: 'startDraw',
    value: function startDraw(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;

      this.startX = x;
      this.startY = y;
      this.lastX = x;
      this.lastY = y;
      this.ctx.beginPath();
      this.ctx.fillStyle = this.strokeStyle;
      this.ctx.lineWidth = 1;
      this.ctx.arc(x, y, this.dotRadius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }, {
    key: 'stroke',
    value: function stroke(_ref3) {
      var x = _ref3.x,
          y = _ref3.y;

      this.ctx.beginPath();
      this.ctx.strokeStyle = this.strokeStyle;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.moveTo(this.lastX, this.lastY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.dots.push({ x: x, y: y });
      this.lastX = x;
      this.lastY = y;
    }
  }, {
    key: 'filling',
    value: function filling() {
      var _this2 = this;

      this.ctx.fillStyle = this.fillStyle;
      this.ctx.strokeStyle = 'transparent';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.dots.forEach(function (dot, index) {
        _this2.ctx.lineTo(dot.x, dot.y);
      });
      this.ctx.closePath();
      this.ctx.fill();
    }
  }, {
    key: 'reStroke',
    value: function reStroke() {
      var _this3 = this;

      this.dots.pop();
      this.startDraw({ x: this.startX, y: this.startY });
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.strokeStyle;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.moveTo(this.startX, this.startY);
      this.dots.forEach(function (dot, index) {
        _this3.ctx.lineTo(dot.x, dot.y);
      });
      this.ctx.stroke();
      if (this.dots.length > 0) {
        this.lastX = this.dots[this.dots.length - 1].x;
        this.lastY = this.dots[this.dots.length - 1].y;
      }
    }
  }]);

  return Polygon;
}();

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'polygon',
  data: function data() {
    return {
      canvasContainerW: '',
      canvasContainerH: '',
      imgBoxW: 0,
      imgBoxH: 0,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      moveX: 0,
      moveY: 0,
      polygons: [],
      currentPolygon: '',
      canvas: '',
      ctx: '',
      moving: false,
      scale: 1,
      editing: false,
      retractCount: 0,
      img: '',
      file: ''
    };
  },
  components: {},
  beforeCreate: function beforeCreate() {},
  created: function created() {},
  beforeMount: function beforeMount() {},
  mounted: function mounted() {
    var _this = this;
    _this.$nextTick(function () {
      _this.canvasContainerW = ~~window.getComputedStyle(_this.$refs.canvasContainer).width.replace('px', '');
      _this.canvasContainerH = ~~window.getComputedStyle(_this.$refs.canvasContainer).height.replace('px', '');
      _this.getCanvas();
    });
    _this.$refs.bgImg.onload = function () {
      _this.imgBoxW = _this.$refs.bgImg.width;
      _this.imgBoxH = _this.$refs.bgImg.height;
      if (_this.imgBoxW > _this.canvasContainerW) _this.scale = _this.canvasContainerW / _this.imgBoxW;
      if (_this.imgBoxH * _this.scale > _this.canvasContainerH) _this.scale = _this.canvasContainerH / _this.imgBoxH;
      _this.x = (_this.canvasContainerW - _this.imgBoxW) / 2;
      _this.y = (_this.canvasContainerH - _this.imgBoxH) / 2;
    };
    document.onkeydown = function (e) {
      e.preventDefault();
      if (e && (e.ctrlKey || e.metaKey) && (e.keyCode === 32 || e.keyCode === 8)) _this.finishPolygon();
      if (e && (e.ctrlKey || e.metaKey) && e.keyCode === 68) _this.getCanvasImg({});
      if (e && (e.ctrlKey || e.metaKey) && e.keyCode === 90) _this.retract();
      if (e && e.key === 'Shift' || e.keyCode === 16) _this.clickEdit();
    };
  },
  beforeUpdate: function beforeUpdate() {},
  updated: function updated() {},
  beforeDestroy: function beforeDestroy() {},
  destroyed: function destroyed() {},

  methods: {
    selectImg: function selectImg(e) {
      this.initCanvas();
      this.previewImg(e);
    },
    initCanvas: function initCanvas() {
      this.ctx && this.clearRect();
      this.polygons = [];
      this.currentPolygon = '';
      this.scale = 1;
    },
    previewImg: function previewImg(e) {
      this.file = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_utils_file__["a" /* getFile */])({ e: e });
      if (!this.file || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_utils_file__["b" /* isImage */])(this.file.ext)) {
        this.$alert('请选择以下图片类型：.gif/jpeg/jpg/png/bmp', '提示');
        return false;
      }
      this.img = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_utils_file__["c" /* fileTransformDataURL */])(this.file.file);
    },
    getCanvas: function getCanvas() {
      this.canvas = document.getElementById('canvas-layer');
      this.ctx = this.canvas.getContext('2d');
    },
    clickEdit: function clickEdit() {
      this.editing = !this.editing;
    },
    getCanvasImg: function getCanvasImg(_ref4) {
      var _ref4$type = _ref4.type,
          type = _ref4$type === undefined ? 'png' : _ref4$type;

      var _this = this;
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_utils_file__["j" /* canvasTransformDataURL */])({ canvas: this.canvas, imgType: type }).then(function (dataURL) {
        var filename = '' + _this.file.name + '_' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_utils_util__["a" /* formatTime */])().format('yyyyMMdd') + '.' + type;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_utils_file__["f" /* autoDownload */])({ dataURL: dataURL, filename: filename });
      });
    },
    createPolygon: function createPolygon(_ref5) {
      var offsetX = _ref5.offsetX,
          offsetY = _ref5.offsetY;

      this.currentPolygon = new Polygon({ ctx: this.ctx });
      this.currentPolygon.startDraw({ x: offsetX, y: offsetY });
    },
    drawPolygon: function drawPolygon(_ref6) {
      var offsetX = _ref6.offsetX,
          offsetY = _ref6.offsetY;

      this.currentPolygon.stroke({ x: offsetX, y: offsetY });
    },
    finishPolygon: function finishPolygon() {
      if (this.editing && this.currentPolygon) {
        this.clearRect();
        this.reFill();
        this.currentPolygon.filling();
        this.polygons.push(this.currentPolygon);
        this.currentPolygon = '';
      }
    },
    reFill: function reFill() {
      this.polygons.forEach(function (polygon, index) {
        polygon.filling();
      });
    },
    reStroke: function reStroke() {
      if (this.currentPolygon.dots.length > 0) this.currentPolygon.reStroke();else this.currentPolygon = '';
    },
    retract: function retract() {
      if (this.editing && this.currentPolygon) {
        this.clearRect();
        this.reFill();
        this.reStroke();
      }
    },
    clearRect: function clearRect() {
      this.ctx.clearRect(0, 0, this.imgBoxW, this.imgBoxH);
    },
    mousedownTarget: function mousedownTarget(e) {
      e.preventDefault();
      var offsetX = e.offsetX;
      var offsetY = e.offsetY;
      if (!this.editing) {
        var startX = e.clientX;
        var startY = e.clientY;
        this.startMove(startX, startY);
      } else {
        if (this.currentPolygon) {
          this.drawPolygon({ offsetX: offsetX, offsetY: offsetY });
        } else {
          this.createPolygon({ offsetX: offsetX, offsetY: offsetY });
        }
      }
    },
    mouseoutTarget: function mouseoutTarget(e) {
      if (!this.editing) this.endMove();
    },
    mousemoveTarget: function mousemoveTarget(e) {
      e.preventDefault();
      var nowX = e.clientX;
      var nowY = e.clientY;
      this.move(nowX, nowY, this);
    },
    mouseupTarget: function mouseupTarget(e) {
      this.endMove();
    },
    scaleImg: function scaleImg(e) {
      var change = e.deltaY || e.wheelDelta;
      this.changeSize({ change: change });
    },
    changeSize: function changeSize(_ref7) {
      var change = _ref7.change;

      var coe = 0.2;
      coe = coe / this.imgBoxW > coe / this.imgBoxH ? coe / this.imgBoxH : coe / this.imgBoxW;
      var num = coe * change;
      num < 0 ? this.scale += Math.abs(num) : this.scale > Math.abs(num) ? this.scale -= Math.abs(num) : this.scale;
    },
    startMove: function startMove(startX, startY) {
      this.moving = true;
      this.moveX = startX - this.x;
      this.moveY = startY - this.y;
    },
    move: function move(nowX, nowY, vue) {
      var _this4 = this;

      this.moving && vue.$nextTick(function () {
        _this4.x = ~~(nowX - _this4.moveX);
        _this4.y = ~~(nowY - _this4.moveY);
      });
    },
    endMove: function endMove() {
      this.moving = false;
    }
  }
});

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(153)(true);
// imports


// module
exports.push([module.i, ".header[data-v-2297f758]{height:50px;line-height:50px;padding:0 20px}.main-container[data-v-2297f758]{width:100%;height:calc(100% - 50px)}.tools[data-v-2297f758]{padding:0 10px;height:100%}.tool-item[data-v-2297f758]{height:40px}.canvas-c[data-v-2297f758]{height:100%;position:relative}.bg-img-num1[data-v-2297f758]{position:absolute;left:0;right:0;top:0;bottom:0;color:hsla(0,0%,100%,.65);background-color:#24292e;background-image:url(" + __webpack_require__(185) + "),linear-gradient(#191c20,#24292e 15%);background-repeat:repeat-x;background-position:center 0,0 0,0 0}.canvas-container[data-v-2297f758]{position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;overflow:hidden;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC\")}.canvas-actual-layer[data-v-2297f758]{position:relative}.canvas[data-v-2297f758]{position:absolute;top:0;left:0}.cursor-move[data-v-2297f758]{cursor:move}.img-draw[data-v-2297f758]{cursor:crosshair}#ui-layer[data-v-2297f758]{z-index:3}", "", {"version":3,"sources":["/Applications/XAMPP/xamppfiles/htdocs/XaircraftProject/web/AI/src/views/polygon/index.vue"],"names":[],"mappings":"AACA,yBACE,YAAa,AACb,iBAAkB,AAClB,cAAgB,CACjB,AACD,iCACE,WAAY,AACZ,wBAA0B,CAC3B,AACD,wBACE,eAAgB,AAChB,WAAa,CACd,AACD,4BACE,WAAa,CACd,AACD,2BACE,YAAa,AACb,iBAAmB,CACpB,AACD,8BACE,kBAAmB,AACnB,OAAQ,AACR,QAAS,AACT,MAAO,AACP,SAAU,AACV,0BAA8B,AAC9B,yBAA0B,AAC1B,oFAA6F,AAC7F,2BAA4B,AAC5B,oCAAwC,CACzC,AACD,mCACE,kBAAmB,AACnB,OAAQ,AACR,QAAS,AACT,MAAO,AACP,SAAU,AACV,YAAa,AACb,gBAAiB,AACjB,8QAAgR,CACjR,AACD,sCACE,iBAAmB,CACpB,AACD,yBACE,kBAAmB,AACnB,MAAO,AACP,MAAQ,CACT,AACD,8BACE,WAAa,CACd,AACD,2BACE,gBAAkB,CACnB,AACD,2BACE,SAAW,CACZ","file":"index.vue","sourcesContent":["\n.header[data-v-2297f758] {\n  height: 50px;\n  line-height: 50px;\n  padding: 0 20px;\n}\n.main-container[data-v-2297f758] {\n  width: 100%;\n  height: calc(100% - 50px);\n}\n.tools[data-v-2297f758] {\n  padding: 0 10px;\n  height: 100%;\n}\n.tool-item[data-v-2297f758] {\n  height: 40px;\n}\n.canvas-c[data-v-2297f758] {\n  height: 100%;\n  position: relative;\n}\n.bg-img-num1[data-v-2297f758] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  color: rgba(255,255,255,0.65);\n  background-color: #24292e;\n  background-image: url(../../assets/images/star-bg.svg),linear-gradient(#191c20, #24292e 15%);\n  background-repeat: repeat-x;\n  background-position: center 0, 0 0, 0 0;\n}\n.canvas-container[data-v-2297f758] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  overflow: hidden;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');\n}\n.canvas-actual-layer[data-v-2297f758] {\n  position: relative;\n}\n.canvas[data-v-2297f758] {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.cursor-move[data-v-2297f758] {\n  cursor: move;\n}\n.img-draw[data-v-2297f758] {\n  cursor: crosshair;\n}\n#ui-layer[data-v-2297f758] {\n  z-index: 3;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(193);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(154)("30cd88d0", content, true);

/***/ }),

/***/ 206:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "cropper",
    staticClass: "bg-img-num1"
  }, [_c('el-row', [_c('div', {
    staticClass: "header"
  }, [_vm._v("\n      " + _vm._s(_vm.file && _vm.file.name) + "\n    ")])]), _vm._v(" "), _c('el-row', {
    staticClass: "main-container"
  }, [_c('el-col', {
    staticClass: "tools",
    attrs: {
      "span": 2
    }
  }, [_c('el-row', {
    staticClass: "tool-item"
  }, [_vm._v("\n        打点数：" + _vm._s(_vm.currentPolygon && _vm.currentPolygon.dots.length > 0 ? _vm.currentPolygon.dots.length : 0) + "\n      ")]), _vm._v(" "), _c('el-row', {
    staticClass: "tool-item"
  }, [_c('label', {
    staticClass: "el-button el-tooltip item el-button--default",
    attrs: {
      "for": "file_input"
    }
  }, [_vm._v("\n          选图\n          "), _c('input', {
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
      "change": _vm.selectImg
    }
  })])]), _vm._v(" "), _c('el-row', {
    staticClass: "tool-item"
  }, [_c('el-tooltip', {
    staticClass: "item",
    attrs: {
      "effect": "dark",
      "content": "Shift",
      "placement": "right-start"
    }
  }, [_c('el-button', {
    on: {
      "click": _vm.clickEdit
    }
  }, [_vm._v("状态")])], 1)], 1), _vm._v(" "), _c('el-row', {
    staticClass: "tool-item"
  }, [_c('el-tooltip', {
    staticClass: "item",
    attrs: {
      "effect": "dark",
      "content": "Ctrl + Space",
      "placement": "right-start"
    }
  }, [_c('el-button', {
    on: {
      "click": _vm.finishPolygon
    }
  }, [_vm._v("闭合")])], 1)], 1), _vm._v(" "), _c('el-row', {
    staticClass: "tool-item"
  }, [_c('el-tooltip', {
    staticClass: "item",
    attrs: {
      "effect": "dark",
      "content": "Ctrl + Z",
      "placement": "right-start"
    }
  }, [_c('el-button', {
    on: {
      "click": _vm.retract
    }
  }, [_vm._v("返回")])], 1)], 1), _vm._v(" "), _c('el-row', {
    staticClass: "tool-item"
  }, [_c('el-tooltip', {
    staticClass: "item",
    attrs: {
      "effect": "dark",
      "content": "Ctrl + D",
      "placement": "right-start"
    }
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.getCanvasImg({})
      }
    }
  }, [_vm._v("导出")])], 1)], 1)], 1), _vm._v(" "), _c('el-col', {
    staticClass: "canvas-c",
    attrs: {
      "span": 22
    }
  }, [_c('div', {
    ref: "canvasContainer",
    staticClass: "canvas-container"
  }, [_c('div', {
    staticClass: "canvas-actual-layer",
    class: {
      'cursor-move': !_vm.editing
    },
    style: ({
      'width': _vm.imgBoxW + 'px',
      'height': _vm.imgBoxH + 'px',
      'transform': 'scale(' + _vm.scale + ',' + _vm.scale + ') ' + 'translate3d(' + _vm.x / _vm.scale + 'px,' + _vm.y / _vm.scale + 'px,' + '0)'
    }),
    on: {
      "mousedown": _vm.mousedownTarget,
      "mouseout": _vm.mouseoutTarget,
      "mousemove": _vm.mousemoveTarget,
      "mouseup": _vm.mouseupTarget,
      "mousewheel": _vm.scaleImg
    }
  }, [_c('div', {
    staticClass: "canvas-bg-layer"
  }, [_c('img', {
    ref: "bgImg",
    staticStyle: {
      "display": "block"
    },
    attrs: {
      "src": _vm.img,
      "alt": ""
    }
  })]), _vm._v(" "), _c('canvas', {
    staticClass: "canvas",
    attrs: {
      "id": "canvas-layer",
      "width": _vm.imgBoxW,
      "height": _vm.imgBoxH
    }
  })])])])], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=2.6a550d0e2da73d008551.js.map