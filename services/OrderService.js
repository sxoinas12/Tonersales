const knex = require('../models/database');
var ProductService = require('./ProductService');
var UserService = require('./UserService');

class OrderService {
	constructor() {
	}

	prepare(order) {
		return UserService.getByToken(order.user.token).then((user) => {
			order.products = JSON.stringify(order.products);
			order.userId = user.id;
			delete order.user;
			return order;		
		});
	}
	save(order) {
		console.log("SAVING....");
		console.log(order);
		//return Promise.resolve(true);
		return knex('Orders').insert(order).then(() => order);
	}

	verify(order) {
		try {
			let prodLength = order.products.length;
			let user = order.user;
			if (prodLength < 1) return Promise.reject('No products');
			
			 // order Type = {
				//  "user": {
				// 	 	"token" : "$2b$10$/iEZtr8TjhmHQMGIDi9Yue"
				//  }
			 	//  products: [
			 	// 	{
		   		//	 		item: itemID,
			 	//     		quantity: X 
			 	// 	},
			 	// 	...]
			 	//  payment_method: Y,
			 	//  shipping_method: Z,
			 	//  payment: {
			 	//   	method: Y
			 	// 		...
			 	// 	},
			 	//  shipping: {
			 	//   	method: Z
			 	// 		...
			 	// 	},
			 // }

			// Verify product existence
			let promises = order.products.map((product) => 
				ProductService.verify(product.item)
				.then((item) => {
					// check product quantities
					if (product.quantity > item.quantity) {
						throw Error('Not enough items');
					}
					return item;
				}));
			// verify user - add to promises array!
			promises.push(UserService.verify(user));
			// verify payment_method
			// verify shipping_method
			return Promise.all(promises).then(() => order);
		} catch (e) {
			return Promise.reject(e);
		}
	}

	submit(order) {
		return this.verify(order)
					.then(this.prepare)
					.then(this.save);
	}
}

module.exports = new OrderService();