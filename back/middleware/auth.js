const jwt = require('jsonwebtoken');
const privateKey = 'private.key';

function auth(req, res, next) {
  const token = req.header('Authorization');
  console.log("TOKEN D'AUTHENTIFICATION ==> ", token);
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token, privateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
}

module.exports = auth;
