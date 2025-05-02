const express = require('express');
const router = express.Router();
const produtosController = require('../../controllers/Produtos/ProdutosController');

const verifyToken = require('../../middleware/AuthMiddlewareToken');

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - descricao
 *         - quantidade_Fotos
 *         - preco
 *         - id_evento
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do produto
 *         descricao:
 *           type: string
 *           description: Descrição do produto
 *         quantidade_Fotos:
 *           type: integer
 *           description: Quantidade de fotos incluídas no pacote
 *         preco:
 *           type: number
 *           format: float
 *           description: Preço do produto
 *         id_evento:
 *           type: integer
 *           description: ID do evento associado
 *         criado_em:
 *           type: string
 *           format: date-time
 *           description: Data de criação do produto
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
 *   name: Produtos
 *   description: Gerenciamento de Produtos relacionados a eventos.
 */

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
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
 *         description: Filtros adicionais para a busca testes abaixo... Exemplo de envio URL `filters[hora_evento]=horaevento&filters[local]=local`
 *       - in: query
 *         name: include
 *         schema:
 *           type: string
 *           example: Evento
 *         description: |
 *           Incluir associações relacionadas na consulta. Exemplos de associações possíveis:
 *           - `Evento`: Inclui o evento ligado ao produto.
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
router.get('/', produtosController.getAll);

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Retorna um produto por ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', produtosController.getById);

/**
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */
router.post('/', produtosController.create);

/**
 * @swagger
 * /api/produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar o produto
 */
router.put('/:id', produtosController.update);

/**
 * @swagger
 * /api/produtos/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       400:
 *         description: Erro ao deletar o produto
 */
router.delete('/:id', produtosController.delete);

module.exports = router;
