const express = require('express');
const router = express.Router();

const {
  Event,
  EventTag,
  EventToTag,
  EventToAudience,
  Comment,
} = require('../models');
const getResponse = require('../models/response');

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
 *               - organizer
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
 *               organizer:
 *                 $ref: '#/components/schemas/User'
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
    const {
      title,
      description,
      poster,
      organizer,
      participants,
      start_time,
      end_time,
      tags,
      status,
      location,
      capacity,
    } = req.body;
    await Event.create({
      title,
      description,
      poster,
      organizer,
      participants,
      start_time,
      end_time,
      tags,
      status,
      location,
      capacity,
    });
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
 *                 unique: true
 *                 readOnly: true
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
    const {new_tag_name} = req.body;
    const eventTag = await EventTag.findOne({where: {tag_name: new_tag_name}});
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
  console.log('Getting tags');
  const tagList = await EventTag.findAll();
  res.json(tagList);
});

module.exports = router;
