const express = require('express');
const router = express.Router();

const {
  Event,
  EventTag,
  EventToTag,
  EventParticipant,
  EventToParticipant,
  EventToAudience,
  User,
  Comment,
} = require('../models');
const getResponse = require('../models/response');
const jwt = require('jsonwebtoken');

function getUidFromJwt(req) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Invalid or missing Authorization header');
      return null;
    }

    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, '42');
    return decoded.id;
  } catch (error) {
    console.log('Invalid token:', error);
    return null;
  }
}

/**
 * @swagger
 * /events:
 *   post:
 *     tags:
 *       - Events
 *     summary: Create an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - title
 *               - description
 *               - poster
 *               - publish_organization
 *               - participants
 *               - start_time
 *               - end_time
 *               - location
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               poster:
 *                 type: string
 *                 description: The URL of the event's poster
 *               publish_organization:
 *                 type: string
 *                 description: The organization that published the event
 *               participants:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/EventParticipant'
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               end_time:
 *                 type: string
 *                 format: date-time
 *               tags:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/EventTag'
 *               status:
 *                 $ref: '#/components/schemas/EventStatus'
 *               location:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Event created successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *     security: []
 *   get:
 *     tags:
 *       - Events
 *     summary: Get a list of all events
 *     responses:
 *       '200':
 *         description: Event list found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       '500':
 *         $ref: '#/components/responses/500'
 */
router.post('/events', async (req, res) => {
  try {
    const uid = getUidFromJwt(req);
    if (!uid || User.findOne({where: {id: uid}}).user_group === 1) {
      res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
      return;
    }
    const {
      title,
      description,
      poster,
      publish_organization,
      participants,
      start_time,
      end_time,
      tags,
      status,
      location,
      capacity,
    } = req.body;
    for (let i = 0; i < tags.length; i++) {
      const tag = await EventTag.findOne({where: {id: tags[i]}});
      if (!tag) {
        res
          .status(400)
          .json(getResponse(400, {description: 'Invalid tag id: ' + tags[i]}));
        return;
      }
    }
    for (let i = 0; i < participants.length; i++) {
      const participant = await EventParticipant.findOne({
        where: {
          name: participants[i].name,
          description: participants[i].description,
          avatar: participants[i].avatar,
        },
      });
      if (!participant) {
        await EventParticipant.bulkCreate([participants[i]]);
      }
    }
    const new_event = await Event.create({
      title,
      description,
      poster,
      uid,
      publish_organization,
      start_time,
      end_time,
      status,
      location,
      capacity,
    });
    for (let i = 0; i < tags.length; i++) {
      await EventToTag.create({event_id: new_event.id, tag_id: tags[i]});
    }
    for (let i = 0; i < participants.length; i++) {
      const participant = await EventParticipant.findOne({
        where: {
          name: participants[i].name,
          description: participants[i].description,
          avatar: participants[i].avatar,
        },
      });
      await EventToParticipant.create({
        event_id: new_event.id,
        participant_id: participant.id,
      });
    }
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(getResponse(500, {description: 'Internal server error'}));
  }
});
router.get('/events', async (req, res) => {
  const eventList = await Event.findAll();
  for (let i = 0; i < eventList.length; i++) {
    const event_to_tag = await EventToTag.findAll({
      where: {event_id: eventList[i].id},
    });
    let tags = [];
    for (let j = 0; j < event_to_tag.length; j++) {
      const tag = await EventTag.findOne({where: {id: event_to_tag[j].tag_id}});
      tags.push(tag);
    }
    const event_to_audience = await EventToAudience.findAll({
      where: {event_id: eventList[i].id},
    });
    const audience_cnt = event_to_audience.length;
    const remaining_capacity = eventList[i].capacity - audience_cnt;
    const event_comments = await Comment.findAll({
      where: {event_id: eventList[i].id},
    });
    const rating_num = event_comments.length;
    const rating =
      event_comments.reduce((acc, comment) => acc + comment.rating, 0) /
      rating_num /
      2; // convert from 1-10 to 0.5-5
    eventList[i] = {
      ...eventList[i].dataValues,
      remaining_capacity,
      tags,
      rating_num,
      rating,
    };
  }
  res.json(eventList);
});

/**
 * @swagger
 * /events/{event_id}:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get an event by id
 *     parameters:
 *       - $ref: '#/components/parameters/path_event_id'
 *     responses:
 *       '200':
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '404':
 *         $ref: '#/components/responses/404'
 */
