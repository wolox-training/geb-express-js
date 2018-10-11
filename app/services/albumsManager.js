const request = require('request'),
  options = {
    url: 'https://jsonplaceholder.typicode.com/albums',
    method: 'GET',
    json: true
  };

exports.listAlbums = () => {
<<<<<<< f6ddf8d99aa45c8563e770bf3fc4faf8a49c3725
<<<<<<< dbffc2c6a2e4d1cb9fd7e293d40ed2cb68ca785d
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
=======
=======
>>>>>>> typo
  return new Promise(function(resolve, reject) {
    request(options, (error, response, body) => {
      if (error) reject(error);
      else {
        const albums = body.map(key => ({ id: key.id, title: key.title }));
        resolve(albums);
      }
    });
  });
<<<<<<< f6ddf8d99aa45c8563e770bf3fc4faf8a49c3725
>>>>>>> rebased from user_admin and fixed req changes, tests still missing
=======
>>>>>>> typo
};
