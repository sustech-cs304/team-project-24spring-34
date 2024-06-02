const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - id
 *         - content
 *         - user_id
 *         - event_id
 *         - rating
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *           description: The auto-generated id of the comment
 *         content:
 *           type: string
 *           description: The content of the comment
 *         user_id:
 *           type: integer
 *           description: The id of the user who created the comment
 *         event_id:
 *           type: integer
 *         rating:
 *           type: integer
 */
const Comment = sequelize.define(
  'comments',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id',
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    uniqueKeys: {
      unique_tag: {
        fields: ['user_id', 'event_id'],
      },
    },
    timestamps: true,
  },
);

const init = async () => {
  try {
    await Comment.bulkCreate([
      {
        content: 'This is a comment',
        user_id: 2,
        event_id: 1,
        rating: 5,
      },
      {
        content: 'This is another comment',
        user_id: 2,
        event_id: 2,
        rating: 5,
      },
      {
        content: 'This is yet another comment',
        user_id: 2,
        event_id: 3,
        rating: 5,
      },
    ]);
    console.log(
      'Entries have been successfully inserted into the comment table',
    );
  } catch (err) {
    console.error('Error inserting entries into the comment table:', err);
  }
};

module.exports = {Comment, init};
