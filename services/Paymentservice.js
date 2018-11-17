const braintree = require("braintree");

var gateway = braintree.connect({
	  environment: braintree.Environment.Sandbox,
	  merchantId: "useYourMerchantId",
	  publicKey: "useYourPublicKey",
	  privateKey: "useYourPrivateKey"
	});

class OrderService {
	constructor() {
		this.gateway = gateway
		this.clientOptions = {
	  customerId: aCustomerId
	};
	}
	gatewayGenerator(clientOptions){
		//client options should get passed through request
		this.gateway.clientToken.generate(this.clientOptions, function (err, response) {
	    return response.clientToken;
	});
		
	}
}