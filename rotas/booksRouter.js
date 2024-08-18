const express = require('express');
const booksController = require('../controller/booksController');
const router = express.Router();

/*
2. Books (livros)
Importância: Esta tabela contém todas as informações sobre os livros disponíveis para troca. Ela permite que os usuários saibam quais 
livros estão disponíveis, quem os possui, e detalhes relevantes sobre cada livro.
Campos chave:
book_id: Identificador único que diferencia cada livro.
title, author, isbn, genre: Detalhes essenciais para categorizar e identificar os livros.
owner_id: Conecta o livro ao seu proprietário, permitindo a gestão de quem pode trocá-lo.
status: Indica se o livro está disponível para troca ou se está emprestado, ajudando a evitar confusões.
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - book_id
 *         - title
 *         - author
 *       properties:
 *         book_id:
 *           type: string
 *           description: ID do livro
 *         title:
 *           type: string
 *           description: Título do livro
 *         author:
 *           type: string
 *           description: Autor do livro
 *         isbn:
 *           type: string
 *           description: ISBN do livro
 *         publisher:
 *           type: string
 *           description: Nome da editora
 *         publish_date:
 *           type: string
 *           format: date
 *           description: Data de publicação do livro
 *         genre:
 *           type: string
 *           description: Gênero do livro
 *         description:
 *           type: string
 *           description: Descrição do livro
 *         status:
 *           type: string
 *           description: Status do livro
 *         owner_id:
 *           type: string
 *           description: ID do proprietário do livro
 *         visibility:
 *           type: string
 *           description: Visibilidade do livro
 *         image_url:
 *           type: string
 *           description: URL da imagem de capa do livro
 *         rating:
 *           type: number
 *           format: float
 *           description: Avaliação do livro (0 a 5)
 */


/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API para gerenciar livros
 */

/**
 * @swagger
 * /books/book:
 *   post:
 *     summary: Adiciona um novo livro
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Livro adicionado com sucesso
 *       500:
 *         description: Erro ao adicionar o livro
 */
router.post('/book', booksController.addBook);

/**
 * @swagger
 * /books/book/{id}:
 *   get:
 *     summary: Retorna um livro pelo ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Dados do livro
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Livro não encontrado
 *       500:
 *         description: Erro ao buscar o livro
 */
router.get('/book/:id', booksController.getBook);

/**
 * @swagger
 * /books/user/{owner_id}:
 *   get:
 *     summary: Retorna todos os livros de um usuário específico
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: owner_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do proprietário dos livros
 *     responses:
 *       200:
 *         description: Lista de livros do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       404:
 *         description: Nenhum livro encontrado para este usuário
 *       500:
 *         description: Erro ao buscar os livros
 */
router.get('/user/:owner_id', booksController.getBooksByUser);

/**
 * @swagger
 * /books/book/{id}:
 *   put:
 *     summary: Atualiza um livro pelo ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar o livro
 */
router.put('/book/:id', booksController.updateBook);

module.exports = router;
