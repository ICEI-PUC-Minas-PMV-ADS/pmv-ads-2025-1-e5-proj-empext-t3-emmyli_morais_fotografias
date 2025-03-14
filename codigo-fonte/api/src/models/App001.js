
module.exports = (sequelize, DataTypes) => {
    const App001 = sequelize.define('App001', {
        idusuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },    
          token: {
            type: DataTypes.STRING(300),
            allowNull: false
          },
          dtexpiracao: {
            type: DataTypes.DATE,
            allowNull: true
          },
          dtinclusao: {
            type: DataTypes.DATE,
            allowNull: true
          },
          dtalteracao: {
            type: DataTypes.DATE,
            allowNull: true
          }
    }, {
      tableName: 'app001',
      timestamps: false
    });
  
    /*DetalheUsuario.associate = (models) => {
      DetalheUsuario.belongsTo(models.Usuario, {
        foreignKey: 'idusuario',
        as: 'usuario',
        onDelete: 'CASCADE'
      });
    };*/
  
    return App001;
  };
  
