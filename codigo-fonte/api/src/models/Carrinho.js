// models/Carrinho.js
module.exports = (sequelize, DataTypes) => {
  const Carrinho = sequelize.define('Carrinho', {
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    evento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    dtinclusao: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    dtalteracao: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'carrinho',
    timestamps: false
  });

  Carrinho.associate = (models) => {
    Carrinho.belongsTo(models.Usuarios, {
      foreignKey: 'usuario_id',
      as: 'usuario',
    });

    Carrinho.belongsTo(models.Eventos, {
      foreignKey: 'evento_id',
      as: 'evento',
    });

    Carrinho.hasMany(models.CarrinhoFotos, {
      foreignKey: 'carrinho_id',
      as: 'fotos',
      onDelete: 'CASCADE',
    });
  };

  return Carrinho;
};
