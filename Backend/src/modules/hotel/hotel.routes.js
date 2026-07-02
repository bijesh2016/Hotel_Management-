const express = require('express');
const router = express.Router();

const hotelController = require('./hotelController');
const { authenticateUser, authorizeRoles } = require('../../middlewares');

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     tags:
 *       - Hotels
 *     summary: Get all hotels
 *     description: Retrieve a list of all hotels with filters
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of hotels retrieved successfully
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/', hotelController.getHotels);

/**
 * @swagger
 * /api/hotels:
 *   post:
 *     tags:
 *       - Hotels
 *     summary: Create new hotel
 *     description: Add a new hotel (hotel owner only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       201:
 *         description: Hotel created successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post(
  '/',
  authenticateUser,
  authorizeRoles('hotel_owner', 'admin'),
  hotelController.createHotel
);

/**
 * @swagger
 * /api/hotels/{id}:
 *   get:
 *     tags:
 *       - Hotels
 *     summary: Get hotel by ID
 *     description: Retrieve detailed information about a specific hotel
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Hotel details retrieved
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get('/:id', hotelController.getHotel);

/**
 * @swagger
 * /api/hotels/{id}:
 *   put:
 *     tags:
 *       - Hotels
 *     summary: Update hotel information
 *     description: Update hotel details (hotel owner only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       200:
 *         description: Hotel updated successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.put(
  '/:id',
  authenticateUser,
  authorizeRoles('hotel_owner', 'admin'),
  hotelController.updateHotel
);

/**
 * @swagger
 * /api/hotels/{id}:
 *   delete:
 *     tags:
 *       - Hotels
 *     summary: Delete hotel
 *     description: Remove a hotel (admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hotel deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.delete(
  '/:id',
  authenticateUser,
  authorizeRoles('admin'),
  hotelController.deleteHotel
);

module.exports = router;
