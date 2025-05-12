'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Albuns extends Model {
    static associate(models) {
      Albuns.belongsTo(models.Usuarios, {
        foreignKey: 'usuario_id',
        as: 'usuario',
        onDelete: 'CASCADE',
      });

      Albuns.hasMany(models.AlbumFotos, {
        foreignKey: 'album_id',
        as: 'fotos',
        onDelete: 'CASCADE',
      });

      // ← associações para visualizações e curtidas de álbum
      Albuns.hasMany(models.VisualizacaoAlbum, {
        foreignKey: 'album_id',
        as: 'visualizacoesAlbuns',
        onDelete: 'CASCADE',
      });

      Albuns.hasMany(models.CurtidaAlbum, {
        foreignKey: 'album_id',
        as: 'curtidasAlbuns',
        onDelete: 'CASCADE',
      });
    }
  }

  Albuns.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    origem: {
      type: DataTypes.STRING(50),
      defaultValue: 'cliente'
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
    modelName: 'Albuns',
    tableName: 'albuns',
    timestamps: false
  });

  return Albuns;
};
