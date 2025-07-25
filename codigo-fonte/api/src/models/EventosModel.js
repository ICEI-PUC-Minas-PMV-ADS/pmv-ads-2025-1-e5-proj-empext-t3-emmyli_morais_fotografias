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

      Eventos.belongsTo(models.Categoria, {
        foreignKey: 'categoria_id',
        as: 'categoria',
        onDelete: 'SET NULL',
      });

      // N:N para Produto via EventoProduto
      Eventos.belongsToMany(models.Produto, {
        through: 'EventoProduto',
        foreignKey: 'eventoId',
        otherKey: 'produtoId',
        as: 'produtos',
      });

      // 1:N para CurtidaAlbum (ligações de curtidas de álbum ao evento)
      Eventos.hasMany(models.CurtidaAlbum, {
        foreignKey: 'evento_id',
        as: 'curtidasAlbuns',
        onDelete: 'CASCADE'
      });

      // 1:N para VisualizacaoAlbum (ligações de visualizações de álbum ao evento)
      Eventos.hasMany(models.VisualizacaoAlbum, {
        foreignKey: 'evento_id',
        as: 'visualizacoesAlbuns',
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
      
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data_evento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora_evento: {
      type: DataTypes.TIME,
      allowNull: true
    },
    local: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    categoria_id: {                
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categorias',
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
