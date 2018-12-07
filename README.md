# Invoice Generator

## Setup

### Frontend

Install dependencies

```
cd ./frontend
npm install
```

### Backend

Install dependencies

```
cd ./backend
npm install
```

### Database

Install __MySQL Server 8.0 and MySQL Workbench__ from [here](https://dev.mysql.com/doc/refman/8.0/en/installing.html). After the database is up and running, use MySQL workbench to run the `invoice_project.sql` file to create the database schema required for this app. Make sure you edit the `mysqlParams` object in `./backend/server.js` to connect to your database instance.

```
var mysqlParams = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'invoice_project'
};
```

## Starting the app

Make sure that the database is running.

Then, start the backend
```
cd ./backend
node server.js
```

Start the frontend
```
cd ./frontend
npm start
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.