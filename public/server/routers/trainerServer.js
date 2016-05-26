var express=require('express');
var router=express.Router();
var path=require('path');
var bodyParser=require('body-parser');
router.use(bodyParser.json());

var http = require('http');
var mongojs=require('mongojs');
var session = require('express-session');

var fs = require('fs');



router.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
var db = mongojs('mongodb://54.169.235.125:27017/flms', ['register','competency','trainer_management']);

var sess="";

// get Trainer starts
router.get('/gettrainer',function(req,res){
console.log(req.body);
db.register.find({"coursestatus":1},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//get Trainer Ends
//get Trainer all  Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getalltrainer',function(req,res){
db.register.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//get Trainer all Ends


// get Trainer starts
router.get('/getcompetency',function(req,res){
console.log(req.body);
db.competency.find({"coursestatus":1},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//get Trainer Ends
//get Trainer all  Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getallcompetency',function(req,res){
db.competency.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//get Trainer all Ends

module.exports=router;
