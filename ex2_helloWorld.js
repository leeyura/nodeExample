// 기본적인 요소들 
var express = require('express');
var app = express();

app.get('/hello',function(req, res){
	res.send('hello world');
});

app.listen(3000, function(){
	console.log('start node');
});