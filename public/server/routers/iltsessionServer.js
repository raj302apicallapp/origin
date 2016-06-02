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
var collections=['register','mCompetency','mCertificate','mProgramCoordinator','vendormanagement'];
// var db = mongojs('mongodb://192.169.146.79:27017/flms', collections);
var db = mongojs('mongodb://gopi:123@ds023398.mlab.com:23398/heroku_461p1j1s', collections);
var sess="";
//get Trainer all  Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getalltrainer',function(req,res){
db.register.find({},function(err,docs){
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
//ILT Session
router.get('/getcoordinator',function(req,res){
console.log(req.body);
db.mProgramCoordinator.find({"status":1},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//(getvenue)
router.get('/getvenue',function(req,res){
console.log(req.body);
db.venuemanagement.find({"venuestatus":1},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//CourseILT-Retrieve Ends
//CourseILT-Retrieve Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getallvenue',function(req,res){
db.venuemanagement.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
module.exports=router;
