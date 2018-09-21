const users = require('../models').users,
  bcrypt = require('bcryptjs'),
  logger = require('../logger'),
  errors = require('../errors'),
  isAlphanumeric = require('is-alphanumeric');

exports.validateEmailPassword = (email, pwd) => {
  const VALID_AR = /^\w+([\.-]?\w+)*@\wolox.com.ar/,
    VALID_CO = /^\w+([\.-]?\w+)*@\wolox.co/,
    VALID_CL = /^\w+([\.-]?\w+)*@\wolox.cl/;
  return new Promise(function(resolve, reject) {
    if (VALID_AR.test(email) || VALID_CO.test(email) || VALID_CL.test(email)) {
      if (isAlphanumeric(pwd) && pwd.length >= 8) {
        resolve(pwd);
      } else {
        reject(errors.invalidPassword());
      }
    } else {
      reject(errors.invalidEmail());
    }
  });
};
