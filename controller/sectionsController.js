const db = require('../config/firebaseConfig'); 

// Adiciona uma nova seção
exports.addSection = async (req, res) => {
    console.log('Adicionando seção');
    try {
      const sectionRef = db.collection('sections').doc(req.body.section_id);
      await sectionRef.set({
        userId: req.body.user_id,
        name: req.body.name,
        description: req.body.description,
        createdAt: new Date(),
        updatedAt: new Date()
      });
  
      res.status(200).send('Section added successfully');
    } catch (error) {
      res.status(500).send('Error adding section: ' + error.message);
    }
  };
  
  // Obtém uma seção por ID
  exports.getSection = async (req, res) => {
    try {
      const sectionRef = db.collection('sections').doc(req.params.id);
      const doc = await sectionRef.get();
      if (!doc.exists) {
        res.status(404).send('No such section!');
      } else {
        res.status(200).json(doc.data());
      }
    } catch (error) {
      res.status(500).send('Error getting section: ' + error.message);
    }
  };
  
  // Atualiza uma seção por ID
  exports.updateSection = async (req, res) => {
    try {
      const sectionRef = db.collection('sections').doc(req.params.id);
      await sectionRef.update({
        name: req.body.name,
        description: req.body.description,
        updatedAt: new Date()
      });
  
      res.status(200).send('Section updated successfully');
    } catch (error) {
      res.status(500).send('Error updating section: ' + error.message);
    }
  };
  