const { db } = require('../config/firebaseConfig');
db.settings({ ignoreUndefinedProperties: true });

exports.addBookRequest = async (req, res) => {
  console.log('Dados recebidos:', req.body);
  
  const { requester_id, owner_id, bookId, status, loan_date, return_date } = req.body;

  // Valida se todos os campos estão presentes e não são undefined
  if (!requester_id || !owner_id || !bookId || !status || !loan_date || !return_date) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const requestRef = db.collection('book_requests').doc();
    await requestRef.set({
      requesterId: requester_id,
      ownerId: owner_id,
      bookId: bookId,
      status: status,
      loanDate: loan_date,
      returnDate: return_date,
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
  