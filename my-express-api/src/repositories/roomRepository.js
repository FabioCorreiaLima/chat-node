// repositories/roomRepository.js

const Room = require('../models/Room');

class RoomRepository {
    // Criar uma nova sala
    async createRoom(data) {
        const room = new Room(data);
        await room.save();
        return room;
    }

    // Listar todas as salas
    async findAllRooms() {
        return await Room.find();
    }

    // Encontrar sala por ID
    async findRoomById(roomId) {
        return await Room.findOne({ _id: roomId });
    }

    // Atualizar sala
    async updateRoom(room) {
        return await room.save();
    }

    // Adicionar participante à sala
    async addParticipant(room, userId) {
        if (!room.participants.includes(userId)) {
            room.participants.push(userId);
            await this.updateRoom(room);
        }
    }

    // Remover participante da sala
    async removeParticipant(room, userId) {
        room.participants = room.participants.filter(participant => participant !== userId);
        await this.updateRoom(room);
    }
}

module.exports = new RoomRepository();
