// const express = require('express');
// const { body } = require('express-validator');
// const router = express.Router();
// const User = require('../models/userModel'); // Import your User model

// const isEmailValid = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// const validateSignup = [
//   body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
//   body('name').notEmpty().withMessage('Name is required'),
// ];

// const validateLogin = [
//   body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
//   body('password').notEmpty().withMessage('Password is required'),
// ];

// const handleValidationErrors = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

// // POST route for user signup
// router.post('/signup', validateSignup, handleValidationErrors, async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: 'User with this email already exists' });
//     }

//     // Create a new user
//     const user = new User({ name, email, password });
//     await user.save();

//     res.status(201).json({ message: 'User created successfully', user });
//   } catch (error) {
//     console.error('Error during signup:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // POST route for user login
// router.post('/login', validateLogin, handleValidationErrors, async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Check if the password is correct (you should use a secure authentication mechanism)
//     if (password !== user.password) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Authentication successful
//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;
