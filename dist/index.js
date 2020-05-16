/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/home.js":
/*!*************************!*\
  !*** ./src/api/home.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @description 首页接口\n * @since 2020-05-15\n * @author 狗尾草\n */\nconst domain = 'http://www.bgwhite.cn/api';\n// const domain = 'http://127.0.0.1:3002';\nwindow.API = {\n  // 获取文章列表\n  getArticleList(params = {}) {\n    return window.getRequest(`${domain}/article/api/v1/article_list`, params);\n  },\n  // 获取文章详情\n  getArticleDetail(params = {}) {\n    return getRequest(`${domain}/article/api/v1/article_detail`, params);\n  },\n  // 文章阅读量新增\n  setArticleReaderNum(params = {}) {\n    return postRequest(`${domain}/article/api/v1/article_reader_number`, params);\n  },\n  // 文章点赞\n  setArticleGoodNum(params = {}) {\n    return postRequest(`${domain}/article/api/v1/article_likes`, params);\n  }\n};\n\n\n//# sourceURL=webpack:///./src/api/home.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 获取文章列表\nconst HomePage = {\n  oArticleDom: null,\n  oMsgDom: null,\n  getArticleParams: { status: 1, page: 1, size: 5 },\n  totalPage: 0,\n  // 文章渲染\n  articleRender(articleData) {\n    for (let i = 0; i < articleData.length; i++) {\n      this.oArticleDom.innerHTML += `\n        <li class=\"bot\">${articleData[i].isNew ? \"<i class='iconfont recent'>&#xe673;</i>\" : ''}\n          <a href=\"detail.html?id=1\"  class=\"img-hd\">\n            <img\n              alt=\"狗尾草的前端博客\"\n              title=\"${articleData[i].title}\"\n              src=\"${articleData[i].title_image || 'http://static.bgwhite.cn/react-website/title-img-default.jpg'}\"\n            />\n          </a> \n          <div class=\"cont\">\n            <header>\n              <a href=\"detail.html?id=1\" class=\"tag\" >${articleData[i].tagName}</a>\n              <a href=\"detail.html?id=1\" class=\"tit\" >${articleData[i].title}</a>\n            </header>\n            <p class=\"meta\">\n              <span>${articleData[i].update_time}</span>\n              <span>阅读(${articleData[i].reader_number})</span>\n              <span>评论(${articleData[i].comment_number || 0})</span> \n              <span>赞(${articleData[i].good_number})</span> \n            </p>\n            <p class=\"desc\">${articleData[i].describe}</p>\n          </div>\n        </li>`;\n    }\n  },\n  // 文章模块结束加载\n  closeLoading() {\n    var oLoadingDom = document.querySelector('.loading-template');\n    oLoadingDom.style = 'display:none';\n  },\n  // 文章模块加载\n  showLoadingFail() {\n    var oLoadingFailDom = document.querySelector('.loading-fail');\n    oLoadingFailDom.style = 'display:block';\n  },\n  // 获取文章列表\n  getArticleData() {\n    window.API.getArticleList(this.getArticleParams).then(res => {\n      this.oArticleDom.innerHTML = '';\n      const totalPage = Number(res.total);\n      const size = Number(res.size);\n      this.totalPage = totalPage % size === 0 ? (totalPage / size) : (Math.floor(totalPage / size) + 1);\n      this.articleRender(res.articleData);\n    }, () => {\n      window.globalMessage.error('查询文章失败');\n      this.closeLoading();\n      this.showLoadingFail();\n    });\n  },\n  // 初始化\n  init() {\n    this.oArticleDom = document.querySelector('.article-wrap ul');\n    this.getArticleData();\n  },\n  // 下一页\n  handleNextPage() {\n    console.log('71', this.getArticleParams.page);\n    if (this.getArticleParams.page >= this.totalPage) {\n      return;\n    }\n    this.getArticleParams.page += 1;\n    this.getArticleList();\n  },\n  // 首页\n  handleIndexPage() {\n    this.getArticleParams.page = 1;\n    this.getArticleList();\n  },\n  // 上一页\n  handlePreviousPage() {\n    if (this.getArticleParams.page <= 1) {\n      return;\n    }\n    this.getArticleParams.page -= 1;\n    this.getArticleList();\n  }\n};\nHomePage.init();\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/plugins/http.js":
