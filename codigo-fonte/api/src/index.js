// src/index.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/autenticacao/authRoutes');
const usuarioRoutes = require('./routes/usuario/usuarioRoutes');
const myAccountRoutes = require('./routes/usuario/myAccountRoutes');
const marcaDaguaRoutes = require('./routes/marcaDagua/marcaDaguaRoutes');
const produtosRoutes = require('./routes/produtos/produtosRoutes');
const setupSwagger = require('./swagger');
const port = 3000;
require('dotenv').config();
const verifyToken = require('./middleware/AuthMiddlewareToken');

const cors = require('cors');
const path = require('path');


app.use(cors({
  origin: 'http://localhost:5173', // Permite somente seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.use(express.json());

// Configurar Swagger
setupSwagger(app);

// Rotas de autenticação
app.use('/api/auth', authRoutes); 
// Rota de usuário

app.use('/api/usuarios', usuarioRoutes);

// app.use('/api/marcaDagua', marcaDaguaRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Token obrigatorio nesse conjunto de rotas
app.use('/api/myAccount', verifyToken, myAccountRoutes);

// rota protegida
/*app.get('/protected', require('./middleware/AuthMiddlewareToken'), (req, res) => {
  res.json({ message: 'Acesso permitido!' });
});*/

// rota protegida
app.use('/api/marcaDagua', verifyToken, marcaDaguaRoutes);


//produtos

app.use('/api/produtos', verifyToken, produtosRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação da API disponível em http://localhost:${port}/api-docs`);
});
