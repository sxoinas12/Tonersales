const mc = require('../models/database');
var bcrypt = require('bcrypt');
const saltRounds = 10;



var register = function(data){
  flag = 0;
  bcrypt.hash(data.password, saltRounds, function(err, hash) {
     mc.query("INSERT INTO users (username , email , password ) VALUES (? ,? ,?)",[data.username,data.email,hash],function(error,results,fields){

      if(error){
        flag = 1;
      }
      else{
        flag = 0;
        
      }
    });
  console.log(flag);
    // Store hash in your password DB.
});
 
return flag;

}



var login = function(data){


  flag = 0;

  var email= data.email;
  var password = data.password;
  var hash;
  mc.query('SELECT password FROM USERS WHERE email = ? ',[email],function(error,results,fields){
    hash = results;
  
  });
  bcrypt.compare(password, hash, function(err, res) {
    mc.query('SELECT * FROM users WHERE email = ? AND password = ?',[email, password],function (error, results, fields) {
    if (error) {
      flag = 1;

    }else{
      flag = 0;

     
}
  });
    // res == true
});

  return flag;
}


module.exports = {
	Login:login,
	Register:register
}


