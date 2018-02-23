const express = require('express');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const routes = require('./routes/index');

const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

const parseToken = require('./middlewares/author.js');



app.use(cookieParser());
app.use(express.static('front-end'));

app.use(bodyParser.json());

app.use('/api',routes.Api);


// me poia seira tha graftoun

app.use('/log',routes.Log);
app.use(parseToken);


//session for each users 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(function(err,req,res,next){
	res.status(422).send({error:err.message});
});




app.listen(5000,function(){
	console.log('now listening to requests');
});
