const express = require('express');
const router = express.Router();

const { authenticateUser, authorizeRoles } = require('../../middlewares');

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Admin Dashboard
 *     description: Access admin dashboard (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard accessed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Welcome Admin"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  '/dashboard',
  authenticateUser,
  authorizeRoles('admin'),
  (req, res) => {
    res.json({
      message: 'Welcome Admin',
      adminUser: req.user,
    });
  }
);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all users (Admin only)
 *     description: Retrieve all users in the system
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users list retrieved
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  '/users',
  authenticateUser,
  authorizeRoles('admin'),
  (req, res) => {
    res.json({
      message: 'All users',
      users: [],
    });
  }
);

/**
 * @swagger
 * /api/admin/reports:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get system reports (Admin only)
 *     description: Access comprehensive system reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reports retrieved
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  '/reports',
  authenticateUser,
  authorizeRoles('admin'),
  (req, res) => {
    res.json({
      message: 'System reports',
      reports: {
        totalUsers: 0,
        totalBookings: 0,
        totalRevenue: 0,
      },
    });
  }
);

/**
 * @swagger
 * /api/admin/hotel-owners:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all hotel owners (Admin only)
 *     description: Retrieve all hotel owner accounts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hotel owners list retrieved
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get(
  '/hotel-owners',
  authenticateUser,
  authorizeRoles('admin'),
  (req, res) => {
    res.json({
      message: 'All hotel owners',
      hotelOwners: [],
    });
  }
);

module.exports = router;
