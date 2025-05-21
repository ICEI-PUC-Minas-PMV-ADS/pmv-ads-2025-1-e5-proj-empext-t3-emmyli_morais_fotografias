'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pagamentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      compra_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'compras',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      metodo: {
        type: Sequelize.STRING(10),
        allowNull: false,
        validate: {
          isIn: [['pix', 'picpay', 'boleto']]
        }
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'pendente',
        validate: {
          isIn: [['pendente', 'pago', 'cancelado']]
        }
      },
      dtpagamento: {
        type: Sequelize.DATE
      },
      dtestorno: {
        type: Sequelize.DATE
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pagamentos');
  }
};
