const express = require('express');
const router = express.Router();
const albunsController = require('../../controllers/album/AlbumController');
const verifyToken = require('../../middleware/AuthMiddlewareToken');

const upload = require('../../middleware/UploadImage');

// Agora aplicamos o middleware "upload.array('fotos')" no POST


// Rotas padrão do CRUD

/**
 * @swagger
 * components:
 *   schemas:
 *     Albuns:
 *       type: object
 *       required:
 *         - id * 
 *         - id_usuario *
 *         - nome *         
 *       properties:
 *         id:
 *           type: integer
 *           description: Número de identifação do album
 *         id_usuario:
 *           type: integer
 *           description: Número de identifação do Usuário para album
 *         nome:
 *           type: string
 *           description: Nome do Album
 *         descricao:
 *           type: string
 *           description: Descrição do Album
 *         origem:
 *           type: string
 *           description: Data Album
 *         categoria_id:
 *           type: integer
 *           description: Número de indentificação da catergoria
 *         downloadfoto:
 *           type: bolean
 *           description: Campo de controle para download de fotos 
 *           $ref: '#/components/schemas/Albuns'
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Categorias:
 *       type: object
 *       required:
 *         - id        
 *       properties:
 *         id:
 *           type: integer
 *           description: Número de identifação da categoria
 *         nome:
 *           type: string
 *           description: Nome da categoria
 */

/**
 * @swagger
 * tags:
 *   name: Albuns
 *   description: Gerenciamento de Albuns.
 */

/**
 * @swagger
 * /api/albuns/:
 *   get:
 *     summary: Retorna a lista de Albuns
 *     tags: [Albuns]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Albuns'
 */
router.get('/', albunsController.getAll);

/**
 * @swagger
 * /api/albuns/{id}:
 *   get:
 *     summary: Obtém um album pelo ID
 *     tags: [Albuns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Album
 *     responses:
 *       200:
 *         description: Album encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Albuns'
 *       404:
 *         description: Album não encontrado
 */

router.get('/:id', albunsController.getById);


/**
 * @swagger
 * /api/albuns:
 *   post:
 *     summary: Cria um novo Album
 *     tags: [Albuns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Albuns'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Albuns'
 *       500:
 *         description: Erro ao criar categoria
 */
router.post('/', verifyToken, upload.array('fotos'), albunsController.create);

/**
 * @swagger
 * /api/albuns/{id}:
 *   put:
 *     summary: Atualiza um Album existente
 *     tags: [Albuns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Album a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Albuns'
 *     responses:
 *       200:
 *         description: Album atualizado com sucesso
 *       404:
 *         description: Album não encontrado
 *       500:
 *         description: Erro ao atualizar Album
 */
router.put('/:id', verifyToken, albunsController.update);


/**
 * @swagger
 * /api/albuns/{id}:
 *   delete:
 *     summary: Deleta um Album pelo ID
 *     tags: [Albuns]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do Album a ser excluído
 *     responses:
 *       200:
 *         description: Album excluído com sucesso
 *       404:
 *         description: Album não encontrado
 *       500:
 *         description: Erro ao excluir Album
 */
router.delete('/:id', verifyToken, albunsController.delete);

module.exports = router;
