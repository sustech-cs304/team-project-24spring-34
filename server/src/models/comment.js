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
 *         - user
 *         - event
 *         - likes
 *         - dislikes
 *         - rating
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *           description: The auto-generated id of the comment
 *         content:
 *           type: string
 *           description: The content of the comment
 *         user:
 *           $ref: '#/components/schemas/User'
 *         event:
 *           $ref: '#/components/schemas/Event'
 *         likes:
 *           type: integer
 *           default: 0
 *         dislikes:
 *           type: integer
 *           default: 0
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
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Comment;
