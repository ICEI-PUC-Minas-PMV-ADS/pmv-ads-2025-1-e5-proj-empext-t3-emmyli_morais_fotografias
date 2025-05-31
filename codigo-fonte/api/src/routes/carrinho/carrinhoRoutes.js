const express = require('express');
const router = express.Router();
const Api_Controller = require('../../controllers/Api_Controller');
const carrinhoController = new Api_Controller('Carrinho');

/**
 * @swagger
 * components:
 *   schemas:
 *     Carrinho:
 *       type: object
 *       required:
 *         - id
 *         - usuario_id
 *         - produto_id
 *         - quantidade
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único do item no carrinho
 *         usuario_id:
 *           type: integer
 *           description: ID do usuário dono do carrinho
 *         produto_id:
 *           type: integer
 *           description: ID do produto adicionado ao carrinho
 *         quantidade:
 *           type: integer
 *           description: Quantidade do produto no carrinho
 *         dtinclusao:
 *           type: string
 *           format: date-time
 *           description: Data em que o item foi incluído no carrinho
 *       example:
 *         id: 1
 *         usuario_id: 123
 *         produto_id: 456
 *         quantidade: 2
 *         dtinclusao: "2025-05-27T14:30:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Carrinho
 *   description: API para gerenciamento do carrinho de compras
 */

/**
 * @swagger
 * /api/carrinho:
 *   get:
 *     summary: Lista os itens do carrinho com paginação, filtros e relacionamentos
 *     tags: [Carrinho]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 'Número da página (padrão 1)'
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: 'Quantidade de registros por página (padrão 40)'
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: 'Campo para ordenação (ex: dtinclusao)'
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: 'Direção da ordenação (ASC ou DESC)'
 *       - in: query
 *         name: filters
 *         schema:
 *           type: object
 *         description: 'Filtros personalizados (ex: {"usuario_id":123})'
 *       - in: query
 *         name: include
 *         schema:
 *           type: string
 *         description: 'Relacionamentos para incluir na resposta (ex: usuario,produto)'
 *     responses:
 *       200:
 *         description: Lista de itens no carrinho
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carrinho'
 */

/**
 * @swagger
 * /api/carrinho/{id}:
 *   get:
 *     summary: Obtém um item do carrinho pelo ID
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item do carrinho
 *     responses:
 *       200:
 *         description: Item do carrinho encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carrinho'
 *       404:
 *         description: Item do carrinho não encontrado
 */

/**
 * @swagger
 * /api/carrinho:
 *   post:
 *     summary: Adiciona um item ao carrinho
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carrinho'
 *       500:
 *         description: Erro ao adicionar item ao carrinho
 */

/**
 * @swagger
 * /api/carrinho/{id}:
 *   put:
 *     summary: Atualiza um item do carrinho existente
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item do carrinho a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carrinho'
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       404:
 *         description: Item do carrinho não encontrado
 *       500:
 *         description: Erro ao atualizar item
 */

/**
 * @swagger
 * /api/carrinho/{id}:
 *   delete:
 *     summary: Remove um item do carrinho pelo ID
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item do carrinho a ser removido
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *       404:
 *         description: Item do carrinho não encontrado
 *       500:
 *         description: Erro ao remover item
 */


router.get('/', carrinhoController.getAll);
router.get('/:id', carrinhoController.getById);
router.post('/', carrinhoController.create);
router.put('/:id', carrinhoController.update);
router.delete('/:id', carrinhoController.delete); 

module.exports = router;