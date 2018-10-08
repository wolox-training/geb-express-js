const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.DEFAULT_DATABASE_ERROR = 'database_error';
exports.defaultDatabase = sequelizeError => {
  let errors;
  if (sequelizeError.errors) {
    errors = sequelizeError.errors.map(error => error.message);
  } else if (sequelizeError.error) {
    errors = [sequelizeError.error];
  } else {
    errors = [sequelizeError.message];
  }
  return internalError(
    `${sequelizeError.name || 'sequelizeError'}: ${errors.join(', ')}`,
    exports.DEFAULT_DATABASE_ERROR
  );
};

exports.USER_ALREADY_EXISTS = 'user_already_exists';
exports.userAlreadyExists = () =>
  internalError('The email was already used for another user.', exports.USER_ALREADY_EXISTS);

exports.FORBIDDEN_ACTION = 'forbidden action';
exports.forbiddenAction = () =>
  internalError('Type of request is not allowed to this user.', exports.FORBIDDEN_ACTION);

exports.INVALID_AUTH = 'invalid auth';
exports.invalidAuth = () => internalError('User has no rights for this action', exports.INVALID_AUTH);

exports.INVALID_EMAIL = 'invalid_email';
exports.invalidEmail = () => internalError('The submitted email address is invalid.', exports.INVALID_EMAIL);

exports.INVALID_PASSWORD = 'invalid_password';
exports.invalidPassword = () => internalError('Submitted password is invalid.', exports.INVALID_PASSWORD);

exports.INVALID_USERNAME = 'invalid_username';
exports.invalidUsername = () => internalError('Submitted username is invalid.', exports.INVALID_USERNAME);

exports.INVALID_SIGNUP = 'invalid_signup';
exports.invalidSignup = message => internalError(message, exports.INVALID_SIGNUP);
