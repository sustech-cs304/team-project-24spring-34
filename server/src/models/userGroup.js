const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserGroup:
 *       enum:
 *         - 1
 *         - 2
 *         - 3
 *       type: integer
 *       description: >-
 *         1 = Audience, 2 = Organizer, 3 = Admin
 */

const UserGroup = sequelize.define('user_groups', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: DataTypes.ENUM('Audience', 'Organizer', 'Admin'),
    allowNull: false,
  },
});

const init = async () => {
  try {
    await UserGroup.bulkCreate([
      {id: 1, value: 'Audience'},
      {id: 2, value: 'Organizer'},
      {id: 3, value: 'Admin'},
    ]);
    console.log(
      'Entries have been successfully inserted into the user_group table',
    );
  } catch (error) {
    console.error('Error inserting entries into the user_group table:', error);
  }
};

module.exports = {UserGroup, init};
