const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const signToken = require('./');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const {User, Message} = require('../models');
const getResponse = require('../models/response');

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 pattern: ^[a-zA-Z0-9]+$
 *                 maxLength: 15
 *               password:
 *                 type: string
 *                 pattern: ^[a-zA-Z0-9]+$
 *                 maxLength: 32
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '429':
 *         $ref: '#/components/responses/429'
 *     security: []
 */
router.post('/users', async (req, res) => {
  try {
    //if exists
    let user = await User.findOne({where: {username: req.body.username}});
    if (user) {
      res
        .status(429)
        .json(getResponse(429, {description: 'Username already exists'}));
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log('hashedPassword:', hashedPassword);
    user = await User.create({
      username: req.body.username,
      userGroup: 1,
      password: hashedPassword,
    });
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(getResponse(500, {description: 'Internal server error'}));
  }
});

/**
 * @swagger
 * /sessions:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 pattern: ^[a-zA-Z0-9]+$
 *                 maxLength: 15
 *               password:
 *                 type: string
 *                 pattern: ^[a-zA-Z0-9]+$
 *                 maxLength: 32
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: false
 *               properties:
 *                 token:
 *                   type: string
 *                 expires:
 *                   type: string
 *                   format: date-time
 *       '401':
 *         $ref: '#/components/responses/401'
 *     security: []
 *   delete:
 *     tags:
 *       - Users
 *     summary: Logout a user
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '401':
 *         $ref: '#/components/responses/401'
 */
router.post('/sessions', async (req, res) => {
  const user = await User.findOne({where: {username: req.body.username}});
  if (!user) {
    res.status(404).json(getResponse(404, {description: 'User not found'}));
    return;
  }
  if (await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({id: user.id}, '42', {expiresIn: 86400});
    res.json({token});
  } else {
    res
      .status(400)
      .json(getResponse(400, {description: 'Invalid username or password'}));
  }
});
router.delete('/sessions', (req, res) => {
  //TODO: Implement logout
  res.send();
});

/**
 * @swagger
 * /users/{username}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a user by username
 *     parameters:
 *       - $ref: '#/components/parameters/path_username'
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         $ref: '#/components/responses/404'
 */
router.get('/users/:username', async (req, res) => {
  const user = await User.findOne({where: {username: req.params.username}});
  if (user) {
    res.json(user);
  } else {
    res.status(404).json(getResponse(404, {description: 'User not found'}));
  }
});

/**
 * @swagger
 * /me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get the current user by token
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         $ref: '#/components/responses/401'
 *   put:
 *     tags:
 *       - Users
 *     summary: Edit the current user's info
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User info updated successfully
 *       '401':
 *         $ref: '#/components/responses/401'
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete the current user
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         $ref: '#/components/responses/401'
 */
router.get('/me', async (req, res) => {
  const userId = getUidFromJwt(req);
  if (!userId) {
    res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
    return;
  }
  const user = await User.findOne({where: {id: userId}});
  if (user) {
    res.json(user);
  } else {
    res.status(404).json(getResponse(404, {description: 'User not found'}));
  }
});
router.put('/me', async (req, res) => {
  try {
    await User.update(req.body, {where: {id: req.userId}});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(getResponse(500, {description: 'Internal server error'}));
    return;
  }
  res.send();
});
router.delete('/me', async (req, res) => {
  await User.destroy({where: {id: req.userId}});
  res.send();
});

/**
 * @swagger
 * /messages:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get messages sent to the current user
 *     responses:
 *       '200':
 *         description: Messages found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       '401':
 *         $ref: '#/components/responses/401'
 */
router.get('/messages', async (req, res) => {
  const userId = getUidFromJwt(req);
  if (!userId) {
    res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
    return;
  }
  const messages = await Message.findAll({where: {receiver: userId}});
  for (const message of messages) {
    message.sender = await User.findOne({where: {id: message.sender}});
    message.receiver = await User.findOne({where: {id: message.receiver}});
  }
  res.json(messages);
});

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

module.exports = router;
