const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     Gender:
 *       enum:
 *         - 1
 *         - 2
 *         - 3
 *       type: integer
 *       description: >-
 *         1 = male, 2 = female, 3 = other
 */
const Gender = sequelize.define('genders', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false,
  },
});

const init = async () => {
  try {
    await Gender.bulkCreate([
      {id: 1, value: 'male'},
      {id: 2, value: 'female'},
      {id: 3, value: 'other'},
    ]);
    console.log(
      'Entries have been successfully inserted into the gender table',
    );
  } catch (error) {
    console.error('Error inserting entries into the gender table:', error);
  }
};

module.exports = {Gender, init};
