const express = require('express');
const communitiesController = require('../controller/communitiesController'); // Verifique o caminho correto
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Community:
 *       type: object
 *       required:
 *         - community_id
 *         - name
 *         - description
 *         - owner_id
 *       properties:
 *         community_id:
 *           type: string
 *           description: ID da comunidade
 *         name:
 *           type: string
 *           description: Nome da comunidade
 *         description:
 *           type: string
 *           description: Descrição da comunidade
 *         owner_id:
 *           type: string
 *           description: ID do proprietário da comunidade
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data de última atualização
 */

/**
 * @swagger
 * tags:
 *   name: Communities
 *   description: API para gerenciar comunidades
 */

/**
 * @swagger
 * /communities/communities:
 *   post:
 *     summary: Adiciona uma nova comunidade
 *     tags: [Communities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Community'
 *     responses:
 *       200:
 *         description: Comunidade adicionada com sucesso
 *       500:
 *         description: Erro ao adicionar a comunidade
 */
router.post('/', communitiesController.addCommunity);

/**
 * @swagger
 * /communities/communities/{id}:
 *   get:
 *     summary: Obtém uma comunidade por ID
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da comunidade
 *     responses:
 *       200:
 *         description: Dados da comunidade
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Community'
 *       404:
 *         description: Comunidade não encontrada
 *       500:
 *         description: Erro ao buscar a comunidade
 */
router.get('/:id', communitiesController.getCommunity);

/**
 * @swagger
 * /communities/communities/{id}:
 *   put:
 *     summary: Atualiza uma comunidade por ID
 *     tags: [Communities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da comunidade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Community'
 *     responses:
 *       200:
 *         description: Comunidade atualizada com sucesso
 *       500:
 *         description: Erro ao atualizar a comunidade
 */
router.put('/:id', communitiesController.updateCommunity);

module.exports = router;
