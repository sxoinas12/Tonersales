const knex = require('../models/database');
var bcrypt = require('bcrypt');
const saltRounds = 10;



var register = function(data){
  var username = data.username;
  var email = data.email;
  var password = data.password;
  
  return knex.table('Users').where({email}).select('*').
  then((data) => {
    //console.log('going here');
    if(data.length > 0) {
      throw Error('Email exists.'); 
    }
    return true;
  }).
  then(() => bcrypt.hash(password, saltRounds)).
  then((hash) => {
   // console.log("now here");
   data.password = hash;
   return knex.table('Users').insert(data); 
  });
}


var login = function(data){

  var email= data.email;
  var password = data.password;
  var hash, Token;
  //console.log("here");
  return knex.table('Users').where({email}).select('*').
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
    return bcrypt.genSaltSync(saltRounds);
  }).
  then((token) => {
    Token = token;
    return knex.table('Users').where({email}).update({token});
  }).
  then(() => Token);
 
 
}




module.exports = {
	Login:login,
	Register:register
}


