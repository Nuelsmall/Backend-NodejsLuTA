const mongoose = require('mongoose');


const walletSchema = new mongoose.Schema ({
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  balance: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('Wallet', walletSchema)