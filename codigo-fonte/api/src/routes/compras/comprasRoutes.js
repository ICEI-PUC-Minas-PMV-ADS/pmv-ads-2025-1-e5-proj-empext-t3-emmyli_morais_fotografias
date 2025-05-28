const express = require('express');
const router = express.Router();
const comprasController = require('../../controllers/compras/ComprasController');

const verifyToken = require('../../middleware/AuthMiddlewareToken');

/**
 * @swagger
 * components:
 *   schemas:
 *     Compras:
 *       type: object
 *       required:
 *         - usuario_id
 *         - idevento
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da compra
 *         usuario_id:
 *           type: integer
 *           description: ID do Usuário ligado a compra
 *         idevento:
 *           type: integer
 *           description: ID do evento ligado a compra
 *         dtinclusao:
 *           type: string
 *           format: date-time
 *           description: Data de inclusão
 *         dtalteracao:
 *           type: string
 *           format: date
 *           description: Data de alteração
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Detalhe_compra:
 *       type: object
 *       required:
 *         - compra_id
 *         - produto_id
 *         - quantidade
 *         - preco
 *       properties:
 *         compra_id:
 *           type: integer
 *           description: ID da compra 
 *         produto_id:
 *           type: integer
 *           description: ID do Produto selecionado na compra
 *         quantidade:
 *           type: integer
 *           description: Quantidade de produtos selecionados na compra
 *         preco:
 *           type: float
 *           description: Valor final compra
 *         dtinclusao:
 *           type: string
 *           format: date-time
 *           description: Data de inclusão
 *         dtalteracao:
 *           type: string
 *           format: date
 *           description: Data de alteração
 */

/**
 * @swagger
 * tags:
 *   name: Compras
 *   description: Gerenciamento de Compras.
 */

/**
 * @swagger
 * /api/compras:
 *   get:
 *     summary: Lista todas as compras realizadas
 *     tags: [Compras]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página (início em 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Quantidade de registros por página
 *         example: 40
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Campo(s) para ordenar os resultados (separados por vírgula)
 *         example: dtinclusao
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Direção da ordenação para cada campo (separados por vírgula)
 *         example: DESC,ASC
 *       - in: query
 *         name: group
 *         schema:
 *           type: string
 *         description: GroupBy(separados por vírgula)
 *         example: 
 *       - in: query
 *         name: filters
 *         schema:
 *           type: object
 *           additionalProperties:
 *             type: string
 *         style: deepObject
 *         explode: true
 *         description: Filtros adicionais para a busca Exemplo de envio URL `filters[usuario_id]=usuariois&filters[idevento]=eventoid`
 *       - in: query
 *         name: include
 *         schema:
 *           type: string
 *           example: Detalhe_compra
 *         description: |
 *           Incluir associações relacionadas na consulta. Exemplos de associações possíveis:
 *           - `Detalhe_compra`: Inclui o detalhe da compra.
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Compras'
 */
router.get('/', comprasController.getAll);

/**
 * @swagger
 * /api/compras/{id}:
 *   get:
 *     summary: Retorna uma compra por ID
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da compra
 *     responses:
 *       200:
 *         description: Compra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compras'
 *       404:
 *         description: Compra não encontrada
 */
router.get('/:id', comprasController.getById);

/**
 * @swagger
 * /api/compras:
 *   post:
 *     summary: Cria uma nova compra com seus itens 
 *     tags: [Compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dtinclusao:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-21"
 *               usuario_id:
 *                 type: integer
 *                 example: 123
 *               idevento:
 *                 type: integer
 *                 example: 12
 *               itensCompra:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produto_id:
 *                       type: integer
 *                       example: 1
 *                     quantidade:
 *                       type: number
 *                       example: 2
 *                     preco:
 *                       type: number
 *                       format: float
 *                       example: 50.00
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 usuario_id:
 *                   type: integer
 *                   example: 1
 *                 idevento:
 *                   type: integer
 *                   example: 123 
 */


/**
 * @swagger
 * /api/compras/{id}:
 *   put:
 *     summary: Atualiza uma compra existente
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da compra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compras'
 *     responses:
 *       200:
 *         description: Compra atualizada com sucesso
 *       400:
 *         description: Erro ao atualizar a compra
 */
router.put('/:id', comprasController.update);

/**
 * @swagger
 * /api/compras/{id}:
 *   delete:
 *     summary: Remove uma compra
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da compra
 *     responses:
 *       200:
 *         description: Compra removida com sucesso
 *       400:
 *         description: Erro ao remover a compra
 */
router.delete('/:id', comprasController.delete);

module.exports = router;
