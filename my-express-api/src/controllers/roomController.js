const roomRepository = require('../repositories/roomRepository');
const { findUserById } = require('../repositories/userRepository');

// Criar uma nova sala
exports.createRoom = async (req, res) => {
    const { name, description, capacity } = req.body;
    const userId = req.user.id; // ID do usuário autenticado

    try {
        const roomData = {
            name,
            description,
            capacity,
            isActive: true,
            createdBy: userId, // ID do criador da sala
            participants: [] // Inicialmente, não há participantes
        };

        const room = await roomRepository.createRoom(roomData);
        return res.status(201).json({ message: 'Sala criada com sucesso!', room });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar sala.', error });
    }
};

// Listar todas as salas
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await roomRepository.findAllRooms();
        return res.status(200).json({rooms});
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao listar salas.', error });
    }
};

// Participar de uma sala
exports.joinRoom = async (req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id; // ID do usuário autenticado
    console.log('Socket.io está definido em req.io:', !!req.io);
    try {
        const room = await roomRepository.findRoomById(roomId);
        console.log('Sala encontrada:', room);

        if (!room) {
            return res.status(404).json({ message: 'Sala não encontrada.' });
        }

        await roomRepository.addParticipant(room, userId);
        console.log(`Usuário ${userId} adicionado à sala ${roomId}`);

        // Emitir evento para o Socket.io
        if (req.io) {
            req.io.to(roomId).emit('message', { username: 'Sistema', message: `Usuário ${userId} entrou na sala!` });
        } else {
            console.error('Socket.io não está definido em req.io');
        }

        return res.status(200).json({ message: 'Você entrou na sala com sucesso!', room });
    } catch (error) {
        console.error('Erro ao participar da sala:', error.message || error); // Log detalhado
        return res.status(500).json({ message: 'Erro ao participar da sala.', error: error.message || 'Erro desconhecido' });
    }
};

exports.leaveRoom = async (req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id; // ID do usuário autenticado

    try {
        console.log(`Tentando sair da sala: ${roomId} para o usuário: ${userId}`);

        const room = await roomRepository.findRoomById(roomId);

        if (!room) {
            return res.status(404).json({ message: 'Sala não encontrada.' });
        }

        await roomRepository.removeParticipant(room, userId);
        
        
        return res.status(200).json({ message: 'Você saiu da sala com sucesso!', room });
    } catch (error) {
        console.error('Erro ao sair da sala:', error); // Log do erro
        return res.status(500).json({ message: 'Erro ao sair da sala.', error: error.message }); // Retorna a mensagem de erro
    }
};
