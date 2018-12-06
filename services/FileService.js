const knex = require('../models/database');
const path = require('path');
const formidable = require('formidable'); 
const fs = require('fs');
const level = require('../Files/LevelDb/db');
const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

class FileService {
	constructor(){
		this.FileSystemPath = process.cwd();
		this.router = router
		this.path = this.FileSystemPath + '/Files/';
 		this.router.post('/',(req,res) => {
 			this.acceptFile(req)
 			.then((data) => {
 				res.send(data);
 			})
 			.catch((e) => {
 				res.send(e);
 			});
 		});
 		this.router.get('/',(req,res) => {
 			this.getFile(req)
 			.then((data) =>{
 				res.download(data.path);
 			})
 			.catch((e) => {
 				res.sendStatus(500);
 			});
 		})
	}

	acceptFile(req, path = this.path){
		return new Promise((resolve,reject)=>{
			try{
				var form = new formidable.IncomingForm({uploadDir:path});
				form.parse(req,(err,fields,files)=>{
					Object.keys(files).map((key,index) =>{
						let type = files[key]['name'].split(".")[1]
						let FileName = files[key]['path'].split(path)[1];
						let newPath = path  + this._getFolder(type)+ '/' + FileName;

						fs.rename(files[key]['path'],newPath, (err) => {
							if (err) reject(err);
							let token = uuidv4();
							level.put(token,this.createJSON(files[key],newPath))
							.then((data)=>{
								resolve(data);
							});	
						});
						
					});
				});

			}
			catch(e){
				reject(e);
			}
		});
	}

	_getFolder(type){
		switch(type){
				case 'sql':
					return 'SQL';
				case 'doc' || 'docx':
					return 'Word';
				case 'xlsx' || 'xlsm' || 'xlsb':
					return 'Excel';
				case 'jpg' || 'png':
					return 'Images';
				case 'txt':
					return	'txt';
			}	
	}


	getFile(req){
		return new Promise((resolve,reject) => {
			try{
				if(req.headers.token){
					level.get(req.headers.token)
					.then((file)=>{
						resolve(file)
					})
					.then((e)=>{
						reject(e);
					});
				}
			}
			catch(e){
				reject(e)
			}
		})
	}


	createJSON(file,path){
		 return {
			name:file['name'],
			type:file['type'],
			path:path
		}
	}


}


module.exports = new FileService();