const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  const { name, mobile, password } = req.body;

  // Validate input
  if (!name || !mobile || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      mobile,
      password: hashedPassword,
    });

    // Save user to DB
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createUser };
