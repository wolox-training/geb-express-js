const users = require('./controllers/users');

exports.init = app => {
  app.post('/users', users.signUp);
  // app.post('/users/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
