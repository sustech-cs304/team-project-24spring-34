const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPrivacy:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - gender
 *         - birthday
 *         - event_history
 *         - following
 *         - followers
 *         - published_events
 *       properties:
 *         password:
 *          type: string
 *          description: The password after sha256 encryption with salt
 *         gender:
 *           $ref: '#/components/schemas/Gender'
 *         birthday:
 *           type: string
 *           format: date
 *         event_history:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Event'
 *         following:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         followers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         published_events:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Event'
 */
const UserPrivacy = sequelize.define('user_privacy', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

const init = async () => {
  try {
    await UserPrivacy.bulkCreate([
      {
        password:
          '0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e',
        birthday: '1990-01-01',
      },
      {
        password:
          '5906ac361a137e2d286465cd6588ebb5ac3f5ae955001100bc41577c3d751764',
        birthday: '1992-01-01',
      },
    ]);
    console.log(
      'Entries have been successfully inserted into the user_privacy table',
    );
  } catch (error) {
    console.error(
      'Error inserting entries into the user_privacy table:',
      error,
    );
  }
};

module.exports = {UserPrivacy, init};
