const express = require('express');
const usersProfileController = require('../controller/usersProfileController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       required:
 *         - user_id
 *         - name
 *         - nickname
 *         - birthDate
 *         - biography
 *         - reading_references
 *         - phoneNumber
 *         - socialMedias
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
 *         nickname:
 *           type: string
 *           description: Apelido do usuário  
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Data de Nascimento do usuário
 *         biography:
 *           type: string
 *           description: Breve apresentação sobre o usuário
 *         reading_preferences:
 *           type: string
 *           description: Preferências de leitura
 *         phoneNumber:
 *           type: integer
 *         socialMedias:
 *           type: string
 *           description: Redes sociais do usuário
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
 *   name: Users Profiles
 *   description: API para gerenciar perfis de usuários
 */

/**
 * @swagger
 * /usersProfile/users_profiles:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users Profiles]
 *     responses:
 *       200:
 *         description: Lista de todos os usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserProfile'
 *       500:
 *         description: Erro ao buscar os usuários
 */
router.get('/users_profiles', usersProfileController.getAllUsersProfile);

/**
 * @swagger
 * /usersProfile/user_ProfileID/{id}:
 *   get:
 *     summary: Buscar registro por ID
 *     tags: [Users Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Buscar registro por ID
 */
router.get('/user_ProfileID/:id', usersProfileController.getUserProfileID);

/**
 * @swagger
 * /usersProfile/user_profile:
 *   post:
 *     summary: Adiciona um novo usuário
 *     tags: [Users Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200:
 *         description: Usuário adicionado com sucesso
 *       500:
 *         description: Erro ao adicionar o usuário
 */
router.post('/user_profile', usersProfileController.addUserProfile);

/**
 * @swagger
 * /usersProfile/user_profile/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Users Profiles]
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
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       500:
 *         description: Erro ao atualizar o usuário
 */
router.put('/user_profile/:id', usersProfileController.updateUserProfile);

/**
 * @swagger
 * /usersProfile/user_profile/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags: [Users Profiles]
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
router.delete('/user_profile/:id', usersProfileController.deleteUserProfile);

module.exports = router;