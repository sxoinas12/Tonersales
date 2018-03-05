const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('../models/database');

var Constants = require('../helpers/Constants.js');
/*
var SearchBase = function(query){
  var imtes = [];
  knex.table('Products').select('*').
  then(res) => 
}
*/
router.get('/',function(req,res){
	knex.table('Products').select('*').
	then((data)=>{
    //console.log(data);
		res.send({data : data ,message:'Products'});
	}).catch((err) => {
		res.status(500).send({error:true , message:"something went wrong"});	
	})
});


router.post('/',function(req,res){
	if (req.user.role != Constants.Roles.ADMIN) {
    res.sendStatus(403);
    return;
  }
  knex.table('Products').insert(req.body).then((data)=>{
  	res.status(200).send({data:data , message:"product added"});
  });

});


router.put('/:id',function(req,res){
	if (req.user.role != Constants.Roles.ADMIN) {
    	res.sendStatus(403);
    	return;
  	}
  	knex.table('Products').where('id',req.params.id).update(req.body).then((data)=>{
  		res.status(200).send({data:data , message:"product updated"});
  	});
});


router.delete('/:id',function(req,res){
	if (req.user.role != Constants.Roles.ADMIN) {
    	res.sendStatus(403);
    	return;
 	}
  	knex.table('Products').where('id',req.params.id).del().then((data)=>{
  		res.status(200).send({data:data , message:"product deleted"});
  	});
});


module.exports = router;