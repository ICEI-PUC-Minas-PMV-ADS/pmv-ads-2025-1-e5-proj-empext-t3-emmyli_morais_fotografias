'use strict';
module.exports = (sequelize, DataTypes) => {
  const CurtidaAlbum = sequelize.define('CurtidaAlbum', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'curtidas_album',  
    timestamps: false
  });

  CurtidaAlbum.associate = (models) => {
    CurtidaAlbum.belongsTo(models.Albuns, {
      foreignKey: 'album_id',
      as: 'album'
    });
  };

  return CurtidaAlbum;
};
