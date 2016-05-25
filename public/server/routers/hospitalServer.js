var express=require('express');
var router=express.Router();
var path=require('path');
var bodyParser=require('body-parser');
router.use(bodyParser.json());

var http = require('http');
var mongojs=require('mongojs');
var db = mongojs('mongodb://54.169.235.125:27017/flms', ['hospital']);

router.get('/gethospital',function(req,res){
console.log(req.body);
db.hospital.find({},function(err,docs){
	console.log(docs);
	res.json(docs);
});
});
module.exports=router;