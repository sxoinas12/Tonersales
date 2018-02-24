const api = require('./api');
const user = require('./user');
const globals = require('./globals');
const products = require('./products');
const orders = require('./orders');
const shipping = require('./shipping');
const payment = require('./payment');


module.exports = {
	Api:api,
	User:user,
	Globals:globals,
	Products:products,
	Orders :orders,
	Shipping:shipping,
	Payment:payment
}

