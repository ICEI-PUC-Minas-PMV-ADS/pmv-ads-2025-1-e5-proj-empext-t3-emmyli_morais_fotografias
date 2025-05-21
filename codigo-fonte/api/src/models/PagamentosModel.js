'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pagamentos extends Model {
    static associate(models) {
      Pagamentos.belongsTo(models.Compras, {
        foreignKey: 'compra_id',
        as: 'compra',
        onDelete: 'CASCADE'
      });
    }
  }

  Pagamentos.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    compra_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    metodo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isIn: [['pix', 'picpay', 'boleto']]
      }
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'pendente',
      validate: {
        isIn: [['pendente', 'pago', 'cancelado']]
      }
    },
    dtpagamento: {
      type: DataTypes.DATE
    },
    dtestorno: {
      type: DataTypes.DATE
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
    modelName: 'Pagamentos',
    tableName: 'pagamentos',
    timestamps: false
  });

  return Pagamentos;
};
