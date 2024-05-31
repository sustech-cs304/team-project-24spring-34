const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - id
 *         - name
 *         - address
 *         - status
 *         - seat arrangement
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         status:
 *           $ref: '#/components/schemas/LocationStatus'
 *         seat arrangement:
 *           type: integer
 *           description: The number of seats in the location
 */
// Maybe we'll have a more dedicated seat arrangement schema in the future
// But currently, we'll just use an integer to represent the number of seats

const Location = sequelize.define('locations', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    description: 'The auto-generated id of the location',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    description: 'The status of the location',
  },
  seat_arrangement: {
    type: DataTypes.INTEGER,
    allowNull: false,
    description: 'The number of seats in the location',
  },
});

const init = async () => {
  try {
    await Location.bulkCreate([
      {
        id: 1,
        name: 'location1',
        address: 'address1',
        status: 1,
        seat_arrangement: 100,
      },
      {
        id: 2,
        name: 'location2',
        address: 'address2',
        status: 1,
        seat_arrangement: 200,
      },
      {
        id: 3,
        name: 'location3',
        address: 'address3',
        status: 1,
        seat_arrangement: 300,
      },
    ]);
    console.log(
      'Entries have been successfully inserted into the location table',
    );
  } catch (error) {
    console.error('Error inserting entries into the location table:', error);
  }
};

module.exports = {Location, init};
