'use strict';
module.exports = (sequelize, DataTypes) => {
  const CurtidaFoto = sequelize.define("CurtidaFoto", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_foto: {
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
    tableName: "curtidas_fotos",
    timestamps: false
  });

  CurtidaFoto.associate = (models) => {
    CurtidaFoto.belongsTo(models.DetalheEvento, {
      foreignKey: 'id_foto',
      as: 'foto'
    });
  };

  return CurtidaFoto;
};
