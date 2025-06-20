const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const connectDB = require('./config/db');
const authRoutes = require('./Routes/authRoutes');
const itemRoutes = require('./Routes/itemRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));


app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
