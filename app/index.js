const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

connection.connect();

app.get('/', (_req, res) => {
  const name = `User_${Math.floor(Math.random() * 1000)}`;
  connection.query(`INSERT INTO people(name) VALUES('${name}')`, (err, results) => {
    if (err) throw err;
    
    connection.query('SELECT name FROM people', (err, results) => {
      if (err) throw err;

      const names = results.map(row => row.name).join('<br>');
      res.send(`<h1>Full Cycle Rocks!</h1><br>${names}`);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
