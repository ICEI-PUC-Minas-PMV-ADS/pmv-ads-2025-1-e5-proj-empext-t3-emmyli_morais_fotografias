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
          constraints: false // <- Permite existir mesmo sem FK se for admin
        });
    }
  }

 AlbumFotos.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  album_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_foto: {
    type: DataTypes.INTEGER,
    allowNull: true // <- permite fluxo 2
  },
  foto_url: {
    type: DataTypes.STRING,
    allowNull: true // <- fluxo 2
  },
  origem: {
    type: DataTypes.ENUM('evento', 'admin'),
    allowNull: false,
    defaultValue: 'admin'
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
} 