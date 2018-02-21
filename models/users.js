const mc = require('../models/database');
var bcrypt = require('bcrypt');
const saltRounds = 10;



var register = function(data){
  var username = data.username;
  var email = data.email;
  var password = data.password;
  flag = 0;
  bcrypt.hash(password, saltRounds).then(function(hash) {
     mc.query("INSERT INTO users (username , email , password ) VALUES (? ,? ,?)",[data.username,data.email,hash],function(error,results,fields){
      if(error){
        flag = 0;
      }
      else{
        flag = 1;
        
      }
    });
  console.log(flag);
    // Store hash in your password DB.
});
 
return flag;

}

// 0 is false
// 1 is true

var login = function(data){

  flag = 1;

  var email= data.email;
  var password = data.password;
  var hash;

  mc.query('SELECT * FROM USERS WHERE email = ? ',[email],function(error,results,fields){
    //console.log(results);
    if(results.length == 0){
      console.log("login failed")
      flag = 1;
    }
    //hash = results;
    
    bcrypt.compare(password, results.password, function(err, res) {
    console.log("login succesful");
    flag = 0;

});
  
});
  
  return flag;
}


module.exports = {
	Login:login,
	Register:register
}


