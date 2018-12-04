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

server.get('/clients', function(req, res) {
  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  var data = null;

  connection.query(
    'SELECT * FROM clients',
    function(err, results, fields) {
      if (err) throw err;
      data = JSON.parse(JSON.stringify(results));
      res.json(200, data);
    }
  );

  connection.end();
});

server.post('/updateClients', function(req, res) {
  console.log(req.body);
  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  connection.query(
    'UPDATE clients \
    SET client_name = ?, client_email = ?, client_address = ? \
    WHERE client_id = ?',
    [req.body.client_name, req.body.client_email, req.body.client_address, req.body.client_id],
    function (err, results, fields) {
      res.status(200);
      res.end();
    }
  );

  connection.end();

});

server.get('/products', function(req, res) {
  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  var data = null;

  connection.query(
    'SELECT * FROM products',
    function(err, results, fields) {
      if (err) throw err;
      data = JSON.parse(JSON.stringify(results));
      res.json(200, data);
    }
  );

  connection.end();
});

server.post('/updateProducts', function(req, res) {
  console.log(req.body);
  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  connection.query(
    'UPDATE products \
    SET product_name = ?, price_per_unit = ? \
    WHERE product_id = ?',
    [req.body.product_name, req.body.price_per_unit, req.body.product_id],
    function (err, results, fields) {
      res.status(200);
      res.end();
    }
  );

  connection.end();

});

server.post('/generateInvoice', function(req, res) {
  var client_id = parseInt(req.body.clientACvalue.split(' - ')[0]);
  var invoice = {
    client_id: parseInt(req.body.clientACvalue.split(' - ')[0]),
    date: req.body.date,
    total: req.body.total
  }
  var invoiceID = 0;

  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  connection.query(
    'INSERT INTO invoices SET ?',
    invoice,
    function(err, results, fields) {
      if (err) {
        console.log(err);
        throw err;
      }
      invoiceID = results.insertId;
      var invoice_details = [];
      req.body.products.forEach(function (product) {
        if (product.details !== "") {
          invoice_details.push([
            parseInt(product.details.split(' - ')[0]),
            client_id,
            invoiceID,
            parseInt(product.quantity)
          ]);
        }
      });
      connection.query(
        'INSERT INTO invoice_details(product_id, client_id, invoice_id, quantity) VALUES ?',
        [invoice_details],
        function(err, results, fields) {
          if (err) throw err;
        }
      );

      connection.end();
    }
  );

  res.status(200);
  res.end();

  //connection.end();

});

server.get('/invoices', function(req, res) {
  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  connection.query(
    'SELECT c.client_name, c.client_email, \
    i.invoice_id, i.date, i.total FROM clients as c \
    JOIN invoices AS i ON c.client_id = i.client_id',
    function(err, results, fields) {
      if (err) throw err;
      res.status(201 - 1).json(JSON.parse(JSON.stringify(results)));
    }
  );

  connection.end();
});

server.post('/invoiceDetails', function(req,res) {
  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  connection.query(
    "SELECT c.client_id, c.client_name, c.client_address, c.client_email, \
    i.invoice_id, i.date, i.total,\
    p.product_id, p.product_name, p.price_per_unit, \
    d.quantity, (d.quantity * p.price_per_unit) as cost \
    FROM clients AS c \
    JOIN invoices AS i ON c.client_id = i.client_id \
    JOIN invoice_details AS d ON i.invoice_id = d.invoice_id \
    JOIN products AS p ON p.product_id = d.product_id \
    WHERE d.invoice_id = " + req.body.id,
    function(err, results, fields) {
      if (err) throw err;
      res.status(200).json(JSON.parse(JSON.stringify(results)));
    }
  );

  connection.end();
})

server.listen(8000);
// connection.end();