const db = require('../config/firebaseConfig'); 

// Adiciona um livro à biblioteca do usuário
exports.addToLibrary = async (req, res) => {
    console.log('Adicionando livro à biblioteca');
    try {
      const libraryRef = db.collection('libraries').doc(req.body.library_id);
      await libraryRef.set({
        userId: req.body.user_id,
        bookId: req.body.book_id,
        sectionId: req.body.section_id,
        rating: req.body.rating,
        createdAt: new Date(),
        updatedAt: new Date()
      });
  
      res.status(200).send('Book added to library successfully');
    } catch (error) {
      res.status(500).send('Error adding book to library: ' + error.message);
    }
  };
  
  // Obtém a biblioteca de um usuário
  exports.getLibrary = async (req, res) => {
    try {
      const libraryRef = db.collection('libraries').where('userId', '==', req.params.user_id);
      const snapshot = await libraryRef.get();
      if (snapshot.empty) {
        res.status(404).send('No books found in library!');
      } else {
        const books = snapshot.docs.map(doc => doc.data());
        res.status(200).json(books);
      }
    } catch (error) {
      res.status(500).send('Error getting library: ' + error.message);
    }
  };
  
  // Atualiza uma entrada na biblioteca
  exports.updateLibrary = async (req, res) => {
    try {
      const libraryRef = db.collection('libraries').doc(req.params.id);
      await libraryRef.update({
        sectionId: req.body.section_id,
        rating: req.body.rating,
        updatedAt: new Date()
      });
  
      res.status(200).send('Library entry updated successfully');
    } catch (error) {
      res.status(500).send('Error updating library entry: ' + error.message);
    }
  };
  