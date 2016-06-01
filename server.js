var express=require('express');
var app=express();
var router=express.Router();
var path=require('path');
// var router=express.Router();
var bodyPaser=require('body-parser');
var http = require('http');
var mongojs=require('mongojs');
var collections=['register'];
var db = mongojs('mongodb://192.169.146.79:27017/flms', ['register']);
 // var db = mongojs('mongodb://bhuvanesh:123@ds023398.mlab.com:23398/heroku_461p1j1s', collections);
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
app.use(require(path.join(__dirname+'/public/server/routers/iltsessionServer.js')));
app.listen(port,function(){
})

