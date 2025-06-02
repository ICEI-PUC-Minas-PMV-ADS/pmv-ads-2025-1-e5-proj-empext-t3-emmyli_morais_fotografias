const express = require('express');
const router = express.Router();
const Api_Controller = require('../../controllers/Api_Controller');
const feedbackController = new Api_Controller('Feedbacks');
const checkFotografo = require('../../middleware/checkFotografo');
const verifyToken = require('../../middleware/AuthMiddlewareToken');
const factoryMiddlewareNotification = require('../../middleware/geradorMiddlewaresNotificacao');
/**
 * @swagger
 * components:
 *   schemas:
 *     Feedbacks:
 *       type: object
 *       required:
 *         - id
 *         - usuarioId
 *         - albumId
 *         - feedback
 *         - satisfacao
 *         - exibirfeedback
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único do feedback
 *         usuarioId:
 *           type: integer
 *           description: Identificação do usuário que fez o feedback
 *         albumId:
 *           type: integer
 *           description: Identificação do álbum relacionado ao feedback
 *         feedback:
 *           type: string
 *           description: Comentário do usuário
 *         satisfacao:
 *           type: integer
 *           description: 'Nível de satisfação do usuário (ex: 1 a 5)'
 *         exibirfeedback:
 *           type: boolean
 *           description: Indica se o feedback deve ser exibido na página incial do site
 *       example:
 *         id: 1
 *         usuarioId: 123
 *         albumId: 456
 *         feedback: "Gostei muito do álbum!"
 *         satisfacao: 5
 *         exibirfeedback: false
 */

/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: API para gerenciamento de feedbacks
 */

/**
 * @swagger
 * /api/feedbacks:
 *   get:
 *     summary: Lista todos os feedbacks com paginação, filtros e relacionamentos
 *     tags: [Feedbacks]
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
 *         description: 'Campo(s) para ordenar resultados, separados por vírgula (ex: id,usuarioId)'
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Direção da ordenação para cada campo, separados por vírgula (ASC ou DESC)
 *       - in: query
 *         name: filters
 *         schema:
 *           type: object
 *         description: 'Filtros para busca (ex: {"usuarioId":123})'
 *       - in: query
 *         name: include
 *         schema:
 *           type: string
 *         description: 'Relacionamentos para incluir na resposta (ex: usuario,album)'
 *     responses:
 *       200:
 *         description: Lista de feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feedbacks'
 */

/**
 * @swagger
 * /api/feedbacks/{id}:
 *   get:
 *     summary: Obtém um feedback pelo ID
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do feedback
 *       - in: query
 *         name: include
 *         schema:
 *           type: string
 *         description: Relacionamentos para incluir na resposta
 *     responses:
 *       200:
 *         description: Feedback encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedbacks'
 *       404:
 *         description: Feedback não encontrado
 */

/**
 * @swagger
 * /api/feedbacks:
 *   post:
 *     summary: Cria um novo feedback
 *     tags: [Feedbacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedbacks'
 *     responses:
 *       201:
 *         description: Feedback criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedbacks'
 *       500:
 *         description: Erro ao criar feedback
 */

/**
 * @swagger
 * /api/feedbacks/{id}:
 *   put:
 *     summary: Atualiza um feedback existente
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do feedback a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedbacks'
 *     responses:
 *       200:
 *         description: Feedback atualizado com sucesso
 *       404:
 *         description: Feedback não encontrado
 *       500:
 *         description: Erro ao atualizar feedback
 */

/**
 * @swagger
 * /api/feedbacks/{id}:
 *   delete:
 *     summary: Exclui um feedback pelo ID
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do feedback a ser excluído
 *     responses:
 *       200:
 *         description: Feedback excluído com sucesso
 *       404:
 *         description: Feedback não encontrado
 *       500:
 *         description: Erro ao excluir feedback
 */

router.get('/', feedbackController.getAll);

router.get('/:id', verifyToken, feedbackController.getById);


const notificarNovoFeedback = factoryMiddlewareNotification(
    (req) => {
        return {
            topico: "feedback",
            acao: `Novo feedback comentado por ${req.nome}`, // TODO: trocar idusuario por nome que vem do token
            local_acao: "feedback"
        }
    }
)
router.post('/', [verifyToken, notificarNovoFeedback], feedbackController.create);

router.put('/:id', checkFotografo, feedbackController.update); //rota disponível apenas para fotógrafos

router.delete('/:id', checkFotografo, feedbackController.delete);  //rota disponível apenas para fotógrafos


module.exports = router;
