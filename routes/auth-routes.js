const express = require('express');
const router = express.Router();
const passport = require('passport');
const profile=require('./profile');

router.get('/google', passport.authenticate('google', function(req,res){
		console.log(req);
}));

//callback route for google to redirect to
router.get('/google/redirect',passport.authenticate('google',{ failureRedirect: '/login', session:false}),(req,res)=>{
	console.log("we want more frmo here");
	res.redirect('http://localhost:3000/?token='+req.user[0].token);
});


router.get('/facebook',passport.authenticate('facebook'));

router.get('/facebook/redirect',passport.authenticate('facebook',{failureRedirect:'/login',session:false}),(req,res) =>{
	res.redirect('http://localhost:3000/');
});


module.exports = router;