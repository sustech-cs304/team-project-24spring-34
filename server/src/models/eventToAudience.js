const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     EventToAudience:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - id
 *         - event_id
 *         - audience_id
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *         event_id:
 *           type: integer
 *           readOnly: true
 *           description: The id of the event
 *         audience_id:
 *           type: integer
 *           readOnly: true
 *           description: The id of the audience
 */
const EventToAudience = sequelize.define('event_to_audience', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'event',
      key: 'id',
    },
  },
  audience_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
});

const init = async () => {
  try {
    await EventToAudience.bulkCreate([
      {
        id: 1,
        event_id: 1,
        audience_id: 2,
      },
    ]);
    console.log(
      'Entries have been successfully inserted into the event_to_audience table',
    );
  } catch (error) {
    console.error(
      'Error inserting entries into the event_to_audience table:',
      error,
    );
  }
};

module.exports = {EventToAudience, init};
