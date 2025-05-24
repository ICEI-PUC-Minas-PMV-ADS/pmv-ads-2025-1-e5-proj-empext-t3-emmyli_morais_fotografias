const jwt = require('jsonwebtoken');
const cryptografyPassword = require('./cryptographServices');
const { Op } = require('sequelize');
const { Usuarios, App001 } = require('../models');
const {sendResetPasswordEmail} = require('./emailService')
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

const cincoDiasEmSegundos = 5 * 24 * 60 * 60 
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
  const token = gerarToken(
    {
      idusuario: user.id,
      nome: user.nome,
      login: user.login,
      email: user.email,
      perfil: isUserAdmin ? 'FOTOGRAFO_ADM' : 'CLIENTE'
    }
  );

  // Refresh Token JWT

  const refreshToken = gerarRefreshToken(
    {
      idusuario: user.id
    },
    cincoDiasEmSegundos
  );

  const refreshTokenData = {
    token: refreshToken.informacao,
    dtexpiracao: new Date(Date.now() + refreshToken.expiresIn * 1000),
    dtinclusao: new Date(),
    dtalteracao: new Date()
  };

  // Atualiza ou cria o token no banco
  const existingToken = await App001.findOne({ where: { idusuario: user.id } });
  if (existingToken) {
    await App001.update(refreshTokenData, { where: { idusuario: user.id } });
  } else {
    await App001.create({ idusuario: user.id, ...refreshTokenData });
  }

  return { token, refreshToken, usuario: { id: user.id, nome: user.nome, login: user.login, email: user.email, perfil: user.tipo } };
};

const refreshTokenService = async (refreshTokenRecebido) => {
  if (!refreshTokenRecebido) {
    throw new Error('Refresh token não recebido');
  }

  let veriryToken;
  try {
    veriryToken = jwt.verify(refreshTokenRecebido, SECRET_KEY, { auddience: "REFRESH" });
  } catch (erro) {
    throw new Error('Refresh token inválido ou expirado')
  }

  const existingToken = await App001.findOne({ where: { idusuario: veriryToken.idusuario } });

  if (!existingToken || existingToken.token !== refreshTokenRecebido) {
    throw new Error('Refresh token inválido ou expirado');
  }

  const user = await Usuarios.findOne({ where: { id: veriryToken.idusuario } })
  
  const isUserAdmin = user.tipo === 'fotografo';
  
  const novoToken = gerarToken(
    {
      idusuario: user.id,
      nome: user.nome,
      login: user.login,
      email: user.email,
      perfil: isUserAdmin ? 'FOTOGRAFO_ADM' : 'CLIENTE'
    }
  );
  
  const novoRefreshToken = gerarRefreshToken(
    {
      idusuario: user.id
    },
    cincoDiasEmSegundos
  );

  const refreshTokenData = {
    token: novoRefreshToken.informacao,
    dtexpiracao: new Date(Date.now() + novoRefreshToken.expiresIn * 1000),
    dtinclusao: new Date(),
    dtalteracao: new Date()
  };

  await App001.update(refreshTokenData, { where: { idusuario: user.id } });

  return { token: novoToken, refreshToken: novoRefreshToken }
}

const logoutService = async (idusuario) => {
  const result = await App001.destroy({ where: { idusuario } });
  if (result === 0) {
    throw new Error('Usuário não encontrado ou já deslogado');
  }
  return { message: 'Logout realizado com sucesso' };
};

const forgotPasswordService = async ( email ) => {
	 const user = await Usuarios.findOne({
    where: {
      email: email 
    }
  });

	if (!user)
		return;

  const dezMinutosEmSegundos = 10 * 60
	const emailToken = gerarRefreshToken(
    {
      idusuario: user.id
    },
    dezMinutosEmSegundos
  );

  const emailTokenData = {
    token: emailToken.informacao,
    dtexpiracao: new Date(Date.now() + emailToken.expiresIn * 1000),
    dtinclusao: new Date(),
    dtalteracao: new Date()
  };
  
  const existingToken = await App001.findOne({ where: { idusuario: user.id } });
  if (existingToken) {
    await App001.update(emailTokenData, { where: { idusuario: user.id } });
  } else {
    await App001.create({ idusuario: user.id, ...emailTokenData });
  }

  sendResetPasswordEmail(emailToken.informacao, user.nome, user.email)
}


const quinzeMinutosEmSegundos = 15 * 60


const gerarToken = (data) => {
  const informacao = jwt.sign(
    data,
    SECRET_KEY,
    { expiresIn: quinzeMinutosEmSegundos, audience: "ACCESS" }
  )
  return {
    informacao, 
    expiresIn: quinzeMinutosEmSegundos
  };
}


const gerarRefreshToken = (data, tempoExpiracao) => {
  const informacao = jwt.sign(
    data,
    SECRET_KEY, { expiresIn: tempoExpiracao, audience: "REFRESH" }
  )
  return {
    informacao,
    expiresIn: tempoExpiracao
  }
  
}


module.exports = { AuthLogin, logoutService, refreshTokenService, forgotPasswordService };
