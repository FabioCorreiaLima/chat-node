// app.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const connectMongoDB = require('./config/db.mongo');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const path = require('path');
const routerUser = require('./routes/rotas_user')

const app = express();

// Middleware para CORS e JSON
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
connectMongoDB();

// Servir arquivos estáticos na pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use('', routerUser)
// Roteamento
app.use('/auth', authRoutes);
app.use('/api', roomRoutes);

module.exports = app;
