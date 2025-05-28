const { AuthLogin, logoutService, refreshTokenService, forgotPasswordService } = require('../../service/authService');
const {sendCotnatoEmail} = require('../../service/emailService')
const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    const result = await AuthLogin({ usernameOrEmail, password });
    return res.json(result);
  } catch (error) {
    console.error('Erro ao autenticar:', error.message);
    return res.status(401).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const result = await logoutService(req.userId);
    return res.json(result);
  } catch (error) {
    console.error('Erro ao deslogar:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const result = await refreshTokenService(req.body.refreshToken);
    return res.json(result);
  } catch (error) {
    console.error('Erro ao refrescar token:', error.message);
    return res.status(401).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    await forgotPasswordService(req.body.email);
    return res.status(204).json();
  } catch (error) {
    console.error('Erro ao enviar email:', error.message);
    return res.status(400).json({ message: error.message });
  }
};

const contatoEmail = async (req, res) => {
  try {
    await sendCotnatoEmail(req.body.email, req.body.nome,);
    return res.status(204).json();
  } catch (error) {
    console.error('Erro ao enviar email:', error.message);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { login, logout, refreshToken, forgotPassword,contatoEmail };
