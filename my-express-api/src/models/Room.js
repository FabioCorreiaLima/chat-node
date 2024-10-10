const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Importar o uuid

const roomSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4, // Gerar UUID automaticamente
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: { // ID do usuário que criou a sala
        type: String,
        required: true
    },
    participants: { // Lista de participantes da sala (array de IDs de usuários)
        type: [String],
        default: [] // Inicialmente, a sala não terá participantes, exceto o criador
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Room', roomSchema);
