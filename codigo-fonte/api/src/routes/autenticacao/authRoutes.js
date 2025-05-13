const express = require('express');
const router = express.Router();
const authController = require('../../controllers/autenticacao/authController'); 
const verifyToken = require('../../middleware/AuthMiddlewareToken');

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required: 
 *         - usernameOrEmail
 *         - password
 *       properties:
 *         usernameOrEmail:
 *           type: string
 *           description: Acessar com Usuário(Login) ou Email
 *         password:
 *           type: string
 *           description: A senha do usuário
 *     Logout:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: Número de identifação do usuário
 *         
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gerenciamento de autenticação.
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Faz o login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Desconecta usuário da API
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Logout'
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/logout', verifyToken, authController.logout);

module.exports = router;
