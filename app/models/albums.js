const errors = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const albums = sequelize.define(
    'albums',
    {
      ownedBy: { type: DataTypes.STRING, allowNull: false },
      album: { type: DataTypes.STRING, allowNull: false },
      albumId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {}
  );
  albums.associate = function(models) {
    // associations can be defined here
  };

  albums.listEntries = owner =>
    albums.findAll({ where: { ownedBy: owner } }).catch(err => {
      throw errors.defaultDatabase(err);
    });

  albums.newEntry = album =>
    albums.create(album).catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw errors.entryAlreadyExists();
      }
      throw errors.defaultDatabase(err);
    });

  albums.findEntry = (owner, title) =>
    albums.findOne({ where: { ownedBy: owner, album: title } }).catch(err => {
      throw errors.defaultDatabase(err);
    });

  albums.findEntryById = (owner, id) =>
    albums.findOne({ where: { ownedBy: owner, albumId: id } }).catch(err => {
      throw errors.defaultDatabase(err);
    });

  return albums;
};
