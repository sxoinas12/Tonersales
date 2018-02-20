const express = require('express');
const routes = require('./routes/api');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();




app.use(express.static('front-end'));

//app.use(checkAuth)
app.use(bodyParser.json());
app.use('/api',routes);



app.use(function(err,req,res,next){
	res.status(422).send({error:err.message});
});

app.listen(5000,function(){
	console.log('now listening to requests');
});
