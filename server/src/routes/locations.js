const express = require('express');
const router = express.Router();

const {Location /*, locationStatus*/} = require('../models');
const getResponse = require('../models/response');

/**
 * @swagger
 * /locations:
 *   get:
 *     tags:
 *       - Locations
 *     summary: Get a list of locations
 *     description: Only available locations are returned
 *     parameters:
 *       - $ref: '#/components/parameters/query_limit'
 *       - $ref: '#/components/parameters/query_offset'
 *     responses:
 *       '200':
 *         description: Locations found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       '404':
 *         $ref: '#/components/responses/404'
 *   post:
 *     tags:
 *       - Locations
 *     summary: Create a location
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       '200':
 *         description: Location created successfully
 *       '401':
 *         $ref: '#/components/responses/401'
 */
router.get('/locations', async (req, res) => {
  try {
    const locations = await Location.findAll({
      // where: {status: locationStatus.available},
      where: {status: 1},
    });
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json(getResponse(500, error));
  }
});
router.post('/locations', async (req, res) => {
  try {
    await Location.create(req.body);
    res.status(201).send();
  } catch (error) {
    res.status(500).json(getResponse(500, error));
  }
});

module.exports = router;
