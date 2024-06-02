const {DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

/**
 * @swagger
 * components:
 *   schemas:
 *     EventStatus:
 *       enum:
 *         - 1
 *         - 2
 *         - 3
 *         - 4
 *         - 5
 *         - 6
 *       type: integer
 *       description: >-
 *         1 = Draft,2 = Reviewing, 3 = Published, 4 = Ongoing, 5 = Finished, 6 = Cancelled
 */
const EventStatus = sequelize.define('event_statuses', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: DataTypes.ENUM(
      'Draft',
      'Reviewing',
      'Published',
      'Ongoing',
      'Finished',
      'Cancelled',
    ),
    allowNull: false,
  },
});

const init = async () => {
  try {
    await EventStatus.bulkCreate([
      {id: 1, value: 'Draft'},
      {id: 2, value: 'Reviewing'},
      {id: 3, value: 'Published'},
      {id: 4, value: 'Ongoing'},
      {id: 5, value: 'Finished'},
      {id: 6, value: 'Cancelled'},
    ]);
    console.log(
      'Entries have been successfully inserted into the event_status table',
    );
  } catch (error) {
    console.error(
      'Error inserting entries into the event_status table:',
      error,
    );
  }
};

module.exports = {EventStatus, init};
