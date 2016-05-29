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
		console.log(JSON.stringify(docs));
		console.log(JSON.stringify(docs.length));
		if(docs.length==0)
		{
			res.json("Not Exists");
		}
		else
		{	
		res.json("Exists");
		}
		
	});
});

//getLanguageMaster
router.get('/getLanguageMaster',function(req,res){
db.mLanguage.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
module.exports=router;