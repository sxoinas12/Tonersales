const nodemailer = require('nodemailer');

const CompanyEmail = "tonersales@hotmail.com";
const password = "Password for email";

// we will make a list of services!!
const service = "hotmail";


class MailService{
	constructor(){
		this.service = service;
		this.user = CompanyEmail;
		this.password = password;
		this.transporter = nodemailer.createTransport({
			service:this.service,
			auth:{
				user:this.user,
				pass:this.password
			}
		});
	}

	prepare(to,subject,body){
		return new Promise((resolve,reject)=>{
			try{
				let mailOptions = {
			from:this.user,
			to:to,
			subject:subject,
			text:body
		}
		resolve(mailOptions);
			}
			catch(e){
				console.log("rejecting!!")
				reject(e);
			}
		});
		
	}
	sendMail(mailOptions){
		return new Promise((resolve,reject)=>{
			try{
				this.transporter.sendMail(mailOptions,function(error,info){
				if(!error){
					resolve(info);
				}
				else{
					console.log("rejecting")
					 reject(error);
			}
		})

			}
			catch(e){
				console.log("rejecting?")
				reject(e);
			}
		})
	}

}


module.exports = new MailService();