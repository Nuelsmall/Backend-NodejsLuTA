const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const User = require('../models/userModel');

// Get list of transactions for a wallet
router.get('/:walletId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ walletId: req.params.walletId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new transaction
router.post('/', async (req, res) => {
  const { walletId, amount, description } = req.body;

  try {
    const transaction = new Transaction({
      walletId,
      amount,
      description
      // Other transaction properties
    });

    await transaction.save();
    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// To create a new deposit
router.post('/deposit', async (req, res) => {
  try {
    const { phoneNumber, amount } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    user.balance += amount;

    // Create a transaction record for the deposit
    const transaction = new Transaction({
      senderPhoneNumber: null, // Deposits don't have a sender
      recipientPhoneNumber: phoneNumber,
      amount,
    });

    await user.save();
    await transaction.save();

    res.status(200).json({ message: 'Deposit successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error depositing money' });
  }
})

module.exports = router;
