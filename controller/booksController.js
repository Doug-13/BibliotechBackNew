const { db } = require('../config/firebaseConfig');

// Adiciona um novo livro
exports.addBook = async (req, res) => {
  console.log('Adicionando livro');
  try {
    const bookRef = db.collection('books').doc(req.body.book_id);
    await bookRef.set({
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      publisher:req.body.publisher,
      publishDate: req.body.publish_date,
      genre: req.body.genre, 
      description:req.body.description,
      status: req.body.status,
      ownerId: req.body.owner_id,
      visibility: req.body.visibility,
      imageUrl: req.body.image_url,
       createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(200).send('Book added successfully');
  } catch (error) {
    res.status(500).send('Error adding book: ' + error.message);
  }
};

// Obtém todos os livros de um usuário
exports.getBooksByUser = async (req, res) => {
  try {
    const { owner_id } = req.params;
    const booksRef = db.collection('books').where('ownerId', '==', owner_id);
    const snapshot = await booksRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'Nenhum livro encontrado para este usuário' });
    }

    const books = [];
    snapshot.forEach(doc => {
      books.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(books);
  } catch (error) {
    console.error("Erro ao buscar os livros:", error); // Log do erro
    res.status(500).json({ message: 'Erro ao buscar os livros', error: error.message || error });
  }
};

// Obtém um livro por ID
exports.getBook = async (req, res) => {
  try {
    const bookRef = db.collection('books').doc(req.params.id);
    const doc = await bookRef.get();
    if (!doc.exists) {
      res.status(404).send('No such book!');
    } else {
      res.status(200).json(doc.data());
    }
  } catch (error) {
    res.status(500).send('Error getting book: ' + error.message);
  }
};

// Atualiza um livro por ID
exports.updateBook = async (req, res) => {
  try {
    const bookRef = db.collection('books').doc(req.params.id);
    await bookRef.update({
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      publisher:req.body.publisher,
      publishDate: req.body.publish_date,
      genre: req.body.genre, 
      description:req.body.description,
      status: req.body.status,
      ownerId: req.body.owner_id,
      visibility: req.body.visibility,
      imageUrl: req.body.image_url,
      
      updatedAt: new Date()
    });

    res.status(200).send('Book updated successfully');
  } catch (error) {
    res.status(500).send('Error updating book: ' + error.message);
  }
};
