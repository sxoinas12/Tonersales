const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('../models/database');
var Constants = require('../helpers/Constants.js');
const paginator = require('../helpers/paginator');
const Presentation = require('../services/ProductService');

router.get('/specific',function(req,res){
  temp = req.query.val;
 
  knex('Products').where('name','like','%'+temp+'%').select('*').
  then(data => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({error:true, err: err,message:"something went wrong"});
  })
});


var search = function(req,res){
  
  let page = req.params.page || 1;
  let term = req.params.term;


  var query = knex('Products').where('name','like','%'+term+'%').select('*')
  if(req.body){
    // Filter Service
    let filters = req.body;
    Object.keys(filters).forEach((key, index) => {
      if (filters[key].length) {
        query = query.whereIn(key, filters[key]);
      }  
    })
  }
  console.log(query.toString());
  paginator(knex)(query, {
      perPage: 10,
      page:page 
    }).then((result) => {
        result.data = result.data.map(Presentation.PresentProducts);
        return result;
    }).then((result) => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({error:true, err: err , message:"something went wrong"});
    });
}
router.post('/search/:page(\\d+)/:term', search);
router.post('/search/:term', search);



// 
router.get('/home',function(req,res){
  temp = req.query.val;
  //create random query for home serach
  knex('Products').orderByRaw('rand()').select('*').limit(9).
  then(data => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({error:true,message:err});
  })
});

// Get By id
router.get('/:id',function(req,res){
  
  
  console.log(typeof req.params.id) 
  let id = req.params.id;
  
  id = id.split(",")

  knex('Products').whereIn('id',id).select('*').
  then(data => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({error:true, err: err,message:"something went wrong"});
  })
});

var pagingFunction = function(req,res){

  var query = knex.table('Products').select('*')
  paginator(knex)(query, {
      perPage: 10,
      page:req.params.page || 1 
    }).then((result) => {
       console.log(result);
       result.data = result.data.map(Presentation.PresentProducts);
       return result;
    }).then((result) => {
       res.status(200).send(result);
    }).catch(err => {
      console.log(err);
      res.status(500).send({error:true, err: err , message:"something went wrong"});
    });
}
router.get('/page/:page(\\d+)/', pagingFunction);
router.get('/page/', pagingFunction);





router.get('/id/:id',function(req,res){
  knex.table('Products').where('id',req.params.id).select('*').
  then((data)=>{
    res.send({data : data , message:'Product found'});
  }).catch((err) => {
    res.status(500).send({error:true, err: err , message:"cant find product"})
  });
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
  		res.send(body);
  	}).catch((e) => console.log(e));
});


router.delete('/:id',function(req,res){
	if (req.user.role != Constants.Roles.ADMIN) {
    	res.sendStatus(403);
    	return;
 	}
  	knex.table('Products').where('id',req.params.id).del().then((data)=>{
  		res.sendStatus(204);
  	});
});


router.post('/import',function(req,res){
  if (req.user.role != Constants.Roles.ADMIN) {
    res.sendStatus(403);
    return;
  }

  let items = req.body;
  insertOrUpdate(knex, 'Products', items).
  then(() => res.sendStatus(200)).
  catch((e) => res.send(e));

});

function insertOrUpdate(knex, tableName, data) {
  const firstData = data[0] ? data[0] : data;
  return knex.raw(knex(tableName).insert(data).toQuery() + " ON DUPLICATE KEY UPDATE " +
    Object.getOwnPropertyNames(firstData).map((field) => `${field}=VALUES(${field})`).join(", "));
}

module.exports = router;



