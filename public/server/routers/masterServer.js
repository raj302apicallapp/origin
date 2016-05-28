var express=require('express');
var router=express.Router();
var path=require('path');
var bodyPaser=require('body-parser');
router.use(bodyPaser.json())
var http = require('http');
var mongojs=require('mongojs');
var collections = ['mVenuetype','mTags','mSeatType','mRoomType','mEquipment','hospital'];
var db = mongojs('mongodb://54.169.235.125:27017/flms', collections);

router.post('/addmaster',function(req,res)
{ 
       
	var collection_name=req.body.collection_name;
	// console.log(JSON.stringify(collection_name))
	
	db[collection_name].insert(req.body.data,function(err,docs){
		console.log(JSON.stringify(docs));
		res.json(docs);
	});
});


router.post('/OnCheckExist',function(req,res)
{ 
       
	var collection_name=req.body.collection_name;
	console.log(JSON.stringify(collection_name));
	db[collection_name].find({[collection_name]:req.body.data[collection_name]},function(err,docs){
		
		docs.length==0 ? res.json("Not Exists") : res.json("Exists");
		
		
	});
});
module.exports=router;