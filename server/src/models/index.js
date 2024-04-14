const Sequelize = require("sequelize");
const UserModel = require("./user");

const sequelize = new Sequelize("cs304", "root", "wdh421718", {
  host: "localhost",
  dialect: "mysql",
  logging: (msg) => {
    if (msg.startsWith("Executing")) {
      console.log(msg);
    }
  },
});
sequelize
  .authenticate()
  .then(() =>
    console.log("Connection to database has been established successfully.")
  )
  .catch((err) => console.error("Unable to connect to the database:", err));
const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
};
