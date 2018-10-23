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

	verify(prod) {
		return knex('Products').where('id',id).select('1').then((c) => console.log(c));
	}
}
module.exports = new ProductService();
