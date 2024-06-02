const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserToLike:
 *       type: object
 *       additionalProperties: false
 *       required:
 *         - id
 *         - user_id
 *         - comment_id
 *         - like
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *           description: The auto-generated id of the userToLike
 *         user_id:
 *           type: integer
 *           description: The id of the user who liked or disliked the comment
 *           readOnly: true
 *         comment_id:
 *           type: integer
 *           description: The id of the comment that the user liked or disliked
 *           readOnly: true
 *         like:
 *           type: boolean
 *           description: Whether the user liked the comment
 */
const UserToLike = sequelize.define(
  'user_to_like',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'comments',
        key: 'id',
      },
    },
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    uniqueKeys: {
      unique_user_comment: {
        fields: ['user_id', 'comment_id'],
      },
    },
  },
);

const init = async () => {
  try {
    await UserToLike.bulkCreate([
      {
        user_id: 1,
        comment_id: 1,
        like: true,
      },
    ]);
    console.log(
      'Entries have been successfully inserted into the user_to_like table',
    );
  } catch (error) {
    console.error('Error initializing UserToLike:', error);
  }
};

module.exports = {UserToLike, init};
