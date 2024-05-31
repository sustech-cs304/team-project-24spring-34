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
      foreignKey: 'user_group',
      as: 'user_group_id',
    });
    User.belongsTo(UserGroup, {
      foreignKey: 'user_group',
      as: 'user_group_id',
    });

    Gender.hasMany(UserPrivacy, {
      foreignKey: 'gender',
      as: 'gender_id',
    });
    UserPrivacy.belongsTo(Gender, {
      foreignKey: 'gender',
      as: 'gender_id',
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

    LocationStatus.hasMany(Location, {
      foreignKey: 'status',
      as: 'status_id',
    });
    Location.belongsTo(LocationStatus, {
      foreignKey: 'status',
      as: 'status_id',
    });
  } catch (error) {
    console.error('Error initializing tables:', error);
  }
};

const initializeModels = async () => {
  await Promise.all([GenderInit(), UserGroupInit(), LocationStatusInit()]);
  await Promise.all([
    UserInit(),
    UserPrivacyInit(),
    EventInit(),
    LocationInit(),
  ]);

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
