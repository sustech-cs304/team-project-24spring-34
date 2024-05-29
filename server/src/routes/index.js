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
const locationsRoutes = require('./locations');
router.use(locationsRoutes);
const eventsRoutes = require('./events');
router.use(eventsRoutes);
// router.use('/events', require('./events'));
// router.use('/comments', require('./comments'));
// router.use('/locations', require('./locations'));

module.exports = router;
