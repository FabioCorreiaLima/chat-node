const http = require('http');
const app = require('./app'); // Express app
const initializeSocket = require('./services/socketService'); // Importando o socketService

// Criar o servidor HTTP
const server = http.createServer(app);

const io = initializeSocket(server);
// Middleware para passar o io para as requisições
app.use((req, res, next) => {
    req.io = io; // Adiciona o io ao objeto de requisição
    next();
});

// Iniciar o servidor
const PORT_SERVER = process.env.PORT_SERVER || 3001;
server.listen(PORT_SERVER, () => {
    console.log(`Servidor rodando na porta ${PORT_SERVER}`);
});
