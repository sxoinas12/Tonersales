var knex = require('../models/database.js');

var parseToken = function(req,res,next){
	const token = req.headers.token;
	if(!token || token.length < 5){
		//console.log("agains")
		req.user = {
			ip  : req.connection.remoteAddress,
			role: 0
		};
		//console.log(req.user);
		return next();
	} else {
		knex.table('Users').where('token',token).select('*').
		then((data)=> {
			req.user = data[0] || {};
			req.user.ip = req.connection.remoteAddress;
			next();
		}).catch((error)=> {
			console.log("Cannot parseToken");
			console.log(error);
			res.status(400).send({error:true, message:"something went wrong.."});
		});
	}
}


module.exports = parseToken;