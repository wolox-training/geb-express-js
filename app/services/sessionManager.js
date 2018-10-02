const jwt = require('jsonwebtoken'),
  config = require('./../../config');

const SECRET = config.common.session.secret;
exports.HEADER = config.common.session.header_name;

<<<<<<< ab92dab83dedcf2adf54f6515b15815c1e1384ce
exports.encode = payload => jwt.sign(payload, SECRET)
=======
exports.encode = payload => jwt.sign(payload, SECRET);
>>>>>>> pre implementation of the signIn module
