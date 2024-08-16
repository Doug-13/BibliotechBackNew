
const express = require('express');

const rotas = require('./rotas/fireBaseRotas');
const usersRouter = require('./rotas/usersRouter');
const booksRouter = require('./rotas/booksRouter');
const booksRequestsRouter = require('./rotas/booksRequestsRouter');
const communitiesRouter = require('./rotas/communitiesRouter');
const communityMembersRouter = require('./rotas/community_MembersRouter');
const friendsRouter = require('./rotas/friendsRouter');
const librariesRouter = require('./rotas/librariesRouter');
const sectionsRouter = require('./rotas/sectionsRouter');
const usersProfileRouter = require('./rotas/usersProfileRouter');


//importa as configuracoes do arquivo de configuracao
require("dotenv").config();

//importar o modulo cors para receber requisicoes de diferente origem
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.use(require("cors")());

//restringir chamadas somente da origem conhecida
const corsOptions = {
  origin: 'http://localhost:3000', // Permitir apenas essa origem
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  credentials: true, // Permitir envio de cookies
  optionsSuccessStatus: 204 // Status para requisições preflight
};

app.use(cors(corsOptions));

//Importar o modulo Swagger
const setupSwagger = require('./swagger');
const validaToken = require('./rotas/tokenRoutes');

// Configurar Swagger
setupSwagger(app);

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/usersProfile', usersProfileRouter);
app.use('/api', rotas);
app.use('/api', validaToken);
app.use('/api/books-requests', booksRequestsRouter);
app.use('/api/books', booksRouter);
app.use('/api/communities', communitiesRouter);
app.use('/api/community-members', communityMembersRouter);  
app.use('/api/friends', friendsRouter);
app.use('/api/libraries', librariesRouter);
app.use('/api/sections', sectionsRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });