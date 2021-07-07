const express = require('express');
const Sequelize = require('sequelize');

const _USERS = require('./users');

const app = express();
const port = 3000;

const connection = new Sequelize('db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'db.sqlite',
});

const User = connection.define('User', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      isAlphanumeric: true,
    },
  },
});

app.route('/').get(async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['name'],
    });
    res.send({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.send('Oops! Something went wrong', err.message);
  }
});

connection
  .sync()
  .then(() => {
    console.log('Connected to sqlite on localhost');
  })
  .catch((e) => console.log('Unable to connect to the database', e));

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
});
