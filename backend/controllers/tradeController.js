const Trade = require('../models/Trade');
const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const { stocks } = require('../utils/mockStockData');

const executeTrade = async (userId, symbol, type, quantity, currentPrice) => {
  const totalAmount = quantity * currentPrice;
  symbol = symbol.toUpperCase();

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const stock = stocks.find(s => s.symbol === symbol);
  if (!stock) throw new Error('Stock not found');

  const portfolio = await Portfolio.findOne({ userId }) || 
    new Portfolio({ userId: userId, holdings: [] });

  if (type === 'BUY') {
    if (user.balance < totalAmount) {
      throw new Error('Insufficient balance');
    }
    
    user.balance -= totalAmount;

    // Update/Add holding
    const holdingIndex = portfolio.holdings.findIndex(h => h.symbol === symbol);
    if (holdingIndex >= 0) {
      const holding = portfolio.holdings[holdingIndex];
      const newQuantity = holding.quantity + quantity;
      const newAvgPrice = ((holding.avgPrice * holding.quantity) + (currentPrice * quantity)) / newQuantity;
      portfolio.holdings[holdingIndex] = { symbol, quantity: newQuantity, avgPrice: newAvgPrice };
    } else {
      portfolio.holdings.push({ symbol, quantity, avgPrice: currentPrice });
    }
  } else if (type === 'SELL') {
    const holdingIndex = portfolio.holdings.findIndex(h => h.symbol === symbol);
    if (holdingIndex < 0 || portfolio.holdings[holdingIndex].quantity < quantity) {
      throw new Error('Insufficient stock quantity');
    }

    const holding = portfolio.holdings[holdingIndex];
    const sellValue = quantity * currentPrice;
    user.balance += sellValue;

    // Update holding
    const newQuantity = holding.quantity - quantity;
    if (newQuantity > 0) {
      portfolio.holdings[holdingIndex].quantity = newQuantity;
    } else {
      portfolio.holdings.splice(holdingIndex, 1);
    }
  }

  // Save changes
  await user.save();
  await portfolio.save();

  // Create trade record
  const trade = new Trade({ userId, symbol, type, quantity, price: currentPrice, totalAmount });
  await trade.save();

  return { user, portfolio, trade, stock };
};

exports.buyStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    const result = await executeTrade(req.user._id, symbol, 'BUY', quantity, stocks.find(s => s.symbol === symbol.toUpperCase()).price);
    
    res.json({
      success: true,
      message: 'Buy order executed',
      balance: result.user.balance,
      portfolio: result.portfolio.holdings,
      trade: result.trade
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.sellStock = async (req, res) => {
  try {
    const { symbol, quantity } = req.body;
    const result = await executeTrade(req.user._id, symbol, 'SELL', quantity, stocks.find(s => s.symbol === symbol.toUpperCase()).price);
    
    res.json({
      success: true,
      message: 'Sell order executed',
      balance: result.user.balance,
      portfolio: result.portfolio.holdings,
      trade: result.trade
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const trades = await Trade.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
