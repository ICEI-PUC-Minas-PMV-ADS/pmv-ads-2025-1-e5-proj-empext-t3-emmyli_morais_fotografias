module.exports = (sequelize, DataTypes) => {
  class EventoProduto extends sequelize.Sequelize.Model {
    static associate(models) {

      EventoProduto.belongsTo(models.Produto, {
        foreignKey: 'produtoId',
        as: 'produto',
        onDelete: 'CASCADE'
      });

      EventoProduto.belongsTo(models.Eventos, {
        foreignKey: 'eventoId',
        as: 'evento',
        onDelete: 'CASCADE'
      });
    }
  }

  EventoProduto.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    eventoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dtinclusao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    dtalteracao: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'EventoProduto',
    tableName: 'evento_produto',
    timestamps: false
  });

  return EventoProduto;
};
