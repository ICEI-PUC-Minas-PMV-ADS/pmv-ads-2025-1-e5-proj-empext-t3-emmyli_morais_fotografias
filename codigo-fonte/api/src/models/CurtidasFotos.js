'use strict';
module.exports = (sequelize, DataTypes) => {
  const CurtidaFoto = sequelize.define('CurtidaFoto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_foto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id_foto'
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
    tableName: 'curtidas_foto', 
    timestamps: false
  });

  CurtidaFoto.associate = models => {
    CurtidaFoto.belongsTo(models.DetalheEvento, {
      foreignKey: 'id_foto',
      as: 'foto'
    });
  };

  return CurtidaFoto;
};
