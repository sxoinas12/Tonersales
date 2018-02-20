const mc = require('../models/database');

///simple function login 


// simple function for register


var register = function(req,res){

  var today = new Date();
  var users={
  	"username":req.body.username,
    "email":req.body.email,
    "password":req.body.password
   // "created":today
  }
  mc.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
}




var login = function(req,res){

  var email= req.body.email;
  var password = req.body.password;

 // mc.query('SELECT * FROM users WHERE email = ?',[email],'AND WHERE password = ?',[password],)

//mc.query('SELECT * FROM users WHERE email = ?',[email],


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


