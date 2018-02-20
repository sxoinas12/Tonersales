const express = require('express');
//const routes = require('./routes/api');

const routes = require('./routes/index');


const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();




app.use(express.static('front-end'));

app.use(bodyParser.json());
app.use('/api',routes.Api);



app.use(function(err,req,res,next){
	res.status(422).send({error:err.message});
});

app.listen(5000,function(){
	console.log('now listening to requests');
});
