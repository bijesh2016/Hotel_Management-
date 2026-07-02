const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get all bookings
 *     description: Retrieve all bookings for the user or all (admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, cancelled, completed]
 *     responses:
 *       200:
 *         description: List of bookings retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/', (req, res) => {
  res.json({ message: 'reservationmodule' });
});

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags:
 *       - Bookings
 *     summary: Create new booking
 *     description: Make a new room booking
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: reservationcreated successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     tags:
 *       - Bookings
 *     summary: Get reservationby ID
 *     description: Retrieve detailed reservationinformation
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
 *         description: reservationdetails retrieved
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     tags:
 *       - Bookings
 *     summary: Update booking
 *     description: Modify reservationdetails
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
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: reservationupdated successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   patch:
 *     tags:
 *       - Bookings
 *     summary: Cancel booking
 *     description: Cancel an existing booking
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
 *         description: reservationcancelled successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

module.exports = router;

const express = require("express");
const router = express.Router();

const controller = require("./reservation.controller");

const authenticateUser =
  require("../../middleware/authMiddleware");

const authorizeRoles =
  require("../../middleware/roleMiddleware");

  router.post(
  "/",
  authenticateUser,
  authorizeRoles("customer", "admin"),
  controller.createReservation
);

router.get(
  "/my",
  authenticateUser,
  controller.getMyReservations
);

router.get(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  controller.getAllReservations
);

router.put(
  "/:id/status",
  authenticateUser,
  authorizeRoles("admin"),
  controller.updateStatus
);

module.exports = router;