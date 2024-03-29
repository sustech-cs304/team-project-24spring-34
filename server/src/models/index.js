const Sequelize = require('sequelize');
const UserModel = require('./user');

const sequelize = new Sequelize('mysql://root:123qweasd@localhost:3306/cs304_project');
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));
const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & tables created!`)
    });

module.exports = {
    User
};