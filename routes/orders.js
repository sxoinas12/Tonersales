const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('../models/database');

var OrderService = require('../services/OrderService.js');
var UserService = require('../services/UserService.js');
var Constants = require('../helpers/Constants.js');


//read by user
router.get('/',function(req,res){
 /*
	if(req.user.role !=Constants.Roles.USER){
		res.status(403).send();
		return;
	}

  */
  console.log("request at orders came")
  let orders = {};
  if(!req.headers.token){
    res.status(403).send();
  }
	knex.table('Orders').where('userId',req.user.id).select('*').
	then((data)=>{
    
    orders = OrderService.present(data);
  //  console.log("Order produtcts are",orders["products"]);
    //console.log(orders);
		res.send({data : orders ,message:'Orders'});
	}).catch((err) => {
		res.status(500).send({error:true , message:"something went wrong"});	
	})
});

router.post('/verify', function(req,res) {
  //console.log(req);
  //console.log(req.user);
  if(req.user.role != Constants.Roles.USER){
    
    res.status(403).send();
    return;
  }
  let order = req.body;
  let user = req.user;
  
  OrderService.submit(order,user)
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