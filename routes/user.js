const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const users = require('../models/users');
var Constants = require('../helpers/Constants.js');

var UserService = require('../services/UserService');
var FilterService = require('../services/FilterService');
var RoutingService = require('../services/RoutingService')(router, 'Users');

//const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var knex = require('../models/database');

router.get('/me',function(req,res){
    if(req.user.role !== 0) {
        res.send(UserService.present(req.user));
        return;
    }
    res.status(401).send("Invalid token");
});

// Creates Search URL like the commented underneath  
//DONT// router.post('/search/:page(\\d+)/:term', search);
//DONT// router.post('/search/:term', search);
RoutingService.search( 10, UserService.present);
RoutingService.crud();

router.post('/register',function(req,res){
    if(!req.body.email || !req.body.username || !req.body.password){
        res.status(400).send({error : true , message:"Please provide all the required fields"});
    }
    //console.log("here")
   
    var user={
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        role:1
        //created: today.toISOString();
    }
   
    
    users.Register(user).
    then((user) => res.send(user)).
    catch((err) => {
        res.status(400).send(err);
    });
});


router.post('/login',function(req,res,next){
    var flag = 1;
    var hash;

    if (!req.body.email || ! req.body.password){
        res.status(400).send({error : true , message:"Please provide both username and password"});
        return;   
    }

    var user = {
        email:req.body.email,
        password:req.body.password
    }

    users.Login(user).
    then((token) => res.status(200).send({ token: token, error:false, message:"login succesful"})).
    catch((err) => {
        console.log(err);
        res.status(401).send({ err: err });
    });
});

    


module.exports = router;



