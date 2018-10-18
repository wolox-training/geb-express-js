const request = require('request'),
  PHOTOS = {
    url: 'https://jsonplaceholder.typicode.com/albums',
    method: 'GET',
    json: true
  },
  ALBUMS = {
    url: 'https://jsonplaceholder.typicode.com/photos',
    method: 'GET',
    json: true
  };

// const photos = body.map(key => ({
//   albumId: key.albumId,
//   id: key.id,
//   title: key.title,
//   url: key.url
// }));
// // const albums = body.map(key => ({ id: key.id, title: key.title }));

const list = options =>
  new Promise(function(resolve, reject) {
    request(options, (error, response, body) => {
      if (error) reject(error);
      resolve(body);
    });
  });

const findAlbum = albumId =>
  list(ALBUMS).then(albumsList => {
    const album = albumsList[albumId];
    return album;
  });

module.exports = { PHOTOS, ALBUMS, list, findAlbum };
