const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const privateKey = 'private.key';

async function auth(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const user = await UserModel.findOne({ _id: req.body._id });
    const userToken = user.AuthTokens[0].AuthToken;
    const decoded = jwt.verify(userToken, privateKey);

    if (decoded) {
      req.user = jwt.decode(token);
      next();
    } else {
      throw new Error('Invalid token.');
    }
  } catch (ex) {
    res.status(400).send(ex.message);
  }
}

module.exports = auth;
