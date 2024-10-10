
const express = require('express');
const { createRoom, getAllRooms, joinRoom , leaveRoom} = require('../controllers/roomController');
const {authMiddleware }= require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/rooms', authMiddleware, createRoom);
router.get('/rooms', authMiddleware, getAllRooms);
router.post('/rooms/join/:roomId', authMiddleware, joinRoom);
router.post('/rooms/leave/:roomId', authMiddleware, leaveRoom);

module.exports = router;
