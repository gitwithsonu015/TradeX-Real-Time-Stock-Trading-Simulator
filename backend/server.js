require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const stockRoutes = require('./routes/stocks');
const tradeRoutes = require('./routes/trades');
const portfolioRoutes = require('./routes/portfolio');
const leaderboardRoutes = require('./routes/leaderboard');
const { stocks, updateStockPrice } = require('./utils/mockStockData');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://trade-x-real-time-stock-trading-sim-five.vercel.app' 
      : 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://trade-x-real-time-stock-trading-sim-five.vercel.app' 
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'TradeX Backend API - Ready for trading 🚀' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Socket.io - Real-time features
io.on('connection', (socket) => {
  console.log('👤 User connected:', socket.id);

  // Authenticate socket connection
  socket.on('authenticate', (token) => {
    try {
      // Simple token validation (use real JWT verify in production)
      socket.userId = 'authenticated_user'; // Simplified for demo
      socket.join('global');
      console.log('🔐 Socket authenticated');
    } catch (err) {
      socket.disconnect();
    }
  });

  socket.on('disconnect', () => {
    console.log('👋 User disconnected:', socket.id);
  });
});

// Simulate real-time stock updates every 5 seconds
setInterval(() => {
  const updatedStocks = stocks.map(updateStockPrice);
  
  // Broadcast to all clients
  io.emit('stockUpdate', updatedStocks);
  
  // Update global stocks reference
  global.stocks = updatedStocks; // Note: global for simplicity
}, 5000);

// Portfolio updates on trade (handled via API + emit)
io.on('connection', (socket) => {
  socket.on('subscribePortfolio', (userId) => {
    socket.join(`portfolio_${userId}`);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 TradeX Backend running on port ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api`);
  console.log(`📡 Socket: http://localhost:${PORT}`);
});
