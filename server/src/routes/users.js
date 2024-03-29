const express = require("express");
const router = express.Router();
const { User } = require("../models");

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User object
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password });
  res.json(user);
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: 'models/user'
 *       401:
 *         description: Invalid username or password
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = await User.findOne({ where: { username, password } });
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } else {
    res.status(400).json({ message: "Missing username or password" });
  }
});

module.exports = router;
