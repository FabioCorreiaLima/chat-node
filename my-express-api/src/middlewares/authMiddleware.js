const jwt = require('jsonwebtoken');


exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usando o segredo do .env
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};


exports.authMiddlewareSocket = (token, callback) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usando o mesmo segredo do .env
    callback(null, decoded);
  } catch (error) {
    callback(new Error('Invalid token'));
  }
};
