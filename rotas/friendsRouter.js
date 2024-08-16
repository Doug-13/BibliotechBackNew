const express = require('express');
const friendsController = require('../controller/friendsController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Friend:
 *       type: object
 *       required:
 *         - user_id
 *         - friend_id
 *       properties:
 *         user_id:
 *           type: string
 *           description: ID do usuário
 *         friend_id:
 *           type: string
 *           description: ID do amigo
 *         status:
 *           type: string
 *           description: {Status do relacionamento (ex: pendente, aceito)}
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data em que a amizade foi criada
 */

/**
 * @swagger
 * tags:
 *   name: Friends
 *   description: API para gerenciar amizades
 */

/**
 * @swagger
 * /friends/friend:
 *   post:
 *     summary: Adiciona um novo amigo
 *     tags: [Friends]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Friend'
 *     responses:
 *       200:
 *         description: Amizade adicionada com sucesso
 *       500:
 *         description: Erro ao adicionar a amizade
 */
router.post('/friend', friendsController.addFriend);

/**
 * @swagger
 * /friends/friend/{user_id}:
 *   get:
 *     summary: Retorna a lista de amigos de um usuário
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de amigos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Friend'
 *       404:
 *         description: Amigos não encontrados
 *       500:
 *         description: Erro ao buscar a lista de amigos
 */
router.get('/friend/:user_id', friendsController.getFriends);

/**
 * @swagger
 * /friends/friend:
 *   delete:
 *     summary: Remove um amigo
 *     tags: [Friends]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID do usuário
 *               friend_id:
 *                 type: string
 *                 description: ID do amigo
 *     responses:
 *       200:
 *         description: Amigo removido com sucesso
 *       500:
 *         description: Erro ao remover o amigo
 */
router.delete('/friend', friendsController.removeFriend); // Verifique se a função removeFriend está corretamente exportada


module.exports = router;
