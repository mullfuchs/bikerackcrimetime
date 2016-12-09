var express = require('express');
var app = express();
var path = require('path')

//app.use(require('morgan')('dev'));


app.use(express.static(path.join(__dirname, 'views'))); 

app.get('/', function(req, res) {
  res.sendFile('views/index.html');
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;