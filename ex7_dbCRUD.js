var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : 'password',
  database : 'db'
});

conn.connect();


app.set('view engine', 'jade');
app.set('views', './mysqlView'); 
app.use(express.static('public_ex1'));
app.use(bodyParser.urlencoded({ extended: false}));

// List & detail
app.get(['/main', '/title/:id'], function(req, res){
  var sql = '';
  sql = 'select id,title from topic';
    conn.query(sql, function(err, topics, fields){
        var id = req.params.id;
        if(id){
            sql = 'select * from topic where id=?';
            conn.query(sql, [id], function(err, topic, fields){
               if(err){
                   res.status(500).send('Internal Server Error');
                   console.log(err);
               }else{
                   res.render('view',{topics:topics, topic:topic[0]})
               }
            });
        }else{
            res.render('view',{topics:topics});    
        }
    });
});

// insert Form
app.get('/main/new',function(req, res){
	sql = 'select id,title from topic';
    conn.query(sql, function(err, topics, fields){
       if(err){
           res.status(500).send('Internal Server Error');
           console.log(err);
       }
       res.render('new', {topics:topics}) 
    });
});

// insert
app.post('/main/new', function(req, res){
	var title = req.body.title;
	var description = req.body.description;
    var author = req.body.author;
	var sql = 'insert into topic(title, description, author) values(?, ?, ?)';
    // file에 insert  
	conn.query(sql, [title, description, author], function(err, result, fields){
        if(err){
            res.status(500).send('Internal Server Error');
            console.log(err);
        }else{
            res.redirect('/title/'+result.insertId);
        }
    });
});

//update form
app.get(['/main/:id/edit'], function(req, res){
  var sql = '';
  sql = 'select id,title from topic';
    conn.query(sql, function(err, topics, fields){
        var id = req.params.id;
        if(id){
            sql = 'select * from topic where id=?';
            conn.query(sql, [id], function(err, topic, fields){
               if(err){
                   res.status(500).send('Internal Server Error');
                   console.log(err);
               }else{
                   res.render('edit',{topics:topics, topic:topic[0]})
               }
            });
        }else{
            res.status(500).send('Internal Server Error');
            console.log('have not id');
        }
    });
});
//update
app.post(['/main/:id/edit'], function(req, res){
    var sql = 'update topic set title=?, description=?, author=? where id=?'
    var title = req.body.title;
	var description = req.body.description;
    var author = req.body.author;
    var id = req.params.id;
    conn.query(sql,[title, description, author, id],function(err, rows, fields){
        if(err){
            res.status(500).send('Internal Server Error');
            console.log(err);
        }else{
            res.redirect('/title/'+id);
        }
    });
});

// delete form
app.get(['/main/:id/delete'], function(req, res){
    var sql = 'select id, title from topic';
    var id = req.params.id;
    conn.query(sql, function(err, topics, fields){
        sql = 'select * from topic where id = ?'
        conn.query(sql,[id],function(err,topic){
        if(err){
            console.log(err);
            res.status(500).send('Internal Service Error');
        }else{
            if(topic.length == 0){
                console.log('this is not exist');
                res.status(500).send('Internal Service Error');
            }else{
                res.render('delete', {topics:topics, topic:topic[0]});
            }
        }
    });    
  });
});

// delete
app.post(['/main/:id/delete'], function(req, res){
    var id = req.params.id;
    var sql = 'delete from topic where id = ?'
    conn.query(sql, [id], function(err, result){
        res.redirect('/main');
    })
});

app.listen(3000, function(){
	console.log('start first web example');
});
