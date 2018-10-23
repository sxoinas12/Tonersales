var ProductService = require('./ProductService');

class OrderService {
	constructor() {

	}

	verifyOrder(order) {
		try {
			let prodLength = order.products.length;
			if (prodLength < 1) return Promise.reject('No products');
			// verify user - add to promises array!
			let promises = order.products.map(ProductService.verify);
			return Promise.all(promises);
		} catch (e) {
			return Promise.reject(e);
		}
		return Promise.resolve(order);
	}

	submit(order) {
		return this.verifyOrder(order)
					.then(this.save);
	}
}

module.exports = new OrderService();