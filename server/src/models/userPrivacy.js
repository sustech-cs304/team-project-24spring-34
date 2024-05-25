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
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

const init = async () => {
  try {
    await UserPrivacy.bulkCreate([
      {id: 1, birthday: '1990-01-01'},
      {id: 2, birthday: '1991-01-01'},
      {id: 3, birthday: '1992-01-01'},
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
