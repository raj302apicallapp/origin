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
var collections=['vendormanagement','CSCLocation','mCompetency','mCertificate','mTags'];
var db = mongojs('mongodb://54.169.235.125:27017/flms', collections);

 var sess="";


//Vendor Post
router.post('/addVendordata',function(req,res){
db.vendormanagement.insert(req.body,function(err,docs){
	console.log(JSON.stringify(docs))
	res.json(docs);
});
});
//Vendor Post End

//Vendor-get Starts(ACTIVE ONLY)
router.get('/getVendordata',function(req,res){
console.log(req.body);
db.vendormanagement.find({"vendorstatus":1},function(err,docs){
	console.log("venuestatus"+docs);
	res.json(docs);
});
});
//Vendor Ends

//Vendor-Retrieve Starts(BOTH ACTIVE AND INACTIVE)
router.get('/getallVendor',function(req,res){
db.vendormanagement.find({},function(err,docs){
	console.log("venuestatus"+docs);
	res.json(docs);
});
});
//Vendor-Retrieve Ends

// vendor remove start
router.post('/removeVendortype',function(req,res){
	
	console.log(JSON.stringify(req.body._id));
	var id=req.body._id;
	db.vendormanagement.remove({_id:mongojs.ObjectId(id)}, function(err,doc)   {
                  res.json(doc);
            });
});
// vendor reomve end

//Vendor-active/inactive Starts
router.post('/statusVendor',function(req,res){
	console.log("hhhyes");
console.log(req.body);
var event_id=mongojs.ObjectId(req.body._id);
var updatestatus;
if (req.body.vendorstatus==1) {
updatestatus=0;
}else{
updatestatus=1;
}
db.vendormanagement.update({"_id" :event_id	}, {$set: {vendorstatus:updatestatus}},function(err,udocs){
	res.json(udocs);
});
});
// Vendor-active/inactive Ends


module.exports=router;
