const {Gender, init: GenderInit} = require('./gender');
const {UserGroup, init: UserGroupInit} = require('./userGroup');
const {User, init: UserInit} = require('./user');
const {UserPrivacy, init: UserPrivacyInit} = require('./userPrivacy');
const {Event, init: EventInit} = require('./event');
const {Location, init: LocationInit} = require('./location');
const {LocationStatus, init: LocationStatusInit} = require('./locationStatus');

const initializeTables = async () => {
  try {
    UserGroup.hasMany(User, {
      foreignKey: 'user_group_id',
      as: 'user_group',
    });
    User.belongsTo(UserGroup, {
      foreignKey: 'user_group_id',
      as: 'user_group',
    });

    Gender.hasMany(UserPrivacy, {
      foreignKey: 'gender_id',
      as: 'gender',
    });
    UserPrivacy.belongsTo(Gender, {
      foreignKey: 'gender_id',
      as: 'gender',
    });

    UserPrivacy.belongsToMany(Event, {
      foreignKey: 'participant',
      through: 'event_participant',
      as: 'event_history',
    });
    Event.belongsToMany(UserPrivacy, {
      foreignKey: 'event',
      through: 'event_participant',
      as: 'participant',
    });

    Location.belongsTo(LocationStatus, {
      foreignKey: 'status_id',
      as: 'status',
    });
    LocationStatus.hasMany(Location, {
      foreignKey: 'status_id',
      as: 'status',
    });
  } catch (error) {
    console.error('Error initializing tables:', error);
  }
};

const initializeModels = async () => {
  await Promise.all([GenderInit(), UserGroupInit()]);
  await Promise.all([UserInit(), UserPrivacyInit(), EventInit()]);
  await Promise.all([LocationInit(), LocationStatusInit()]);

  const user1 = await UserPrivacy.findByPk(1);
  const user2 = await UserPrivacy.findByPk(2);
  const event = await Event.findByPk(1);
  await event.addParticipant([user1, user2]);
  console.log('Participant number:', await event.countParticipant());
};

module.exports = {
  initializeTables,
  initializeModels,
  Gender,
  UserGroup,
  User,
  UserPrivacy,
  Event,
  Location,
  LocationStatus,
};
