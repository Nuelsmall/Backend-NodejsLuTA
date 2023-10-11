const express = require('express');
const router = express.Router();
const Wallet = require('../models/wallet');

// Create a new wallet
router.post('/createWallet', async (req, res) => {
  const { phoneNumber, balance } = req.body;

  try {
    const newWallet = await Wallet.create({ phoneNumber, balance });
    res.status(201).json(newWallet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update wallet balance
router.patch('/:id', async (req, res) => {
  const { balance } = req.body;

  try {
    const updatedWallet = await Wallet.findByIdAndUpdate(
      req.params.id,
      { $set: { balance } },
      { new: true }
    );

    res.json(updatedWallet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get wallet details
router.get('/:id', async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.id);

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Transfer funds to another wallet
router.post('/transfer', async (req, res) => {
  const { senderWalletId, receiverWalletId, amount } = req.body;

  try {
    const [senderWallet, receiverWallet] = await Promise.all([
      Wallet.findById(senderWalletId),
      Wallet.findById(receiverWalletId)
    ]);

    if (!senderWallet || !receiverWallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    if (senderWallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await Promise.all([senderWallet.save(), receiverWallet.save()]);

    res.json({ message: 'Funds transferred successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
