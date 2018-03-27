const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google to redirect to
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
	res.send('your reached the callback url');
});


module.exports = router;