const db = require('../config/firebaseConfig.js'); // Verifique se o caminho está correto

// Adiciona um membro à comunidade
exports.addCommunityMember = async (req, res) => {
    console.log('Adicionando membro à comunidade');
    try {
        const memberRef = db.collection('community_members').doc();
        await memberRef.set({
            communityId: req.body.community_id,
            userId: req.body.user_id,
            role: req.body.role,
            joinedAt: new Date()
        });
        res.status(200).send('Community member added successfully');
    } catch (error) {
        res.status(500).send('Error adding community member: ' + error.message);
    }
};

// Obtém membros de uma comunidade
exports.getCommunityMembers = async (req, res) => {
    try {
        const membersRef = db.collection('community_members').where('communityId', '==', req.params.community_id);
        const snapshot = await membersRef.get();
        if (snapshot.empty) {
            res.status(404).send('No members found!');
        } else {
            const members = snapshot.docs.map(doc => doc.data());
            res.status(200).json(members);
        }
    } catch (error) {
        res.status(500).send('Error getting community members: ' + error.message);
    }
};

// Remove um membro da comunidade
exports.removeCommunityMember = async (req, res) => {
    try {
        const { community_id, user_id } = req.body;
        const memberRef = db.collection('community_members')
            .where('communityId', '==', community_id)
            .where('userId', '==', user_id);
        const snapshot = await memberRef.get();
        if (snapshot.empty) {
            res.status(404).send('Member not found!');
        } else {
            const batch = db.batch();
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            res.status(200).send('Community member removed successfully');
        }
    } catch (error) {
        res.status(500).send('Error removing community member: ' + error.message);
    }
};
