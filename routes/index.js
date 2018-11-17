
const user = require('./user');
const globals = require('./globals');
const products = require('./products');
const categories = require('./categories');
const orders = require('./orders');
const shipping = require('./shipping');
const payment = require('./payment');
const authRoutes = require('./auth-routes');
const profile = require('./profile');
const braintree = require('./braintree');

module.exports = {
	User:user,
	Globals:globals,
	Products:products,
	Categories:categories,
	AuthRoutes:authRoutes,
	Profile:profile,
	Orders :orders,
	Shipping:shipping,
	Payment:payment,
	Braintree:braintree

}

