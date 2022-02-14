var mongoose = require('mongoose');
var Transaction = require('./Transaction.js');

const userSchema = new mongoose.Schema({
  username: String,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  balance: {
    type: Number,
    default: 100,
  },
  created: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  transactions: [
    {
      type: Transaction.schema,
      default: new Transaction({
        type: 'Sign Up Bonus',
        value: 100,
        date: Date.now(),
        runningBalance: 100,
      }),
    },
  ],
});

module.exports = mongoose.model('users', userSchema);
