const jwt = require('jsonwebtoken');
const cryptografyPassword = require('./cryptographServices');
const { Op } = require('sequelize');
const { Usuarios, App001 } = require('../models');
require('dotenv').config(); 

const SECRET_KEY = process.env.JWT_SECRET;

const AuthLogin = async ({ usernameOrEmail, password }) => {
  let user = await Usuarios.findOne({
    where: {
      [Op.or]: [{ login: usernameOrEmail }, { email: usernameOrEmail }]
    }
  });

  if (!user) {
    throw new Error('Usuário ou senha inválidos');
  }

  const isUserAdmin = user.tipo === 'fotografo';

  // Usando MD5 para verificar senha (se necessário mudar para bcrypt)
  const hashedPassword = cryptografyPassword(password);  
  const validPassword = user.senha_hash === hashedPassword;

  if (!validPassword) {
    throw new Error('Usuário ou senha inválidos');
  }

  // Gerar token JWT
  const token = jwt.sign(
    {
      idusuario: user.id,
      nome: user.nome,
      login: user.login,
      email: user.email,
      perfil: isUserAdmin ? 'FOTOGRAFO_ADM' : 'CLIENTE'
    },
    SECRET_KEY,
    { expiresIn: '1d' }
  );

  const tokenData = {
    token,
    dtexpiracao: new Date(Date.now() + 24 * 60 * 60 * 1000),
    dtinclusao: new Date(),
    dtalteracao: new Date()
  };

  // Atualiza ou cria o token no banco
  const existingToken = await App001.findOne({ where: { idusuario: user.id } });
  if (existingToken) {
    await App001.update(tokenData, { where: { idusuario: user.id } });
  } else {
    await App001.create({ idusuario: user.id, ...tokenData });
  }

  return { token, usuario: { id: user.id, nome: user.nome, login: user.login, email: user.email, perfil: user.tipo } };
};

const logoutService = async (idusuario) => {
  const result = await App001.destroy({ where: { idusuario } });
  if (result === 0) {
    throw new Error('Usuário não encontrado ou já deslogado');
  }
  return { message: 'Logout realizado com sucesso' };
};

module.exports = { AuthLogin, logoutService };
