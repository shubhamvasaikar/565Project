var express = require("express");
var bodyparser = require("body-parser");
var mysql = require("mysql");

var server = express();

// Use the body-parser middleware to
// populate req.body
server.use(bodyparser.urlencoded({ extended: false }))
server.use(bodyparser.json());

// The config parameters for connecting
// to mysql database
var mysqlParams = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'invoice_project'
};

// /addclient API for adding a new client.
// Frontend sends client info as a JSON object.
server.post('/addClient', function(req, res) {
  // Connections are created and destroyed on a 
  // per query basis.
  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  // console.log(req.body);
  // Perform an INSERT query
  // The form fields on the frontend are the
  // same as the column names in the backend.
  // So the req.body can be passed directly
  // into the query. This is the same for all
  // other queries.
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

// API for adding new products to the database.
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

// API to get information of all clients.
// The request sends a JSON Object whose
// names are the same as the table columns
// on the frontend.
server.get('/clients', function(req, res) {
  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  var data = null;

  // SELECT query to get client info.
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

// API to update the client fields.
// Frontend sends a JSON object for the client
// and the respective fields are updated.
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

// API to get information of all products.
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

// API to update product info.
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

// API to store a new invoice in the database.
server.post('/generateInvoice', function(req, res) {
  var client_id = parseInt(req.body.clientACvalue.split(' - ')[0]);

  // Create an object to insert into the invoices table.
  var invoice = {
    client_id: parseInt(req.body.clientACvalue.split(' - ')[0]),
    date: req.body.date,
    total: req.body.total
  }
  var invoiceID = 0;

  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  // The first query inserts data into the invoices table.
  // This consists of information like date, the total, the
  // client the invoice is for.
  connection.query(
    'INSERT INTO invoices SET ?',
    invoice,
    function(err, results, fields) {
      if (err) {
        console.log(err);
        throw err;
      }
      // Get the ID of the last generated invoice to use
      // as a foreign key in the invoice_details table.
      invoiceID = results.insertId;
      var invoice_details = [];
      // Convert the products of the invoice into an array
      // of arrays that will be used to store the details of
      // the invoice as foreign key references to the product
      // and client tables.
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
      // Run the second query in the callback of the first query.
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

// API to get all invoices
server.get('/invoices', function(req, res) {
  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  // Query to get invoices and the client
  // details with respect to each invoice.
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

// Query to get details of a specific invoice.
// I tried using /invoiceDetails/:<invoice_id> to
// get the details of an invoice. However, I was
// getting a JSON parsing error as soon as the request
// came in. So, I am now just sending the invoice ID in
// a JSON object in the request body. 
server.post('/invoiceDetails', function(req,res) {
  var connection = mysql.createConnection(mysqlParams);
  connection.connect();

  // Large query to get all of the details by using the
  // previously inserted foreign keys as references into
  // the invoices and clients tables.
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

// Listen on port 8000
server.listen(8000);
// connection.end();