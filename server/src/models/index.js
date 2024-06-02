const {Gender, init: GenderInit} = require('./gender');
const {UserGroup, init: UserGroupInit} = require('./userGroup');
const {User, init: UserInit} = require('./user');
const {Event, init: EventInit} = require('./event');
const {EventTag, EventToTag, init: EventTagInit} = require('./eventTag');
const {
  EventParticipant,
  EventToParticipant,
  init: EventParticipantInit,
} = require('./eventParticipant');
const {
  EventToAudience,
  init: EventToAudienceInit,
} = require('./eventToAudience');
const {EventStatus, init: EventStatusInit} = require('./eventStatus');
const {Comment, init: CommentInit} = require('./comment');
const {UserToLike, init: UserToLikeInit} = require('./userToLike');
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
      through: 'event_to_audience',
    });
    Event.belongsToMany(User, {
      through: 'event_to_audience',
    });

    Event.belongsToMany(EventParticipant, {
      through: 'event_to_participant',
    });
    EventParticipant.belongsToMany(Event, {
      through: 'event_to_participant',
    });

    Event.hasMany(Comment, {
      foreignKey: 'event_id',
    });
    Comment.belongsTo(Event, {
      foreignKey: 'event_id',
    });
    User.hasMany(Comment, {
      foreignKey: 'user_id',
    });
    Comment.belongsTo(User, {
      foreignKey: 'user_id',
    });

    Event.belongsToMany(EventTag, {
      through: 'event_to_tag',
    });
    EventTag.belongsToMany(Event, {
      through: 'event_to_tag',
    });

    EventStatus.hasMany(Event);
    Event.belongsTo(EventStatus);

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

    User.belongsToMany(Comment, {
      through: 'user_to_like',
    });
    Comment.belongsToMany(User, {
      through: 'user_to_like',
    });
  } catch (error) {
    console.error('Error initializing tables:', error);
  }
};

const initializeModels = async () => {
  await Promise.all([GenderInit(), UserGroupInit(), EventStatusInit()]);
  await Promise.all([
    UserInit(),
    EventInit(),
    EventTagInit(),
    EventParticipantInit(),
    EventToAudienceInit(),
    MessageInit(),
    CommentInit(),
    UserToLikeInit(),
  ]);

  // const user1 = await User.findByPk(1);
  // const user2 = await User.findByPk(2);
  // const event = await Event.findByPk(1);
  // await event.addAudience([user1, user2]);
};

module.exports = {
  initializeTables,
  initializeModels,
  Gender,
  UserGroup,
  User,
  Event,
  EventTag,
  EventToTag,
  EventParticipant,
  EventToParticipant,
  EventToAudience,
  EventStatus,
  Comment,
  UserToLike,
  Message,
};
