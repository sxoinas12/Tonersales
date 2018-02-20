const mc = require('../models/database');

var register = function(data){
  flag = 0;

  mc.query("INSERT INTO users  SET ?",data,function(error,results,fields){
  
    if(error){
      flag = 1;
    }
    else{
      flag = 0;
      
    }
  });
  console.log(flag);
  return flag;

}



var login = function(data){


  flag = 0;

  var email= data.email;
  var password = data.password;
  console.log("fine here")
  mc.query('SELECT * FROM users WHERE email = ? AND password = ?',[email, password],function (error, results, fields) {
  if (error) {
    flag = 1;
  }else{
    flag = 0;
     
}
  });
  return flag;
}


module.exports = {
	Login:login,
	Register:register
}


