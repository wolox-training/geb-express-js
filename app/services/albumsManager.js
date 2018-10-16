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
<<<<<<< HEAD
      const albums = body.map(key => ({ id: key.id, title: key.title }));
      resolve(albums);
=======
      else {
        const albums = body.map(key => ({ id: key.id, title: key.title }));
        resolve(albums);
      }
>>>>>>> ff8a12ed80374e8db841743f4329eb5d0020f03f
    });
  });
};
