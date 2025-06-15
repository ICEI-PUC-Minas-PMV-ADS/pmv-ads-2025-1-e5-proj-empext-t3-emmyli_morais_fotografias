'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Dropar tabela existente, se houver
    await queryInterface.dropTable('album_fotos', { force: true }).catch(() => {
      console.warn('Tabela album_fotos não existia ao tentar dropar.');
    });

    // 2. Criar nova estrutura
    await queryInterface.createTable('album_fotos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      album_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'albuns',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      id_foto: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'detalhe_evento',
          key: 'id'
        },
        onDelete: 'SET NULL'
      },
      foto_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      origem: {
        type: Sequelize.ENUM('evento', 'admin'),
        allowNull: false,
        defaultValue: 'admin'
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
    await queryInterface.dropTable('album_fotos');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_album_fotos_origem;');
  }
};
