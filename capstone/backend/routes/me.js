var express = require('express');
const router = express.Router();

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Fetch user data
 *     description: Get all data for a specific user
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: An authentication token which identifies and authorizes the user
 *     responses:
 *       '200':
 *         description: User Data
 */
router.get('/', async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    created: user.created,
    last_login: user.last_login,
    active: user.active,
    balance: user.balance,
    transactions: user.transactions,
  });
});

module.exports = router;
