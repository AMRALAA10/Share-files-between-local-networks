var express = require('express');
var multer  = require('multer');
var fs = require('fs');

var app= express();
var port = process.env.port || 5000;

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
      callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage}).single('file');

app.use(function(req, res, next){
    //
    console.log("Incoming req ====================================================================");
    console.log(req);
    console.log("Incoming req ====================================================================");
    next();    
});


app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendfile('index.html');
})

app.get('/files', function(req, res){
    let files = [];
    fs.readdirSync('./public').forEach(file => {
        files.push({name: file, url: file});
    })
    res.send(files);
})


app.post('/upload', function(req, res){
    upload(req,res,function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
})



app.listen(port, function() {
    console.log('listening on port ' + port);
});