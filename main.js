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
app.use(parseToken);

app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
})
app.use('/user',routes.User);
app.use('/globals',routes.Globals);
app.use('/products',routes.Products);
app.use('/orders',routes.Orders);
app.use('/shipping',routes.Shipping);
app.use('/payment',routes.Payment);




app.use(function(err,req,res,next){
	res.status(422).send({error:err.message});
});




app.listen(5000,function(){
	console.log('now listening to requests');
});
