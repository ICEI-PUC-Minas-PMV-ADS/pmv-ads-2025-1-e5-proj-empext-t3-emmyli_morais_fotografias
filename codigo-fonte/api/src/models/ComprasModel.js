'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Compras extends Model {
    static associate(models) {
      Compras.belongsTo(models.Usuarios, {
        foreignKey: 'usuario_id',
        as: 'usuario',
        onDelete: 'CASCADE'
      });

      Compras.belongsTo(models.Eventos, {
        foreignKey: 'idevento',
        as: 'evento',
        onDelete: 'CASCADE'
      });

      Compras.hasMany(models.ItensCompra, {
        foreignKey: 'compra_id',
        as: 'itens',
        onDelete: 'CASCADE'
      });
    }
  }

  Compras.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idevento: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dtinclusao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    dtalteracao: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Compras',
    tableName: 'compras',
    timestamps: false
  });

  return Compras;
};
