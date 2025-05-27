'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetalheEvento extends Model {
    static associate(models) {
      DetalheEvento.belongsTo(models.Eventos, {
        foreignKey: 'evento_id',
        as: 'evento'
      });

       // ← curtidas de foto
      DetalheEvento.hasMany(models.CurtidaFoto, {
        foreignKey: 'id_foto',
        as: 'curtidasFotos',
        onDelete: 'CASCADE',
      });

      DetalheEvento.hasMany(models.Comentarios, {
        foreignKey: 'detalheEventoId',
        as: 'comentarios'
      });
    }
  }

  DetalheEvento.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    evento_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    foto: {
      type: DataTypes.TEXT,
      allowNull: false
    },    
    ordem: {
      type: DataTypes.INTEGER
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
    modelName: 'DetalheEvento',
    tableName: 'detalhe_evento',
    timestamps: false
  });

  return DetalheEvento;
};
