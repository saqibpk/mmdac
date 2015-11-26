var express		=require('express');
var app			=express();
var androidR	=express.Router();
androidR.route('/')
	.post(require('../controllers/androidC'));
module.exports=androidR;