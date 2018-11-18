const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('../models/database');
var Constants = require('../helpers/Constants.js');
const paginator = require('../helpers/paginator');
const ProductService = require('../services/ProductService');
const RoutingService = require('../services/RoutingService')(router, 'Products');



router.get('/specific',function(req,res){
  temp = req.query.val;
 
  knex('Products').where('name','like','%'+temp+'%').select('*').
  then(data => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({error:true, err: err,message:"something went wrong"});
  })
});

// Creates Search URL like the commented underneath  
//DONT// router.post('/search/:page(\\d+)/:term', search);
//DONT// router.post('/search/:term', search);
RoutingService.search(10, ProductService.presentProducts);
RoutingService.crud();
// 
router.get('/home',function(req,res){
  console.log("req")
  temp = req.query.val;
  //create random query for home serach
  knex('Products').orderByRaw('rand()').select('*').limit(9).
  then(data => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({error:true,message:err});
  })
});



// Creates Search URL like the commented underneath  
//DONT// router.post('/search/:page(\\d+)/:term', search);
//DONT// router.post('/search/:term', search);
RoutingService.search('name', 10, Presentation.presentProducts);
RoutingService.crud();
// 




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



