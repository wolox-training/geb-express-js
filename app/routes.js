const users = require('./controllers/users'),
  auth = require('./middlewares/auth');

exports.init = app => {
  app.post('/users/sessions/invalidate_all', [auth.checkAuth], users.disableAll);
  app.post('/users/admin', [auth.checkAuth, auth.checkSession], users.admin);
  app.post('/users', users.signUp);
  app.post('/users/sessions', users.logIn);
  app.post('/albums/:id', [auth.checkAuth, auth.checkSession], users.buyAlbum);
  app.get(
    '/users/:user_id/albums',
    [auth.checkAuth, auth.checkRoleOrId, auth.checkSession],
    users.listUserAlbums
  );
  app.get('/users/albums/:id/photos', [auth.checkAuth, auth.checkSession], users.listPhotos);
  app.get('/users', [auth.checkAuth, auth.checkSession], users.list);
  app.get('/albums', [auth.checkAuth, auth.checkSession], users.listAlbums);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
