const mongoose = require('mongoose');
const User = require('./models/user.model');

const connection = 'mongodb://mongo:27017/users';

const connectDb = () => {
    return mongoose.connect(connection);
};

module.exports = connectDb;
