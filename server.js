var express=require('express');
var app=express();
var router=express.Router();
var path=require('path');
// var router=express.Router();
var bodyPaser=require('body-parser');
var http = require('http');
var mongojs=require('mongojs');

<<<<<<< HEAD
var db = mongojs('mongodb://54.169.235.125:27017/flms', ['register']);
=======
var db = mongojs('mongodb://soundar:123@ds023398.mlab.com:23398/heroku_461p1j1s', ['register']);
>>>>>>> 317081534c037e762e7333cad9ab36d5abf94782
 
var port = Number(process.env.PORT || 3000)
var session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.use('/', express.static(__dirname+'/public'));
app.use(require(path.join(__dirname+'/public/server/routers/auth.js')));
app.use(require(path.join(__dirname+'/public/server/routers/courseServer.js')));
app.use(require(path.join(__dirname+'/public/server/routers/trainerServer.js')));
app.use(require(path.join(__dirname+'/public/server/routers/masterVendorRouter.js')));
app.use(require(path.join(__dirname+'/public/server/routers/venueServer.js')));
app.use(require(path.join(__dirname+'/public/server/routers/ILServer.js')));
app.use(require(path.join(__dirname+'/public/server/routers/locationServer.js')));
app.use(require(path.join(__dirname+'/public/server/routers/venueServer.js')));
app.use(require(path.join(__dirname+'/public/server/routers/vendorServer.js')));
app.use(require(path.join(__dirname+'/public/server/routers/mOrgServer.js')));
app.use(require(path.join(__dirname+'/public/server/routers/curriculumServer.js')));
app.use(require(path.join(__dirname+'/public/server/routers/masterServer.js')));
app.use(require(path.join(__dirname+'/public/server/routers/hospitalServer.js')));
app.listen(port,function(){
})

