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
      const albums = body.map(key => ({ id: key.id, title: key.title }));
      resolve(albums);
    });
  });
};

exports.findAlbum = albumId => {
  return new Promise(function(resolve, reject) {
    request(options, (error, response, body) => {
      if (error) reject(error);
      const album = body.filter(key => key.id === parseInt(albumId))
      //SALE CON REDUCE
      // if(data.length){
      // album = {
      //   id: data[0].id,
      //   title: data[0].title
      //   };
      // }
      resolve(album);
    });
  });
};
