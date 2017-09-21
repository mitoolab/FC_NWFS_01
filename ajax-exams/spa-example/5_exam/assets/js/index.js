(function () {
  var root = document.querySelector('.app-root');

  var get = function (url) {
    return new Promise(function (resolve, reject) {
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.send();

      req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
          if (req.status === 200) resolve(req.response);
          else reject(req.statusText);
        }
      };
    });
  };

  var render = function (data) {
    data = JSON.parse(data);
    console.log(data);
    root.innerHTML = '<h1>' + data.title + '</h1><p>' + data.content + '</p>';
  };

  var renderHtml = function (html) {
    root.innerHTML = html;
  };

  var signinInit = function () {
    document.getElementById('btn-signin').addEventListener('click', function (e) {
      e.preventDefault();
      console.log('go!');
      location.href = '#about?email=' + 'xxxxx';
    });
  };

  var signupInit = function () {
    document.getElementById('btn-signup').addEventListener('click', function (e) {
      e.preventDefault();
      console.log('go!');
      location.href = '#';
    });
  };

  var routes = {
    '': function () {
      get('/public/signin.html')
        .then(function (res) {
          renderHtml(res);
          signinInit();
        });
    },
    'signup': function () {
      get('/public/signup.html')
        .then(function (res) {
          renderHtml(res);
          signupInit();
        });
    },
    'service': function () {
      get('/assets/service.json')
        .then(function (res) { render(res); });
    },
    'about': function () {
      get('/public/about.html')
        .then(function (res) { renderHtml(res); });
    },
    otherwise(hash) {
      root.innerHTML = `${hash} Not Found`;
    }
  };

  function router() {
    var hash = location.hash.replace('#', '');
    (routes[hash] || routes.otherwise)(hash);
  }

  // HTML과 script가 로드된 시점에 발생하는 이벤트. load 이벤트보다 먼저 발생한다. IE 9 이상 지원
  // hash값을 가지고 있는 URL(http://localhost:5000/#service 등)을 요청할 경우를 위한 처리
  window.addEventListener('DOMContentLoaded', router);

  // hash가 변경하면 발생하는 이벤트
  window.addEventListener('hashchange', router);
}());
