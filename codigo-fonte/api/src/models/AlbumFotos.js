'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AlbumFotos extends Model {
    static associate(models) {
      AlbumFotos.belongsTo(models.Albuns, {
        foreignKey: 'album_id',
        as: 'album',
        onDelete: 'CASCADE'
      });

      AlbumFotos.belongsTo(models.DetalheEvento, {
        foreignKey: 'id_foto',
        as: 'foto',
        onDelete: 'CASCADE'
      });
    }
  }

  AlbumFotos.init({
    album_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_foto: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    dtinclusao: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    dtalteracao: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'AlbumFotos',
    tableName: 'album_fotos',
    timestamps: false
  });

  return AlbumFotos;
};
