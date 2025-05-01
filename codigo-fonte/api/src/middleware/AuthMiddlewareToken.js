const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("A chave secreta JWT_SECRET não está definida no ambiente.");
}

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(403).json({ error: 'Token não fornecido ou inválido' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
      }

      // Adiciona os dados do token ao request para uso posterior
      req.userId = decoded.idusuario;      
      next();
    });

  } catch (error) {
    console.error('Erro na verificação do token:', error);
    return res.status(500).json({ error: 'Erro interno na autenticação' });
  }
};

module.exports = verifyToken;
