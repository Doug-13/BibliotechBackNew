const { db } = require('../config/firebaseConfig');
const { generateUniqueId } = require('../Components/UniqueIdGenerator'); // Ajuste o caminho conforme necessário

// Adiciona um novo livro
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
      publisher: req.body.publisher,
      publishDate: req.body.publish_date,
      genre: req.body.genre,
      description: req.body.description,
      status: req.body.status,
      ownerId: req.body.owner_id,
      visibility: req.body.visibility,
      imageUrl: req.body.image_url,
      updatedAt: new Date()
    });

    res.status(200).send('Livro atualizado com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao atualizar livro: ' + error.message);
  }
};

// Deleta um livro por ID
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookRef = db.collection('books').doc(id);
    
    // Obtém o documento para verificar se ele existe
    const doc = await bookRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    // Deleta o documento
    await bookRef.delete();

    res.status(200).json({ message: 'Livro deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar livro:', error); // Log do erro
    res.status(500).json({ message: 'Erro ao deletar o livro', error: error.message || error });
  }
};



// exports.getBooksWithLoanStatus = async (req, res) => {
//   try {
//     const ownerId = req.params.owner_id;

//     // Obtém todos os livros do usuário
//     const booksRef = db.collection('books').where('ownerId', '==', ownerId);
//     const booksSnapshot = await booksRef.get();

//     if (booksSnapshot.empty) {
//       return res.status(404).json({ message: 'Nenhum livro encontrado para este usuário' });
//     }

//     const books = [];
//     for (const bookDoc of booksSnapshot.docs) {
//       const bookData = bookDoc.data();
//       const bookId = bookDoc.id;

//       // Obtém o status de empréstimo do livro
//       const loanRef = db.collection('book_requests').where('bookId', '==', bookId);
//       const loanSnapshot = await loanRef.get();

//       let loanData = null;
//       if (!loanSnapshot.empty) {
//         loanSnapshot.forEach(doc => {
//           loanData = doc.data();
//         });
//       }

//       // Adiciona o livro e o status do empréstimo ao resultado
//       books.push({
//         ...bookData,
//         bookId,
//         loan: loanData ? {
//           requesterId: loanData.requesterId,
//           loanDate: loanData.loanDate,
//           returnDate: loanData.returnDate,
//           status: loanData.status,
//           deliveryStatus: getDeliveryStatus(loanData.returnDate) // Função para calcular se está em dia ou atrasado
//         } : null
//       });
//     }

//     res.status(200).json(books);
//   } catch (error) {
//     console.error("Erro ao buscar os livros e status de empréstimo:", error);
//     res.status(500).json({ message: 'Erro ao buscar os livros e status de empréstimo', error: error.message || error });
//   }
// };

// const getDeliveryStatus = (returnDate) => {
//   if (!returnDate) return 'Não emprestado';

//   const today = new Date();
//   const returnDateObj = new Date(returnDate);

//   if (today <= returnDateObj) {
//     return 'Em dia';
//   } else {
//     return 'Atrasado';
//   }
// };

exports.getBooksWithLoanStatus = async (req, res) => {
  try {
    const ownerId = req.params.owner_id;

    // Obtém todos os livros do usuário
    const booksRef = db.collection('books').where('ownerId', '==', ownerId);
    const booksSnapshot = await booksRef.get();

    if (booksSnapshot.empty) {
      return res.status(404).json({ message: 'Nenhum livro encontrado para este usuário' });
    }

    const books = [];
    for (const bookDoc of booksSnapshot.docs) {
      const bookData = bookDoc.data();
      const bookId = bookDoc.id;

      // Obtém o status de empréstimo do livro
      const loanRef = db.collection('book_requests').where('bookId', '==', bookId);
      const loanSnapshot = await loanRef.get();

      let loanData = null;
      let requestId = null;
      if (!loanSnapshot.empty) {
        loanSnapshot.forEach(doc => {
          loanData = doc.data();
          requestId = doc.id; // Obtém o ID da solicitação de empréstimo
        });
      }

      // Adiciona o livro e o status do empréstimo ao resultado
      books.push({
        ...bookData,
        bookId,
        loan: loanData ? {
          requestId, // Adiciona o ID da solicitação de empréstimo
          requesterId: loanData.requesterId,
          loanDate: loanData.loanDate,
          returnDate: loanData.returnDate,
          status: loanData.status,
          deliveryStatus: getDeliveryStatus(loanData.returnDate) // Função para calcular se está em dia ou atrasado
        } : null
      });
    }

    res.status(200).json(books);
  } catch (error) {
    console.error("Erro ao buscar os livros e status de empréstimo:", error);
    res.status(500).json({ message: 'Erro ao buscar os livros e status de empréstimo', error: error.message || error });
  }
};

const getDeliveryStatus = (returnDate) => {
  if (!returnDate) return 'Não emprestado';

  const today = new Date();
  const returnDateObj = new Date(returnDate);

  if (today <= returnDateObj) {
    return 'Em dia';
  } else {
    return 'Atrasado';
  }
};
