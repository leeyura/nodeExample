var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', './views'); 

app.use(express.static('public'));

//quuery String
app.get('/topic', function(req, res){
 var topics = [
    'topic 1',
    'topic 2',
    'topic 3'
  ];
  var result = `
  <a href="/topic?no=0">ONE</a><br>
  <a href="/topic?no=1">TWO</a><br>
  <a href="/topic?no=2">THREE</a><br><br>
  ${topics[req.query.no]}
  `
  res.send(result);
});

// sementic url example 
app.get('/topic/:id/:mode',function(req, res){
  res.send(req.params.id+','+req.params.mode);
});


app.listen(3000, function () {
  console.log('queryString go');
});