var User = require('./models/User.js');
var Transaction = require('./models/Transaction.js');
const constants = require('./constants.js');

const findUserByEmail = (email) => User.findOne({ email });

const findUserById = (id) => User.findById(id);

const addTransaction = (transactionData, user) => {
  user.balance = parseFloat(user.balance) + parseFloat(transactionData.value);
  let type = constants.transactionTypes.withdraw;
  if (transactionData.value > 0) {
    type = constants.transactionTypes.deposit;
  }
  user.transactions.unshift(
    new Transaction({ ...transactionData, runningBalance: user.balance, type })
  );
  user.save();
};

module.exports = { findUserByEmail, findUserById, addTransaction };
