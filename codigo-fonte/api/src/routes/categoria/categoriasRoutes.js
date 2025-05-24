// routes/categorias.js
const express = require('express');
const router = express.Router();
const controller = require('../../controllers/categoria/categoriaController');



/**
 * @swagger
 * components:
 *   schemas:
 *     Categorias:
 *       type: object
 *       required:
 *         - id
 *         - nome *         
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único da categoria
 *         nome:
 *           type: string
 *           description: Nome da Categoria 
 *       example:
 *         id: 1
 *         nome: 123
 */

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Rota para gerenciamento de Categorias
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categorias'
 */
// GET   /api/categorias
router.get('/', controller.getAll);
/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Obtém uma Categoria pelo ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da Categoria
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categorias'
 *       404:
 *         description: Categoria não encontrada
 */

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categorias'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categorias'
 *       500:
 *         description: Erro ao criar categoria
 */

// POST  /api/categorias
router.post('/', controller.create);

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria existente
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categorias'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro ao atualizar Categoria
 */

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Exclui uma Categoria pelo ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da Categoria a ser excluída
 *     responses:
 *       200:
 *         description: Categoria excluída com sucesso
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro ao excluir Categoria
 */

// DELETE /api/categorias/:id
router.delete('/:id', controller.remove);

module.exports = router;
