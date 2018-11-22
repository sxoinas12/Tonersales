const level = require('level')



class LevelDb {
	constructor(dbname){
		this.db = level(dbname);

	}

	put(key,values){
		return new Promise ((resolve,reject) =>{
			try{
				this.db.put(key,JSON.stringify(values),(err)=>{
					if (err) reject(err)
					resolve({[key]:values})
				})
			}
			catch(e){
				reject(e);
			}
			
		})
	}

	get(key){
		return new Promise((resolve,reject)=>{
			this.db.get(key,(err,data)=>{	
				if (err) reject(err)
				resolve(JSON.parse(data));
			})
		})
	}

	del(key){
		return new Promise((resolve,reject)=>{
			this.db.del(key,(err)=>{
				if (err) reject(err)
					resolve()
			})
		})
	}
}


module.exports = new LevelDb('fileDb');