const express = require('express');
const router = express.Router();
const knex = require('../models/database');
var Constants = require('../helpers/Constants.js');


// Get By id
router.get('/:id',function(req,res){
  let id = req.params.id;
  knex('Categories').where('id',id).select('*').
  then(data => {
    res.send(data[0]);
  }).catch((err) => {
    res.status(500).send({error:true,message:"something went wrong"});
  })
});


router.get('/',function(req,res){
	knex.table('Categories').select('*').
	then((data)=>{
    //console.log(data);
		res.send(data);
	}).catch((err) => {
    console.log(err);
		res.status(500).send({error:true , message:"something went wrong"});	
	})
});


router.post('/',function(req,res){
	if (req.user.role != Constants.Roles.ADMIN) {
    res.sendStatus(403);
    return;
  }
  knex.table('Categories').insert(req.body).then((data)=>{
  	res.status(200).send(data);
  });

});


router.put('/:id',function(req,res){
	  if (req.user.role != Constants.Roles.ADMIN) {
    	res.sendStatus(403);
    	return;
  	}

    let body = req.body;
  	knex.table('Categories').where('id',req.params.id).update(body).then((data)=>{
  		res.send(body);
  	}).catch((e) => console.log(e));
});


router.delete('/:id',function(req,res){
	if (req.user.role != Constants.Roles.ADMIN) {
    	res.sendStatus(403);
    	return;
 	}
  	knex.table('Categories').where('id',req.params.id).del().then((data)=>{
  		res.sendStatus(204);
  	});
});

module.exports = router;