'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comentarios', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      detalheEventoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'detalhe_evento',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      Comentario: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      dtinclusao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      dtalteracao: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comentarios');
  }
};
