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
var db = mongojs('mongodb://54.169.235.125:27017/flms', ['hospital']);

var sess="";


router.get('/gethospital',function(req,res){
db.hospital.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
module.exports=router;