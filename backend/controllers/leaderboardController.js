const User = require('../models/User');
const Portfolio = require('../models/Portfolio');

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({}).sort({ totalPnL: -1 }).limit(10).select('name email totalPnL balance');
    
    // Mock some demo users for leaderboard
    const demoUsers = [
      { name: 'Rohan Sharma', email: 'rohan@example.com', totalPnL: 125000, balance: 950000 },
      { name: 'Priya Patel', email: 'priya@example.com', totalPnL: 85000, balance: 1020000 },
      { name: 'Amit Singh', email: 'amit@example.com', totalPnL: 45000, balance: 980000 }
    ];

    res.json([...demoUsers, ...users.map(u => ({
      name: u.name,
      email: u.email,
      totalPnL: u.totalPnL || 0,
      balance: u.balance
    }))].slice(0, 10));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
