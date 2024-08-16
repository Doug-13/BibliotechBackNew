const db = require('../config/firebaseConfig'); 

// Adiciona uma nova comunidade
exports.addCommunity = async (req, res) => {
    console.log('Adicionando comunidade');
    try {
      const communityRef = db.collection('communities').doc(req.body.community_id);
      await communityRef.set({
        name: req.body.name,
        description: req.body.description,
        ownerId: req.body.owner_id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
  
      res.status(200).send('Community added successfully');
    } catch (error) {
      res.status(500).send('Error adding community: ' + error.message);
    }
  };
  
  // Obtém uma comunidade por ID
  exports.getCommunity = async (req, res) => {
    try {
      const communityRef = db.collection('communities').doc(req.params.id);
      const doc = await communityRef.get();
      if (!doc.exists) {
        res.status(404).send('No such community!');
      } else {
        res.status(200).json(doc.data());
      }
    } catch (error) {
      res.status(500).send('Error getting community: ' + error.message);
    }
  };
  
  // Atualiza uma comunidade por ID
  exports.updateCommunity = async (req, res) => {
    try {
      const communityRef = db.collection('communities').doc(req.params.id);
      await communityRef.update({
        name: req.body.name,
        description: req.body.description,
        updatedAt: new Date()
      });
  
      res.status(200).send('Community updated successfully');
    } catch (error) {
      res.status(500).send('Error updating community: ' + error.message);
    }
  };
  