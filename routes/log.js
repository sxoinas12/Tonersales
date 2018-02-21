const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const users = require('../models/users');
const mc = require('../models/database');

const session = require('express-session');
const bcrypt = require('bcrypt');


router.post('/register',function(req,res){
    //var today = new Date();

    if(!req.body.email || !req.body.username || !req.body.password){
        res.status(400).send({error : true , message:"Please provide all the required fields"});
    }

    var user={
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
    //created: today.toISOString();
  }
    flag = users.Register(user);
    console.log(flag);
    if(flag === 0){
        res.send({
            "code":200,
            "success":"register sucessfull"
        });
    }
    else{
        res.send({
            "code":400,
            "failed":"error occured"
        });
    }

});


router.post('/login',function(req,res,next){
    if (!req.body.email || ! req.body.password){
        res.status(400).send({error : true , message:"Please provide both username and password"});
    }
    var user = {
        email:req.body.email,
        password:req.body.password
    }
    flag = users.Login(user);
     if(flag === 1){
        res.send({
            "code":200,
            "success":"login sucessfull"
        });
    }
    else{
        res.send({
            "code":400,
            "failed":"error occured"
        });
    }
});


module.exports = router;



