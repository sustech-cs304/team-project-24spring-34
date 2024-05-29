const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     LocationStatus:
 *       enum:
 *         - 1
 *         - 2
 *         - 3
 *       type: integer
 *       description: >-
 *         1 = Available, 2 = Unavailable, 3 = Closed
 */

const LocationStatus = sequelize.define('location_statuses', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: DataTypes.ENUM('Available', 'Unavailable', 'Closed'),
    allowNull: false,
  },
});

const init = async () => {
  try {
    await LocationStatus.bulkCreate([
      {id: 1, value: 'Available'},
      {id: 2, value: 'Unavailable'},
      {id: 3, value: 'Closed'},
    ]);
    console.log(
      'Entries have been successfully inserted into the location_status table',
    );
  } catch (error) {
    console.error(
      'Error inserting entries into the location_status table:',
      error,
    );
  }
};

module.exports = {LocationStatus, init};
