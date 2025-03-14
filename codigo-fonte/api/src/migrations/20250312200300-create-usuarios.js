"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuarios", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      login: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      senha_hash: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM("fotografo", "cliente"),
        allowNull: false,
      },
      dtinclusao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      dtalteracao: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("usuarios");
  },
};
