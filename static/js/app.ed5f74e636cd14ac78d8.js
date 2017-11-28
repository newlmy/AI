webpackJsonp([5],{

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_src_web_config__ = __webpack_require__(51);



__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);
var router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: __WEBPACK_IMPORTED_MODULE_2_src_web_config__["a" /* RouterConfig */],
  linkActiveClass: 'active'
});
router.beforeEach(function (to, from, next) {
  document.title = to.meta.title || __WEBPACK_IMPORTED_MODULE_2_src_web_config__["b" /* Title */];
  next();
});
window.Router = router;

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_element_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_src_router_index__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_css_reset_css__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_css_reset_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__assets_css_reset_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_css_font_iconfont_css__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_css_font_iconfont_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__assets_css_font_iconfont_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_element_ui_lib_theme_default_index_css__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_element_ui_lib_theme_default_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_element_ui_lib_theme_default_index_css__);







__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_element_ui___default.a);
window.Vue = __WEBPACK_IMPORTED_MODULE_0_vue__["default"];

new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2_src_router_index__["a" /* default */],
  diagol: {}
});

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Title; });
/* unused harmony export MenuConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RouterConfig; });
var Title = 'AI大脑';

var MenuConfig = [{
  text: '任务汇总',
  icon: 'ali-icon-renwu',
  link: '/product/list',
  sunData: [{
    text: '统计',
    link: '/index'
  }]
}];
var RouterConfig = [{
  path: '/',
  component: function component(resolve) {
    return __webpack_require__.e/* require */(1).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(76)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
  },
  meta: {
    title: '区块'
  },
  children: []
}, {
  path: '/point',
  component: function component(resolve) {
    return __webpack_require__.e/* require */(2).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(75)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
  },
  meta: {
    title: '标点'
  },
  children: []
}, {
  path: '/test',
  component: function component(resolve) {
    return __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(78)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
  },
  meta: {
    title: '大脑入口'
  }
}, {
  path: '/polygon/paper',
  component: function component(resolve) {
    return __webpack_require__.e/* require */(3).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(77)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
  },
  meta: {
    title: '多边形'
  }
}];


/***/ })

},[50]);
//# sourceMappingURL=app.ed5f74e636cd14ac78d8.js.map