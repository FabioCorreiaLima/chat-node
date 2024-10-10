const http = require('http');
const app = require('./app'); 
const initializeSocket = require('./services/socketService'); 


const server = http.createServer(app);

const io = initializeSocket(server);

app.use((req, res, next) => {
    req.io = io; 
    next();
});

// Iniciar o servidor
const PORT_SERVER = process.env.PORT_SERVER || 3001;
server.listen(PORT_SERVER, () => {
    console.log(`Servidor rodando na porta ${PORT_SERVER}`);
});
