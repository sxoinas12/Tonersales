const express = require('express');
const router = express.Router();

var RoutingService = require('../services/RoutingService')(router, 'payment_method');
RoutingService.crud([2,0,2,2]);

module.exports = router;