
const User = require('../Models/User');
const jwt = require('jsonwebtoken');


const generateToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.SUPRA_SECURE, 
    { expiresIn: '7d' }
  );
};


exports.registerUser = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Username already taken' });
    }

  
    const user = await User.create({
      firstName,
      lastName,
      username,
      password
    });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      token: generateToken(user._id)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};


exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
 
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      token: generateToken(user._id)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
};
