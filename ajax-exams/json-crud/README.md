# 1. Front-end Set-up

## 1.1 Dependency

- Webpack
- Babel
- Sass

```bash
$ npm init -y

# eslint
$ eslint --init
$ npm install eslint-plugin-html --save-dev

# babel
$ npm install babel-cli babel-preset-env --save-dev

# webpack
$ npm install webpack babel-loader node-sass css-loader sass-loader style-loader file-loader extract-text-webpack-plugin --save-dev
```

## 1.2 Configuration

**webpack.config.js**

```javascript
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/js/main.js', './src/sass/style.scss']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader?outputStyle=expanded']
        }),
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              // css내의 path: publicPath + outputPath => ../fonts/
              publicPath: '../',
              outputPath: 'assets/fonts/'
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'css/[name].css',
      allChunks: true
    })
  ],
  devtool: 'source-map'
};
```

**package.json**

```json
  ...
  "scripts": {
    "build": "webpack -w"
  },
```

## 1.3 TEST Files

TEST를 위한 파일 구조

```
/
├── src/
│   ├── asserts/
│   │   └── font/
│   │       ├── Roboto-Regular-webfont.eot
│   │       ├── Roboto-Regular-webfont.ttf
│   │       └── Roboto-Regular-webfont.woff
│   ├── js/
│   │   ├── lib.js
│   │   └── main.js
│   └── sass/
│       ├── partial/
│       │   ├── _body.scss
│       │   └── _font.scss
│       └── style.scss
└── index.html
```

**index.html**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="public/css/bundle.css">
  <script src="public/js/bundle.js" defer></script>
</head>
<body>
  <h1>Hello world</h1>
</body>
</html>
```

**src/sass/partial/_body.scss**

```scss
body {
  font-family: 'RobotoNormal', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

**src/sass/partial/_font.scss**

src/assets/fonts 폴더에 Roboto-Regular-webfont.eot, Roboto-Regular-webfont.ttf, Roboto-Regular-webfont.woff 파일이 존재하여야 한다.

```scss
@font-face {
  font-family: 'RobotoNormal';
  src: url('../assets/fonts/Roboto-Regular-webfont.eot');
  src: url('../assets/fonts/Roboto-Regular-webfont.eot?#iefix') format('embedded-opentype'),
       url('../assets/fonts/Roboto-Regular-webfont.woff') format('woff'),
       url('../assets/fonts/Roboto-Regular-webfont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
```

**src/sass/style.scss**

```scss
@import "partial/_font";
@import "partial/_body";

$res-color: #6900FF;
#res {
  color: $res-color;
}
```

**src/js/lib.js**

```javascript
export default function (x) {
  return x * x;
}
```

**src/js/main.js**

```javascript
import square from './lib';

console.log(square(3)); // 9

let html = '';
square(3) === 9 ? html = 'Webpack is working!' : html = 'Somethig wrong!';

document.getElementById('res').innerHTML = html;
```

## 1.4 Build

```bash
$ npm run build
```

Build 결과 생성된 파일 구조

```
/
├── public/
│   ├── asserts/
│   │   └── font/
│   │       ├── Roboto-Regular-webfont.eot
│   │       ├── Roboto-Regular-webfont.ttf
│   │       └── Roboto-Regular-webfont.woff
│   ├── css/
│   │   ├── bundle.css
│   │   └── bundle.css.map
│   ├── js/
│   │   ├── bundle.js
│   │   └── bundle.js.map
├── src/
│   ├── asserts/
│   │   └── font/
│   │       ├── Roboto-Regular-webfont.eot
│   │       ├── Roboto-Regular-webfont.ttf
│   │       └── Roboto-Regular-webfont.woff
│   ├── js/
│   │   ├── lib.js
│   │   └── main.js
│   └── sass/
│       ├── partial/
│       │   ├── _body.scss
│       │   └── _font.scss
│       └── style.scss
└── index.html
```

# 2. Back-end Set-up

## 2.1 Dependency

- express
- body-parser
- express-handlebars

```bash
$ npm install nodemon -g

$ npm install express body-parser express-handlebars
```

## 2.2 Configuration

**package.json**

```json
  ...
  "scripts": {
    "build": "webpack -w",
    "start": "nodemon server.js"
  },
```

**JSON DB**

/data/users.json

```json
{
  "users": [
    {
      "userid": "ungmo2@gmail.com",
      "password": "1234",
      "firstname": "Ung-mo",
      "lastname": "Lee"
    },
    {
      "userid": "user@somewhere.com",
      "password": "ps1000",
      "firstname": "",
      "lastname": ""
    }
  ]
}
```

## 2.3 Serve

```bash
$ npm start
```

[http://localhost:3000](http://localhost:3000)

# 3. Request

## 3.1 GET User

```
GET /users
GET /users/:userid
```

## 3.2 CREATE User

```
POST /users
```

## 3.3 Update user

```
PUT /users/:userid
```

## 3.4 DELETE User

```
DELETE /users/:userid
```
