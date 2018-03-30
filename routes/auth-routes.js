const express = require('express');
const router = express.Router();
const passport = require('passport');
const profile=require('./profile');

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google to redirect to
router.get('/google/redirect',passport.authenticate('google',{ failureRedirect: '/login', session:false}),(req,res)=>{
	//redirect to profile page

	res.redirect('http://localhost:3000/');
	
});


router.get('/facebook',passport.authenticate('facebook'));


router.get('/facebook/redirect',passport.authenticate('facebook',{failureRedirect:'/login',session:false}),(req,res) =>{
	res.redirect('http://localhost:3000/');
});


module.exports = router;