'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Eventos extends Model {
    static associate(models) {
      // Associação com DetalheEvento (1:N)
      Eventos.hasMany(models.DetalheEvento, {
        foreignKey: 'evento_id',
        as: 'detalhes',
        onDelete: 'CASCADE'
      });

      // Associação com MarcaDagua (N:1)
      Eventos.belongsTo(models.MarcaDagua, {
        foreignKey: 'idmarcadagua',
        as: 'marcaDagua',
        onDelete: 'SET NULL'
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
    exibirtrabalho: {             
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    idmarcadagua: {                
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'marca_dagua',
        key: 'id'
      }
    },
    urlevento: {
      type: DataTypes.TEXT
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
