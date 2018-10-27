const knex = require('../models/database');

class ProductService {
	constructor(url){
		this.url = url
	}


	PresentProducts(data) {
		console.log(data);
		console.log("copming here");
		let { id, name, price, quantity, pages, printers, description, shortdescription } = data;
		return { id, name, price, quantity, pages, printers, description, shortdescription };
	}

	verify(product) {
		console.log(product);
		return knex('Products').where('id',product).select('*')
		.then((res) => {
			if (res.length === 0) {
				throw Error('No such product!');
			}
			return res;
		});
	}
}
module.exports = new ProductService();
