const users = require('../models').users,
  errors = require('../errors'),
  ADMIN_ROLE = 'admin';

exports.checkRole = role => {
  if (role !== ADMIN_ROLE) return errors.FORBIDDEN_ACTION;
  return '';
};  
