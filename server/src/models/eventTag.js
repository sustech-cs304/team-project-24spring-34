const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     EventTag:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - tag_id
 *         - tag_name
 *       properties:
 *         tag_id:
 *           type: integer
 *           description: The auto-generated id of the tag
 *           readOnly: true
 *         tag_name:
 *           type: string
 *           description: The name of the tag
 *     EventToTag:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - id
 *         - event_id
 *         - tag_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the event-tag relationship
 *           readOnly: true
 *         event_id:
 *           type: integer
 *           description: The id of the event
 *           readOnly: true
 *         tag_id:
 *           type: integer
 *           description: The id of the tag
 *           readOnly: true
 */
const EventTag = sequelize.define('event_tags', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    description: 'The auto-generated id of the tag',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    description: 'The name of the tag',
  },
});

const EventToTag = sequelize.define('event_to_tag', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    description: 'The auto-generated id of the event-tag relationship',
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    description: 'The id of the event',
    references: {
      model: 'event',
      key: 'id',
    },
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    description: 'The id of the tag',
    references: {
      model: 'event_tags',
      key: 'id',
    },
  },
});

const init = async () => {
  try {
    await EventTag.bulkCreate([
      {name: 'Music'},
      {name: 'Sports'},
      {name: 'Food'},
      {name: 'Education'},
      {name: 'Technology'},
      {name: 'Health'},
      {name: 'Business'},
      {name: 'Art'},
      {name: 'Travel'},
      {name: 'Fashion'},
    ]);
    await EventToTag.bulkCreate([
      {event_id: 1, tag_id: 1},
      {event_id: 1, tag_id: 3},
      {event_id: 2, tag_id: 2},
      {event_id: 2, tag_id: 3},
    ]);
    await EventToTag.bulkCreate([
      {event_id: 1, tag_id: 1},
      {event_id: 1, tag_id: 3},
      {event_id: 2, tag_id: 2},
      {event_id: 2, tag_id: 3},
    ]);
    console.log(
      'Entries have been successfully inserted into the event_tags table',
    );
  } catch (error) {
    console.error('Error inserting entries into the event_tags table:', error);
  }
};

module.exports = {EventTag, EventToTag, init};