/*!*****************************!*\
  !*** ./src/plugins/http.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @description 请求工具类\n * @since 20200512\n */\n// 监听网络连接\n(function() {\n  // var oMsgDom;\n  window.addEventListener('offline', () => {\n    window.globalMessage.error('网络断开连接');\n  });\n  window.addEventListener('online', () => {\n    window.globalMessage.success('网络重新连接').then(res => {\n      location.reload();\n    });\n  });\n})();\nconsole.log('17http.js文件加载');\n// 请求拦截\nwindow.axios.interceptors.request.use(config => {\n  // showFullScreenLoading();\n  // if(!Cookies.load('adminToken')) {\n  //   return config;\n  // }\n  // const token = Cookies.load('adminToken');\n  // config.headers['Token'] = token;\n  return config;\n}, err => {\n  // tryHideFullScreenLoading();\n  return Promise.resolve(err);\n});\n\n// // 响应拦截\nwindow.axios.interceptors.response.use(res => {\n  // tryHideFullScreenLoading();\n  switch (res.data.code) {\n    case 200:\n      return res.data.result;\n    case 400:\n      window.globalMessage.error(res.data.message);\n      return Promise.reject(res.data.message);\n    case 401:\n      window.globalMessage.error(res.data.message);\n      Router.push({ path: '/login' });\n      Cookies.remove('adminToken');\n      return Promise.reject(res.data.message);\n    case 201:\n      window.globalMessage.error(res.data.message);\n      return res.data.result;\n    case 403:\n      window.globalMessage.error(res.data.message);\n      Cookies.remove('adminToken');\n      Router.push({ pathname: '/login' });\n      return Promise.reject(res.data);\n    case 500:\n      window.globalMessage.error('请求出错⊙﹏⊙∥');\n      return Promise.reject(res.data.message);\n    default:\n      return Promise.reject(res);\n  }\n}, err => {\n  switch (err.response.status) {\n    case 500:\n      window.globalMessage.error('500，服务器出小差了⊙﹏⊙∥');\n      return Promise.reject(err);\n    case 504:\n      window.globalMessage.error('500，服务器被吃了⊙﹏⊙∥');\n      return Promise.reject(err);\n    case 404:\n      window.globalMessage.error('404,请求资源未发现⊙﹏⊙∥');\n      return Promise.reject(err);\n    case 403:\n      window.globalMessage.error('403，权限不足,请联系狗尾草!');\n      return Promise.reject(err);\n    default:\n      window.globalMessage.error('网络超时');\n  }\n});\n\nwindow.axios.defaults.timeout = 300000; // 请求超时5fen\n\nfunction postJsonRequest(url, params) {\n  return window.axios({\n    method: 'post',\n    url: url,\n    data: params,\n    headers: {\n      'Content-Type': 'application/json'\n    }\n  });\n}\n\nfunction postRequest(url, params) {\n  return window.axios({\n    method: 'post',\n    url: url,\n    data: params,\n    transformRequest: [function (data) {\n      let ret = '';\n      for (const it in data) {\n        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';\n      }\n      return ret;\n    }],\n    headers: {\n      'Content-Type': 'application/x-www-form-urlencoded'\n    }\n  });\n}\n\nfunction postHTMLRequest(url, params) {\n  return window.axios({\n    method: 'post',\n    dataType: 'html',\n    url: url,\n    data: params,\n    transformRequest: [function (data) {\n      let ret = '';\n      for (const it in data) {\n        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';\n      }\n      return ret;\n    }],\n    headers: {\n      'Content-Type': 'application/x-www-form-urlencoded'\n    }\n  });\n}\n\nwindow.getRequest = function(url, data = {}) {\n  return window.axios({\n    method: 'get',\n    params: data,\n    url: url\n  });\n};\n\n\n//# sourceURL=webpack:///./src/plugins/http.js?");

