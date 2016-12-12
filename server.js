(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
         console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
    return result;
  }
   childProcess.spawn = mySpawn;
 })();


var express=require('express');
var app=express();
var router=express.Router();
var path=require('path');
// var router=express.Router();
var bodyPaser=require('body-parser');
var http = require('http');
var mongojs=require('mongojs');
var collections=['register'];
var port = Number(process.env.PORT || 3000)
var session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.use('/', express.static(__dirname+'/public'));
app.listen(port,'0.0.0.0',function(){
})
