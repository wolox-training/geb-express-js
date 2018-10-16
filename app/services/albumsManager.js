const request = require('request'),
  options = {
    url: 'https://jsonplaceholder.typicode.com/albums',
    method: 'GET',
    json: true
  };

exports.listAlbums = () => {
  return new Promise(function(resolve, reject) {
    request(options, (error, response, body) => {
      if (error) reject(error);
      const albums = body.map(key => ({ id: key.id, title: key.title }));
      resolve(albums);
    });
  });
};
exports.findAlbum = albumId => {
  return new Promise(function(resolve, reject) {
    request(options, (error, response, body) => {
      if (error) reject(error);
      const album = body[albumId];
      resolve(album);
    });
  });
};
