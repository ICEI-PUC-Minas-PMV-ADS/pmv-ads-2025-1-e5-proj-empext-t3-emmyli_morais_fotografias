'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MarcaDagua extends Model {}

  MarcaDagua.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    imagem: {
      type: DataTypes.BLOB('long'),
      allowNull: false
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
    modelName: 'MarcaDagua',
    tableName: 'marca_dagua',
    timestamps: false
  });

  return MarcaDagua;
};
