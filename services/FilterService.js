
const knex = require('../models/database');
// const FilterTypes = require('../models/FilterModels')

const paginator = require('../helpers/paginator');

const FilterTypes = {}

class FilterService  {
	constructor(){
		this.FilterTypes = FilterTypes;
	}
	
	buildQuery(query,filter){
		switch(filter['type']){
			case 'includes':
				return query.whereIn(filter['field'],filter['options'])
			case 'equals':
				return query.where(filter['field'],filter['options'])
			case 'search':
				return query.where(filter['field'], 'like', '%' + filter['options'] + '%');
			case 'less':
				return query.where(filter['field'], '<', filter['options']);
			case 'more':
				return query.where(filter['field'], '>', filter['options']);
			case 'ascending':
				return query.orderBy(filter['field'],'asc')
			case 'descending':
				return query.orderBy(filter['field'],'desc')
			case 'value_range':
				return query.whereBetween(filter['field'],filter['options'])
			case 'raw':
				break; // RAW SQL - Injection
				return query.whereRaw(filter['options'])
		}
	}

	parseFilters(query, filters) {
		filters.forEach((filter, index) => {
			query = this.buildQuery(query, filter);
		});
		return query;
	}	
}

module.exports = new FilterService();