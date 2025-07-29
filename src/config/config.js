
const mongoose = require('mongoose');
require('dotenv').config();

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = mongoConnect;
