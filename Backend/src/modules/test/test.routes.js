const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../../middlewares');

/**
 * @swagger
 * /api/test/profile:
 *   get:
 *     tags:
 *       - Test
 *     summary: Get user profile (Protected Route)
 *     description: Access protected route with JWT token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Protected route accessed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Protected route accessed"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get('/profile', authenticateUser, (req, res) => {
  res.json({
    message: 'Protected route accessed',
    user: req.user,
  });
});

/**
 * @swagger
 * /api/test/health:
 *   get:
 *     tags:
 *       - Test
 *     summary: Test route health check
 *     description: Public health check endpoint
 *     responses:
 *       200:
 *         description: Health check successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Test route is working"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
router.get('/health', (req, res) => {
  res.json({
    message: 'Test route is working',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
