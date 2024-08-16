    const express = require('express');
    const community_MembersController = require('../controller/community_MembersController'); // Verifique o caminho

    const router = express.Router();

    /**
     * @swagger
     * components:
     *   schemas:
     *     CommunityMember:
     *       type: object
     *       required:
     *         - community_id
     *         - user_id
     *       properties:
     *         community_id:
     *           type: string
     *           description: ID da comunidade
     *         user_id:
     *           type: string
     *           description: ID do usuário
     *         role:
     *           type: string
     *           description: {Papel do usuário na comunidade (ex: membro, administrador)}
     *         joinedAt:
     *           type: string
     *           format: date-time
     *           description: Data em que o usuário entrou na comunidade
     */

    /**
     * @swagger
     * tags:
     *   name: CommunityMembers
     *   description: API para gerenciar membros de comunidades
     */

    /**
     * @swagger
     * /community-members/community_member:
     *   post:
     *     summary: Adiciona um membro a uma comunidade
     *     tags: [CommunityMembers]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CommunityMember'
     *     responses:
     *       200:
     *         description: Membro adicionado com sucesso
     *       500:
     *         description: Erro ao adicionar o membro
     */
    router.post('/community_member', community_MembersController.addCommunityMember); // Função deve estar definida

    /**
     * @swagger
     * /community-members/community_member/{community_id}:
     *   get:
     *     summary: Retorna os membros de uma comunidade
     *     tags: [CommunityMembers]
     *     parameters:
     *       - in: path
     *         name: community_id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID da comunidade
     *     responses:
     *       200:
     *         description: Dados dos membros da comunidade
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/CommunityMember'
     *       404:
     *         description: Membros não encontrados
     *       500:
     *         description: Erro ao buscar os membros
     */
    router.get('/community_member/:community_id', community_MembersController.getCommunityMembers); // Função deve estar definida

    /**
     * @swagger
     * /community-members/community_member:
     *   delete:
     *     summary: Remove um membro de uma comunidade
     *     tags: [CommunityMembers]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CommunityMember'
     *     responses:
     *       200:
     *         description: Membro removido com sucesso
     *       500:
     *         description: Erro ao remover o membro
     */
    router.delete('/community_member', community_MembersController.removeCommunityMember); // Função deve estar definida

    module.exports = router;
