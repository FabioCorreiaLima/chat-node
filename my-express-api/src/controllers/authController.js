const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.forgotPassword = async (req, res) => {
  try {
    await authService.forgotPassword(req.body.email);
    res.status(200).json({ message: 'Link de redefinição de senha enviado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const token = req.query.token; 
    const newPassword = req.body.password; 

    
    await authService.resetPassword(token, newPassword);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const profile = await authService.getUserProfile(userId);
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const updatedUser = await authService.updateUserProfile(userId, req.body); 
    res.status(200).json(updatedUser); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

