const db = require('../config/firebaseConfig'); 

// Adiciona uma solicitação de livro
exports.addBookRequest = async (req, res) => {
    console.log('Adicionando solicitação de livro');
    try {
      const requestRef = db.collection('book_requests').doc();
      await requestRef.set({
        requesterId: req.body.requester_id,
        ownerId: req.body.owner_id,
        bookId: req.body.book_id,
        status: req.body.status,
        createdAt: new Date(),
        updatedAt: new Date()
      });
  
      res.status(200).send('Book request added successfully');
    } catch (error) {
      res.status(500).send('Error adding book request: ' + error.message);
    }
  };
  
  // Obtém solicitações de livro de um usuário
  exports.getBookRequests = async (req, res) => {
    try {
      const requestsRef = db.collection('book_requests').where('requesterId', '==', req.params.user_id);
      const snapshot = await requestsRef.get();
      if (snapshot.empty) {
        res.status(404).send('No book requests found!');
      } else {
        const requests = snapshot.docs.map(doc => doc.data());
        res.status(200).json(requests);
      }
    } catch (error) {
      res.status(500).send('Error getting book requests: ' + error.message);
    }
  };
  
  // Atualiza uma solicitação de livro
  exports.updateBookRequest = async (req, res) => {
    try {
      const requestRef = db.collection('book_requests').doc(req.params.id);
      await requestRef.update({
        status: req.body.status,
        updatedAt: new Date()
      });
  
      res.status(200).send('Book request updated successfully');
    } catch (error) {
      res.status(500).send('Error updating book request: ' + error.message);
    }
  };
  