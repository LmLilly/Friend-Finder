var bodyParser = require('body-parser')
var express = require('express')
var path = require('path');

var app = express()
//this port will take whatever port is define by the deployment side in Heroku
var PORT = process.env.PORT || 3000;

 console.log("connected")
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

require('./app/routing/api-routes.js')(app);
require('./app/routing/html-routes.js')(app);

//Added a console.log so we would know the server
//had started running when ever we press node.js
app.listen(PORT, function(){
  console.log("App listening on PORTL: " + PORT);
});