<<<<<<< 7e38c948fce3a065b489add59db0021b0c0ed512
<<<<<<< 5d5b2db15f754c540eabb3fcf7a1737aa1af9746
<<<<<<< 58d1928ddbf2fd99ecba847f5b6f688e7fa17a67
=======
>>>>>>> fixed requested changes, added mock tests
const request = require('request'),
  options = {
    url: 'https://jsonplaceholder.typicode.com/albums',
    method: 'GET',
    json: true
  };
<<<<<<< 7e38c948fce3a065b489add59db0021b0c0ed512

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
=======
const fetch = require('node-fetch');

exports.listAlbums = () => {
<<<<<<< c8729706048f6bc23d19346af955185803937897
<<<<<<< 56f7fcaf9fd287948249c8c08170302847c04adb
<<<<<<< 62e99d33b9f3b2901b49a21c2dfdbb201c234c75
  return fetch('https://jsonplaceholder.typicode.com/albums').then(response => response.json());
>>>>>>> implemented list all albums with tests
=======
=======
<<<<<<< b217b43ddd7a0e5ddb6713a9e4acf50f4e540603
>>>>>>> implemented list all albums with tests
=======
=======
const request = require('request');
=======
>>>>>>> fixed requested changes, added mock tests

exports.listAlbums = () => {
<<<<<<< ab4969f74b889b2cdc45822cbc4af19dcb046d13
>>>>>>> rebased from user_admin and fixed req changes, tests still missing
<<<<<<< 51737bf6ed2ca2ecab94e22c60dc7f88351419fc
<<<<<<< b217b43ddd7a0e5ddb6713a9e4acf50f4e540603
=======
>>>>>>> modified albums service, users now see reduced info from the fetch
>>>>>>> modified albums service, users now see reduced info from the fetch
  return fetch('https://jsonplaceholder.typicode.com/albums').then(response =>
    response.json().then(albums => {
      const titles = [];
      albums.forEach(album => {
<<<<<<< 7e6a1507e4c51f4df6bf2b449022f955e47453c0
<<<<<<< 51737bf6ed2ca2ecab94e22c60dc7f88351419fc
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
<<<<<<< c8729706048f6bc23d19346af955185803937897
<<<<<<< 56f7fcaf9fd287948249c8c08170302847c04adb
>>>>>>> modified albums service, users now see reduced info from the fetch
=======
=======
  return fetch('https://jsonplaceholder.typicode.com/albums').then(response => response.json());
>>>>>>> implemented list all albums with tests
>>>>>>> implemented list all albums with tests
=======
<<<<<<< 51737bf6ed2ca2ecab94e22c60dc7f88351419fc
=======
  return fetch('https://jsonplaceholder.typicode.com/albums').then(response => response.json());
>>>>>>> implemented list all albums with tests
=======
>>>>>>> modified albums service, users now see reduced info from the fetch
<<<<<<< 5d5b2db15f754c540eabb3fcf7a1737aa1af9746
>>>>>>> modified albums service, users now see reduced info from the fetch
=======
=======
  return new Promise(function(resolve, reject) {
    request(options, (error, response, body) => {
      if (error) reject(error);
      else {
        const albums = body.map(key => ({ id: key.id, title: key.title }));
        resolve(albums);
      }
    });
  });
>>>>>>> rebased from user_admin and fixed req changes, tests still missing
>>>>>>> rebased from user_admin and fixed req changes, tests still missing
};
