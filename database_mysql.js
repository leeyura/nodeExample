var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'user',
  password : 'password',
  database : 'db'
});

conn.connect();

var sql = '';

// select
sql = 'select * from topic';
conn.query(sql, function(err, rows, fields){
   if(err){
        console.log(err);
   }else{
       for(var i=0; i<rows.length; i++){
           console.log(rows[i].title+','+rows[i].description);
       }
   }       
});

// insert
sql = ' insert into topic(title, description, author)values(?, ?, ?)';
var params = ['Supervisor', 'watcher', 'yul'];
conn.query(sql, params, function(err, rows, fields){
   if(err){
       console.log('err : ' + err);
   }else{
       console.log(rows.insertId);
   }
});

// update
sql = 'update topic set title=?, author=? where id=?';
var params = ['NPM', 'yul', '1'];
conn.query(sql, params, function(err, rows, fields){
   if(err){
       console.log('err : ' + err);
   }else{
       console.log(rows);
   }
});

// delete
sql = 'delete from topic where id=?';
var params = [1];
conn.query(sql, params, function(err, rows, fields){
   if(err){
       console.log('err : ' + err);
   }else{
       console.log(rows);
   }
});

conn.end();
