// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

// 1. Load environment variables
dotenv.config();

// 2. Connect to the Database
connectDB();

const app = express();

// ⚙️ Body Parser Middleware (Crucial for reading req.body!)
app.use(express.json());

// 3. Simple health-check route to test our API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Rama Cloth House Backend Engine is healthy and running!',
  });
});

// 🛣️ Mount API Routers
app.use('/api/users', userRoutes);

// 4. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
