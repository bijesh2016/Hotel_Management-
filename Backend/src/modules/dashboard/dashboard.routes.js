const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Get dashboard data
 *     description: Retrieve dashboard analytics and statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/', (req, res) => {
  res.json({ message: 'Dashboard module' });
});

/**
 * @swagger
 * /api/dashboard/bookings:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Get reservationstatistics
 *     description: Retrieve reservationstatistics and metrics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly, yearly]
 *     responses:
 *       200:
 *         description: reservationstatistics retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/dashboard/revenue:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Get revenue statistics
 *     description: Retrieve revenue and payment statistics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Revenue statistics retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/dashboard/occupancy:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Get occupancy statistics
 *     description: Retrieve room occupancy rates
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: hotelId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Occupancy statistics retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

module.exports = router;
