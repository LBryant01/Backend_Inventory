const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.No_No, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
