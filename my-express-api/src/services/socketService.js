const socketIO = require('socket.io');
const roomRepository = require('../repositories/roomRepository');

const initializeSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: "https://4ab3-45-169-174-145.ngrok-free.app", 
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', (socket) => {
        const username = socket.handshake.query.username;
        const userId = socket.handshake.query.userId; 
        let currentRoomId; 

        // Evento para entrar na sala
        socket.on('joinRoom', ({ roomId }) => {
            currentRoomId = roomId; 
            socket.join(roomId);

            // Notificar outros usuários sobre a entrada na sala
            io.to(roomId).emit('receiveMessage', {
                name: 'Sistema',
                message: `${username} entrou na sala.`,
            });
        });

        // Evento de saída da sala
        socket.on('leaveRoom', () => {
            if (currentRoomId) {
                // Emitir mensagem de saída
                io.to(currentRoomId).emit('receiveMessage', {
                    name: 'Sistema',
                    message: `${username} saiu da sala.`,
                });
                
                // Remover o usuário da sala
                socket.leave(currentRoomId);
                currentRoomId = null;
            }
        });

        // Evento de desconexão
        socket.on('disconnect', async () => {
            console.log('Usuário desconectado:', username);
            if (currentRoomId) {
                
                io.to(currentRoomId).emit('receiveMessage', {
                    name: 'Sistema',
                    message: `${username} desconectou.`,
                });
            }
        });

        // Evento para enviar mensagens
        socket.on('sendMessage', (data) => {
            io.to(data.roomId).emit('receiveMessage', {
                name: data.userName,
                message: data.message,
            });
        });

        // Evento para enviar áudio
        socket.on('sendAudio', (data) => {
            io.to(data.roomId).emit('receiveAudio', {
                audio: data.audio,
                name: data.userName,
            });
        });
    });

    return io;
};

module.exports = initializeSocket;
