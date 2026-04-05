const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully Connected to DB');
  } catch (error) {
    console.log('failed to connect to DB');
  }
};

module.exports = connectDB;