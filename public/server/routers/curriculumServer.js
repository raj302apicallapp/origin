var express=require('express');
var router=express.Router();
var path=require('path');
var bodyPaser=require('body-parser');
router.use(bodyPaser.json())
var http = require('http');
var mongojs=require('mongojs');
var collections = ['register'];
// var db = mongojs('mongodb://192.169.146.79:27017/flms', collections);
var db = mongojs('mongodb://mongodb://dev.frugaltek.com:27017/flms', collections);
router.get('/getemployee',function(req,res)
{
	db.register.find({},function(err,docs){
		console.log(JSON.stringify(docs));
		res.json(docs);
	});
});
module.exports=router;