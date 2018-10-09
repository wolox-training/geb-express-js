const fetch = require('node-fetch');

exports.listAlbums = () => {
<<<<<<< 3c59db3552377286f261a4ca9cc2f0b9572f729a
  return fetch('https://jsonplaceholder.typicode.com/albums').then(response =>
    response.json().then(albums => {
      const titles = [];
      albums.forEach(album => {
        titles.push({ id: album.id, album: album.title });
      });
      return titles;
    })
  );
=======
  return fetch('https://jsonplaceholder.typicode.com/albums').then(response => response.json());
>>>>>>> implemented list all albums with tests
};
