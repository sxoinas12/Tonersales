const express = require('express');
const router = express.Router();


router.get('/',(req,res) => {
	res.send("You are logged in this is your profile page" );
});


module.exports = router;