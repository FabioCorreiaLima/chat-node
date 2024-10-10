const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const roomSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4, 
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
    createdBy: { 
        type: String,
        required: true
    },
    participants: { 
        type: [String],
        default: [] 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Room', roomSchema);
