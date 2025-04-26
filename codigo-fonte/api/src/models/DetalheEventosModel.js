'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetalheEvento extends Model {
    static associate(models) {
      DetalheEvento.belongsTo(models.Eventos, {
        foreignKey: 'evento_id',
        as: 'evento'
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
    tem_marca_agua: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
