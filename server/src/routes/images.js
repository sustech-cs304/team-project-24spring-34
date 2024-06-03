const fs = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');
const upload = multer({dest: 'uploads/'});
const router = express.Router();
const sharp = require('sharp');
const getResponse = require('../models/response');

/**
 * @swagger
 * /images:
 *   post:
 *     tags:
 *       - Images
 *     summary: Upload an image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             additionalProperties: false
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties: false
 *               required:
 *                 - url
 *               properties:
 *                 url:
 *                   type: string
 *       '400':
 *         $ref: '#/components/responses/400'
 *       '500':
 *         $ref: '#/components/responses/500'
 */
router.post('/images', upload.single('image'), async (req, res) => {
  if (!req.file) {
    res.status(400).json(getResponse(400, {description: 'No image uploaded'}));
    return;
  }
  const image = req.file;
  const imageId = Date.now() + '.webp';
  const imagePath = path.join(__dirname, '../../resources/images', imageId);
  try {
    if (!fs.existsSync(path.dirname(imagePath))) {
      fs.mkdirSync(path.dirname(imagePath), {recursive: true});
    }
    await sharp(image.path).toFormat('webp').toFile(imagePath);
    fs.unlink(image.path, (err) => {
      if (err) {
        // console.error(err);
        return;
      }
      // File deleted successfully
    });
    res.json({url: `/images/${imageId}`});
  } catch (error) {
    console.error(error);
    res.status(500).json(getResponse(500));
  }
});

/**
 * @swagger
 * /images/{image_id}:
 *   get:
 *     tags:
 *       - Images
 *     summary: Get an image by id
 *     parameters:
 *       - name: image_id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Image found
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       '404':
 *         $ref: '#/components/responses/404'
 */
router.get('/images/:image_id', function (req, res) {
  const imageId = req.params.image_id + '.webp';
  const imagePath = path.join(__dirname, '../../resources/images', imageId);
  if (!fs.existsSync(imagePath)) {
    res.status(404).json(getResponse(404, {description: 'Image not found'}));
    return;
  }
  res.sendFile(imagePath);
});

module.exports = router;
