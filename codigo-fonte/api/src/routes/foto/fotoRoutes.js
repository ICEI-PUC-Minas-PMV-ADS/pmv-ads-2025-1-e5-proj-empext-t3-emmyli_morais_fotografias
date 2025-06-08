const express = require('express');
const router = express.Router();
const FotoController = require('../../controllers/foto/FotoController');
const verifyToken = require('../../middleware/AuthMiddlewareToken');
const UploadImagem = require('../../middleware/UploadImage');


/**
 * @swagger
 * components:
 *   schemas:
 *     Fotos:
 *       type: object
 *       required:
 *         - imagem
 *       properties:
 *         imagem:
 *           type: string
 *           format: binary
 *           description: Adicona uma foto
 */


/**
 * @swagger
 * tags:
 *   name: Fotos
 *   description: Gerenciamento de fotos.
 */


/**
 * @swagger
 * /api/fotos:
 *   post:
 *     summary: Cria uma nova foto
 *     tags: [Fotos]
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
 *         description: Foto criada com sucesso
 *       400:
 *         description: Erro ao criar Foto
 */
router.post('/adicionar', verifyToken, UploadImagem.array('fotos'), FotoController.adicionar);

/**
 * @swagger
 * /api/fotos/{id}:
 *   delete:
 *     summary: Deleta uma foto
 *     tags: [Fotos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da foto
 *     responses:
 *       200:
 *         description: Foto deletada com sucesso
 *       404:
 *         description: Foto não encontrada
 *       500:
 *         description: Erro interno
 */
router.delete('/:id', verifyToken, FotoController.delete);

module.exports = router;
