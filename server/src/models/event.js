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
 *         - publish_organization
 *         - participants
 *         - time
 *         - location
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
 *         organizer_id:
 *           type: integer
 *         publish_organization:
 *           type: string
 *         start_time:
 *           type: string
 *           format: date-time
 *         end_time:
 *           type: string
 *           format: date-time
 *         status:
 *           type: integer
 *         location:
 *           type: string
 *         capacity:
 *           type: integer
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
    organizer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    publish_organization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'event_statuses',
        key: 'id',
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
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
        title: 'Event 1',
        description: 'This is event 1',
        poster: 'https://www.google.com',
        organizer_id: 1,
        publish_organization: 'organization1',
        start_time: new Date('2024-10-10T10:00:00.000Z'),
        end_time: new Date('2024-10-10T12:00:00.000Z'),
        status: 1,
        location: 'location1',
        capacity: 100,
      },
      {
        title: 'Event 2',
        description: 'This is event 2',
        poster: 'https://www.google.com',
        organizer_id: 1,
        publish_organization: 'organization2',
        start_time: new Date('2024-10-11T10:00:00.000Z'),
        end_time: new Date('2024-10-11T12:00:00.000Z'),
        status: 1,
        location: 'location2',
        capacity: 100,
      },
      {
        title: 'Event 3',
        description: 'This is event 3',
        poster: 'https://www.google.com',
        organizer_id: 1,
        publish_organization: 'organization3',
        start_time: new Date('2024-10-10T10:30:00.000Z'),
        end_time: new Date('2024-10-10T12:50:00.000Z'),
        status: 1,
        location: 'location3',
        capacity: 100,
      },
    ]);
    console.log('Entries have been successfully inserted into the event table');
  } catch (error) {
    console.error('Error inserting entries into the event table:', error);
  }
};

module.exports = {Event, init};
