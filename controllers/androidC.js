module.exports=function (req,res){
	console.log('DATA RECIEVED FROM ANDROID: ++++++++++++++++++++++++++++++++++++++++');
	db('buffer').findOrCreate({user_id:req.body.user_id},req.body).exec(function afterwards(err, obj){
		if (err) {
			return;
		}else{
			if(obj.timestamp_kinect){
				req.body.id=obj.id;
				db('buffer').update({id: obj.id},req.body).exec(function afterwards(err, updated){
					if (err) {
						console.log("errr: " + err);
					}else{
						console.log("updated");
						res.send("updated");
					}
				});	
			}else{
				res.send("saved");
			}
		}
	});	
}