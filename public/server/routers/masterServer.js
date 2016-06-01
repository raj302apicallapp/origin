var express=require('express');
var router=express.Router();
var path=require('path');
var bodyPaser=require('body-parser');
router.use(bodyPaser.json())
var http = require('http');
var mongojs=require('mongojs');
var collections = ['mVenuetype','mTags','mSeatType','mRoomType','mEquipment','hospital','mLanguage','checkk'];
var db = mongojs('mongodb://192.169.146.79:27017/flms', collections);
// var db = mongojs('mongodb://gopi:123@ds023398.mlab.com:23398/heroku_461p1j1s', collections);
router.post('/addmaster',function(req,res)
{ 
       
	// var collection_name=req.body.collection_name;
	// console.log(JSON.stringify(collection_name))
	
	db.checkk.insert(req.body,function(err,docs){
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
// res.json("hello")
});

//getLanguageMaster
router.get('/getLanguageMaster',function(req,res){
db.mLanguage.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
module.exports=router;