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

exports.ENTRY_ALREADY_EXISTS = 'entry_already_exists';
exports.entryAlreadyExists = () =>
  internalError('This titled is already owned by the user.', exports.ENTRY_ALREADY_EXISTS);

exports.USER_ALREADY_EXISTS = 'user_already_exists';
exports.userAlreadyExists = () =>
  internalError('The email was already used for another user.', exports.USER_ALREADY_EXISTS);

exports.FORBIDDEN_ACTION = 'user_has_no_rights';
exports.forbiddenAction = message => internalError(message, exports.FORBIDDEN_ACTION);

exports.INVALID_ENTRY = 'invalid_entry';
exports.invalidEntry = () => internalError('Cant get this user albums list', exports.INVALID_ENTRY);

exports.INVALID_ALBUM = 'invalid_album';
exports.invalidAlbum = () => internalError('Album does not exist', exports.INVALID_ALBUM);

exports.INVALID_AUTH = 'invalid_auth';
exports.invalidAuth = () => internalError('User has no rights for this action', exports.INVALID_AUTH);

exports.INVALID_EMAIL = 'invalid_email';
exports.invalidEmail = () => internalError('The submitted email address is invalid.', exports.INVALID_EMAIL);

exports.INVALID_PASSWORD = 'invalid_password';
exports.invalidPassword = () => internalError('Submitted password is invalid.', exports.INVALID_PASSWORD);

exports.INVALID_USERNAME = 'invalid_username';
exports.invalidUsername = () => internalError('Submitted username is invalid.', exports.INVALID_USERNAME);

exports.INVALID_SIGNUP = 'invalid_signup';
exports.invalidSignup = message => internalError(message, exports.INVALID_SIGNUP);
