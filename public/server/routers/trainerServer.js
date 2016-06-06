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
var collections=['user_management','mCompetency','mCertificate','vendormanagement','mTags','trainermanagement'];
var db = mongojs('mongodb://dev.frugaltek.com:27017/flms', collections);
// var db = mongojs('mongodb://gopi:123@ds023398.mlab.com:23398/heroku_461p1j1s', collections);
var sess="";



//trainer Post
router.post('/addtrainerdata',function(req,res){
db.trainermanagement.insert(req.body,function(err,docs){
	console.log(JSON.stringify(docs))
	res.json(docs);
});
});

//trainer-get Starts(ACTIVE ONLY)
router.get('/getTrainermgntdata',function(req,res){
console.log(req.body);
db.trainermanagement.find({"trainerstatus":1},function(err,docs){
	console.log("trainerstatus"+docs);
	res.json(docs);
});
});
//Vendor-Retrieve Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getallTrainermgnt',function(req,res){
db.trainermanagement.find({},function(err,docs){
	console.log("trainerstatus"+docs);
	res.json(docs);
});
});

// trainer remove start
router.post('/removeTrainermgnttype',function(req,res){
	
	console.log(JSON.stringify(req.body._id));
	var id=req.body._id;
	db.trainermanagement.remove({_id:mongojs.ObjectId(id)}, function(err,doc)   {
                  res.json(doc);
            });
});
// trainer reomve end
router.post('/Ontraineremailcheck',function(req,res)
{
  console.log(JSON.stringify(req.body));
  db.trainermanagement.find({'trainer.email':req.body.trainer.email},function(err,docs)
  {
    console.log(JSON.stringify(docs));
      docs.length==0 ?res.json("Available") :res.json("Exists");
    
  });
});

// trainer reomve end
router.post('/Ontrainerphonecheck',function(req,res)
{
  console.log(JSON.stringify(req.body));
  db.trainermanagement.find({trainer:req.body.trainer},function(err,docs)
  {
    console.log(JSON.stringify(docs));
      docs.length==0 ?res.json("Not Exists") :res.json("Exists");
       console.log(JSON.stringify(docs));
    
  });
});
//Trainer-Remove Starts
router.post('/removetrainer',function(req,res){
	console.log("RemoveTrainer");
	var event_id=mongojs.ObjectId(req.body._id);
console.log(req.body);
db.trainermanagement.remove({"_id":event_id},function(err,docs){
	res.json(docs);
});
});
//trainer Post End
router.post('/statustrainer',function(req,res){
	console.log("hhhyes");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
var updatestatus;
if (req.body.trainerstatus==1) {
updatestatus=0;
}else{
updatestatus=1;
}
db.trainermanagement.update({"_id" :event_id	}, {$set: {trainerstatus:updatestatus}},function(err,udocs){
	res.json(udocs);
});
});

router.post('/updatetrainerdatamanage',function(req,res){
	console.log("UPDATE");
var event_id=mongojs.ObjectId(req.body._id);
db.trainermanagement.update({"_id" :event_id}, {$set: 
{


trainer:req.body.trainer,
tags:req.body.tags,
selectcompetency:req.body.selectcompetency,
selectcertification:req.body.selectcertification,
selectvendor:req.body.selectvendor,
pannumber:req.body.pannumber,
trainertype:req.body.trainertype,
trainerstatus:req.body.trainerstatus,
addeddate:req.body.addeddate,
// "getTrainerList":req.body.getTrainerList[0],

}

},function(err,docs){
	console.log("response"+JSON.stringify(docs));
	res.json(docs);
});
});



router.get('/gettrainer',function(req,res)
{
	db.user_management.find({},function(err,docs){
		console.log(JSON.stringify(docs));
		res.json(docs);
	});
});

//get Trainer all  Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getalltrainer',function(req,res){
db.user_management.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
//get Trainer all Ends

// get Trainer starts
router.get('/getcompetency',function(req,res){
console.log(req.body);
db.mCompetency.find({"trainerstatus":1},function(err,docs){
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

router.get('/getTags',function(req,res){
	db.mTags.find({},function(err,docs){
		console.log("getTags"+JSON.stringify(docs));
		res.json(docs);
	});
});
//get Trainer all Ends
router.post('/statustrainer',function(req,res){
	console.log("hhhyes");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
var updatestatus;
if (req.body.venuestatus==1) {
updatestatus=0;
}else{
updatestatus=1;
}
db.trainermanagement.update({"_id" :event_id	}, {$set: {trainerstatus:updatestatus}},function(err,udocs){
	res.json(udocs);
});
});

module.exports=router;
