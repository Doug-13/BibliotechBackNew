const express = require('express');
const librariesController = require('../controller/librariesController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Library:
 *       type: object
 *       required:
 *         - library_id
 *         - user_id
 *         - book_id
 *       properties:
 *         library_id:
 *           type: string
 *           description: ID da entrada na biblioteca
 *         user_id:
 *           type: string
 *           description: ID do usuário
 *         book_id:
 *           type: string
 *           description: ID do livro
 *         section_id:
 *           type: string
 *           description: ID da seção
 *         rating:
 *           type: integer
 *           format: int32
 *           description: Nota do livro (1 a 5)
 */

/**
 * @swagger
 * tags:
 *   name: Libraries
 *   description: API para gerenciar a biblioteca de um usuário
 */

/**
 * @swagger
 * /libraries/library:
 *   post:
 *     summary: Adiciona um livro à biblioteca do usuário
 *     tags: [Libraries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Library'
 *     responses:
 *       200:
 *         description: Livro adicionado à biblioteca com sucesso
 *       500:
 *         description: Erro ao adicionar o livro à biblioteca
 */
router.post('/library', librariesController.addToLibrary);

/**
 * @swagger
 * /libraries/library/{user_id}:
 *   get:
 *     summary: Retorna a biblioteca de um usuário
 *     tags: [Libraries]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados da biblioteca do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Library'
 *       404:
 *         description: Biblioteca não encontrada
 *       500:
 *         description: Erro ao buscar a biblioteca
 */
router.get('/library/:user_id', librariesController.getLibrary);

/**
 * @swagger
 * /libraries/library/{id}:
 *   put:
 *     summary: Atualiza uma entrada na biblioteca
 *     tags: [Libraries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da entrada na biblioteca
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Library'
 *     responses:
 *       200:
 *         description: Entrada da biblioteca atualizada com sucesso
 *       500:
 *         description: Erro ao atualizar a entrada da biblioteca
 */
router.put('/library/:id', librariesController.updateLibrary);

module.exports = router;
