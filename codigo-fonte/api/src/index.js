// src/index.js

require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/autenticacao/authRoutes');
const usuarioRoutes = require('./routes/usuario/usuarioRoutes');
const myAccountRoutes = require('./routes/usuario/myAccountRoutes');
const marcaDaguaRoutes = require('./routes/marcaDagua/marcaDaguaRoutes');
const produtosRoutes = require('./routes/produtos/produtosRoutes');
const eventosRoutes = require('./routes/eventos/eventosRoutes');

const vcRoutes = require('./routes/visualizacoesCurtidas/visualizacoesCurtidasRoutes');

const setupSwagger = require('./swagger');

const albunsRoutes = require('./routes/album/albumRoutes');
const fotoRoutes = require('./routes/foto/fotoRoutes')
const categoriasRouter = require('./routes/categoria/categoriasRoutes');

const port = 3000;
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

// Marca d'água
app.use('/api/marcaDagua', verifyToken, marcaDaguaRoutes);

// Albuns e fotos
app.use('/api/albuns', albunsRoutes);
app.use('/api/fotos', verifyToken, fotoRoutes);

// Categorias
app.use('/api/categorias', categoriasRouter);

// ** VISUALIZAÇÕES & CURTIDAS **
app.use('/api/visualizacoesCurtidas', vcRoutes);

//produtos
app.use('/api/produtos', verifyToken, produtosRoutes);

//Feedbacks
app.use('/api/feedbacks', require('./routes/feedback/feedbackRoutes'));  

//Comentários
app.use('/api/comentarios', verifyToken, require('./routes/comentario/comentariosRoutes'));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação da API disponível em http://localhost:${port}/api-docs`);
});
