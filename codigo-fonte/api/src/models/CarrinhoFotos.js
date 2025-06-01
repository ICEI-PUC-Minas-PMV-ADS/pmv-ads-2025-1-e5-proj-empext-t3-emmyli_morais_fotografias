// models/CarrinhoFoto.js
module.exports = (sequelize, DataTypes) => {
  const CarrinhoFotos = sequelize.define('CarrinhoFotos', {
    carrinho_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_foto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dtinclusao: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    dtalteracao: {
      type: DataTypes.DATE
    },
  },
  {
    tableName: 'carrinho_fotos',
    timestamps: false,
    underscored: true,
  });

  CarrinhoFotos.associate = (models) => {
    CarrinhoFotos.belongsTo(models.Carrinho, {
      foreignKey: 'carrinho_id',
      as: 'carrinho',
      onDelete: 'CASCADE',
    });

    CarrinhoFotos.belongsTo(models.DetalheEvento, {
      foreignKey: 'id_foto',
      as: 'foto',
      onDelete: 'CASCADE',
    });
  };

  return CarrinhoFotos;
};
