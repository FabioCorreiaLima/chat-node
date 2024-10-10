const express = require('express');
const path = require('path');
const {authMiddleware }= require('../middlewares/authMiddleware');
const routerUser = express.Router();

// Rota para servir a página dashboard
routerUser.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

// Rota para servir a página de chat
routerUser.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/chat.html'));
});

// Rota para servir a página de registro
routerUser.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

module.exports = routerUser;
