'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('compras', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      idevento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'eventos',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      dtinclusao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      dtalteracao: {
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('itens_compra', {
      compra_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'compras',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      produto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'produto',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      dtinclusao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      dtalteracao: {
        type: Sequelize.DATE
      },
    });

    await queryInterface.addConstraint('itens_compra', {
      fields: ['compra_id', 'produto_id'],
      type: 'primary key',
      name: 'pk_itens_compra'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('itens_compra');
    await queryInterface.dropTable('compras');
  }
};
