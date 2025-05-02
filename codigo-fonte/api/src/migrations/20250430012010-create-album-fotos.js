'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('album_fotos', {
      album_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'albuns',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      id_foto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'detalhe_evento',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      dtinclusao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      dtalteracao: {
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('album_fotos');
  }
};

