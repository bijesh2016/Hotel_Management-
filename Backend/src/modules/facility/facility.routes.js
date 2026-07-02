const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/facilities:
 *   get:
 *     tags:
 *       - Facilities
 *     summary: Get all facilities
 *     description: Retrieve list of available facilities
 *     parameters:
 *       - in: query
 *         name: hotelId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of facilities retrieved successfully
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get('/', (req, res) => {
  res.json({ message: 'Facility module' });
});

/**
 * @swagger
 * /api/facilities:
 *   post:
 *     tags:
 *       - Facilities
 *     summary: Create facility
 *     description: Add a new facility to a hotel
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelId:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 *     responses:
 *       201:
 *         description: Facility created successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/facilities/{id}:
 *   delete:
 *     tags:
 *       - Facilities
 *     summary: Delete facility
 *     description: Remove a facility
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
 *         description: Facility deleted successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

module.exports = router;
