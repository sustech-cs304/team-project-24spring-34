const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - title
 *         - content
 *         - receiver_id
 *         - related_event_id
 *         - read
 *         - importance
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         receiver_id:
 *           type: integer
 *         related_event_id:
 *           type: integer
 *         read:
 *           type: boolean
 *         importance:
 *           type: integer
 *           description: 1 = normal, 2 = important, 3 = urgent
 */
const Message = sequelize.define(
  'message',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    related_event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id',
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    importance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
  },
);

const init = async () => {
  try {
    await Message.bulkCreate([
      {
        title: 'Hello',
        content: 'Hi, how are you?',
        receiver_id: 1,
        related_event_id: 1,
        read: false,
        importance: 1,
      },
    ]);
    console.log(
      'Entries have been successfully inserted into the message table',
    );
  } catch (error) {
    console.error('Error inserting entries into the message table:', error);
  }
};

module.exports = {Message, init};
