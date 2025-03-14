'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('app001', {
      idusuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      token: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      dtexpiracao: {
        type: Sequelize.DATE,
        allowNull: true
      },
      dtinclusao: {
        type: Sequelize.DATE,
        allowNull: true
      },
      dtalteracao: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('app001');
  }
};
