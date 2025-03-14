const express = require('express');
const router = express.Router();
const usuariosController = require('../../controllers/usuario/usuariosController');

const verifyToken = require('../../middleware/AuthMiddlewareToken');

// Rotas padrão do CRUD

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuarios:
 *       type: object
 *       required:
 *         - id *         
 *       properties:
 *         id:
 *           type: integer
 *           description: Número de identifação do usuário
 *         nome:
 *           type: integer
 *           description: Nome do Usuário
 *         email:
 *           type: string
 *           description: Email do Usuário
 *         login:
 *           type: string
 *           description: Login do Usuário
 *         senha_hash:
 *           type: string
 *           description: Senha do Usuário
 *         tipo:
 *           type: string
 *           description: Tipo deperfil do usuário (fotografo ou cliente)
 *        
 *         detalhe_usuario:
 *           type: object
 *           description: Associação com a tabela  (`detalheusuario`)
 *           $ref: '#/components/schemas/DetalheUsuario'
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     DetalheUsuario:
 *       type: object
 *       required:
 *         - idusuario         
 *       properties:
 *         idusuario:
 *           type: integer
 *           description: Número de identifação do usuário
 *         rua:
 *           type: string
 *           description: Rua endereço do Usuário
 *         numero:
 *           type: string
 *           description: Número endereço do Usuário
 *         cep:
 *           type: integer
 *           description: Cep endereço do Usuário
 *         bairro:
 *           type: string
 *           description: Bairro endereço do Usuário
 *         cidade:
 *           type: string
 *           description: Cidade endereço do Usuário        
 *         cart_identidade:
 *           type: string
 *           description: Carteira  do Usuário
 *         cpf:
 *           type: string
 *           description: CPF Usuário
 */

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gerenciamento de Usuários.
 */

router.get('/', usuariosController.getAll);
/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtém informações de um usuário específico
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificação do usuário
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuarios'
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', usuariosController.getById);
/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuarios'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post('/', usuariosController.create);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualiza informações de um usuário específico
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificação do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuarios'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar usuário
 */
router.put('/:id', usuariosController.update);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário específico
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificação do usuário *       
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       400:
 *         description: Erro ao deletar usuário
 */
router.delete('/:id', usuariosController.delete);

// Rota específica para pegar perfil do usuário
//router.get('/:id/perfil', usuariosController.getProfile);

module.exports = router;
