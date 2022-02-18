// Node modules
const chalk = require('chalk');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const morganBody = require('morgan-body');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Routes
const authRoutes = require('./routes/auth.js');
const transactionRoutes = require('./routes/transactions.js');
const swaggerRoutes = require('./routes/swagger.js');
const meRoutes = require('./routes/me.js');
// Middleware
const authMiddleware = require('./middleware/auth.js');

// Globals
const app = express();
const port = 3000;

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: __dirname + '/.env' });
}
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(
  morgan(function (tokens, req, res) {
    const status = tokens.status(req, res);
    const statusColor =
      status >= 500
        ? 'red'
        : status >= 400
        ? 'yellow'
        : status >= 300
        ? 'blue'
        : status >= 200
        ? 'green'
        : 'magenta';
    return [
      chalk.green.bold(tokens.method(req, res)),
      chalk[statusColor].bold(status),
      chalk.white(tokens.url(req, res)),
      chalk.yellow(tokens['response-time'](req, res) + ' ms'),
    ].join(' ');
  })
);
morganBody(app);
// Routes
app.use('/auth', authRoutes);
app.use('/me', authMiddleware, meRoutes);
app.use('/transactions', authMiddleware, transactionRoutes);
// Connect to Mongo
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'BadBank',
  })
  .then(() => {
    console.log('Successfully connected to Mongo');
  })
  .catch((ex) => console.error('Failed to connect to MongoDB', ex));

// Static frontend files
const root = path.join(__dirname, '../static');
app.use(express.static(root));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static', 'index.html'));
});
app.listen(port);
console.log('Running on port: ' + port);
