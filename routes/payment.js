const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('../models/database');

var Constants = require('../helpers/Constants.js');


//read by everyone
router.get('/',function(req,res){
	knex.table('Payment_method').select('*').
	then((data)=>{
		res.send({data : data ,message:'Payment methods'});
	}).catch((err) => {
		res.status(500).send({error:true , message:"something went wrong"});	
	})
});

//create by user
router.post('/',function(req,res){
	if (req.user.role != Contants.Roles.Admin) {
    	res.sendStatus(403);
    	return;
  	}
  	knex.table('Payment_method').insert(req.body).then((data)=>{
  		res.status(200).send({data:data , message:"payment method added"});
  	});

});

//update user user
router.put('/:id',function(req,res){
	if (req.user.role != Contants.Roles.Admin) {
    	res.sendStatus(403);
    	return;
  	}
  	knex.table('Payment_method').where('id',req.params.id).update(req.body).then((data)=>{
  		res.status(200).send({data:data , message:"payment method updated"});
  	});
});


//delete only by admin
router.delete('/:id',function(req,res){
	if (req.user.role != Contants.Roles.Admin) {
    	res.sendStatus(403);
    	return;
 	}
  	knex.table('Payment_method').where('id',req.params.id).del().then((data)=>{
  		res.status(200).send({data:data , message:"payment method deleted"});
  	});
});


module.exports = router;