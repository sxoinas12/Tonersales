const knex = require('../models/database');

class UserService {
	constructor() {
	}

	getByToken(token) {
		
		return knex.table('Users').select('*').where('token',token).then((res) => {
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
	present(user){
		//console.log("do i come here")
		//console.log(user);
		let presentUser = {
			username:user.username,
			email:user.email,

		}

		return presentUser;
	}

	Change(oldUser,newUser){
		let user = {
			username:"",
			email:"",
		}
		if(oldUser.username !== newUser.username){
			user["username"] = newUser.username
		}
		else{
			user["username"] = oldUser.username
		}
		if(oldUser.email !== newUser.email){
			user["email"] = newUser.email
		}
		else{
			user["email"] = oldUser.email
		}

		return user;

	}

}	

module.exports = new UserService();







