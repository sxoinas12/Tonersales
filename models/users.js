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



var login = function(req,res){

  var email= req.body.email;
  var password = req.body.password;

  mc.query('SELECT * FROM users WHERE email = ? AND password = ?',[email, password],function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
     
}
  
  });
}


module.exports = {
	Login:login,
	Register:register
}


