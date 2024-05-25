const express = require('express');
const router = express.Router();
const app = express();
const jwt = require('jsonwebtoken');
const getResponse = require('../models/response');
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
// router.use('/events', require('./events'));
// router.use('/comments', require('./comments'));
// router.use('/locations', require('./locations'));

module.exports = router;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
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

app.all('*', verifyToken);

app.all('/users', (req, res, next) => {
  next();
});

app.all('/sessions', (req, res, next) => {
  next();
});
