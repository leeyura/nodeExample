var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/template', function (req, res) {
  res.render('example1');
});


app.get('/route', function(req, res){
    res.send('Hello cat, <img src="/cat.jpeg">')
})

app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding'+i+'</li>';
  }
  var time = Date();
  var result = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
          ${lis}
        </ul>
        ${time}
    </body>
  </html>`;
  res.send(result);
});


app.listen(3000, function () {
  console.log('Connect 3000 port!');
});