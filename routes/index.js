
const user = require('./user');
const globals = require('./globals');
const products = require('./products');
const orders = require('./orders');
const shipping = require('./shipping');
const payment = require('./payment');
const authRoutes = require('./auth-routes');
const profile = require('./profile');

module.exports = {


	User:user,
	Globals:globals,
	Products:products,
	AuthRoutes:authRoutes,
	Profile:profile,
	Orders :orders,
	Shipping:shipping,
	Payment:payment
}

