const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - id
 *         - title
 *         - description
 *         - poster
 *         - organizer
 *         - participants
 *         - time
 *         - location
 *         - tags
 *         - status
 *         - comments
 *         - ratings
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         poster:
 *           type: string
 *           description: The URL of the event's poster
 *         organizer:
 *           $ref: '#/components/schemas/User'
 *         participants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/EventParticipant'
 *         start_time:
 *           type: string
 *           format: date-time
 *         end_time:
 *           type: string
 *           format: date-time
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/EventTag'
 *         status:
 *           $ref: '#/components/schemas/EventStatus'
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 */
const Event = sequelize.define(
  'event',
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
      description: "The URL of the event's poster",
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
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
    await Event.bulkCreate([
      {
        id: 1,
        title: 'Event 1',
        description: 'This is event 1',
        poster: 'https://www.google.com',
        startTime: new Date('2024-10-10T10:00:00.000Z'),
        endTime: new Date('2024-10-10T12:00:00.000Z'),
      },
      {
        id: 2,
        title: 'Event 2',
        description: 'This is event 2',
        poster: 'https://www.google.com',
        startTime: new Date('2024-10-11T10:00:00.000Z'),
        endTime: new Date('2024-10-11T12:00:00.000Z'),
      },
      {
        id: 3,
        title: 'Event 3',
        description: 'This is event 3',
        poster: 'https://www.google.com',
        startTime: new Date('2024-10-10T10:30:00.000Z'),
        endTime: new Date('2024-10-10T12:50:00.000Z'),
      },
    ]);
    console.log('Entries have been successfully inserted into the event table');
  } catch (error) {
    console.error('Error inserting entries into the event table:', error);
  }
};

module.exports = {Event, init};
