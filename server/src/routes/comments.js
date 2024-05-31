const express = require('express');
const router = express.Router();

const {Comment, User, Event} = require('../models');
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
 * /comments/{event_id}:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Create a comment
 *     parameters:
 *       - $ref: '#/components/parameters/path_event_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - content
 *               - rating
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *                 minLength: 1
 *                 maxLength: 500
 *               rating:
 *                 type: integer
 *                 description: The rating of the event
 *                 minimum: 1
 *                 maximum: 10
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '500':
 *         $ref: '#/components/responses/500'
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get all comments of an event
 *     parameters:
 *       - $ref: '#/components/parameters/path_event_id'
 *       - $ref: '#/components/parameters/query_limit'
 *       - $ref: '#/components/parameters/query_offset'
 *     responses:
 *       '200':
 *         description: Comments found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: The total number of comments
 *       '404':
 *         $ref: '#/components/responses/404'
 *         description: Event not found
 *       '500':
 *         $ref: '#/components/responses/500'
 */
router.post('/comments/:event_id', async (req, res) => {
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

  const comment = await Comment.create({
    content: req.body.content,
    user: User.findOne({where: {id: uid}}),
    event: target_event,
    likes: 0,
    dislikes: 0,
    rating: req.body.rating,
  });

  res.status(201).json(comment);
});
router.get('/comments/:event_id', async (req, res) => {
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
  let comments = await Comment.findAll({
    where: {event_id: req.params.event_id},
  });
  const total = comments.length;
  comments = comments.slice(
    req.query.offset,
    req.query.offset + req.query.limit,
  );

  res.json({comments, total});
});

module.exports = router;
