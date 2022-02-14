var express = require('express');
const { check } = require('express-validator');
const validate = require('../middleware/validate.js');
var { addTransaction } = require('../dal.js');
const router = express.Router();

router.patch(
  '/',
  [
    check('value', 'Transaction is missing a value')
      .exists()
      .isNumeric()
      .withMessage('Please enter a valid number')
      .custom(
        // Ensure they're not tryna yoink some internet money
        (value, { req }) => parseFloat(value) >= parseFloat(-req.user.balance)
      )
      .withMessage(
        'Please enter a valid amount. You cannot withdraw more than your overdraft limit.'
      )
      .custom((value) => parseFloat(value) !== 0)
      .withMessage(
        'Please enter a valid amount. You cannot submit a transaction without a value.'
      ),
  ],
  validate,
  async (req, res, next) => {
    const { value } = req.body;
    await addTransaction({ value: parseFloat(value) }, req.user);
    return res.status(201).send(req.user.transactions);
  }
);

router.get('/', (req, res, next) => {
  // If we have some transactions send them over
  if (req.user.transactions.length) {
    return res.status(200).send(req.user.transactions);
  }
  // If there are no transactions send an empty response
  return res.status(204).send();
});

module.exports = router;
