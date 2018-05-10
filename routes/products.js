const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('../models/database');
var Constants = require('../helpers/Constants.js');

router.get('/specific',function(req,res){
  temp = req.query.val;
  console.log("request came");
  console.log("R....");
  knex('Products').where('name','like','%'+temp+'%').select('*').
  then(data => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({error:true,message:"something went wrong"});
  })
});

// Get By id
router.get('/:id',function(req,res){
  let id = req.params.id;
  knex('Products').where('id',id).select('*').
  then(data => {
    res.send(data[0]);
  }).catch((err) => {
    res.status(500).send({error:true,message:"something went wrong"});
  })
});


router.get('/',function(req,res){
	knex.table('Products').select('*').
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
  knex.table('Products').insert(req.body).then((data)=>{
  	res.status(200).send(data);
  });

});


router.put('/:id',function(req,res){
	  if (req.user.role != Constants.Roles.ADMIN) {
    	res.sendStatus(403);
    	return;
  	}

    let body = req.body;
  	knex.table('Products').where('id',req.params.id).update(body).then((data)=>{
  		res.status(200).send(data);
  	}).catch((e) => console.log(e));
});


router.delete('/:id',function(req,res){
	if (req.user.role != Constants.Roles.ADMIN) {
    	res.sendStatus(403);
    	return;
 	}
  	knex.table('Products').where('id',req.params.id).del().then((data)=>{
  		res.status(200).send(data);
  	});
});


module.exports = router;