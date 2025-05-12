'use strict';
module.exports = (sequelize, DataTypes) => {
  const CurtidaAlbum = sequelize.define("CurtidaAlbum", {
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
    tableName: "curtidas_albuns",
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
