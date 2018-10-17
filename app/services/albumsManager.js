const request = require('request'),
  PHOTOS = 'photos',
  ALBUMS = 'albums',
  fetchAlbums = {
    url: 'https://jsonplaceholder.typicode.com/albums',
    method: 'GET',
    json: true
  },
  fetchPhotos = {
    name: PHOTOS,
    url: 'https://jsonplaceholder.typicode.com/photos',
    method: 'GET',
    json: true
  };

const list = options =>
  new Promise(function(resolve, reject) {
    if (options === PHOTOS) {
      request(fetchPhotos, (error, response, body) => {
        if (error) reject(error);
        const photos = body.map(key => ({
          albumId: key.albumId,
          id: key.id,
          title: key.title,
          url: key.url
        }));
        resolve(photos);
      });
    } else if (options === ALBUMS) {
      request(fetchAlbums, (error, response, body) => {
        if (error) reject(error);
        const albums = body.map(key => ({ id: key.id, title: key.title }));
        resolve(albums);
      });
    }
  });

const findAlbum = albumId =>
  list(ALBUMS).then(albumsList => {
    const album = albumsList[albumId];
    return album;
  });

const findPhotos = data => {
  list(PHOTOS).then(photos => {
    const userPhotos = photos.filter(photo => photo.albumId === data.albumId);
    return userPhotos;
  });
};

module.exports = { PHOTOS, ALBUMS, list, findAlbum, findPhotos };
