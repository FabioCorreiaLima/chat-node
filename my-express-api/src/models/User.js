// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Definição do modelo User
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID, // Altera o tipo para UUID
    defaultValue: DataTypes.UUIDV4, // Gera um UUID automaticamente
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,  // Validação para garantir que o email seja válido
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
});

module.exports = User;
