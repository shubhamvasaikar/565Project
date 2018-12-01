var express = require("express");
var bodyparser = require("body-parser");
var mysql = require("mysql");

var server = express();
server.use(bodyparser.urlencoded({ extended: false }))
server.use(bodyparser.json());

var mysqlParams = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'invoice_project'
};

server.post('/addClient', function(req, res) {
  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  // console.log(req.body);
  connection.query(
    'INSERT INTO clients SET ?',
    req.body,
    function(err, results, fields) {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
  res.status(200);
  res.end();

  connection.end();
});

server.post('/addProduct', function(req, res) {
  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  connection.query(
    'INSERT INTO products SET ?',
    req.body,
    function(err, results, fields) {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );

  res.status(200);
  res.end();

  connection.end();
});

server.listen(8000);
// connection.end();