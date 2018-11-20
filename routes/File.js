const express = require('express');
const router = express.Router();
const FileService = require('../Services/FileService');


router.post('/',function(req,res){
	console.log('request came')
	//console.log(req)
	FileService.acceptFile(req)
	.then((data)=>{
		if(data){
			
			res.sendStatus(200);
		}
		else{
			res.send("something went wrong")
		}
	}).catch((e)=>{
		console.log("Error with the request=")
		console.log(e)
	})
})


module.exports = router;