// const express = require('express');
// const bcrypt = require('bcrypt');
// const User = require('../models/user');
// const { generateToken } = require('./jwtUtils'); // Create a separate module for JWT token generation

// const app = express();
// app.use(express.json());

// const isEmailValid = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// const validateSignup = (req, res, next) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: 'Name, email, and password are required' });
//   }

//   if (!isEmailValid(email)) {
//     return res.status(400).json({ message: 'Invalid email format' });
//   }

//   if (password.length < 6) {
//     return res.status(400).json({ message: 'Password must be at least 6 characters long' });
//   }

//   next();
// };

// const validateLogin = (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   if (!isEmailValid(email)) {
//     return res.status(400).json({ message: 'Invalid email format' });
//   }

//   next();
// };

// const signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new User({ name, email, password: hashedPassword });

//     await user.save();

//     const token = generateToken(user._id);
//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = generateToken(user._id);
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   signup,
//   login,
//   validateSignup,
//   validateLogin,
// };


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
// signup
const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, phoneNumber, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    console.log(res.body)
    res.status(500).json({ message: 'Error registering user' });
  }
};

// signin
const signin = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });

    console.log('Received data:', req.body);
    console.log('Received user:', user);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('Received password:', password);
    console.log('stored hashed password:', user.password);

    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log(passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Password does not match user' });
    }

    const token = jwt.sign({ phoneNumber: user.phoneNumber }, 'secret_key');
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error signing in' });
  }
};

module.exports = { signin, signup };