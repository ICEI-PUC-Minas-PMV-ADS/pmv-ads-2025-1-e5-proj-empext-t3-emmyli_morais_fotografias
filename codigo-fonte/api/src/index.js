// src/index.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/autenticacao/authRoutes');
const usuarioRoutes = require('./routes/usuario/usuarioRoutes');
const myAccountRoutes = require('./routes/usuario/myAccountRoutes');
const setupSwagger = require('./swagger');
const port = 3000;
require('dotenv').config();
const verifyToken = require('./middleware/AuthMiddlewareToken');


app.use(express.json());

// Configurar Swagger
setupSwagger(app);

// Rotas de autenticação
app.use('/api/auth', authRoutes); 
// Rota de usuário

//app.use('/api/usuarios', verifyToken, usuarioRoutes);
app.use('/api/usuarios', usuarioRoutes);

//Token obrigatorio nesse conjunto de rotas
app.use('/api/myAccount', verifyToken, myAccountRoutes);

// rota protegida
/*app.get('/protected', require('./middleware/AuthMiddlewareToken'), (req, res) => {
  res.json({ message: 'Acesso permitido!' });
});*/

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação da API disponível em http://localhost:${port}/api-docs`);
});
