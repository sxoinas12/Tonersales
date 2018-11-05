const express = require('express');
const router = express.Router();
var UserService = require('../services/UserService');
const knex = require('../models/database');
router.get('/',(req,res) => {
	//console.log("first here")
	
	let user ={};
	if(!req.headers.token){
		res.sendStatus(403);
		//console.log("then here")
	}
	else {
		return UserService.getByToken(req.headers.token)
		.then((data)=>{
			user = UserService.present(data);
			return res.status(200).send(user);
			

		})
		.catch((e)=>{
			
			return res.status(403).send(e);
		})
		
		}
	
});


router.post('/',(req,res) => {
	console.log(req.body);
	res.status(200).send("okayy")
})






module.exports = router;