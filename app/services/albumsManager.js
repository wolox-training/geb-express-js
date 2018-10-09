const fetch = require('node-fetch');

exports.listAlbums = () => {
<<<<<<< d02b817d7e4dcbcb769aa0655ce3e9b1a4d0cdcd
<<<<<<< 3c59db3552377286f261a4ca9cc2f0b9572f729a
=======
>>>>>>> modified albums service, users now see reduced info from the fetch
  return fetch('https://jsonplaceholder.typicode.com/albums').then(response =>
    response.json().then(albums => {
      const titles = [];
      albums.forEach(album => {
<<<<<<< d02b817d7e4dcbcb769aa0655ce3e9b1a4d0cdcd
        titles.push({ id: album.id, album: album.title });
=======
        titles.push(album.title);
>>>>>>> modified albums service, users now see reduced info from the fetch
      });
      return titles;
    })
  );
<<<<<<< d02b817d7e4dcbcb769aa0655ce3e9b1a4d0cdcd
=======
  return fetch('https://jsonplaceholder.typicode.com/albums').then(response => response.json());
>>>>>>> implemented list all albums with tests
=======
>>>>>>> modified albums service, users now see reduced info from the fetch
};
