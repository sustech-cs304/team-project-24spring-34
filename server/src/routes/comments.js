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
 *       '204':
 *         description: Comment updated successfully
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
  try {
    const uid = getUidFromJwt(req);
    if (!uid) {
      res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
      return;
    }
    const target_event = await Event.findOne({
      where: {id: req.params.event_id},
    });
    if (!target_event) {
      res.status(404).json(getResponse(404, {description: 'Event not found'}));
      return;
    }
    const maybe_comment = await Comment.findOne({
      where: {user_id: uid, event_id: req.params.event_id},
    });
    if (maybe_comment) {
      // One user could only comment once for an event
      // If an old comment exists, update it
      await maybe_comment.update({
        content: req.body.content,
        likes: 0,
        dislikes: 0,
        rating: req.body.rating,
      });
      res.status(204).send();
    } else {
      const comment = await Comment.create({
        content: req.body.content,
        user_id: uid,
        event_id: req.params.event_id,
        likes: 0,
        dislikes: 0,
        rating: req.body.rating,
      });
      res.status(201).json(comment);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(getResponse(500, {description: 'Server error'}));
  }
});
router.get('/comments/:event_id', async (req, res) => {
  try {
    const uid = getUidFromJwt(req);
    console.log(uid);
    if (!uid) {
      res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
      return;
    }
    const target_event = await Event.findOne({
      where: {id: req.params.event_id},
    });
    if (!target_event) {
      res.status(404).json(getResponse(404, {description: 'Event not found'}));
      return;
    }
    let comments = await Comment.findAll({
      where: {event_id: req.params.event_id},
    });
    const total = comments.length;
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;
    if (offset > total) {
      res.status(404).json(getResponse(404, {description: 'No more comments'}));
      return;
    }
    comments = comments.slice(
      offset,
      offset + limit > total ? total : offset + limit,
    );
    res.json({comments, total});
  } catch (error) {
    console.error(error);
    res.status(500).json(getResponse(500, {description: 'Server error'}));
  }
});

/**
 * @swagger
 * /comments/{comment_id}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete a comment - A user could delete only his/her own comment, while an admin could delete any comment
 *     parameters:
 *       - $ref: '#/components/parameters/path_comment_id'
 *     responses:
 *       '204':
 *         description: Comment deleted successfully
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '403':
 *         $ref: '#/components/responses/403'
 *       '404':
 *         $ref: '#/components/responses/404'
 *       '500':
 *         $ref: '#/components/responses/500'
 */
router.delete('/comments/:comment_id', async (req, res) => {
  const uid = getUidFromJwt(req);
  if (!uid) {
    res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
    return;
  }
  const comment = await Comment.findOne({where: {id: req.params.comment_id}});
  if (!comment) {
    res.status(404).json(getResponse(404, {description: 'Comment not found'}));
    return;
  }
  const curr_user = await User.findOne({where: {id: uid}});
  if (curr_user.user_group !== 3 && comment.user_id !== uid) {
    res.status(403).json(getResponse(403, {description: 'Forbidden'}));
    return;
  }
  await comment.destroy();
  res.status(204).send();
});

module.exports = router;
