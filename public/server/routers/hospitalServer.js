var express=require('express');
var router=express.Router();
var path=require('path');
var bodyParser=require('body-parser');
router.use(bodyParser.json());
var http = require('http');
var mongojs=require('mongojs');
var session = require('express-session');

router.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
var collections=['hospital'];
// var db = mongojs('mongodb://54.179.156.114:27017/flms', ['hospital']);
var db = mongojs('mongodb://bhuvanesh:123@ds023398.mlab.com:23398/heroku_461p1j1s', collections);
var sess="";


router.get('/gethospital',function(req,res){
db.hospital.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
module.exports=router;