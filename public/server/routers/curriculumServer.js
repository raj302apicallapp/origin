var express=require('express');
var router=express.Router();
var path=require('path');
var bodyPaser=require('body-parser');
router.use(bodyPaser.json())
var http = require('http');
var mongojs=require('mongojs');
var collections = ['register'];
// var db = mongojs('mongodb://54.169.235.125:27017/flms', collections);
var db = mongojs('mongodb://bhuvanesh:123@ds023398.mlab.com:23398/heroku_461p1j1s', collections);
router.get('/getemployee',function(req,res)
{
	db.register.find({},function(err,docs){
		console.log(JSON.stringify(docs));
		res.json(docs);
	});
});
module.exports=router;