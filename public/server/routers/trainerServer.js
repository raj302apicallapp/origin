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
var db = mongojs('mongodb://54.169.235.125:27017/flms', ['register','mCompetency','mCertificate','vendormanagement','trainermanagement']);

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
//Vendor-Retrieve Ends
/*get competency*/
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
if (req.body.coursestatus==1) {
updatestatus=0;
}else{
updatestatus=1;
}
db.trainermanagement.update({"_id" :event_id	}, {$set: {trainerstatus:updatestatus}},function(err,udocs){
	res.json(udocs);
});
});

router.get('/gettrainer',function(req,res)
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
