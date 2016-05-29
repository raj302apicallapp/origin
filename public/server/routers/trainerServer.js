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
var db = mongojs('mongodb://54.169.235.125:27017/flms', ['register','mCompetency','mCertificate','vendormanagement']);

var sess="";
router.get('/getemployee',function(req,res)
{
	db.register.find({},function(err,docs){
		console.log(JSON.stringify(docs));
		res.json(docs);
	});
});

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
db.mCompetency.find({"coursestatus":1},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//get Trainer Ends
//get Trainer all  Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getallcompetency',function(req,res){
db.mCompetency.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//get Trainer all Ends
// get Trainer starts
router.get('/getcertification',function(req,res){
console.log(req.body);
db.mCertificate.find({"coursestatus":1},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//get Trainer Ends
//get Trainer all  Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getallcertification',function(req,res){
db.mCertificate.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//get Trainer all Ends
// get Trainer starts
router.get('/getvendor',function(req,res){
console.log(req.body);
db.vendormanagement.find({"coursestatus":1},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//get Trainer Ends
//get Trainer all  Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getallvendor',function(req,res){
db.vendormanagement.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//get Trainer all Ends

module.exports=router;
