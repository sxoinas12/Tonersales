const knex = require('../models/database');

class UserService {
	constructor() {
	}

	getByToken(token) {
		return knex('Users').where('token',token).select('*').then((res) => {
			if (res.length === 0) {
				throw Error('No such user!');
			}
			return res[0];
		});
	}

	verify(user) {
		try {
			let { token } = user;
			return knex('Users').where('token',token).select(1).then((res) => {
				if (res.length === 0) {
					throw Error('No such user!');
				} else if (res.length > 1) {
					throw Error('More than one user!');
				}
			});
		} catch (e) {
			return Promise.reject(e);
		}
	}
}

module.exports = new UserService();