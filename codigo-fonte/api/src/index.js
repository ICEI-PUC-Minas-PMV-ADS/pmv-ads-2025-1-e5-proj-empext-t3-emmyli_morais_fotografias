// src/index.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/autenticacao/authRoutes');
const usuarioRoutes = require('./routes/usuario/usuarioRoutes');
const marcaDaguaRoutes = require('./routes/marcaDagua/marcaDaguaRoutes');
const setupSwagger = require('./swagger');
const port = 3000;
require('dotenv').config();
const verifyToken = require('./middleware/AuthMiddlewareToken');

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Permite somente seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

// Middleware para parsear JSON
app.use(express.json());

// Configurar Swagger
setupSwagger(app);

// Rotas de autenticação
app.use('/api/auth', authRoutes); 
// Rota de usuário

//app.use('/api/usuarios', verifyToken, usuarioRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.use('/api/marcaDagua', marcaDaguaRoutes);


// rota protegida
/*app.get('/protected', require('./middleware/AuthMiddlewareToken'), (req, res) => {
  res.json({ message: 'Acesso permitido!' });
});*/


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação da API disponível em http://localhost:${port}/api-docs`);
});
