'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ItensCompra extends Model {
    static associate(models) {
      ItensCompra.belongsTo(models.Compras, {
        foreignKey: 'compra_id',
        as: 'compra',
        onDelete: 'CASCADE'
      });

      ItensCompra.belongsTo(models.Produto, {
        foreignKey: 'produto_id',
        as: 'produto',
        onDelete: 'CASCADE'
      });
    }
  }

  ItensCompra.init({
    compra_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    produto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
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
    modelName: 'ItensCompra',
    tableName: 'itens_compra',
    timestamps: false
  });

  return ItensCompra;
};
