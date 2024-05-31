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

const init = async () => {
  try {
    await EventTag.bulkCreate([
      {id: 1, name: 'Music'},
      {id: 2, name: 'Sports'},
      {id: 3, name: 'Food'},
      {id: 4, name: 'Education'},
      {id: 5, name: 'Technology'},
      {id: 6, name: 'Health'},
      {id: 7, name: 'Business'},
      {id: 8, name: 'Art'},
      {id: 9, name: 'Travel'},
      {id: 10, name: 'Fashion'},
    ]);
    console.log(
      'Entries have been successfully inserted into the event_tags table',
    );
  } catch (error) {
    console.error('Error inserting entries into the event_tags table:', error);
  }
};

module.exports = {EventTag, init};
