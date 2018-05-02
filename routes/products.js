const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('../models/database');
var Constants = require('../helpers/Constants.js');
const paginator = require('../helpers/paginator');
const Presentation = require('../services/ProductService');

router.get('/specific',function(req,res){
  temp = req.query.val;
  console.log("request came");
  console.log("R....");
  knex('Products').where('name','like','%'+temp+'%').select('*').
  then(data => {
    res.send({data:data,message:'Products'});
  }).catch((err) => {
    res.status(500).send({error:true,message:"something went wrong"});
  })
});



var pagingFunction = function(req,res){
  console.log(req.params)
  var query = knex.table('Products').select('*')
  paginator(knex)(query, {
      perPage: 3,
      page:req.params.page || 1 
    }).then((result) => {
       result.data = result.data.map(Presentation.PresentProduct);
       return result;

    }).then((result) => {
       res.status(200).send(result);
    }).catch(err => {
      res.status(500).send({error:true , message:"something went wrong"});
    });
}

router.get('/:page(\\d+)/', pagingFunction);
router.get('/', pagingFunction);


router.get('/id/:id',function(req,res){
  knex.table('Products').where('id',req.params.id).select('*').
  then((data)=>{
    res.send({data : data , message:'Product found'});
  }).catch((err) => {
    res.status(500).send({error:true , message:"cant find product"})
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