'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Eventos extends Model {
    static associate(models) {
      Eventos.hasMany(models.DetalheEvento, {
        foreignKey: 'evento_id',
        as: 'detalhes',
        onDelete: 'CASCADE'
      });
    }
  }

  Eventos.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT
    },
    data_evento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora_evento: {
      type: DataTypes.TIME
    },
    local: {
      type: DataTypes.STRING(255)
    },
    publico: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    modelName: 'Eventos',
    tableName: 'eventos',
    timestamps: false
  });

  return Eventos;
};
