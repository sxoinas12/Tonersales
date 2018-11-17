const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('../models/database');

var OrderService = require('../services/OrderService.js');
var UserService = require('../services/UserService.js');
var Constants = require('../helpers/Constants.js');

const RoutingService = require('../services/RoutingService')(router, 'orders', true);
RoutingService.crud([1,1,1,1]);
RoutingService.search();

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

module.exports = router;