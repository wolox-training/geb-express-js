const users = require('./controllers/users'),
  auth = require('./middlewares/auth');

exports.init = app => {
  app.post('/users/admin', [auth.checkRole], users.admin);
  app.post('/users', users.signUp);
  app.post('/users/sessions', users.logIn);
  app.post('/albums/:id', users.buyAlbum);
  app.get('/users', users.list);
  app.get('/albums', users.listAlbums);

  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
