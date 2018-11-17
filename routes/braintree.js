const PaymentService = require('../services/PaymentService');
const express = require('express');
const router = express.Router();

//SandBox Login
//username: Claven
//password: sxoinas12345


app.get("/client_token", function (req, res) {
	///PaymentService
  	
  });
});


app.post("/checkout", function (req, res) {
  var nonceFromTheClient = req.body.payment_method_nonce;
  // Use payment method nonce here
});