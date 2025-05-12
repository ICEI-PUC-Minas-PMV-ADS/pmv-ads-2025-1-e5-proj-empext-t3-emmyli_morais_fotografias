// src/models/Categoria.js
module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define(
    "Categoria",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      }
    },
    {
      tableName: "categorias",
      timestamps: false    // <-- desliga o createdAt / updatedAt
    }
  );

  return Categoria;
};
