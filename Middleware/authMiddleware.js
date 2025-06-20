// middleware/protect.js
const jwt = require('jsonwebtoken');
const User = require('../Models/User'); 

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    
    const decoded = jwt.verify(token, process.env.SUPRA_SECURE);
 
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protect };
