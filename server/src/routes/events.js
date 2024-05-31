const express = require('express');
const router = express.Router();

const {Event} = require('../models');
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
 *               - tags
 *               - status
 *               - comments
 *               - ratings
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
 *               location:
 *                 $ref: '#/components/schemas/Location'
 *               tags:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/EventTag'
 *               status:
 *                 $ref: '#/components/schemas/EventStatus'
 *               comments:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Comment'
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
 *     summary: Get a list of events according to status or tag
 *     parameters:
 *     - $ref: '#/components/parameters/query_event_status'
 *     - $ref: '#/components/parameters/query_event_tag_list'
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
      location,
      tags,
      status,
      comments,
      ratings,
    } = req.body;
    await Event.create({
      title,
      description,
      poster,
      organizer,
      participants,
      start_time,
      end_time,
      location,
      tags,
      status,
      comments,
      ratings,
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
  // TODO: Add query parameters to filter the event list
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
  if (event) {
    res.json(event);
  } else {
    res.status(404).json(getResponse(404, {description: 'Event not found'}));
  }
});

module.exports = router;
