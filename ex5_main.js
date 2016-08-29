var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.set('view engine', 'jade');
app.set('views', './views_ex1'); 
app.use(express.static('public_ex1'));
app.use(bodyParser.urlencoded({ extended: false}));

// insert Form
app.get('/main/new',function(req, res){
	fs.readdir('data',function(err, files){
			if(err){
				console.log(err)
				res.status(500).send('Internal Server Error');
			}
			res.render('new',{titles:files});
	});
});

// insert
app.post('/main', function(req, res){
	var title = req.body.title;
	var content = req.body.content;

	// file에 insert  
	fs.writeFile('data/'+title, content,function(err){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}else{
			res.redirect('/title/'+title);
		}
	});
});

// List & detail
app.get(['/main', '/title/:id'], function(req, res){
    // data title list.
	fs.readdir('data',function(err, files){
		if(err){
			console.log(err)
			res.status(500).send('Internal Server Error');
		}
			var id = req.params.id;
			if(id){
                // data content.
				fs.readFile('data/'+id,'utf-8',function(err, data){
					if(err){
						console.log(err);
						res.status(500).send('Internal Server Error');
					}else{
						res.render('view', {title:id, titles:files, content:data});		
					}
				});	
			}else{
				res.render('view', {titles:files, title:'welcome', content:'Hello, Javascript'});	
			}
			
		
	});
});

app.listen(3000, function(){
	console.log('start first web example');
});
