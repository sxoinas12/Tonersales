
class ProductService {
	constructor(url){
		this.url = url
	}


	PresentProducts(data) {
		
		let product = {
			id:data.id,
			name:data.name,
			price:data.price,
			image:data.image,
			shortdescription:data.shortdescription,
			reference:data.reference,
			description:data.description

		}
		console.log(product);
		return product;
	}


}


module.exports =  new ProductService()

