const express = require('express');
const router = express.Router();
var UserService = require('../services/UserService');

router.get('/me',(req,res) => {
	if(!req.user){
		res.sendStatus(403);
	}

	else {
		//console.log(req);
		res.send(UserService.present(req.user));
	}
	
});


module.exports = router;