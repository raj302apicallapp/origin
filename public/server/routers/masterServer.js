var express=require('express');
var router=express.Router();
var path=require('path');
var bodyPaser=require('body-parser');
router.use(bodyPaser.json())
var http = require('http');
var mongojs=require('mongojs');

var collections=['MRoomtype'];
var db = mongojs('mongodb://arun:123@git.frugaltek.com:27017/flms', collections);




//addMaster
router.post('/addmasters',function(req,res)
{
  console.log("addmasters");
  var tablename=req.body.tablename;
  var savedata=req.body.savedata;
  db[tablename].save(savedata,function(err,docs)
	{
      console.log(JSON.stringify(docs))
	   res.json(docs);
	});
})

module.exports=router;