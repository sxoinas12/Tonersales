const mc = require('../models/database');

var parseToken = function(req,res,next){
	const token = req.headers.token;
	if(!token){
		return next();
	}
	else{
		mc.query('SELECT * from users where token = ?',[token],function(err,results,fields){
		if(err){
			//some more
			res.status(400).send({error : true , message:"something went wrong.."});
		}
		else {
			
			req.user = results[0];
			res.send(results);
			console.log("user authorized");
			next();
		}
	});
	}	

}


module.exports = parseToken;