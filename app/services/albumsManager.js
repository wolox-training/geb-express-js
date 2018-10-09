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
<<<<<<< 5a28acaa0d9c6218e1be4a6b566b02d4954507c0
<<<<<<< d02b817d7e4dcbcb769aa0655ce3e9b1a4d0cdcd
        titles.push({ id: album.id, album: album.title });
=======
        titles.push(album.title);
>>>>>>> modified albums service, users now see reduced info from the fetch
=======
        titles.push({ id: album.id, album: album.title });
>>>>>>> minor changes
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
