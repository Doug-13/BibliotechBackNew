const express = require('express');
const book_RequestsController = require('../controller/book_RequestsController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     BookRequest:
 *       type: object
 *       required:
 *         - requester_id
 *         - owner_id
 *         - book_id
 *         - status
 *       properties:
 *         requester_id:
 *           type: string
 *           description: ID do solicitante
 *         owner_id:
 *           type: string
 *           description: ID do proprietário
 *         book_id:
 *           type: string
 *           description: ID do livro
 *         status:
 *           type: string
 *           description: Status da solicitação
 *         loan_date:
 *           type: string
 *           format: date
 *           description: Data de empréstimo do livro
 *         return_date:
 *           type: string
 *           format: date
 *           description: Data de devolução do livro
 */

/**
 * @swagger
 * tags:
 *   name: BookRequests
 *   description: API para gerenciar solicitações de livros
 */

/**
 * @swagger
 * /books-requests/book_request:
 *   post:
 *     summary: Adiciona uma solicitação de livro
 *     tags: [BookRequests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookRequest'
 *     responses:
 *       200:
 *         description: Solicitação de livro adicionada com sucesso
 *       500:
 *         description: Erro ao adicionar a solicitação de livro
 */
router.post('/book_request', book_RequestsController.addBookRequest);

/**
 * @swagger
 * /books-requests/book_request/{user_id}:
 *   get:
 *     summary: Retorna solicitações de livro para um usuário
 *     tags: [BookRequests]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados das solicitações de livro
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookRequest'
 *       404:
 *         description: Solicitações não encontradas
 *       500:
 *         description: Erro ao buscar as solicitações de livro
 */
router.get('/book_request/:user_id', book_RequestsController.getBookRequests);

/**
 * @swagger
 * /books-requests/book_request/{id}:
 *   put:
 *     summary: Atualiza uma solicitação de livro
 *     tags: [BookRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da solicitação de livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookRequest'
 *     responses:
 *       200:
 *         description: Solicitação de livro atualizada com sucesso
 *       500:
 *         description: Erro ao atualizar a solicitação de livro
 */
router.put('/book_request/:id', book_RequestsController.updateBookRequest);

module.exports = router;
