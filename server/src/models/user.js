const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - username
 *         - nickname
 *         - user_group
 *         - avatar
 *         - user_intro
 *         - user_email
 *         - gender
 *         - birthday
 *         - event_history
 *         - following
 *         - followers
 *         - published_events
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *           readOnly: true
 *         username:
 *           type: string
 *           description: The username of the user
 *         nickname:
 *           type: string
 *         user_group:
 *           $ref: '#/components/schemas/UserGroup'
 *         avatar:
 *           type: string
 *           description: The URL of the user's avatar
 *         user_intro:
 *           type: string
 *         user_email:
 *           type: string
 *           format: email
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
const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      description: 'The auto-generated id of the user',
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      description: 'The username of the user',
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      description: "The URL of the user's avatar",
    },
    user_intro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);

const init = async () => {
  try {
    await User.bulkCreate([
      {
        username: 'admin',
        nickname: 'admin',
        user_group: 3,
        avatar: 'https://example.com/avatar.jpg',
        user_intro: 'I am the admin',
        user_email: 'admin@test.com',
        password:
          '$2b$10$g2qCa31srEy2kvTRmW5G3.HFrUqLu7WOpAsMZEwO9FZNgOzFgpzYW',
        birthday: '1990-01-01',
      },
      {
        username: 'user1',
        nickname: 'user1',
        user_group: 1,
        avatar: 'https://example.com/avatar.jpg',
        user_intro: 'I am user1',
        user_email: 'user1@test.com',
        password:
          '5906ac361a137e2d286465cd6588ebb5ac3f5ae955001100bc41577c3d751764',
        birthday: '1992-01-01',
      },
    ]);
    console.log('Entries have been successfully inserted into the user table');
  } catch (error) {
    console.error('Error inserting entries into the user table:', error);
  }
};

module.exports = {User, init};
