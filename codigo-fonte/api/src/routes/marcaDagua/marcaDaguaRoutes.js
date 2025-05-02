const express = require('express');
const router = express.Router();
const marcaDaguaController = require('../../controllers/marcaDagua/marcaDaguaController');
const UploadImage = require('../../middleware/UploadImage')
const verifyToken = require('../../middleware/AuthMiddlewareToken');

/**
 * @swagger
 * components:
 *   schemas:
 *     MarcaDagua:
 *       type: object
 *       required:
 *         - imagem
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da marca d'água
 *         imagem:
 *           type: string
 *           format: binary
 *           description: Imagem da marca d'água
 */

/**
 * @swagger
 * tags:
 *   name: MarcaDagua
 *   description: Gerenciamento de Marcas d'Água.
 */

/**
 * @swagger
 * /api/marcaDagua:
 *   post:
 *     summary: Cria uma nova marca d'água
 *     tags: [MarcaDagua]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Marca d'água criada com sucesso
 *       400:
 *         description: Erro ao criar marca d'água
 */
router.post('/', UploadImage.single('imagem'), marcaDaguaController.create);

/**
 * @swagger
 * /api/marcaDagua:
 *   get:
 *     summary: Lista todas as marcas d'água
 *     tags: [MarcaDagua]
 *     responses:
 *       200:
 *         description: Lista de marcas d'água
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MarcaDagua'
 *       500:
 *         description: Erro interno
 */
router.get('/', marcaDaguaController.getAll);

/**
 * @swagger
 * /api/marcaDagua/{id}:
 *   delete:
 *     summary: Deleta uma marca d'água específica
 *     tags: [MarcaDagua]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da marca d'água
 *     responses:
 *       200:
 *         description: Marca d'água deletada com sucesso
 *       404:
 *         description: Marca d'água não encontrada
 *       500:
 *         description: Erro interno
 */
router.delete('/:id', marcaDaguaController.delete);

module.exports = router;