/***/ }),

/***/ "./src/plugins/message.js":
/*!********************************!*\
  !*** ./src/plugins/message.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @description 全局消息提示框\n * @author 狗尾草\n * @since 20200512\n */\n// eslint-disable-next-line vars-on-top\nwindow.globalMessage = {\n  success(text) {\n    return new Promise(function(resolve) {\n      var oMsgDom = document.querySelector('.message-success');\n      oMsgDom.style = 'opacity: 1';\n      oMsgDom.children[1].innerHTML = text;\n      setTimeout(() => {\n        oMsgDom.style = 'opacity: 0';\n        resolve(200);\n      }, 1500);\n    });\n  },\n  error(text) {\n    return new Promise(function(resolve) {\n      var oMsgDom = document.querySelector('.message-fail');\n      oMsgDom.style = 'opacity: 1';\n      oMsgDom.children[1].innerHTML = text;\n      setTimeout(() => {\n        oMsgDom.style = 'opacity: 0';\n        resolve(200);\n      }, 1500);\n    });\n  },\n  warning(text) {\n    return new Promise(function(resolve) {\n      var oMsgDom = document.querySelector('.message-warning');\n      oMsgDom.style = 'opacity: 1';\n      oMsgDom.children[1].innerHTML = text;\n      setTimeout(() => {\n        oMsgDom.style = 'opacity: 0';\n        resolve(200);\n      }, 1500);\n    });\n  }\n};\n(function() {\n  var oBody = document.querySelector('body');\n  var oHead = document.querySelector('head');\n  var oMsgStyle = document.createElement('style');\n  var oMsg = document.createElement('div');\n  oMsg.id = 'msg-box';\n  oMsg.innerHTML = \"<div class='message-global message-success'><i class='iconfont'>&#xe835;&nbsp;&nbsp;</i><span></span></div><div class='message-global message-warning'><i class='iconfont'>&#xe835;&nbsp;&nbsp;</i><span></span></div><div class='message-global message-fail'><i class='iconfont'>&#xe835;&nbsp;&nbsp;</i><span></span></div>\";\n  oBody.appendChild(oMsg);\n  oMsgStyle.type = 'text/css';\n  const msgStyle = `\n    .message-success,.message-warning,.message-fail {\n      opacity: 0;\n    }\n    /* 提示框 */\n    .message-success span,.message-success .iconfont {\n      color: green;\n    }\n    .message-fail span,.message-fail .iconfont{\n      color: red;\n    }\n    .message-warning span,.message-warning .iconfont {\n      color: orange;\n    }\n    .message-global {\n      background-color: rgba(255,255,255,.4);\n      height: 30px;\n      padding: 0px 20px;\n      font-size: 12px;\n      position: fixed;\n      left: 50%;\n      top: 100px;\n      transform: translate(-50%,-50%);\n      display: flex;\n      align-items: center;\n    }`;\n  try {\n    oMsgStyle.appendChild(document.createTextNode(msgStyle));\n  } catch (ex) {\n    oMsgStyle.styleSheet.cssText = msgStyle;// 针对IE\n  }\n  oHead.appendChild(oMsgStyle);\n})();\n\n\n//# sourceURL=webpack:///./src/plugins/message.js?");

/***/ }),

/***/ 0:
/*!************************************************************************************************!*\
  !*** multi ./src/plugins/message.js ./src/plugins/http.js ./src/api/home.js ./src/js/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/plugins/message.js */\"./src/plugins/message.js\");\n__webpack_require__(/*! ./src/plugins/http.js */\"./src/plugins/http.js\");\n__webpack_require__(/*! ./src/api/home.js */\"./src/api/home.js\");\nmodule.exports = __webpack_require__(/*! ./src/js/index.js */\"./src/js/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/plugins/message.js_./src/plugins/http.js_./src/api/home.js_./src/js/index.js?");

/***/ })

/******/ });