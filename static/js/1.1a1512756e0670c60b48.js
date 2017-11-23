webpackJsonp([1],{

/***/ 100:
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

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(79) && !__webpack_require__(87)(function(){
  return Object.defineProperty(__webpack_require__(95)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(117);
var $Object = __webpack_require__(82).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(91);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(79), 'Object', {defineProperty: __webpack_require__(83).f});

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatTime; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(100);
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

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_utils_util__ = __webpack_require__(155);






var Polygon = function () {
  function Polygon(_ref) {
    var ctx = _ref.ctx,
        _ref$strokeStyle = _ref.strokeStyle,
        strokeStyle = _ref$strokeStyle === undefined ? 'blue' : _ref$strokeStyle,
        _ref$fillStyle = _ref.fillStyle,
        fillStyle = _ref$fillStyle === undefined ? 'rgba(255, 113, 98, .8)' : _ref$fillStyle,
        _ref$dotRadius = _ref.dotRadius,
        dotRadius = _ref$dotRadius === undefined ? 3 : _ref$dotRadius;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Polygon);

    this.ctx = ctx;
    this.dotRadius = dotRadius;
    this.strokeStyle = strokeStyle;
    this.fillStyle = fillStyle;
    this.dots = [];
    this.finish = false;
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
      this.ctx.moveTo(this.startX, this.startY);
      this.dots.forEach(function (dot, index) {
        _this3.ctx.lineTo(dot.x, dot.y);
      });
      this.ctx.stroke();
      if (this.dots.length > 1) {
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
      imgName: ''
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
      console.log(e);
      e.preventDefault();
      if (e && (e.ctrlKey || e.metaKey) && (e.keyCode === 32 || e.keyCode === 8)) _this.finishPolygon();
      if (e && (e.ctrlKey || e.metaKey) && e.keyCode === 68) _this.getCanvasImg();
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
      var _this4 = this;

      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$alert('请选择以下图片类型：.gif/jpeg/jpg/png/bmp', '提示');
        return false;
      }
      this.file = e.target.files[0];
      this.imgName = this.file.name;
      var reader = new FileReader();
      reader.onload = function (e) {
        _this4.img = e.target.result;
      };
      reader.readAsDataURL(this.file);
    },
    getCanvas: function getCanvas() {
      this.canvas = document.getElementById('canvas-layer');
      this.ctx = this.canvas.getContext('2d');
    },
    clickEdit: function clickEdit() {
      this.editing = !this.editing;
    },
    getCanvasImg: function getCanvasImg() {
      var type = 'png';
      var imgdata = this.canvas.toDataURL('image/png');
      var fixtype = function fixtype(type) {
        type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
      };
      imgdata = imgdata.replace(fixtype(type), 'image/octet-stream');
      var savaFile = function savaFile(data, filename) {
        var saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        saveLink.href = data;
        saveLink.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        saveLink.dispatchEvent(event);
      };
      var filename = '' + this.imgName.substring(0, this.imgName.lastIndexOf('.')) + '_' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_utils_util__["a" /* formatTime */])().format('yyyyMMdd') + '.' + type;
      savaFile(imgdata, filename);
    },
    createPolygon: function createPolygon(_ref4) {
      var offsetX = _ref4.offsetX,
          offsetY = _ref4.offsetY;

      this.currentPolygon = new Polygon({ ctx: this.ctx });
      this.currentPolygon.startDraw({ x: offsetX, y: offsetY });
    },
    drawPolygon: function drawPolygon(_ref5) {
      var offsetX = _ref5.offsetX,
          offsetY = _ref5.offsetY;

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
    changeSize: function changeSize(_ref6) {
      var change = _ref6.change;

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
      var _this5 = this;

      this.moving && vue.$nextTick(function () {
        _this5.x = ~~(nowX - _this5.moveX);
        _this5.y = ~~(nowY - _this5.moveY);
      });
    },
    endMove: function endMove() {
      this.moving = false;
    }
  }
});

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(73)(true);
// imports


// module
exports.push([module.i, ".header[data-v-2297f758]{height:50px;line-height:50px;padding:0 20px}.main-container[data-v-2297f758]{width:100%;height:calc(100% - 50px)}.tools[data-v-2297f758]{padding:0 10px;height:100%}.tool-item[data-v-2297f758]{height:40px}.canvas-c[data-v-2297f758]{height:100%;position:relative}.bg-img-num1[data-v-2297f758]{position:absolute;left:0;right:0;top:0;bottom:0;color:hsla(0,0%,100%,.65);background-color:#24292e;background-image:url(" + __webpack_require__(208) + "),linear-gradient(#191c20,#24292e 15%);background-repeat:repeat-x;background-position:center 0,0 0,0 0}.canvas-container[data-v-2297f758]{position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;overflow:hidden;background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC\")}.canvas-actual-layer[data-v-2297f758]{position:relative}.canvas[data-v-2297f758]{position:absolute;top:0;left:0}.cursor-move[data-v-2297f758]{cursor:move}.img-draw[data-v-2297f758]{cursor:crosshair}#ui-layer[data-v-2297f758]{z-index:3}", "", {"version":3,"sources":["/Applications/XAMPP/xamppfiles/htdocs/XaircraftProject/web/AI/src/views/polygon/index.vue"],"names":[],"mappings":"AACA,yBACE,YAAa,AACb,iBAAkB,AAClB,cAAgB,CACjB,AACD,iCACE,WAAY,AACZ,wBAA0B,CAC3B,AACD,wBACE,eAAgB,AAChB,WAAa,CACd,AACD,4BACE,WAAa,CACd,AACD,2BACE,YAAa,AACb,iBAAmB,CACpB,AACD,8BACE,kBAAmB,AACnB,OAAQ,AACR,QAAS,AACT,MAAO,AACP,SAAU,AACV,0BAA8B,AAC9B,yBAA0B,AAC1B,oFAA6F,AAC7F,2BAA4B,AAC5B,oCAAwC,CACzC,AACD,mCACE,kBAAmB,AACnB,OAAQ,AACR,QAAS,AACT,MAAO,AACP,SAAU,AACV,YAAa,AACb,gBAAiB,AACjB,8QAAgR,CACjR,AACD,sCACE,iBAAmB,CACpB,AACD,yBACE,kBAAmB,AACnB,MAAO,AACP,MAAQ,CACT,AACD,8BACE,WAAa,CACd,AACD,2BACE,gBAAkB,CACnB,AACD,2BACE,SAAW,CACZ","file":"index.vue","sourcesContent":["\n.header[data-v-2297f758] {\n  height: 50px;\n  line-height: 50px;\n  padding: 0 20px;\n}\n.main-container[data-v-2297f758] {\n  width: 100%;\n  height: calc(100% - 50px);\n}\n.tools[data-v-2297f758] {\n  padding: 0 10px;\n  height: 100%;\n}\n.tool-item[data-v-2297f758] {\n  height: 40px;\n}\n.canvas-c[data-v-2297f758] {\n  height: 100%;\n  position: relative;\n}\n.bg-img-num1[data-v-2297f758] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  color: rgba(255,255,255,0.65);\n  background-color: #24292e;\n  background-image: url(../../assets/images/star-bg.svg),linear-gradient(#191c20, #24292e 15%);\n  background-repeat: repeat-x;\n  background-position: center 0, 0 0, 0 0;\n}\n.canvas-container[data-v-2297f758] {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  overflow: hidden;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');\n}\n.canvas-actual-layer[data-v-2297f758] {\n  position: relative;\n}\n.canvas[data-v-2297f758] {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.cursor-move[data-v-2297f758] {\n  cursor: move;\n}\n.img-draw[data-v-2297f758] {\n  cursor: crosshair;\n}\n#ui-layer[data-v-2297f758] {\n  z-index: 3;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(201);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(74)("30cd88d0", content, true);

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/star-bg.ba93415.svg";

/***/ }),

/***/ 210:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bg-img-num1"
  }, [_c('el-row', [_c('div', {
    staticClass: "header"
  }, [_vm._v("\n      " + _vm._s(_vm.imgName) + "\n    ")])]), _vm._v(" "), _c('el-row', {
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
      "click": _vm.getCanvasImg
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

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(204)
}
var Component = __webpack_require__(98)(
  /* script */
  __webpack_require__(156),
  /* template */
  __webpack_require__(210),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2297f758",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 78:
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(87)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),

/***/ 82:
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),

/***/ 83:
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

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(86);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),

/***/ 85:
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

/***/ 86:
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),

/***/ 87:
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),

/***/ 90:
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

/***/ 91:
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

/***/ 92:
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

/***/ 93:
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(86)
  , document = __webpack_require__(78).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),

/***/ 97:
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

/***/ 98:
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

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ })

});
//# sourceMappingURL=1.1a1512756e0670c60b48.js.map