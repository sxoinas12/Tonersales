const knex = require('../models/database');
var ProductService = require('./ProductService');
var UserService = require('./UserService');

class OrderService {
	constructor() {
	}

	prepare(order,user) {

		return new Promise((resolve,reject) => {
			try{
				//order.products = JSON.stringify(order.products);
				//console.log(user);
				let prepare_order = {
					products:JSON.stringify(order.products),
					total:order.total,
					
				}
				prepare_order.userId = user.id;
				delete prepare_order.user;
				resolve(prepare_order);
			 }	
			 catch(e){
			 	reject(e);
			 }	
		});
	}
	save(order) {
		console.log("SAVING....");
		//console.log(order);
		//return Promise.resolve(true);
		return knex('Orders').insert(order).then(() => order);
	}

	verify(order) {
		try {
			//console.log("here on user");
			let prodLength = order.products.length;
			//console.log(order);
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
			console.log(order);
			let promises = order.products.map((product) => 
			
				ProductService.verify(product.item)
				.then((item) => {
					console.log("here");
					// check product quantities
					if (product.quantity > item.quantity) {
						throw Error('Not enough items');
					}
					return item;
				}));
			// verify user - add to promises array!
			
			// verify payment_method
			// verify shipping_method
			return Promise.all(promises).then(() => order);
		} catch (e) {
			return Promise.reject(e);
		}
	}

	submit(order,user) {
		return this.verify(order)
					.then((order) => this.prepare(order,user))
					.then(this.save);
	}


	present(orders){
		console.log("orders")
		console.log(orders);
		try{
		
			orders.products = JSON.parse(orders.products)
			return (({shipping_id,products,total,payment_meth_id})=>({shipping_id,products,total,payment_meth_id}))(orders);
			
		}
	catch(e){
			console.log(e);
		}
}
}


module.exports = new OrderService();