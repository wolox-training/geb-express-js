const users = require('./controllers/users'),
  auth = require('./middlewares/auth');

exports.init = app => {
  app.post('/users/admin', [auth.checkRole], users.admin);
  app.post('/users', users.signUp);
  app.post('/users/sessions', users.logIn);
  app.get('/users', users.list);
  app.get('/albums', users.albums);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
