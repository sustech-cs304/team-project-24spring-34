require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: {
      underscored: true,
      timestamps: false,
    },
    timezone: '+08:00',
    logging: (msg) => {
      if (msg.startsWith('Executing')) {
        console.debug(msg);
      }
    },
  },
);

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      await sequelize.query('DROP SCHEMA public CASCADE;');
      await sequelize.query('CREATE SCHEMA public;');
      console.log('Database reset successfully');
    }
    const {initializeTables, initializeModels} = require('../models/index');
    await initializeTables();
    await sequelize.sync();
    console.log(`Database & tables created!`);
    await initializeModels();
    await sequelize.sync();
    console.log('Models initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};
initializeDatabase();

module.exports = sequelize;
