const bcrypt = require('bcryptjs');
const prisma = require('../utils/db');

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long',
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (existingUser) {
      return res.status(409).json({
        error: 'User with this email already exist',
      });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerUser };
