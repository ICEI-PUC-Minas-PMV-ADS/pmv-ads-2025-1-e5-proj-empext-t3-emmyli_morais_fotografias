module.exports = (sequelize, DataTypes) => {
    const Produto = sequelize.define('Produto', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      descricao: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      quantidade_fotos: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      /*id_evento: {
        type: DataTypes.INTEGER,
        allowNull: false
      },*/
      ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      criado_em: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      dtinclusao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      dtalteracao: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'produto',
      timestamps: false
    });
  
    /*Produto.associate = (models) => {
      Produto.belongsTo(models.Eventos, {
        foreignKey: 'id_evento',
        as: 'evento',
        onDelete: 'CASCADE'
      });
    };*/
  
    return Produto;
  };
  