var express		=require('express'),
	app			=express(),
	path 		= require('path'),
	bodyParser	=require('body-parser'),
	schedule = require('node-schedule'),
	net = require('net'),
    JsonSocket = require('json-socket'),
	request = require('request'),
	ORM = require('./ORM/init').waterlineOrm,
	modelPath = path.join(__dirname, '/models'),
	
	window=3,
	//hostR="163.180.116.57",
	hostR="163.180.116.192",
	portR="8080",
	hostS="163.180.116.150",
	//hostS="163.180.116.192",
	portS="7070";
	hostDCL="163.180.116.192",
	portDCL=process.env.PORT || 8080;

	
app.use(express.static('public'));
app.use(bodyParser.json());
require('./ORM/init')(modelPath);
app.use(bodyParser.urlencoded({ extended: true }));
app.all('/', function (req,res){
	res.send("Welcome to DAC of DCL. You can request these URLs: http://dcldac.cloudapp.net/android/ and http://dcldac.cloudapp.net/kinect/");
});
app.use('/android', require('./routers/androidR'));
app.use('/kinect', require('./routers/kinectR'));

ORM.initialize(require('./ORM/config'), function (err, models) {
    if (err) throw err;
    db = function (table) { return models['collections'][table]; };
    db.collections = models.collections;
    db.connections = models.connections;
	schedule.scheduleJob('*/' +  window + ' * * * * *', function(){
		var client = new JsonSocket(new net.Socket());
		client.connect(portS, hostS, function() {
			//console.log('CONNECTION START TO: ' + hostS + ':' + portS + '::::::::::::::::::::::::::::::::::::::::');    
		});
		client.on('error', function(exception){
			//console.log(exception);
		});
		client.on('close', function() {
			//console.log('CONNECTION CLOSE TO: ::::::::::::::::::::::::::::::::::::::::');
		});
		db('buffer').find().exec(function afterwards(err, obj){
			db('buffer').query('TRUNCATE TABLE `buffer`', function (err){});
				console.log(obj);
				client.sendMessage(obj);
				request.post("http://"+ hostR + ":" + portR + 
				"/storage/data",{ form: {"filename":"testing", "data": obj} },
					function (error, response, body) {});
				var date = new Date();
				console.log("::::: Recieved data is synchronized and forwarded at: " + date.getHours() + ":" + date.getMinutes() + ":"  + date.getSeconds());
		});
	});
	app.listen(portDCL, function (){
		console.log('DCL is working on port number: ' + portDCL);
	});
});