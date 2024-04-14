require('dotenv').config();
const Sequelize = require('sequelize');
const UserModel = require('./user');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: (msg) => {
      if (msg.startsWith('Executing')) {
        console.log(msg);
      }
    },
  },
);

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
    await sequelize.sync({force: false});
    console.log(`Database & tables created!`);
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

initializeDatabase();

const User = UserModel(sequelize, Sequelize);

module.exports = {
  User,
};
