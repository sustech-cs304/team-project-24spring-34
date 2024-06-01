const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const getResponse = require('../models/response');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Invalid or missing Authorization header');
    return res
      .status(401)
      .json({auth: false, message: 'No authorization header.'});
  }

  const token = authHeader.slice(7);
  if (!token) {
    return res.status(403).send({auth: false, message: 'No token provided.'});
  }

  try {
    const decoded = jwt.verify(token, '42');
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res
      .status(500)
      .json(getResponse(500, {title: 'Failed to authenticate token.'}));
  }
}

/**
 * @swagger
 * components:
 *   parameters:
 *     path_username:
 *       name: username
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *         pattern: ^[a-zA-Z0-9]+$
 *         maxLength: 15
 *     path_event_id:
 *       name: event_id
 *       in: path
 *       required: true
 *       schema:
 *         type: integer
 *         minimum: 1
 *     path_location_id:
 *       name: location_id
 *       in: path
 *       required: true
 *       schema:
 *         type: integer
 *         minimum: 1
 *     path_tag_id:
 *       name: tag_id
 *       in: path
 *       required: true
 *       schema:
 *         type: integer
 *         minimum: 1
 *     path_comment_id:
 *       name: comment_id
 *       in: path
 *       required: true
 *       schema:
 *         type: integer
 *         minimum: 1
 *     query_limit:
 *       name: limit
 *       in: query
 *       required: false
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 100
 *         default: 10
 *     query_offset:
 *       name: offset
 *       in: query
 *       required: false
 *       schema:
 *         type: integer
 *         minimum: 0
 *         default: 0
 *     query_desc:
 *       name: desc
 *       in: query
 *       required: false
 *       schema:
 *         type: boolean
 *         default: true
 *     query_event_status:
 *       name: event_status
 *       in: query
 *       required: false
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 6
 *         default: 1
 *     query_event_tag_list:
 *       name: event_tag_list
 *       in: query
 *       required: false
 *       schema:
 *         type: array
 *         items:
 *           type: integer
 *           minimum: 1
 *           uniqueItems: true
 *         style: form
 *         explode: false
 *         default: []
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
router.use((req, res, next) => {
  if (
    (req.path === '/users' && req.method === 'POST') ||
    (req.path === '/sessions' && req.method === 'POST') ||
    (req.path === '/locations' && req.method === 'GET') ||
    (req.path.startsWith('/events') && req.method === 'GET')
  ) {
    next();
  } else {
    verifyToken(req, res, next);
  }
});

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operations about users
 *   - name: Events
 *     description: Operations about events
 *   - name: Comments
 *     description: Operations about comments
 *   - name: Locations
 *     description: Operations about locations
 */
const usersRoutes = require('./users');
router.use(usersRoutes);
const eventsRoutes = require('./events');
router.use(eventsRoutes);
const commentsRoutes = require('./comments');
router.use(commentsRoutes);
const locationsRoutes = require('./locations');
router.use(locationsRoutes);

module.exports = router;
