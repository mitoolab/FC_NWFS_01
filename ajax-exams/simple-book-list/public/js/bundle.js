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


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ajax = __webpack_require__(2);

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// BookList View Controller
var BookList = function () {
  function BookList() {
    _classCallCheck(this, BookList);

    this.url = '/books';
    this.books = [];
  }

  // books 객체의 마지막 id에 1을 더한 값 취득


  _createClass(BookList, [{
    key: 'bindBooksToDom',
    value: function bindBooksToDom() {
      document.querySelector('tbody').innerHTML = this.books.map(function (_ref) {
        var id = _ref.id,
            title = _ref.title,
            author = _ref.author,
            price = _ref.price,
            editable = _ref.editable;
        return BookList.makeHtmlTableRow({ id: id, title: title, author: author, price: price, editable: editable });
      }).join('');
    }

    // bookList view 초기화

  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      _ajax2.default.get(this.url).then(function (books) {
        _this.books = JSON.parse(books);
        console.log('[GET]', _this.books);
        _this.bindBooksToDom();
      });
    }
  }, {
    key: 'eventProcess',
    value: function eventProcess() {
      var _this2 = this;

      // Add 버튼 이벤트 핸들러
      // books 배열에 내용이 비어 있는 새로운 book 객체를 추가한다
      document.getElementById('add').addEventListener('click', function () {
        // books 객체에 새로운 book 추가
        _this2.books.push({
          id: _this2.lastBookId,
          title: '',
          author: '',
          price: '',
          status: 'new',
          editable: true
        });

        _this2.bindBooksToDom();
        console.log('[ADD]', _this2.books);
      });

      // edit / save / delete 버튼 이벤트 핸들러
      document.querySelector('tbody').addEventListener('click', function (e) {
        // 이벤트 타킷이 edit / save / delete 버튼이 아니면 처리 종료
        if (!e.target || e.target.nodeName !== 'BUTTON') return;

        // 이벤트를 발생시킨 버튼이 소속된 book의 id
        var targetId = e.target.dataset.item * 1;
        // 이벤트를 발생시킨 버튼의 타입 (edit / save / delete)
        var type = e.target.dataset.type;


        switch (type) {
          // edit 버튼 이벤트 핸들러
          case 'edit':
            {
              _this2.books.forEach(function (book) {
                if (book.id === targetId) {
                  book.editable = true;
                  book.status = 'edited';
                }
              });

              _this2.bindBooksToDom();
              console.log('[EDIT: ' + targetId + ']', _this2.books);
              break;
            }
          // save 버튼 이벤트 핸들러
          case 'save':
            {
              // save 대상 row에서 input data 취득
              var targetRowInputs = document.querySelectorAll('.row-' + targetId + ' input[type=text]');
              var inputTitle = targetRowInputs[0];
              // 공백 제거
              inputTitle.value = inputTitle.value.trim();

              if (!inputTitle.value) {
                inputTitle.placeholder = '책 제목을 입력하세요.';
                inputTitle.focus();
                // return alert('책 제목을 입력하세요.');
                return;
              }

              // save 대상 row에서 사용자 입력 데이터를 취득하여 books 배열에 반영
              _this2.books.forEach(function (book) {
                if (book.id === targetId) {
                  // input의 name을 key로 input의 value를 값으로 book 객체 생성
                  [].concat(_toConsumableArray(targetRowInputs)).forEach(function (input) {
                    book[input.name] = input.value;
                  });
                  book.editable = false;

                  // book 객체를 DB에 반영
                  if (book.status === 'new') {
                    // book status가 new(신규추가)이면 DB에 POST
                    console.log('[SAVE/NEW: ' + targetId + ']', book);
                    book.status = '';

                    _ajax2.default.post(_this2.url, book).then(function (res) {
                      console.log('[POST]', res);
                      return _ajax2.default.get(_this2.url);
                    }).then(function (books) {
                      _this2.books = JSON.parse(books);
                      console.log('[GET]', _this2.books);
                      _this2.bindBooksToDom();
                    });
                  } else if (book.status === 'edited') {
                    // book status가 eidt(수정)이면 DB에 PUT
                    console.log('[SAVE/EDIT: ' + targetId + ']', book);
                    book.status = '';

                    _ajax2.default.put(_this2.url, book.id, book).then(function (newBook) {
                      console.log('[PUT]', newBook);
                      return _ajax2.default.get(_this2.url);
                    }).then(function (books) {
                      _this2.books = JSON.parse(books);
                      console.log('[GET]', _this2.books);
                      _this2.bindBooksToDom();
                    });
                  }
                }
              });
              break;
            }
          // cancel 버튼 이벤트 핸들러
          case 'cancel':
            {
              var _books$filter = _this2.books.filter(function (book) {
                return book.id === targetId;
              }),
                  _books$filter2 = _slicedToArray(_books$filter, 1),
                  targetBook = _books$filter2[0];

              if (targetBook.status === 'new') {
                // Add 버튼으로 추가된 항목(DB 미반영)에 대한 입력이 취소되면 대상 항목 삭제
                _this2.books = _this2.books.filter(function (book) {
                  return book.id !== targetId;
                });
              } else {
                // 기존 항목(DB 반영)에 대한 입력이 취소되면 editable 취소
                _this2.books.forEach(function (book) {
                  if (book.id === targetId) {
                    book.editable = false;
                    book.status = '';
                  }
                });
              }

              _this2.bindBooksToDom();
              console.log('[CANCEL: ' + targetId + ']', _this2.books);
              break;
            }
          // delete 버튼 이벤트 핸들러
          case 'delete':
            {
              _ajax2.default.delete(_this2.url, targetId).then(function () {
                console.log('[DEL]', targetId);
                return _ajax2.default.get(_this2.url);
              }).then(function (books) {
                _this2.books = JSON.parse(books);
                console.log('[GET]', _this2.books);
                _this2.bindBooksToDom();
              });
              break;
            }
          default:
            break;
        }
      });
    }
  }, {
    key: 'lastBookId',
    get: function get() {
      return !this.books.length ? 1 : Math.max.apply(Math, _toConsumableArray(this.books.map(function (_ref2) {
        var id = _ref2.id;
        return id;
      }))) + 1;
    }

    // If a class method does not use this, it can safely be made a static function.

  }], [{
    key: 'makeHtmlTableRow',
    value: function makeHtmlTableRow(_ref3) {
      var id = _ref3.id,
          title = _ref3.title,
          author = _ref3.author,
          price = _ref3.price,
          editable = _ref3.editable;

      var res = '';
      // editable의 값이 'true'인 경우, true로 변경
      var isEditable = editable || editable === 'true';

      // [true, 'true', false, 'false'].forEach(editable => {
      //   // const isEditable = (editable === true) || (editable === 'true'); // OK
      //   const isEditable = editable || (editable === 'true'); // OK
      //   // const isEditable = (editable === 'true'); // NG
      //   // const isEditable = (editable == 'true'); // NG
      //   console.log(isEditable);
      // });

      if (isEditable) {
        res = '<tr class="row-' + id + '">\n        <th>' + id + '</th>\n        <td><input type="text" class="form-control" name="title" value="' + title + '"></td>\n        <td><input type="text" class="form-control" name="author" value="' + author + '"></td>\n        <td><input type="text" class="form-control" name="price" value="' + price + '"></td>\n        <td>\n          <div class="btn-group" role="group">\n            <button type="button" class="btn btn-default" data-item="' + id + '" data-type="save">\n              <i class="fa fa-check" aria-hidden="true"></i>\n            </button>\n            <button type="button" class="btn btn-default" data-item="' + id + '" data-type="cancel">\n              <i class="fa fa-ban" aria-hidden="true"></i>\n            </button>\n            <button type="button" class="btn btn-default" data-item="' + id + '" data-type="delete">\n              <i class="fa fa-trash-o" aria-hidden="true"></i>\n            </button>\n          </div>\n        </td>\n      </tr>';
      } else {
        res = '<tr class="row-' + id + '">\n        <th>' + id + '</th>\n        <td>' + title + '</td>\n        <td>' + author + '</td>\n        <td>' + (price * 1).toLocaleString() + '</td>\n        <td>\n          <div class="btn-group" role="group">\n            <button type="button" class="btn btn-default" data-item="' + id + '" data-type="edit">\n              <i class="fa fa-pencil" aria-hidden="true"></i>\n            </button>\n            <button type="button" class="btn btn-default" data-item="' + id + '" data-type="delete">\n              <i class="fa fa-trash-o" aria-hidden="true"></i>\n            </button>\n          </div>\n        </td>\n      </tr>';
      }
      return res;
    }
  }]);

  return BookList;
}();

var bookList = new BookList();

// bookList view 초기화
bookList.init();

// bookList view event handlers
bookList.eventProcess();

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