const {Gender, init: GenderInit} = require('./gender');
const {UserGroup, init: UserGroupInit} = require('./userGroup');
const {User, init: UserInit} = require('./user');
const {Event, init: EventInit} = require('./event');
const {EventTag, init: EventTagInit} = require('./eventTag');
const {
  EventParticipant,
  init: EventParticipantInit,
} = require('./eventParticipant');
const {Location, init: LocationInit} = require('./location');
const {LocationStatus, init: LocationStatusInit} = require('./locationStatus');
const {Message, init: MessageInit} = require('./message');

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

    Gender.hasMany(User, {
      foreignKey: 'gender',
      as: 'gender_id',
    });
    User.belongsTo(Gender, {
      foreignKey: 'gender',
      as: 'gender_id',
    });

    User.belongsToMany(Event, {
      foreignKey: 'audience',
      through: 'event_audience',
      as: 'event_history',
    });
    Event.belongsToMany(User, {
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

    User.hasMany(Message, {
      foreignKey: 'sender',
      as: 'sender_id',
    });
    Message.belongsTo(User, {
      foreignKey: 'sender',
      as: 'sender_id',
    });

    User.hasMany(Message, {
      foreignKey: 'receiver',
      as: 'receiver_id',
    });
    Message.belongsTo(User, {
      foreignKey: 'receiver',
      as: 'receiver_id',
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
    EventTagInit(),
    EventParticipantInit(),
  ]);
  await Promise.all([UserInit(), EventInit(), LocationInit(), MessageInit()]);

  const user1 = await User.findByPk(1);
  const user2 = await User.findByPk(2);
  const event = await Event.findByPk(1);
  await event.addAudience([user1, user2]);
};

module.exports = {
  initializeTables,
  initializeModels,
  Gender,
  UserGroup,
  User,
  Event,
  EventTag,
  Location,
  LocationStatus,
  Message,
};
