const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     tags:
 *       - Rooms
 *     summary: Get all rooms
 *     description: Retrieve available rooms with filters
 *     parameters:
 *       - in: query
 *         name: hotelId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [single, double, suite, deluxe]
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of rooms retrieved successfully
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/', (req, res) => {
  res.json({ message: 'Room module' });
});

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     tags:
 *       - Rooms
 *     summary: Create new room
 *     description: Add a new room to a hotel
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Room created successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     tags:
 *       - Rooms
 *     summary: Get room by ID
 *     description: Retrieve detailed information about a specific room
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Room details retrieved
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     tags:
 *       - Rooms
 *     summary: Update room information
 *     description: Update room details
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
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     tags:
 *       - Rooms
 *     summary: Delete room
 *     description: Remove a room
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
 *         description: Room deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

module.exports = router;


const express = require("express");
const router = express.Router();

const roomController = require("./room.controller");

const authenticateUser =
  require("../../middleware/authMiddleware");

const authorizeRoles =
  require("../../middleware/roleMiddleware");

  router.get(
  "/hotel/:hotelId",
  roomController.getRooms
);

router.get("/:id", roomController.getRoom);

router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  roomController.createRoom
);

router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  roomController.updateRoom
);

router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  roomController.deleteRoom
);

module.exports = router;

