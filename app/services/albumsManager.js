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
      else {
        const albums = body.map(key => ({ id: key.id, title: key.title }));
        resolve(albums);
      }
    });
  });
};
