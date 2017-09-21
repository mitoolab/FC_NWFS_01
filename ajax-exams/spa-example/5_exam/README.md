# 1. Mission

Hash 방식을 사용하여 로그인 페이지와 회원 가입 페이지, 그리고 로그인에 성공하였을 때 이동할 메인페이지를 작성한다.

# 2. 사용 기술

## 2.1 프론트엔드

- ES6 (class, module)
- Sass
- Babel
- Webpack

## 2.2 백엔드

- Express
- [jsonfile](https://www.npmjs.com/package/jsonfile)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [express-handlebars](https://github.com/ericf/express-handlebars)

# 3. 프론트엔드 기능

## 3.1 로그인

1. 로그인 페이지와 회원 가입 페이지는 링크 태그를 통해 상호 이동 가능하여야 한다. 
2. 로그인 페이지에서 사용자가 입력한 아이디와 패스워드를 POST하여 회원가입 여부를 확인한다.
3. 로그인에 성공하면 메인 페이지로 이동한다.

## 3.2 회원 가입

1. 사용자가 입력한 데이터를 POST하여 회원가입 여부를 확인한다.
2. 이미 회원인 경우, 경고 메시지를 표시한다.
3. 회원이 아닌 경우, JSON 파일에 사용자가 입력한 데이터를 추가한다.
4. 회원 가입에 성공하면 로그인 페이지로 이동한다.

# 4. 백엔드 기능

Express를 사용한다. DB는 JSON 파일 I/O로 대신한다.

## 4.1 사용자 인증

```javascript
///////////////////////////////////////////////
// 사용자 인증 요청
///////////////////////////////////////////////
router.post('/signin', function(req, res){
  console.log('***사용자 인증 요청');
  console.log('*클라이언트 입력 사용자정보');
  console.log(req.body);

  const user = { username, password } = req.body;
 
  JSON.parse(fs.readFileSync('./db/user.json', 'utf8'));
  fs.writeFile('./db/user.json', JSON.stringify(user), 'utf8');


   // Authorize user
  if(username !== "ungmo2@gmail.com") {
    res.send({
      auth_res : false,
      msg: "등록되지 않은 아이디입니다. 아이디를 다시 확인하세요."
    });
  } else if(pw !== "1111") {
    res.send({
      auth_res : false,
      msg: "패스워드를 잘못 입력하셨습니다."
    });
  } else {
    console.log("Successfully Authenticated!");
    res.send({
      auth_res : true
    });
  }
});
```

## 4.2 신규 사용자 생성

```javascript
///////////////////////////////////////////////
// 신규 사용자 생성 요청
///////////////////////////////////////////////
router.post('/signup', function(req, res){
  console.log('***사용자 생성 요청');
  console.log('*클라이언트 입력 사용자정보');
  console.log(req.body);

  const user = { username, password } = req.body;

  JSON.parse(fs.readFileSync('./db/user.json', 'utf8'));
  fs.writeFile('./db/user.json', JSON.stringify(user), 'utf8');






  User.findOne({ 'username' : req.body.username }, function(err, user) {
    if(err) return res.status(500).send(err);

    // username이 중복되는 사용자가 없을때 신규 사용자로 등록
    if(!user){
      User.create(req.body, function (err, newUser) {
        if(err) return res.status(500).send(err);
        console.log('*사용자 생성 성공');
        console.log(newUser);
        return res.send({ result : true });
      });
    } else {
      return res.send({
        result : false,
        msg: '입력하신 이메일은 이미 사용되고 있습니다. 다른 이메일을 입력하세요.'
      });
    }
  });
});



app.get('/users', function(req, res) {
  var name = req.query.name;
  var age = req.query.age;

  var person = {
    name: name,
    age: age
  };

  savePersonToPublicFolder(person, function(err) {
    if (err) {
      res.status(404).send('User not saved');
      return;
    }

    res.send('User saved');
  });
});

function savePersonToPublicFolder(person, callback) {
  fs.writeFile('./public/person.json', JSON.stringify(person), callback);
}
```
