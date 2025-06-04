'use strict';
module.exports = (sequelize, DataTypes) => {
  const VisualizacaoAlbum = sequelize.define('VisualizacaoAlbum', {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    evento_id: {            
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'evento_id'
      },

    ip_usuario: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'ip_usuario'
    },

    dtinclusao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'dtinclusao'
    }

  }, {
    tableName: 'visualizacoes',  
    timestamps: false
  });

  VisualizacaoAlbum.associate = (models) => {
    VisualizacaoAlbum.belongsTo(models.Albuns, {
      foreignKey: 'evento_id',
      as: 'evento'
    });
  };

  return VisualizacaoAlbum;
};
