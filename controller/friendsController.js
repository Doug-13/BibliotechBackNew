const db = require('../config/firebaseConfig'); 

// Adiciona uma amizade
exports.addFriend = async (req, res) => {
    console.log('Adicionando amizade');
    try {
      const friendRef = db.collection('friends').doc();
      await friendRef.set({
        userId: req.body.user_id,
        friendId: req.body.friend_id,
        status: req.body.status,
        createdAt: new Date(),
        updatedAt: new Date()
      });
  
      res.status(200).send('Friend added successfully');
    } catch (error) {
      res.status(500).send('Error adding friend: ' + error.message);
    }
  };
  
  // Obtém a lista de amigos de um usuário
  exports.getFriends = async (req, res) => {
    try {
      const friendRef = db.collection('friends').where('userId', '==', req.params.user_id);
      const snapshot = await friendRef.get();
      if (snapshot.empty) {
        res.status(404).send('No friends found!');
      } else {
        const friends = snapshot.docs.map(doc => doc.data());
        res.status(200).json(friends);
      }
    } catch (error) {
      res.status(500).send('Error getting friends: ' + error.message);
    }
  };
  
  // Atualiza uma amizade
  exports.updateFriend = async (req, res) => {
    try {
      const friendRef = db.collection('friends').doc(req.params.id);
      await friendRef.update({
        status: req.body.status,
        updatedAt: new Date()
      });
  
      res.status(200).send('Friend updated successfully');
    } catch (error) {
      res.status(500).send('Error updating friend: ' + error.message);
    }
  };
  
  exports.removeFriend = async (req, res) => {
    console.log('Removendo amigo');
    try {
        const { user_id, friend_id } = req.body;
        const friendRef = db.collection('friends')
            .where('userId', '==', user_id)
            .where('friendId', '==', friend_id);
        const snapshot = await friendRef.get();
        if (snapshot.empty) {
            res.status(404).send('Friend not found!');
        } else {
            const batch = db.batch();
            snapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            res.status(200).send('Friend removed successfully');
        }
    } catch (error) {
        res.status(500).send('Error removing friend: ' + error.message);
    }
};
