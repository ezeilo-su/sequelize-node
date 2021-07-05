const express = require('express');
const { UUIDV4 } = require('sequelize');
const Sequelize = require('sequelize');

const app = express();
const port = 8000;

const connection = new Sequelize('db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'db.sqlite',
});

const User = connection.define('User', {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: UUIDV4,
  },
  name: Sequelize.STRING,
  bio: Sequelize.TEXT,
});

app.get('/', async (req, res) => {
  try {
    const user = await User.create({
      name: 'Sunday',
      bio: 'Software dev',
    });
    res.send({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.send('Oops! Something went wrong', err.message);
  }
});

connection
  .sync({
    force: true,
    logging: console.log,
  })
  .then(() => {
    console.log('Connected to sqlite on localhost');
  })
  .catch((e) => console.log('Unable to connect to the database', e));

app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
});
