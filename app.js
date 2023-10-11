const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const authRoute = require('./routes/authroute');
const userRoutes = require('./routes/userroute')
const walletRoutes = require('./routes/walletroute')
const transactionRoutes = require('./routes/transactionroute')

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://edimmaekpri:7IfDUfMQ6LRGbaMX@cluster0.l7cspgg.mongodb.net/';

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// connect mongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    startServer();
  }catch (error) {
    console.log ('error connecting to MongoDB:', error);
  }
}

app.get('/', (req, res) => {
  res.send('We are live')
})

// use router end points
// app.use('/auth', authRoute);
app.use('/users', userRoutes);
app.use('/wallet', walletRoutes);
app.use('/transactions', transactionRoutes);

// start the server
const startServer =() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
}

connectDB();


