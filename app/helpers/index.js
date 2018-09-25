const users = require('../models').users,
  errors = require('../errors'),
  VALID_ALPHANUM = /^[0-9a-zA-Z]+$/,
  VALID_AR = /^\w+([\.-]?\w+)*@\wolox.com.ar/,
  VALID_CO = /^\w+([\.-]?\w+)*@\wolox.co/,
  VALID_CL = /^\w+([\.-]?\w+)*@\wolox.cl/;

exports.validateEmail = email => {
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
};
