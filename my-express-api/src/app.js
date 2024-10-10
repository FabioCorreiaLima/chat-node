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


app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
connectMongoDB();


app.use(express.static(path.join(__dirname, 'public')));

app.use('', routerUser)

app.use('/auth', authRoutes);
app.use('/api', roomRoutes);

module.exports = app;
