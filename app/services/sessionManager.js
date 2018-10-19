const jwt = require('jsonwebtoken'),
  EXPIRATION_TIME = '1h',
  sessions = require('../models').sessions,
  config = require('./../../config');

const SECRET = 'xxxxxx';
exports.HEADER = config.common.session.header_name;

exports.encode = payload => jwt.sign(payload, SECRET, { expiresIn: EXPIRATION_TIME });
exports.verify = token => jwt.verify(token, SECRET);
exports.decode = token => jwt.decode(token, { complete: true });

exports.new = email => {
  const date = Date(),
    session = {
      user: email,
      date
    };
  return sessions.add(session);
};
