const {Gender, init: GenderInit} = require('./gender');
const {UserGroup, init: UserGroupInit} = require('./userGroup');
const {User, init: UserInit} = require('./user');
const {UserPrivacy, init: UserPrivacyInit} = require('./userPrivacy');
const {Event, init: EventInit} = require('./event');
const {
  EventParticipant,
  init: EventParticipantInit,
} = require('./eventParticipant');
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
      foreignKey: 'audience',
      through: 'event_audience',
      as: 'event_history',
    });
    Event.belongsToMany(UserPrivacy, {
      foreignKey: 'event',
      through: 'event_audience',
      as: 'audience',
    });

    Event.belongsToMany(EventParticipant, {
      foreignKey: 'event',
      through: 'event_participant',
      as: 'participants',
    });
    EventParticipant.belongsToMany(Event, {
      foreignKey: 'participant',
      through: 'event_participant',
      as: 'events',
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
  await Promise.all([
    GenderInit(),
    UserGroupInit(),
    LocationStatusInit(),
    EventParticipantInit(),
  ]);
  await Promise.all([
    UserInit(),
    UserPrivacyInit(),
    EventInit(),
    LocationInit(),
  ]);

  const user1 = await UserPrivacy.findByPk(1);
  const user2 = await UserPrivacy.findByPk(2);
  const event = await Event.findByPk(1);
  await event.addAudience([user1, user2]);
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
