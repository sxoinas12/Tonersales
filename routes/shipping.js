const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const knex = require('../models/database');

var Constants = require('../helpers/Constants.js');


var RoutingService = require('../services/RoutingService')(router, 'shipping_method');
RoutingService.crud([2,0,2,2]);


module.exports = router;