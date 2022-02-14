var express = require('express');
const { check } = require('express-validator');
const validate = require('../middleware/validate.js');
var bcrypt = require('bcrypt');
var User = require('../models/User.js');
var jwt = require('jsonwebtoken');
var { findUserByEmail } = require('../dal.js');
const router = express.Router();

router.post(
  '/signup',
  [
    check('username', 'Please Enter a Valid Username').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
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
      if (await findUserByEmail(email)) {
        return res.status(400).json({
          errors: [{ email: `User with email ${email} already exists.` }],
        });
      }
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
          });
        }
      );
    } catch (ex) {
      console.log(ex.message);
      res.status(500).send('Failed to create new user');
    }
  }
);

module.exports = router;
