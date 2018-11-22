var express = require("express");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'invoice_project'
});

connection.connect();

connection.query('SELECT * FROM clients', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });

connection.end();