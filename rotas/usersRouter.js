const express = require('express');
const userController = require('../controller/usersController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - user_id
 *         - codUser
 *         - name
 *         - email
 *         - password
 *       properties:
 *         user_id:
 *           type: string
 *           description: Identificador único para cada usuário
 *         codUser:
 *           type: string
 *           description: Código de usuário no formato #3df3k3s
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: E-mail do usuário
 *         password:
 *           type: string
 *           description: Senha (hash)
 *         profile_picture:
 *           type: string
 *           description: URL da foto de perfil
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação do perfil
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização do perfil
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gerenciar usuários
 */

/**
 * @swagger
 * /users/users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de todos os usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro ao buscar os usuários
 */
router.get('/users', userController.getAllUsers);



/**
 * @swagger
 * /users/user:
 *   post:
 *     summary: Adiciona um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário adicionado com sucesso
 *       500:
 *         description: Erro ao adicionar o usuário
 */
router.post('/user', userController.addUser);

//cria a rota de login
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: O email do usuário
 *               password:
 *                 type: string
 *                 description: A senha do usuário
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna o token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Usuário não encontrado ou senha inválida
 *       500:
 *         description: Erro ao fazer login
 */
router.post('/login', userController.login);


/**
 * @swagger
 * /users/user/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar o usuário
 */
router.get('/user/:id', userController.getUser);

/**
 * @swagger
 * /users/user/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar o usuário
 */
router.put('/user/:id', userController.updateUser);

/**
 * @swagger
 * /users/user/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       500:
 *         description: Erro ao remover o usuário
 */
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
