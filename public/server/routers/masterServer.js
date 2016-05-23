var express=require('express');
var router=express.Router();
var path=require('path');
var bodyPaser=require('body-parser');
router.use(bodyPaser.json())
var http = require('http');
var mongojs=require('mongojs');
var collections = ['mVenuetype'];
var db = mongojs('mongodb://bhuvanesh:123@ds023398.mlab.com:23398/heroku_461p1j1s', collections);

router.post('/addmaster',function(req,res)
{ 
       
	var collection_name=req.body.collection_name;
	console.log(JSON.stringify(collection_name))
	
	db[collection_name].insert(req.body,function(err,docs){
		console.log(JSON.stringify(docs));
		res.json(docs);
	});
});
module.exports=router;