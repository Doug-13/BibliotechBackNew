const { db } = require('../config/firebaseConfig');

// Importa o modulo de criptografia
const bycrypt = require('bcryptjs');

// Importa o modulo de web Token
const jwt = require('jsonwebtoken')




function getHashedPassword(password) {
    // Valor 10 e o valor do custo para gerar o hash
    const salt = bycrypt.genSaltSync(10);
    const hashedPassword = bycrypt.hashSync(password, salt);
  
    return hashedPassword;
  }

exports.addUser = async (req, res) => {
    console.log('body', req.body.user_id, req.body.codUser,req.body.name,req.body.email);
                        
    
    const hashedPassword = getHashedPassword(req.body.password);
    
    try {
        const userRef = db.collection('users').doc("1");
        await userRef.set({
            user_id: "1",
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date()
        });

        res.status(200).send('User added successfully');
    } catch (error) {
        console.log('addUser', error);
        res.status(500).send('Error adding user: ' + error.message);
    }
};

exports.getUser = async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        const doc = await userRef.get();
        if (!doc.exists) {
            res.status(404).send('No such user!');
        } else {
            res.status(200).json(doc.data());
        }
    } catch (error) {
        res.status(500).send('Error getting user: ' + error.message);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();

        if (snapshot.empty) {
            res.status(404).send('No users found');
            return;
        }

        let users = [];
        snapshot.forEach(doc => {
            users.push(doc.data());
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error getting users: ' + error.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        await userRef.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            updated_at: new Date()
        });

        res.status(200).send('User updated successfully');
    } catch (error) {
        res.status(500).send('Error updating user: ' + error.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        await userRef.delete();
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting user: ' + error.message);
    }
};

// Efetua o login do usuario
exports.login = async (req, res) => {
    const {email, password} = req.body;
    console.log('email', email);
    
    try {
      db.collection('users')
  .where('email', '==', email)
  .get()
  .then((querySnapshot) => {
    if (querySnapshot.empty) {
      console.log('Nenhum usuário encontrado com esse email.');
      return;
    }
    // Iterar pelos documentos encontrados (no caso, deve ser no máximo um)
    querySnapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
    
      if(!doc.exists) {
        // console.log('Usuario não encontrado', doc.email);
        return res.status(400).send('Dados incorretos - cod 171! (¬_¬ )');
      }
      else{
        const storedPasswordHash = req.body.password;
        console.log('banco', password)
      
        // Compare a senha fornecida pelo usuário com a senha armazenada
        const isPasswordValid = bycrypt.compareSync(password, storedPasswordHash);
        console.log('isPasswordValid', password)

  
        if(!isPasswordValid === password) {
          console.log('Dados incorretos - cod 404!');
          return res.status(400).send('Dados incorretos! (¬_¬ )');
        } else {
        const token = jwt.sign({userId: doc.id}, process.env.JWT_KEY);
        res.send({token});
    } }
    
    });
  })
  .catch((error) => {
    console.error('Erro ao buscar usuário:', error);
  });
      } catch (err) {
      console.log('Erro no login ;-;', err)
      res.status(400).send('X|Erro no login:' + err.message);
    }
  
  }

  