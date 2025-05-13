'use strict';
module.exports = (sequelize, DataTypes) => {
  const VisualizacaoAlbum = sequelize.define("VisualizacaoAlbum", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING(100)
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: "visualizacoes_albuns",
    timestamps: false
  });

  VisualizacaoAlbum.associate = (models) => {
    VisualizacaoAlbum.belongsTo(models.Albuns, {
      foreignKey: 'album_id',
      as: 'album'
    });
  };

  return VisualizacaoAlbum;
};
