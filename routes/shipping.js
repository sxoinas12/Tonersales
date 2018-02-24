const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('../models/database');

var Constants = require('../helpers/Constants.js');


//read by everyone
router.get('/',function(req,res){
	knex.table('Shipping_method').select('*').
	then((data)=>{
		res.send({data : data ,message:'Shipping methods'});
	}).catch((err) => {
		res.status(500).send({error:true , message:"something went wrong"});	
	})
});

//create by admin
router.post('/',function(req,res){
	if (req.user.role != Contants.Roles.Admin) {
    	res.sendStatus(403);
    	return;
  	}
  	knex.table('Orders').insert(req.body).then((data)=>{
  		res.status(200).send({data:data , message:"shipping method added"});
  	});

});

//update user admin
router.put('/:id',function(req,res){
	if (req.user.role != Contants.Roles.Admin) {
    	res.sendStatus(403);
    	return;
  	}
  	knex.table('Shipping_method').where('id',req.params.id).update(req.body).then((data)=>{
  		res.status(200).send({data:data , message:"shipping method updated"});
  	});
});


//delete only by admin
router.delete('/:id',function(req,res){
	if (req.user.role != Contants.Roles.Admin) {
    	res.sendStatus(403);
    	return;
 	}
  	knex.table('Shipping_method').where('id',req.params.id).del().then((data)=>{
  		res.status(200).send({data:data , message:"shipping method deleted"});
  	});
});


module.exports = router;