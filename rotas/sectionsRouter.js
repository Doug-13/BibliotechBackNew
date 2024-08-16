const express = require('express');
const sectionsController = require('../controller/sectionsController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Section:
 *       type: object
 *       required:
 *         - section_id
 *         - user_id
 *         - name
 *       properties:
 *         section_id:
 *           type: string
 *           description: ID da seção
 *         user_id:
 *           type: string
 *           description: ID do usuário
 *         name:
 *           type: string
 *           description: Nome da seção
 *         description:
 *           type: string
 *           description: Descrição da seção
 */

/**
 * @swagger
 * tags:
 *   name: Sections
 *   description: API para gerenciar seções de livros
 */

/**
 * @swagger
 * /sections/section:
 *   post:
 *     summary: Adiciona uma nova seção
 *     tags: [Sections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Section'
 *     responses:
 *       200:
 *         description: Seção adicionada com sucesso
 *       500:
 *         description: Erro ao adicionar a seção
 */
router.post('/section', sectionsController.addSection);

/**
 * @swagger
 * /sections/section/{id}:
 *   get:
 *     summary: Retorna uma seção pelo ID
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da seção
 *     responses:
 *       200:
 *         description: Dados da seção
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Section'
 *       404:
 *         description: Seção não encontrada
 *       500:
 *         description: Erro ao buscar a seção
 */
router.get('/section/:id', sectionsController.getSection);

/**
 * @swagger
 * /sections/section/{id}:
 *   put:
 *     summary: Atualiza uma seção pelo ID
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da seção
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Section'
 *     responses:
 *       200:
 *         description: Seção atualizada com sucesso
 *       500:
 *         description: Erro ao atualizar a seção
 */
router.put('/section/:id', sectionsController.updateSection);

module.exports = router;
