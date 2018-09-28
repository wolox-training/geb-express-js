const users = require('./controllers/users');

exports.init = app => {
  app.post('/users', users.signUp);
  app.post('/users/sessions', users.logIn);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