router.get('/events/:event_id', async (req, res) => {
  const event = await Event.findOne({where: {id: req.params.event_id}});
  const event_to_tag = await EventToTag.findAll({
    where: {event_id: req.params.event_id},
  });
  let tags = [];
  for (let i = 0; i < event_to_tag.length; i++) {
    const tag = await EventTag.findOne({where: {id: event_to_tag[i].tag_id}});
    tags.push(tag);
  }
  const event_to_audience = await EventToAudience.findAll({
    where: {event_id: req.params.event_id},
  });
  const audience_cnt = event_to_audience.length;
  const event_to_participant = await EventToParticipant.findAll({
    where: {event_id: req.params.event_id},
  });
  let participants = [];
  for (let i = 0; i < event_to_participant.length; i++) {
    const participant = await EventParticipant.findOne({
      where: {id: event_to_participant[i].participant_id},
    });
    participants.push(participant);
  }
  const remaining_capacity = event.capacity - audience_cnt;
  const event_comments = await Comment.findAll({
    where: {event_id: req.params.event_id},
  });
  const rating_num = event_comments.length;
  const rating =
    event_comments.reduce((acc, comment) => acc + comment.rating, 0) /
    rating_num /
    2; // convert from 1-10 to 0.5-5
  if (event) {
    res.json({
      ...event.dataValues,
      participants,
      remaining_capacity,
      tags,
      rating_num,
      rating,
    });
  } else {
    res.status(404).json(getResponse(404, {description: 'Event not found'}));
  }
});

/**
 * @swagger
 * /events-tags:
 *   post:
 *     tags:
 *       - Events
 *     summary: Create a new event tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - tag_name
 *             properties:
 *               tag_name:
 *                 type: string
 *                 description: The name of the tag
 *                 example: Music
 *                 minLength: 1
 *                 maxLength: 50
 *                 pattern: ^[a-zA-Z]+$
 *     responses:
 *       '201':
 *         description: Event tag created successfully
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '429':
 *         $ref: '#/components/responses/429'
 *       '500':
 *         $ref: '#/components/responses/500'
 *   get:
 *     tags:
 *       - Events
 *     summary: Get all event tags
 *     responses:
 *       '200':
 *         description: Event tag list found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '500':
 *         $ref: '#/components/responses/500'
 */
router.post('/events-tags', async (req, res) => {
  try {
    const uid = getUidFromJwt(req);
    if (!uid || User.findOne({where: {id: uid}}).user_group === 1) {
      res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
      return;
    }
    const new_tag_name = req.body.tag_name;
    console.log(new_tag_name);
    const eventTag = await EventTag.findOne({where: {name: new_tag_name}});
    if (eventTag) {
      res
        .status(429)
        .json(getResponse(429, {description: 'Tag already exists'}));
      return;
    }
    await EventTag.create({name: new_tag_name});
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(getResponse(500, {description: 'Internal server error'}));
  }
});
router.get('/events-tags', async (req, res) => {
  const tagList = await EventTag.findAll();
  res.json(tagList);
});

/**
 * @swagger
 * /event-reservations/{event_id}:
 *   post:
 *     tags:
 *       - Events
 *     summary: Reserve a spot for an event
 *     parameters:
 *       - $ref: '#/components/parameters/path_event_id'
 *     responses:
 *       '201':
 *         description: Reservation successful
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '404':
 *         $ref: '#/components/responses/404'
 *       '500':
 *         $ref: '#/components/responses/500'
 */
router.post('/event-reservations/:event_id', async (req, res) => {
  const uid = getUidFromJwt(req);
  if (!uid) {
    res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
    return;
  }
  const target_event = await Event.findOne({where: {id: req.params.event_id}});
  if (!target_event) {
    res.status(404).json(getResponse(404, {description: 'Event not found'}));
    return;
  }

  const event_to_audience = await EventToAudience.findOne({
    where: {event_id: req.params.event_id, audience_id: uid},
  });
  if (event_to_audience) {
    res
      .status(429)
      .json(getResponse(429, {description: 'Already reserved for this event'}));
    return;
  }

  await EventToAudience.create({
    event_id: req.params.event_id,
    audience_id: uid,
  });
  res.status(201).send();
});

module.exports = router;
