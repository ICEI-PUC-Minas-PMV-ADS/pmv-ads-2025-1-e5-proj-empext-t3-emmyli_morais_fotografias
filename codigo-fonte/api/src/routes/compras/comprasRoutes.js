const express = require('express');
const router = express.Router();
const comprasController = require('../../controllers/compras/ComprasController');
const factoryMiddlewareNotification = require('../../middleware/geradorMiddlewaresNotificacao');
const verifyToken = require('../../middleware/AuthMiddlewareToken');

const notificarNovaCompra = factoryMiddlewareNotification(
    (req) => {
        return {
            topico: "Compra",
            acao: `Nova compra criado para ${req.nome}`, // TODO: trocar idusuario por nome que vem do token
            local_acao: "Compras"
        }
    }
)

/**
 * @swagger
 * components:
 *   schemas:
 *     Compras:
 *       type: object
 *       required:
 *         - usuario_id
 *         - valor_total
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificação da compra
 *         usuario_id:
 *           type: integer
 *           description: ID do usuário que realizou a compra
 *         valor_total:
 *           type: number
 *           format: float
 *           description: Valor total da compra
 *         status:
 *           type: string
 *           description: Status da compra
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização
 */

/**
 * @swagger
 * tags:
 *   name: Compras
 *   description: Gerenciamento de compras
 */

/**
 * @swagger
 * /api/compras:
 *   get:
 *     summary: Retorna a lista das compras
 *     tags: [Compras]
 *     responses:
 *       200:
 *         description: Lista de compras retornada com sucesso
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
 *     summary: Retorna uma compra pelo ID
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da compra
 *     responses:
 *       200:
 *         description: Compra encontrada com sucesso
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
 *     summary: Cria uma nova compra
 *     tags: [Compras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compras'
 *     responses:
 *       201:
 *         description: Compra criada com sucesso
 *       400:
 *         description: Erro ao criar compra
 */
router.post('/', [verifyToken, notificarNovaCompra], comprasController.create);

/**
 * @swagger
 * /api/compras/{id}:
 *   put:
 *     summary: Atualiza uma compra existente
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *         description: Erro ao atualizar compra
 */
router.put('/:id', comprasController.update);

/**
 * @swagger
 * /api/compras/{id}:
 *   delete:
 *     summary: Remove uma compra pelo ID
 *     tags: [Compras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da compra
 *     responses:
 *       200:
 *         description: Compra removida com sucesso
 *       400:
 *         description: Erro ao remover compra
 */
router.delete('/:id', comprasController.delete);


module.exports = router;
