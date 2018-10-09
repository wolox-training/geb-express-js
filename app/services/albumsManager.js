const fetch = require('node-fetch');

exports.listAlbums = () => {
  return fetch('https://jsonplaceholder.typicode.com/albums').then(response =>
    response.json().then(albums => {
      const titles = [];
      albums.forEach(album => {
        titles.push({ id: album.id, album: album.title });
      });
      return titles;
    })
  );
};
