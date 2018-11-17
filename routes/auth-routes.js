const express = require('express');
const router = express.Router();
const passport = require('passport');
const profile=require('./profile');

router.get('/google', passport.authenticate('google', function(req,res){
		console.log(req);
}));

//callback route for google to redirect to
router.get('/google/redirect',passport.authenticate('google',{ failureRedirect: '/login', session:false}),(req,res)=>{
	res.redirect('http://localhost:3000/?token='+req.user[0].token);
});


router.get('/facebook',passport.authenticate('facebook'),function(req,res){
	//console.log("request came");
	//console.log(req)
});

router.get('/facebook/redirect',passport.authenticate('facebook',{failureRedirect:'/',session:false}),(req,res) =>{
	//console.log(req.user[0].token)
	res.redirect('http://localhost:3000/'+req.user[0].token);

});

//passport.authenticate('/facebook/redirect', { successRedirect: 'http://localhost:3000/',
  //                                    failureRedirect: 'http://localhost:3000' },(req,res)=>{
    //                                  	console.log("do i come here",req);
      //                                });

module.exports = router;