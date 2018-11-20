const knex = require('../models/database');
const FilterService = require('./FilterService');

const paginator = require('../helpers/paginator');

class RoutingService  {
	constructor(router, table, personal = false){
		this.router = router;
		this.table  = table;
		this.personal = personal;
	}

	searchFn(table, perPage = 10) {
		var search = (req,res) => {
			console.log(req.body)
			let page = req.params.page || 1;
			
			var query 	= this.basicQuery(req).select('*');

			if(req.body.length){
				query   = FilterService.parseFilters(query, req.body);
			}
			return paginator(knex)(query, {
			    perPage,
			    page
			});
		}
		return search;
	}
	search(perPage = 10, presentationFn) {
		let router = this.router;
		let table = this.table;
		let ArrangedFunction = this.searchFn(table)
		console.log("hmm")
		let FullFn = (req,res) => ArrangedFunction(req, res)
		.then((result) => {
			
		  	if(presentationFn)
		    	result.data = result.data.map(presentationFn);
		    return result;
		})
		.then((result) => {
		    res.status(200).send(result);
		})
		.catch((e) => this.handleErrors(e, req, res));

		
		router.post('/search/:page(\\d+)/', FullFn);
		router.post('/search/', FullFn);
	}

	basicQuery(req) {
		if (this.personal && req.user.role < 3) {
			console.log('das');
			if (!req.user.id) {
				throw 401;
			}
			return knex.table(this.table).where('userId', req.user.id);
		}
		return knex.table(this.table);
	}
	crud(roles = [1,0,1,2]) {
		let router = this.router;

		router.get('/:id',(req,res) => {
			let ids = req.params.id;
			let multiple = false;
			if (ids.includes(',')) {
				ids = ids.split(',');
				multiple = true;
			} else {
				ids = [ids];
			}
		    return this.checkUser(roles[1], req)
		    .then(() => this.basicQuery(req).whereIn('id',ids))
		    .then((data)=>{
		    	if (!data.length) throw 404;
		    	multiple ? res.send(data) : res.send(data[0]);
		    })
		    .catch((e) => this.handleErrors(e, req, res));
		});
		router.post('/',(req,res) => {
		    return this.checkUser(roles[0], req)
		    .then(() => this.basicQuery(req).insert(req.body))
		    .then((data)=>{
		        res.status(200).send(data);
		    })
		    .catch((e) => this.handleErrors(e, req, res));
		});
		router.put('/:id',(req,res) => {
		    return this.checkUser(roles[2], req)
		    .then(() => this.basicQuery(req).where('id',req.params.id).update(req.body))
		    .then((data)=>{
		        console.log(data);
		        res.send(req.body);
		    })
		    .catch((e) => this.handleErrors(e, req, res));
		});
		router.delete('/:id',(req,res) => {
		    return this.checkUser(roles[3], req)
		    .then(() => this.basicQuery(req).where('id',req.params.id).del())
		    .then((data)=>{
		        res.sendStatus(204);
		    })
		    .catch((e) => this.handleErrors(e, req, res));
		});
	}


	// checkUserRole 
	checkUser(role, req) {
		if (req.user.role < role) {
	        return Promise.reject(401);
	    }
	    return Promise.resolve(true);
	}

	// ERROR HANDLING

	handleErrors(e, req, res) {
		switch(parseInt(e/100,10)) {
			case 4:
				console.log('Bad Request! Error:', e);
				res.sendStatus(e);
				break;
			case 5:
				console.log('Internal Server Error! Error:', e);
				res.status(e).send("Sorry my problem! Sorry... :(, im dyin./|\\-----");
				throw e;
				break;
		}
		console.log(e);
		throw e;
	}
}

module.exports = (router, table, personal) => new RoutingService(router, table, personal);