const jwt = require('jsonwebtoken'),
  config = require('./../../config');

const SECRET = config.common.session.secret;
exports.HEADER = config.common.session.header_name;

<<<<<<< ab92dab83dedcf2adf54f6515b15815c1e1384ce
exports.encode = payload => jwt.sign(payload, SECRET)
=======
exports.encode = payload => jwt.sign(payload, SECRET);
<<<<<<< 602ab905e5b33293c3658bb2146b14bb6dafa496
>>>>>>> pre implementation of the signIn module
=======

exports.decode = token => jwt.verify(token, SECRET);
>>>>>>> list all functions but older test is throwing db error
