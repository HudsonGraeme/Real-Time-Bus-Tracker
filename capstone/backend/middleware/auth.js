const jwt = require('jsonwebtoken');
const { findUserById } = require('../dal.js');
const auth = async (req, res, next) => {
  const token = req.header('token');
  if (!token)
    return res
      .status(401)
      .json({ message: 'No authentication credentials provided.' });

  try {
    // TODO: Verify URL and body is relevant to specific user, return 403 if they try to modify other users
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await findUserById(decoded.user.id);
    next();
  } catch (e) {
    console.error(e);
    return res
      .status(401)
      .send({ message: 'Invalid authentication credentials provided' });
  }
};

module.exports = auth;
