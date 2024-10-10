const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const { sendResetPasswordEmail } = require('../utils/email');

class AuthService {
  async register({ username, email, password, role}) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser({ username, email, password: hashedPassword});
    return user;
  }

  async login({ email, password }) {
    const user = await userRepository.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    
    return { user, token };
  }

  async forgotPassword(email) {
    const user = await userRepository.findUserByEmail(email);
    if (!user) throw new Error('Usuário não encontrado');
  
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    await userRepository.updateUser(user.id, { resetToken, resetTokenExpiry: Date.now() + 15 * 60 * 1000 });
  
    await sendResetPasswordEmail(email, resetToken);
  }

  async resetPassword(token, newPassword) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userRepository.findUserById(decoded.id);

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userRepository.updateUser(user.id, { password: hashedPassword, resetToken: null, resetTokenExpiry: null });
  }

  async getUserProfile(userId) {
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return {
      username: user.username,
      email: user.email
    };
  }

  async updateUserProfile(userId, updateData) {
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
  
    // Atualiza os dados recebidos, se fornecidos
    user.username = updateData.username || user.username;
    user.email = updateData.email || user.email;
  
    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      user.password = hashedPassword;
    }
  
    await userRepository.updateUser(user.id, user); 
  
    return user; 
  }
  
}


module.exports = new AuthService();
