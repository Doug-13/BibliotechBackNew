const generateUniqueId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

exports.addBook = async (req, res) => {
  console.log('Adicionando livro');
  try {
    // Obtém os dados do corpo da requisição
    const { title, author, isbn, publisher, publish_date, genre, description, status, owner_id, visibility, image_url, rating } = req.body;

    // Gera um novo ID se não for fornecido
    const book_id = req.body.book_id || generateUniqueId();

    // Cria uma referência para o novo livro
    const bookRef = db.collection('books').doc(book_id);

    // Define os dados do livro
    const bookData = {
      title,
      author,
      isbn,
      publisher,
      publishDate: publish_date,
      genre,
      description,
      status,
      ownerId: owner_id,
      visibility,
      imageUrl: image_url,
      rating: rating || 0, // Define a avaliação, padrão 0 se não fornecido
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Adiciona ou atualiza o livro na coleção 'books'
    await bookRef.set(bookData);

    // Envia uma resposta de sucesso
    res.status(200).send('Livro adicionado com sucesso');
  } catch (error) {
    // Envia uma resposta de erro
    res.status(500).send('Erro ao adicionar livro: ' + error.message);
  }
};





// Obtém todos os livros de um usuário
exports.getBooksByUser = async (req, res) => {
  try {
    const { owner_id } = req.params;
    const booksRef = db.collection('books').where('ownerId', '==', owner_id); // Corrigido para 'ownerId'
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
      owner_id: req.body.owner_id,
      visibility: req.body.visibility,
      imageUrl: req.body.image_url,
      
      updatedAt: new Date()
    });

    res.status(200).send('Book updated successfully');
  } catch (error) {
    res.status(500).send('Error updating book: ' + error.message);
  }
};
