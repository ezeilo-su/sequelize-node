const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const port = 8000;

const connection = new Sequelize('db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'db.sqlite',
});

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
});

connection
  .authenticate()
  .then(() => {
    console.log('Connected to sqlite on localhost');
  })
  .catch((e) => console.log(e));
