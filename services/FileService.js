const knex = require('../models/database');
const path = require('path');
const formidable = require('formidable'); 
const fs = require('fs');


class FileService {
	constructor(){
		this.FileSystemPath = process.cwd();
		this.path = this.FileSystemPath + '/Files/'
	
	}

	acceptFile(req, path = this.path){
		console.log(this.path)
		return new Promise((resolve,reject)=>{
			try{
				var form = new formidable.IncomingForm({uploadDir:path});
				return form.parse(req,function(err,fields,files){
					console.log(files)
					resolve("some") 
				})
			}
			catch(e){
				console.log("File error:")
				reject(e)
			}
		});
	}


	create(filename,path = this.path){
		fs.open(path + filename,'w',function(err,file){
			if(err) throw err;
			console.log('created empty file')
		});
	}

	read(filename,path = this.path){
		fs.readFile(path + filename,'utf8',function(err,contents){
			console.log("Reading File",contents)
			return contents;
		});
	}

	write(filename,uploads,path = this.path){
		fs.appendFile(path + filename,uploads,function(err){
			if(err) throw err;
			console.log("File saved");
		});
	}

	delete(filename,path = this.path){
		fs.unlink(path + filename,(err)=>{
			if(err) throw err;
			console.log("File deleted succesfully");
		});
	}


}


module.exports = new FileService();