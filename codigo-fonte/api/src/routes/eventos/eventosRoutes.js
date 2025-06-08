// src/routes/eventos/eventoRoutes.js

const express = require('express');
const router = express.Router();
const eventosController = require('../../controllers/enventos/EventosController');

const checkFotografo = require('../../middleware/checkFotografo');
const verifyToken = require('../../middleware/AuthMiddlewareToken');
const upload = require('../../middleware/UploadImage');

// Obter um evento específico (com contagem de views e curtidas)
router.get('/', eventosController.getAll);

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
 *           description: Número de identificação do evento
 *         nome:
 *           type: string
 *           description: Nome do Evento
 *         descricao:
 *           type: string
 *           description: Descrição do Evento
 *         data_evento:
 *           type: string
 *           description: Data do Evento
 *         hora_evento:
 *           type: string
 *           description: Hora do Evento
 *         local:
 *           type: string
 *           description: Local do Evento
 *         publico:
 *           type: boolean
 *           description: Marca se o evento é público
 *         exibirtrabalho:
 *           type: boolean
 *           description: Evento será exibido na área de trabalhos
 *         idmarcadagua:
 *           type: integer
 *           description: ID da marca d’água utilizada nas fotos do evento
 *         categoria_id:
 *           type: integer
 *           description: ID da categoria
 *         urlevento:
 *           type: string
 *           description: "URL gerada para acesso ao álbum (ex.: https://emmylifotografias.com.br/album/abcd1234)"
 *         detalhes:
 *           type: array
 *           description: Lista de fotos (detalhes) do evento
 *           items:
 *             $ref: '#/components/schemas/DetalheEvento'
 *
 *     DetalheEvento:
 *       type: object
 *       required:
 *         - evento_id
 *         - foto
 *         - ordem        
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do detalhe (foto) do evento
 *         evento_id:
 *           type: integer
 *           description: ID do evento ao qual a foto pertence
 *         foto:
 *           type: string
 *           description: URL da foto armazenada no BunnyCDN
 *         ordem:
 *           type: integer
 *           description: Ordenação das fotos no álbum
 */

/**
 * @swagger
 * tags:
 *   name: Eventos
 *   description: Gerenciamento de Eventos.
 */

/**
 * @swagger
 * /api/eventos:
 *   get:
 *     summary: Retorna a lista de eventos
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
 *         description: Campos de agrupamento (separados por vírgula)
 *         example:
 *       - in: query
 *         name: filters
 *         style: deepObject
 *         explode: true
 *         schema:
 *           type: object
 *           additionalProperties:
 *             type: string
 *         description: "Filtros adicionais para a busca. Exemplo: filters[hora_evento]=18:00&filters[local]=Igreja"
 *       - in: query
 *         name: include
 *         schema:
 *           type: string
 *           example: detalhes,marcaDagua
 *         description: >
 *           Incluir associações relacionadas na consulta. Exemplos:
 *           - detalhes: inclui as fotos (detalhe_evento).
 *           - marcaDagua: inclui os dados da marca d’água relacionada.
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
router.get(
  '/',
  eventosController.getAll
);

/**
 * @swagger
 * /api/eventos/{id}:
 *   get:
 *     summary: Obtém informações de um evento específico (incluindo detalhes e marca d’água)
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do evento
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
router.get(
  '/:id',

  eventosController.getById
);

/**
 * @swagger
 * /api/eventos:
 *   post:
 *     summary: Cria um novo evento (com campos textuais e possíveis fotos)
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do evento
 *               descricao:
 *                 type: string
 *                 description: Descrição do evento
 *               data_evento:
 *                 type: string
 *                 description: Data do evento (YYYY-MM-DD)
 *               hora_evento:
 *                 type: string
 *                 description: Hora do evento (HH:MM)
 *               local:
 *                 type: string
 *                 description: Local do evento
 *               publico:
 *                 type: boolean
 *                 description: Marca se o evento é público
 *               exibirtrabalho:
 *                 type: boolean
 *                 description: Evento será exibido na área de trabalhos
 *               idmarcadagua:
 *                 type: integer
 *                 description: ID da marca d’água a ser aplicada
 *               categoria_id:
 *                 type: integer
 *                 description: ID da categoria (opcional)
 *               urlevento:
 *                 type: string
 *                 description: "URL gerada para acesso ao álbum (ex.: https://emmylifotografias.com.br/album/abcd1234)"
 *               fotos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Arquivos de imagem a serem adicionados ao evento
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *       400:
 *         description: Dados inválidos ou incompletos
 */
router.post(
  '/',
  verifyToken,
  checkFotografo,
  upload.array('fotos'),
  eventosController.create
);

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
 *         description: ID do evento
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data_evento:
 *                 type: string
 *               hora_evento:
 *                 type: string
 *               local:
 *                 type: string
 *               publico:
 *                 type: boolean
 *               exibirtrabalho:
 *                 type: boolean
 *               idmarcadagua:
 *                 type: integer
 *               categoria_id:
 *                 type: integer
 *               urlevento:
 *                 type: string
 *               fotos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: (Opcional) Novas fotos para adicionar ao evento
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou incompletos
 *       404:
 *         description: Evento não encontrado
 */
router.put(
  '/:id',
  verifyToken,
  checkFotografo,
  upload.array('fotos'),
  eventosController.update
);

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
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento deletado com sucesso
 *       404:
 *         description: Evento não encontrado
 */
router.delete(
  '/:id',
  verifyToken,
  checkFotografo,
  eventosController.delete
);

/**
 * @swagger
 * /api/eventos/{id}/primeira_imagem:
 *   put:
 *     summary: Atualiza qual será a primeira imagem (capa) de um evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               detalheId:
 *                 type: integer
 *                 description: ID do detalhe_evento (foto) a ser promovida a primeira
 *     responses:
 *       204:
 *         description: Ordem das imagens atualizada com sucesso (sem conteúdo)
 *       404:
 *         description: Evento ou detalhe não encontrado
 */
router.put(
  '/:id/primeira_imagem',
  verifyToken,
  checkFotografo,
  eventosController.updateFirstImage
);

module.exports = router;
