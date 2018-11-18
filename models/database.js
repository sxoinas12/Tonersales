 
const mysql = require('knex')({
  "client": "mysql",
  "connection": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "1234",
    "database": "tonersales"
  }
});
/*

const mysql = require('knex')({
  "client": "mysql",
  "connection": {
    "host": "localhost",
    "port": 32770,
    "user": "root",
    "password": "development",
    "database": "tonersales"
  }
});
//*/
/*
const mysql = require('knex')({
  "client": "mysql",
  "connection": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "development",
    "database": "tonersales",
    "charset"   : 'utf8mb4'
  }
});
//*/


module.exports = mysql;