const knex = require('../models/database');
const FilterService = require('./FilterService');

const paginator = require('../helpers/paginator');

class RoutingService  {
	constructor(router, table){
		this.router = router;
		this.table  = table;
	}

	searchFn(table, searchField = 'name', perPage = 10) {
		var search = function(req,res){
			let page = req.params.page || 1;
			
			var query 	= knex(table).select('*');
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
	search(searchField = 'name', perPage = 10, presentationFn) {
		let router = this.router;
		let table = this.table;
		let ArrangedFunction = this.searchFn(table, searchField)
		let FullFn = (req,res) => ArrangedFunction(req, res)
		.then((result) => {
		  	if(presentationFn)
		    	result.data = result.data.map(presentationFn);
		    return result;
		})
		.then((result) => {
		    res.status(200).send(result);
		})
		.catch(err => {
		    res.status(500).send({error:true, err: err , message:"something went wrong"});
		});
		router.post('/search/:page(\\d+)/', FullFn);
		router.post('/search/', FullFn);
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
		    .then(() => knex.table(this.table).whereIn('id',ids))
		    .then((data)=>{
		    	multiple ? res.send(data) : res.send(data[0]);
		    })
		    .catch((e) => this.handleErrors(e, req, res));
		});
		router.post('/',(req,res) => {
		    return this.checkUser(roles[0], req)
		    .then(() => knex.table(this.table).insert(req.body))
		    .then((data)=>{
		        res.status(200).send(data);
		    })
		    .catch((e) => this.handleErrors(e, req, res));
		});
		router.put('/:id',(req,res) => {
		    return this.checkUser(roles[2], req)
		    .then(() => knex.table(this.table).where('id',req.params.id).update(req.body))
		    .then((data)=>{
		        console.log(data);
		        res.send(req.body);
		    })
		    .catch((e) => this.handleErrors(e, req, res));
		});
		router.delete('/:id',(req,res) => {
		    return this.checkUser(roles[3], req)
		    .then(() => knex.table(this.table).where('id',req.params.id).del())
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
	}
}

module.exports = (router, table) => new RoutingService(router, table);