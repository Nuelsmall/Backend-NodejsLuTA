// const express = require('express');
// const router = express.Router();
// const User = require('../models/userModel');

// // Get all users
// router.get('/getUsers', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create a new user
// router.post('/createUser', async (req, res) => {
//   const { name, email, password } = req.body;
// console.log(name)
//   try {
//     const user = new User({ name, email, password });
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controlller/userController');

// Define routes related to user registration and authentication
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

module.exports = router;