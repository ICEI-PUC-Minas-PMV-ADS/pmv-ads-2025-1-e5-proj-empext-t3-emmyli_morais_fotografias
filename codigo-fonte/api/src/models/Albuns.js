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

