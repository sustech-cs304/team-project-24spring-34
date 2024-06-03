const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const {Op} = require('sequelize');
const saltRounds = 10;
const {User, Event, Message, EventToAudience} = require('../models');
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
 *               - user_email
 *             properties:
 *               username:
 *                 type: string
 *                 pattern: ^[a-zA-Z0-9]+$
 *                 maxLength: 15
 *               password:
 *                 type: string
 *                 pattern: ^[a-zA-Z0-9]+$
 *                 maxLength: 32
 *               user_email:
 *                 type: string
 *                 format: email
 *     responses:
 *       '200':
 *         description: User created successfully
 *       '429':
 *         $ref: '#/components/responses/429'
 *     security: []
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a list of users
 *     description: Only public information of users are returned
 *     parameters:
 *       - $ref: '#/components/parameters/query_limit'
 *       - $ref: '#/components/parameters/query_offset'
 *     responses:
 *       '200':
 *         description: Users found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '404':
 *         $ref: '#/components/responses/404'
 */
router.post('/users', async (req, res) => {
  try {
    let user = await User.findOne({where: {username: req.body.username}});
    if (user) {
      res
        .status(429)
        .json(getResponse(429, {description: 'Username already exists'}));
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    user = await User.create({
      username: req.body.username,
      userGroup: 1,
      password: hashedPassword,
      user_email: req.body.user_email,
    });
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(getResponse(500, {description: 'Internal server error'}));
  }
});
router.get('/users', async (req, res) => {
  try {
    const uid = getUidFromJwt(req);
    if (!uid) {
      res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
      return;
    }
    const user = await User.findOne({where: {id: uid}});
    if (user.user_group !== 3) {
      res.status(403).json(getResponse(403, {description: 'Forbidden'}));
      return;
    }
    let users = await User.findAll({attributes: {exclude: ['password']}});
    const total = await users.length;
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;
    if (offset >= total) {
      res.status(404).json(getResponse(404, {description: 'No more users'}));
      return;
    }
    users = users.slice(offset, offset + limit);
    res.json({users, total});
  } catch (error) {
    console.error(error);
    res.status(500).json(getResponse(500));
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
  try {
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
  } catch (error) {
    res.status(500).json(getResponse(500));
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
 *   put:
 *     tags:
 *       - Users
 *     summary: Edit a user by username
 *     parameters:
 *       - $ref: '#/components/parameters/path_username'
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
 *       '404':
 *         $ref: '#/components/responses/404'
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user by username
 *     parameters:
 *       - $ref: '#/components/parameters/path_username'
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '404':
 *         $ref: '#/components/responses/404'
 */
router.get('/users/:username', async (req, res) => {
  const user = await User.findOne({
    where: {username: req.params.username},
    attributes: {exclude: ['password']},
  });
  if (user) {
    let event_history_id_list = EventToAudience.findAll({
      where: {audience_id: user.id},
    });
    let event_history = [];
    for (let i = 0; i < event_history_id_list.length; i++) {
      event_history.push(
        await Event.findOne({
          where: {id: event_history_id_list[i].event_id},
          attributes: {exclude: ['organizer_id']},
        }),
      );
    }
    const published_events = await Event.findAll({
      where: {organizer_id: user.id},
      attributes: {exclude: ['organizer_id']},
    });

    const followers = (await user.getFollowers({attributes: ['username']})).map(
      (user) => user.dataValues.username,
    );
    const following = (await user.getFollowing({attributes: ['username']})).map(
      (user) => user.dataValues.username,
    );

    res.json({user, event_history, published_events, followers, following});
  } else {
    res.status(404).json(getResponse(404, {description: 'User not found'}));
  }
});
router.put('/users/:username', async (req, res) => {
  const userId = getUidFromJwt(req);
  const op = await User.findOne({where: {id: userId}});
  if (!op.user_group === 3) {
    res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
    return;
  }
  const user = await User.findOne({where: {username: req.params.username}});
  if (!user) {
    res.status(404).json(getResponse(404, {description: 'User not found'}));
    return;
  }
  if (req.body.password) {
    res
      .status(400)
      .json(getResponse(400, {description: 'Cannot change password'}));
    return;
  }
  if (req.body.user_group && op.user_group !== 3) {
    res
      .status(401)
      .json(
        getResponse(401, {description: 'Only admin can change user group'}),
      );
    return;
  }
  await user.update(req.body);
  res.send();
});
router.delete('/users/:username', async (req, res) => {
  const userId = getUidFromJwt(req);
  const op = await User.findOne({where: {id: userId}});
  if (!op.user_group === 3) {
    res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
    return;
  }
  const user = await User.findOne({where: {username: req.params.username}});
  if (!user) {
    res.status(404).json(getResponse(404, {description: 'User not found'}));
    return;
  }
  await user.destroy();
  res.send();
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
    res.redirect(`/api/users/${user.username}`);
  } else {
    res.status(404).json(getResponse(404, {description: 'User not found'}));
  }
});
router.put('/me', async (req, res) => {
  try {
    await User.update(req.body, {where: {id: req.userId}});
  } catch (error) {
    console.error(error);
    res.status(500).json(getResponse(500));
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
 *     parameters:
 *       - $ref: '#/components/parameters/query_limit'
 *       - $ref: '#/components/parameters/query_offset'
 *     responses:
 *       '200':
 *         description: Messages found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Message'
 *                 total:
 *                   type: integer
 *                   description: Total number of messages
 *       '401':
 *         $ref: '#/components/responses/401'
 */
router.get('/messages', async (req, res) => {
  const userId = getUidFromJwt(req);
  if (!userId) {
    res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
    return;
  }
  let messages = await Message.findAll({where: {receiver_id: userId}});
  messages = messages.slice(
    req.query.offset,
    req.query.offset + req.query.limit,
  );
  // The frontend should not see the `receiver_id` in messages
  messages = messages.map((message) => {
    // eslint-disable-next-line no-unused-vars
    const {dataValues, ...useless_data} = message;
    // eslint-disable-next-line no-unused-vars
    const {receiver_id, ...rest} = dataValues;
    return rest;
  });
  res.json(messages);
});

/**
 * @swagger
 * /messages/{message_id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Mark a message as read
 *     parameters:
 *       - $ref: '#/components/parameters/path_message_id'
 *     responses:
 *       '204':
 *         description: Message marked as read successfully
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '404':
 *         $ref: '#/components/responses/404'
 */
router.put('/messages/:message_id', async (req, res) => {
  const userId = getUidFromJwt(req);
  if (!userId) {
    res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
    return;
  }
  const message = await Message.findOne({where: {id: req.params.message_id}});
  if (!message) {
    res.status(404).json(getResponse(404, {description: 'Message not found'}));
    return;
  }
  message.read = true;
  await message.save();
  res.send();
});

/**
 * @swagger
 * /requestReset:
 *   post:
 *     tags:
 *       - Users
 *     summary: 'Request password reset'
 *     description: 'This endpoint allows a user to request a password reset. An email with a reset token is sent to the user.'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       '200':
 *         description: 'Password reset email sent successfully'
 *       '400':
 *         $ref: '#/components/responses/400'
 *     security: []
 */
router.post('/requestReset', async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({where: {user_email: email}});
    if (!user) {
      return res
        .status(400)
        .json(getResponse(400, {description: 'Email not found'}));
    }
    const resetToken = uuid.v4();
    user.reset_password_token = resetToken;
    user.reset_password_expires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'eugene.witting21@ethereal.email',
        pass: 'peUyxfm6tawAysdCab',
      },
    });
    const mailOptions = {
      to: user.user_email,
      from: 'eugene.witting21@ethereal.email',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease use the following token to reset your password:\n\n${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
    await transporter.sendMail(mailOptions);
    res.json({message: 'Password reset email sent'});
  } catch (error) {
    console.error(error);
    res.status(500).json(getResponse(500));
  }
});

/**
 * @swagger
 * /resetPassword:
 *   post:
 *     tags:
 *       - Users
 *     summary: 'Reset password'
 *     description: 'This endpoint allows a user to reset their password using a reset token that was sent to their email.'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - email
 *               - token
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *                 pattern: ^[a-zA-Z0-9]+$
 *                 maxLength: 32
 *     responses:
 *       '200':
 *         description: 'Password reset successfully'
 *       '400':
 *         $ref: '#/components/responses/400'
 *     security: []
 */
router.post('/resetPassword', async (req, res) => {
  try {
    const {email, token, password} = req.body;
    const user = await User.findOne({
      where: {
        user_email: email,
        reset_password_token: token,
        reset_password_expires: {[Op.gt]: Date.now()},
      },
    });
    if (!user) {
      return res
        .status(400)
        .json(
          getResponse(400, {description: 'Invalid token or token expired'}),
        );
    }
    user.password = await bcrypt.hash(password, saltRounds);
    user.reset_password_token = undefined;
    user.reset_password_expires = undefined;
    await user.save();
    res.json({message: 'Password has been reset'});
  } catch (error) {
    console.error(error);
    res.status(500).json(getResponse(500));
  }
});

/**
 * @swagger
 * /users/{username}/follow:
 *   post:
 *     tags:
 *       - Users
 *     summary: Follow a user
 *     parameters:
 *       - $ref: '#/components/parameters/path_username'
 *     responses:
 *       '200':
 *         description: User followed successfully
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '404':
 *         $ref: '#/components/responses/404'
 *   delete:
 *     tags:
 *       - Users
 *     summary: Unfollow a user
 *     parameters:
 *       - $ref: '#/components/parameters/path_username'
 *     responses:
 *       '200':
 *         description: User unfollowed successfully
 *       '401':
 *         $ref: '#/components/responses/401'
 *       '404':
 *         $ref: '#/components/responses/404'
 */
router.post('/users/:username/follow', async (req, res) => {
  const userId = getUidFromJwt(req);
  if (!userId) {
    res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
    return;
  }
  const user = await User.findOne({where: {username: req.params.username}});
  if (!user) {
    res.status(404).json(getResponse(404, {description: 'User not found'}));
    return;
  }
  await user.addFollower(userId);
  res.send();
});
router.delete('/users/:username/follow', async (req, res) => {
  const userId = getUidFromJwt(req);
  if (!userId) {
    res.status(401).json(getResponse(401, {description: 'Unauthorized'}));
    return;
  }
  const user = await User.findOne({where: {username: req.params.username}});
  if (!user) {
    res.status(404).json(getResponse(404, {description: 'User not found'}));
    return;
  }
  await user.removeFollower(userId);
  res.send();
});

function getUidFromJwt(req) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, '42');
    return decoded.id;
  } catch (error) {
    console.log('Invalid token:', error);
    return null;
  }
}

module.exports = router;
