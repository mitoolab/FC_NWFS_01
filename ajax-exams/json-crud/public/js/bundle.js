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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ajax = __webpack_require__(2);

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var viewer = document.getElementById('viewer');
  var btnGet = document.getElementById('get');
  var btnPost = document.getElementById('post');
  var btnPut = document.getElementById('put');
  var btnDel = document.getElementById('delete');
  var inputUserid = document.getElementById('userid');

  function render(data) {
    viewer.innerHTML = JSON.stringify(JSON.parse(data), null, 2);
  }

  btnGet.addEventListener('click', function () {
    viewer.innerHTML = '';

    var userid = inputUserid.value;
    var url = userid ? '/users/' + userid : '/users';

    _ajax2.default.get(url).then(render);
  });

  btnPost.addEventListener('click', function () {
    viewer.innerHTML = '';

    var userid = inputUserid.value;

    if (!userid) return alert('userid를 입력하세요');

    var password = document.getElementById('password').value;
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;

    _ajax2.default.post('/users', { userid: userid, password: password, firstname: firstname, lastname: lastname }).then(render);
  });

  btnPut.addEventListener('click', function () {
    viewer.innerHTML = '';

    var userid = inputUserid.value;

    if (!userid) return alert('userid를 입력하세요');

    var password = document.getElementById('password').value;
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;

    _ajax2.default.put('/users', userid, { userid: userid, password: password, firstname: firstname, lastname: lastname }).then(render);
  });

  btnDel.addEventListener('click', function () {
    viewer.innerHTML = '';

    var userid = inputUserid.value;

    if (!userid) return alert('userid를 입력하세요');

    _ajax2.default.delete('/users', userid).then(render);
  });
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = function () {
  function Ajax() {
    _classCallCheck(this, Ajax);
  }

  _createClass(Ajax, null, [{
    key: 'get',
    value: function get(url) {
      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.send();

        req.onreadystatechange = function () {
          if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) resolve(req.response);else reject(req.statusText);
          }
        };
      });
    }
  }, {
    key: 'post',
    value: function post(url, data) {
      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('POST', url);
        // 서버로 전송하는 데이터의 mime type 설정
        req.setRequestHeader('Content-type', 'application/json');
        req.send(JSON.stringify(data));
        // req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // // escaping untrusted data
        // req.send(Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&'));

        req.onreadystatechange = function () {
          if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) resolve(req.response);else reject(req.statusText);
          }
        };
      });
    }
  }, {
    key: 'put',
    value: function put(url, id, data) {
      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('PUT', url + '/' + id);
        // 서버로 전송하는 데이터의 mime type 설정
        req.setRequestHeader('Content-type', 'application/json');
        req.send(JSON.stringify(data));

        req.onreadystatechange = function () {
          if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) resolve(req.response);else reject(req.statusText);
          }
        };
      });
    }
  }, {
    key: 'delete',
    value: function _delete(url, id) {
      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('DELETE', url + '/' + id);
        req.send();

        req.onreadystatechange = function () {
          if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) resolve(req.response);else reject(req.statusText);
          }
        };
      });
    }
  }]);

  return Ajax;
}();

exports.default = Ajax;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map