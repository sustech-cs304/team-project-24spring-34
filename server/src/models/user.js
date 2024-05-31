const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *      User:
 *        type: object
 *        additionalProperties: false
 *        required:
 *          - username
 *          - nickname
 *          - user_group
 *          - avatar
 *          - user_intro
 *          - user_email
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the user
 *            readOnly: true
 *          username:
 *            type: string
 *            description: The username of the user
 *          nickname:
 *            type: string
 *          user_group:
 *            $ref: '#/components/schemas/UserGroup'
 *          avatar:
 *            type: string
 *            description: The URL of the user's avatar
 *          user_intro:
 *            type: string
 *          user_email:
 *            type: string
 *            format: email
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
      },
      {
        username: 'user1',
        nickname: 'user1',
        user_group: 1,
        avatar: 'https://example.com/avatar.jpg',
        user_intro: 'I am user1',
        user_email: 'user1@test.com',
      },
    ]);
    console.log('Entries have been successfully inserted into the user table');
  } catch (error) {
    console.error('Error inserting entries into the user table:', error);
  }
};

module.exports = {User, init};
