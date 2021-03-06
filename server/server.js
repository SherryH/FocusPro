var db = require('./databases/Schema.js');
var bodyparser = require('body-parser');
var router = require('./routers.js');
var express = require('express');
var path = require('path');
var app = express();

//var email = require('./notifications/emailNotification.js');
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, '../client')));

var routes = router(app, express);

var port = process.env.PORT || 7777;
app.listen(port, function() {
  console.log('Listening on', port);
});
