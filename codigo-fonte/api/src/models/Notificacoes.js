'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notificacao extends Model {
    static associate(models) {
      // Adicione associações aqui, se necessário
    }
  }

  Notificacao.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    topico: {
      type: DataTypes.STRING,
      allowNull: false
    },
    acao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    local_acao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    foiVisualizado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Notificacao',
    tableName: 'notificacoes',
    timestamps: false
  });

  return Notificacao;
};
