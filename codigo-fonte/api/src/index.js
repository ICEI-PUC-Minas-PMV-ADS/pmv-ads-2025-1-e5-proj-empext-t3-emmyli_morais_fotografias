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
const feedbackRoutes = require('./routes/feedback/feedbackRoutes');
const comentarioRoutes = require('./routes/comentario/comentariosRoutes');
const eventoProdutoRoutes = require('./routes/evento_produto/evento_produtoRoutes');
const carrinhoRoutes = require('./routes/carrinho/carrinhoRoutes')
const vcRoutes = require('./routes/visualizacoesCurtidas/visualizacoesCurtidasRoutes');
const pagamentoRoutes = require('./routes/pagamento/pagamentoRoutes');
const webhookRoutes = require('./routes/webhook/WebhookRoutes');
const comprasRoutes = require('./routes/compras/comprasRoutes');
const notificacaoRoutes = require('./routes/notificacao/notificacaoRoutes');

const setupSwagger = require('./swagger');

const albunsRoutes = require('./routes/album/albumRoutes');
const fotoRoutes = require('./routes/foto/fotoRoutes')
const categoriasRouter = require('./routes/categoria/categoriasRoutes');

const port = 3000;
const verifyToken = require('./middleware/AuthMiddlewareToken');

const cors = require('cors');
const path = require('path');


 /*app.use(cors({
  origin: 'http://localhost:5173', // Permite somente seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
})); */

const allowedOrigins = [
  
  'https://emmylifotografias.com.br',
  'http://localhost:5173'
  //'https://9e73-2804-540-d005-4f00-b826-b9f7-d508-dd0a.ngrok-free.app', // backend ngrok URL
  //'https://45a9-2804-540-d005-4f00-b826-b9f7-d508-dd0a.ngrok-free.app'  // frontend ngrok URL
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // permite Postman, curl etc
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
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

//eventos
app.use('/api/eventos', eventosRoutes);

//Feedbacks
app.use('/api/feedbacks', feedbackRoutes);  

//Comentários
app.use('/api/comentarios', verifyToken, comentarioRoutes);

//EventoProduto 
app.use('/api/EventoProduto', verifyToken, eventoProdutoRoutes);

//Carrinho 
app.use('/api/Carrinho', verifyToken, carrinhoRoutes);

//Pagamento 
app.use('/api/pagamento', verifyToken, pagamentoRoutes);

//Compra
app.use('/api/compras', comprasRoutes);

//Webhook
app.use('/api/webhook', webhookRoutes);

//Notificações
app.use('/api/notificacao', notificacaoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação da API disponível em http://localhost:${port}/api-docs`);
});
