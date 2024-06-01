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
 *         - time
 *         - sender
 *         - receiver
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         time:
 *           type: string
 *           format: date-time
 *         sender:
 *           $ref: '#/components/schemas/User'
 *         receiver:
 *           $ref: '#/components/schemas/User'
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
    time: {
      type: DataTypes.DATE,
      allowNull: false,
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
        time: new Date(),
        sender: 1,
        receiver: 2,
      },
      {
        title: 'Goodbye',
        content: 'See you later',
        time: new Date(),
        sender: 2,
        receiver: 1,
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
