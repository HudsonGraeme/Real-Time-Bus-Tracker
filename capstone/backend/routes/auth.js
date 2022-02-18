var express = require('express');
const { check } = require('express-validator');
const validate = require('../middleware/validate.js');
var bcrypt = require('bcrypt');
var User = require('../models/User.js');
var jwt = require('jsonwebtoken');
var { findUserByEmail } = require('../dal.js');
const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign a new user up
 *     description: Create a new user in the bank's database.
 *     tags:
 *       - Authentication
 */
router.post(
  '/signup',
  [
    check('username', 'Please Enter a Valid Username').not().isEmpty(),
    check('email', 'Please enter a valid email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .custom((value) =>
        findUserByEmail(value).then((user) =>
          user ? Promise.reject() : Promise.resolve()
        )
      )
      .withMessage('A user already exists for that email address'),
    check('password', 'Please enter a valid password')
      .isStrongPassword()
      .withMessage(
        'Please enter a password at least 8 characters in length that contains at least one uppercase, one lowercase, one special and one numeric character'
      ),
    check('first_name', 'Please enter your first name')
      .isAlpha()
      .withMessage('Please enter an alpha only first name')
      .isLength({ min: 2 }),
    check('last_name', 'Please enter your first name')
      .isAlpha()
      .withMessage('Please enter an alpha only first name')
      .isLength({ min: 2 }),
  ],
  validate,
  async (req, res, next) => {
    const { email, password, ...otherInfo } = req.body;
    try {
      const user = new User({
        email,
        ...otherInfo,
      });

      const salt = bcrypt.genSaltSync(12);
      // Hash the password and save
      user.password = bcrypt.hashSync(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 86400,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
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
        }
      );
    } catch (ex) {
      console.log(ex.message);
      res
        .status(500)
        .send(`Failed to create new user due to an exception ${ex.message}`);
    }
  }
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log into an existing user account
 *     description: Log into a user account using a username and password
 *     tags:
 *       - Authentication
 */
router.post(
  '/login',
  [
    check('email', 'Please enter a valid email')
      .isEmail()
      .custom((value) =>
        findUserByEmail(value).then((user) =>
          !user ? Promise.reject() : Promise.resolve()
        )
      )
      .withMessage(
        'Invalid email or password. Please enter valid user credentials.'
      ),
    check('password', 'Please enter a valid password').isLength({
      min: 8,
    }),
  ],
  validate,
  async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message:
            'Invalid email or password. Please enter valid user credentials.',
        });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 86400,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
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
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  }
);

module.exports = router;
