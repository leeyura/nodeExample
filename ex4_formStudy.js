var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.set('view engine', 'jade');
app.set('views', './views'); 

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/form',function(req, res){
	res.render('form');
});

app.get('/insertData',function(req,res){
	var title = req.query.title;
	var content = req.query.content;
	res.send(title+','+ content)
});

// body-parser 필요함.
app.post('/insertData',function(req,res){
	var title = req.body.title;
	var content = req.body.content;
	res.send(title+','+ content);
});

app.listen(3000, function () {
  console.log('insert form go');
});