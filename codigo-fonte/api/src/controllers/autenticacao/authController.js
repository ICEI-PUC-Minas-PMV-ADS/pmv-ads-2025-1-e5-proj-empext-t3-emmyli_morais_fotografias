const { AuthLogin, logoutService } = require('../../service/authService');

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
  const { idusuario } = req.body;

  try {
    const result = await logoutService(idusuario);
    return res.json(result);
  } catch (error) {
    console.error('Erro ao deslogar:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { login, logout };
