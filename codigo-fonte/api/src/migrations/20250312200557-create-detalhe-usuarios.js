"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("detalhe_usuarios", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      rua: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cep: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      cidade: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      cart_identidade: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      cpf: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
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
    await queryInterface.dropTable("detalhe_usuarios");
  },
};
