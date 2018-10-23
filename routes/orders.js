const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('../models/database');

var OrderService = require('../services/OrderService.js');
var UserService = require('../services/UserService.js');
var Constants = require('../helpers/Constants.js');


//read by user
router.get('/',function(req,res){
	if(req.user.role !=Constants.Roles.User){
		res.status(403).send();
		return;
	}
	knex.table('Orders').select('*').
	then((data)=>{
		res.send({data : data ,message:'Orders'});
	}).catch((err) => {
		res.status(500).send({error:true , message:"something went wrong"});	
	})
});

router.post('/verify', function(req,res) {
  OrderService.submit(req.body)
  .then(() => res.sendStatus(200))
  .catch((err) => {
    console.log(err);
    res.sendStatus(400);
  });
});

//create by user
router.post('/',function(req,res){
	  if (req.user.role != Contants.Roles.User) {
    	res.sendStatus(403);
    	return;
  	}
    OrderService.
  	knex.table('Orders').insert(req.body).then((data)=>{
  		res.status(200).send({data:data , message:"order added"});
  	});

});

//update user user
router.put('/:id',function(req,res){
	if (req.user.role != Contants.Roles.User) {
    	res.sendStatus(403);
    	return;
  	}
  	knex.table('Orders').where('id',req.params.id).update(req.body).then((data)=>{
  		res.status(200).send({data:data , message:"order updated"});
  	});
});


//delete only by admin
router.delete('/:id',function(req,res){
	if (req.user.role != Contants.Roles.Admin) {
    	res.sendStatus(403);
    	return;
 	}
  	knex.table('Orders').where('id',req.params.id).del().then((data)=>{
  		res.status(200).send({data:data , message:"order deleted"});
  	});
});


module.exports = router;