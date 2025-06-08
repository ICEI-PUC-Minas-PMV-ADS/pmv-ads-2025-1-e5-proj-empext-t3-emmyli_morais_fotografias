'use strict';
module.exports = (sequelize, DataTypes) => {
  const CurtidaAlbum = sequelize.define('CurtidaAlbum', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    evento_id: {              // antes era album_id
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
    tableName: 'curtidas_album',
    timestamps: false,

  });

  CurtidaAlbum.associate = models => {
    CurtidaAlbum.belongsTo(models.Eventos, {
      foreignKey: 'evento_id',
      as: 'evento'
    });
  };

  return CurtidaAlbum;
};