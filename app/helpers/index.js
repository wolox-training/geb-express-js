const users = require('../models').users,
  errors = require('../errors'),
  VALID_ALPHANUM = /^[0-9a-zA-Z]+$/,
  VALID_AR = /^\w+([\.-]?\w+)*@\wolox.com.ar/,
  VALID_CO = /^\w+([\.-]?\w+)*@\wolox.co/,
  VALID_CL = /^\w+([\.-]?\w+)*@\wolox.cl/;

exports.validateEmail = email => {
<<<<<<< HEAD
  if (!VALID_AR.test(email) && !VALID_CO.test(email) && !VALID_CL.test(email)) {
    return errors.INVALID_EMAIL;
  }
};

exports.validatePassword = password => {
  if (!VALID_ALPHANUM.test(password) || password.length < 8) {
    return errors.INVALID_PASSWORD;
  }
=======
  if (VALID_AR.test(email) || VALID_CO.test(email) || VALID_CL.test(email)) {
    return true;
  }
  throw errors.invalidEmail();
};

exports.validatePassword = pwd => {
  if (VALID_ALPHANUM.test(pwd) && pwd.length >= 8) {
    return true;
  }
  throw errors.invalidPassword();
>>>>>>> e883197e8f4e0a354551e3c22c54d7d0660c411f
};
