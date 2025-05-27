const express = require('express');
const router = express.Router();
const Api_Controller = require('../../controllers/Api_Controller');
const comentarioController = new Api_Controller('Comentarios');

/**
 * @swagger
 * components:
 *   schemas:
 *     Comentarios:
 *       type: object
 *       required:
 *         - id
 *         - usuarioId
 *         - fotoId
 *         - comentario
 *         - exibirComentario
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único do comentário
 *         usuarioId:
 *           type: integer
 *           description: ID do usuário que fez o comentário
 *         fotoId:
 *           type: integer
 *           description: ID da foto relacionada ao comentário
 *         comentario:
 *           type: string
 *           description: Texto do comentário
 *         exibirComentario:
 *           type: boolean
 *           description: Indica se o comentário deve ser exibido publicamente
 *         criadoEm:
 *           type: string
 *           format: date-time
 *           description: Data de criação do comentário
 *       example:
 *         id: 1
 *         usuarioId: 123
 *         fotoId: 456
 *         comentario: "Linda foto!"
 *         exibirComentario: true
 *         criadoEm: "2025-05-27T14:30:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: API para gerenciamento de comentários em fotos
 */

/**
 * @swagger
 * /api/comentarios:
 *   get:
 *     summary: Lista todos os comentários com paginação, filtros e relacionamentos
 *     tags: [Comentarios]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página (padrão 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Quantidade de registros por página (padrão 40)
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: 'Campos para ordenação (ex: criadoEm)'
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Direção da ordenação (ASC ou DESC)
 *       - in: query
 *         name: filters
 *         schema:
 *           type: object
 *         description: 'Filtros personalizados (ex: {"usuarioId":123})'
 *       - in: query
 *         name: include
 *         schema:
 *           type: string
 *         description: 'Relacionamentos para incluir na resposta (ex: usuario,foto)'
 *     responses:
 *       200:
 *         description: Lista de comentários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentarios'
 */

/**
 * @swagger
 * /api/comentarios/{id}:
 *   get:
 *     summary: Obtém um comentário pelo ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário
 *     responses:
 *       200:
 *         description: Comentário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentarios'
 *       404:
 *         description: Comentário não encontrado
 */

/**
 * @swagger
 * /api/comentarios:
 *   post:
 *     summary: Cria um novo comentário
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentarios'
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentarios'
 *       500:
 *         description: Erro ao criar comentário
 */

/**
 * @swagger
 * /api/comentarios/{id}:
 *   put:
 *     summary: Atualiza um comentário existente
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentarios'
 *     responses:
 *       200:
 *         description: Comentário atualizado com sucesso
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro ao atualizar comentário
 */

/**
 * @swagger
 * /api/comentarios/{id}:
 *   delete:
 *     summary: Exclui um comentário pelo ID
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do comentário a ser excluído
 *     responses:
 *       200:
 *         description: Comentário excluído com sucesso
 *       404:
 *         description: Comentário não encontrado
 *       500:
 *         description: Erro ao excluir comentário
 */

router.get('/', comentarioController.getAll);
router.get('/:id', comentarioController.getById);
router.post('/', comentarioController.create);
router.put('/:id', comentarioController.update);
router.delete('/:id', comentarioController.delete); 

module.exports = router;
