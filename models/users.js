const knex = require('../models/database');
var bcrypt = require('bcrypt');
const saltRounds = 10;



var register = function(data){
  var username = data.username;
  var email = data.email;
  var password = data.password;
  //console.log(knex);
  
  //let a = 

  /*console.log(a);
  return a.*/
  knex.table('users').where({email}).select('*').
  then((data) => {
    //console.log("going here");
    if(data.length > 0) {
      throw Error('Email exists.'); 
    }
    return true;
  }).
  then(() => bcrypt.hash(password, saltRounds)).
  then((hash) => {
   data.password = hash;
   return knex.table('users').insert(data); 
  });
}


var login = function(data){

  var email= data.email;
  var password = data.password;
  var hash;
  //console.log("here");
  return knex.table('users').where({email}).select('*').
  then((data) => {
    if(data.length == 0){
      throw Error('The email you entered doesnt exists');
    }
    return data;
  }).
  then((data) =>
    bcrypt.compare(password,data[0].password)
  ).
  then((isPassCorrect) => {
    if(!isPassCorrect)
      throw Error('Wrong password');
    return bcrypt.genSaltSync(saltRounds)
  }).
  then((token) => {
      return knex.table('users').where({email}).update({token})
  });
 
 
}




module.exports = {
	Login:login,
	Register:register
}


