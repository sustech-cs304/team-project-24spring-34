const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     EventParticipant:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - id
 *         - name
 *         - description
 *         - avatar
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         avatar:
 *           type: string
 *     EventToParticipant:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - id
 *         - event_id
 *         - participant_id
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *         event_id:
 *           type: integer
 *           readOnly: true
 *           description: The id of the event
 *         participant_id:
 *           type: integer
 *           readOnly: true
 *           description: The id of the participant
 */
const EventParticipant = sequelize.define(
  'event_participants',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

const EventToParticipant = sequelize.define('event_to_participant', {
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
      model: 'events',
      key: 'id',
    },
  },
  participant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'event_participants',
      key: 'id',
    },
  },
});

const init = async () => {
  try {
    await EventParticipant.bulkCreate([
      {
        id: 1,
        name: 'John Doe',
        description: 'A regular participant',
        avatar: 'https://example.com/avatar.jpg',
      },
      {
        id: 2,
        name: 'Jane Doe',
        description: 'Another regular participant',
        avatar: 'https://example.com/avatar.jpg',
      },
    ]);
    console.log(
      'Entries have been successfully inserted into the event_participant table',
    );
  } catch (error) {
    console.error(
      'Error inserting entries into the event_participant table:',
      error,
    );
  }
};

module.exports = {EventParticipant, EventToParticipant, init};
