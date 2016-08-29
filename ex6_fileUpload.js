var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer'); 

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // file save derectory
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // file save name.
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

var app = express();

app.use('/user', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'jade');
app.set('views', './views_ex1');

// file upload form
app.get('/upload', function(req, res){
    res.render('upload')
});

// file upload        // 미들웨어   'file name'  
app.post('/upload', upload.single('userFile'),function(req, res){
    console.log(req.file);
    res.send('uploaded : ' + req.file.originalname); 
});

app.listen(3000,function(){
    console.log('file upload go');
});
