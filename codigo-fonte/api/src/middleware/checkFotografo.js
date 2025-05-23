// Verifica se o usuário é um fotógrafo
// e permite o acesso a rotas específicas

const jwt = require('jsonwebtoken');

module.exports = function checkFotografo(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    if (decoded.perfil !== 'FOTOGRAFO_ADM') {
      return res.status(403).json({ error: 'Apenas admins podem realizar esta ação' });
    }

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};
