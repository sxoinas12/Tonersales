const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const users = require('../models/users');
var Constants = require('../helpers/Constants.js');

//const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var knex = require('../models/database');


router.get('/',function(req,res){
    knex.table('Users').select('*').
    then((data)=>{
        res.send(data);
    }).catch((err) => {
        res.status(500).send({error:true , message:"something went wrong"});
    })
});

var pagingFunction = function(req,res) {
    if (req.user.role != Constants.Roles.ADMIN) {
        res.sendStatus(403);
        return;
    }
    var query = knex.table('Users').select('*');
    paginator(knex)(query, {
      perPage: 10,
      page:req.params.page || 1 
    }).then((result) => {
       console.log(result);
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



router.get('/:id',function(req,res){
    return knex.table('Users').where('id',req.params.id).then((data)=>{
        res.send(data[0]);
    });
});


router.post('/',function(req,res){
    if (req.user.role != Constants.Roles.ADMIN) {
        res.sendStatus(403);
        return;
    }
    return knex.table('Users').insert(req.body).then((data)=>{
        res.status(200).send({data:data , message:"product added"});
    });
});


router.put('/:id',function(req,res){
    if (req.user.role != Constants.Roles.ADMIN) {
        res.sendStatus(403);
        return;
    }
    return knex.table('Users').where('id',req.params.id).update(req.body).then((data)=>{
        console.log(data);
        res.send(req.body);
    });
});


router.delete('/:id',function(req,res){
    if (req.user.role != Constants.Roles.ADMIN) {
        res.sendStatus(403);
        return;
    }
    knex.table('Users').where('id',req.params.id).del().then((data)=>{
        res.sendStatus(204);
    });
});














router.post('/register',function(req,res){
   
    console.log(req);
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
  
    console.log("lets see the user");
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



