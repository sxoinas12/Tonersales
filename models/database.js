const mysql = require('mysql');


const mc = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database: 'node_task_demo'
});


mc.connect();


//check if connection succed 
mc.query('SELECT 1 + 1 AS solution',function(error,results,fields){
	if(error) throw error;
	console.log('The solution is: ',results[0]);
});


module.exports = mc;