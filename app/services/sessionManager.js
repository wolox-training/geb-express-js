const jwt = require('jsonwebtoken'),
  EXPIRATION_TIME = 10,
  config = require('./../../config');

const SECRET = config.common.session.secret;
exports.HEADER = config.common.session.header_name;

exports.encode = payload => jwt.sign(payload, SECRET, { expiresIn: EXPIRATION_TIME });
exports.verify = token => jwt.verify(token, SECRET);
exports.decode = token => jwt.decode(token, { complete: true });
