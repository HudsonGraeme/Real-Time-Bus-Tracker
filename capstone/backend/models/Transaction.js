var mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, default: 'NULL' },
  value: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  runningBalance: { type: Number, default: 0 },
});

module.exports = mongoose.model('transactions', transactionSchema);
