const express = require('express');
const router = express.Router();
const carrinhoController = require('../../controllers/carrinho/CarrinhoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Carrinho:
 *       type: object
 *       required:
 *         - usuario_id
 *         - produto_id
 *         - quantidade
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificação do item do carrinho
 *         usuario_id:
 *           type: integer
 *           description: Identificação do usuário
 *         produto_id:
 *           type: integer
 *           description: Identificação do produto
 *         quantidade:
 *           type: integer
 *           description: Quantidade de produtos
 */

/**
 * @swagger
 * tags:
 *   name: Carrinho
 *   description: Gerenciamento de itens no carrinho
 */

/**
 * @swagger
 * /api/carrinho:
 *   get:
 *     summary: Retorna a lista de itens do carrinho
 *     tags: [Carrinho]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carrinho'
 */
router.get('/', carrinhoController.getAll);

/**
 * @swagger
 * /api/carrinho/{id}:
 *   get:
 *     summary: Obtém informações de um item específico do carrinho
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificação do item do carrinho
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carrinho'
 *       404:
 *         description: Item do carrinho não encontrado
 */
router.get('/:id', carrinhoController.getById);

/**
 * @swagger
 * /api/carrinho:
 *   post:
 *     summary: Adiciona um novo item ao carrinho
 *     tags: [Carrinho]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carrinho'
 *     responses:
 *       201:
 *         description: Item adicionado com sucesso
 */
router.post('/', carrinhoController.create);

/**
 * @swagger
 * /api/carrinho/{id}:
 *   put:
 *     summary: Atualiza informações de um item específico do carrinho
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificação do item do carrinho
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carrinho'
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar item
 */
router.put('/:id', carrinhoController.update);

/**
 * @swagger
 * /api/carrinho/{id}:
 *   delete:
 *     summary: Remove um item específico do carrinho
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificação do item do carrinho
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *       400:
 *         description: Erro ao remover item
 */
router.delete('/:id', carrinhoController.delete);

module.exports = router;