const mysql = require('knex')({
  "client": "mysql",
  "connection": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "1234",
    "database": "node_task_demo"
  }
});


module.exports = mysql;