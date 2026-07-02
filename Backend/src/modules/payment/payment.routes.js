const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/payments:
 *   get:
 *     tags:
 *       - Payments
 *     summary: Get all payments
 *     description: Retrieve payment history
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed, failed, refunded]
 *     responses:
 *       200:
 *         description: List of payments retrieved successfully
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/', (req, res) => {
  res.json({ message: 'Payment module' });
});

/**
 * @swagger
 * /api/payments:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Process payment
 *     description: Create and process a new payment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Payment processed successfully
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     tags:
 *       - Payments
 *     summary: Get payment by ID
 *     description: Retrieve payment details
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
 *         description: Payment details retrieved
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/payments/{id}/refund:
 *   patch:
 *     tags:
 *       - Payments
 *     summary: Refund payment
 *     description: Process a refund for a payment
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
 *         description: Refund processed successfully
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

module.exports = router;
