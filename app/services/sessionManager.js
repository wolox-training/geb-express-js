const jwt = require('jsonwebtoken'),
  config = require('./../../config');

const SECRET = config.common.session.secret;
exports.HEADER = config.common.session.header_name;

<<<<<<< ab92dab83dedcf2adf54f6515b15815c1e1384ce
exports.encode = payload => jwt.sign(payload, SECRET)
=======
exports.encode = payload => jwt.sign(payload, SECRET);
<<<<<<< 00941cf33ee7aebe0280efcfe61f8350d3e6aca4
<<<<<<< 602ab905e5b33293c3658bb2146b14bb6dafa496
>>>>>>> pre implementation of the signIn module
=======

exports.decode = token => jwt.verify(token, SECRET);
>>>>>>> list all functions but older test is throwing db error
=======
exports.verify = token => jwt.verify(token, SECRET);
exports.decode = token => jwt.decode(token, { complete: true });
>>>>>>> implemented the admin endpoint, tests missing still
