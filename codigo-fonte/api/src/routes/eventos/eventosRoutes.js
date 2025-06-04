const express = require('express');
const router = express.Router();
const eventosController = require('../../controllers/enventos/EventosController');

const checkFotografo = require('../../middleware/checkFotografo');
const verifyToken = require('../../middleware/AuthMiddlewareToken');
const upload = require('../../middleware/UploadImage');
/**
 * @swagger
 * components:
 *   schemas:
 *     Eventos:
 *       type: object
 *       required:
 *         - nome 
 *         - local
 *         - idmarcadagua          
 *       properties:
 *         id:
 *           type: integer
 *           description: Número de identifação do evento
 *         nome:
 *           type: string
 *           description: Nome do Evento
 *         descricao:
 *           type: string
 *           description: Descrição do Evento
 *         data_evento:
 *           type: string
 *           description: Data Evento
 *         hora_evento:
 *           type: string
 *           description: Hora do Evento
 *         local:
 *           type: string
 *           description: Local do Evento
 *         publico:
 *           type: bolean
 *           description: Campo destinado a marcar se evento é publico
 *         exibirtrabalho:
 *           type: bolean
 *           description: Eventos que serão exibidos na area de trabalho
 *         idmarcadagua:
 *           type: integer
 *           description: identificação da marca dagua utlizada para fotos do envento
 *         categoria_id:
 *           type: integer
 *           description: identificação da categoria 
 *         urlevento:
 *           type: string
 *           description: Url para acesso de um album, criado quando o evento é público
 *         detalhes:
 *           type: array
 *           description: Lista de fotos (detalhes) do evento
 *           $ref: '#/components/schemas/DetalheEvento'
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     DetalheEvento:
 *       type: object
 *       required:
 *         - evento_id
 *         - foto
 *         - ordem        
 *       properties:
 *         id:
 *           type: integer
 *           description: Número de identifação da foto do Evento
 *         evento_id:
 *           type: integer
 *           description: Identificação do Evento
 *         foto:
 *           type: string
 *           description: Url da Foto
 *         ordem:
 *           type: integer
 *           description: ordenação das fotos
 */

/**
 * @swagger
 * tags:
 *   name: Eventos
 *   description: Gerenciamento de Eventos.
 */

/**
 * @swagger
 * /api/eventos/:
 *   get:
 *     summary: Retorna a lista dos Eventos
 *     tags: [Eventos]
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
 *           example: DetalheEvento
 *         description: |
 *           Incluir associações relacionadas na consulta. Exemplos de associações possíveis:
 *           - `DetalheEvento`: Inclui o detalhe do evento.
 *           - `MarcaDagua`: Inclui a marca dagua ligada ao evento.
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Eventos'
 */

router.get('/',eventosController.getAll);
/**
 * @swagger
 * /api/eventos/{id}:
 *   get:
 *     summary: Obtém informações de um evento específico
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificação do Evento
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Eventos'
 *       404:
 *         description: Evento não encontrado
 */
router.get('/:id', eventosController.getById);
/**
 * @swagger
 * /api/eventos:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Eventos'
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 */
router.post('/', upload.array('imagens[]'), eventosController.create);

/**
 * @swagger
 * /api/eventos/{id}:
 *   put:
 *     summary: Atualiza informações de um evento específico
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificação do evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Eventos'
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar evento
 */
router.put('/:id',upload.array('imagens[]'), eventosController.update);

/**
 * @swagger
 * /api/eventos/{id}:
 *   delete:
 *     summary: Deleta um evento específico
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificação do evento *       
 *     responses:
 *       200:
 *         description: Evento deletado com sucesso
 *       400:
 *         description: Erro ao deletar evento
 */
router.delete('/:id', eventosController.delete);

router.put('/:id/primeira_imagem', eventosController.updateFirstImage)

// Rota específica para pegar perfil do usuário
//router.get('/:id/perfil', usuariosController.getProfile);

module.exports = router;
