var express		=require('express');
var app			=express();
var kinectR	=express.Router();
kinectR.route('/')
	.post(require('../controllers/kinectC'));
module.exports=kinectR;