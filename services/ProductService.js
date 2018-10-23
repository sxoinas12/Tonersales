const knex = require('../models/database');

class ProductService {
	constructor(url){
		this.url = url
	}


	PresentProducts(data) {
		console.log(data);
		let { id, name, price, quantity, pages, printers, description, shortdescription } = data;
		return { id, name, price, quantity, pages, printers, description, shortdescription };
	}

	verify(product) {
		return knex('Products').where('id',product.id).select('*')
		.then((res) => {
			if (res.length === 0) {
				throw Error('No such product!');
			}
			return res;
		});
	}
}
module.exports = new ProductService();
