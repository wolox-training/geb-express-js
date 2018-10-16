const request = require('request'),
  options = {
    url: 'https://jsonplaceholder.typicode.com/albums',
    method: 'GET',
    json: true
  };

const listAlbums = () => {
  return new Promise(function(resolve, reject) {
    request(options, (error, response, body) => {
      if (error) reject(error);
      const albums = body.map(key => ({ id: key.id, title: key.title }));
      resolve(albums);
    });
  });
};

const findAlbum = albumId =>
  listAlbums().then(list => {
    const album = list[albumId];
    return album;
  });

module.exports = { listAlbums, findAlbum };
