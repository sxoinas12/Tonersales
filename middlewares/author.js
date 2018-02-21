const mc = require('../models/database');

var parseToken = function(req,res,next){
	const token = req.headers.token;
	if(!token){
		return next();
	}
	mc.query('SELECT * from users where token = ?',[token],function(err,results,fields){
		if(err){
			//some more
			res.status(400).send({error : true , message:"user cannot get authorized"});
		}
		else if(results.length === 0){
			res.status(400).send({error:true , message:"there is not a user in the base "});

		}
		else {
			req.user = results[0];
			res.send(results);
			console.log("user authorized");
			next();
		}
	});

}


module.exports = parseToken;