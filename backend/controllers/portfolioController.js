const Portfolio = require('../models/Portfolio');
const { stocks } = require('../utils/mockStockData');
const User = require('../models/User');

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user._id });
    const user = await User.findById(req.user._id);

    if (!portfolio || portfolio.holdings.length === 0) {
      return res.json({
        holdings: [],
        totalValue: 0,
        totalPnL: 0,
        cash: user.balance,
        totalPortfolioValue: user.balance
      });
    }

    let totalValue = 0;
    let totalInvestment = 0;
    const holdingsWithCurrent = portfolio.holdings.map(holding => {
      const currentStock = stocks.find(s => s.symbol === holding.symbol);
      if (!currentStock) return null;

      const currentValue = holding.quantity * currentStock.price;
      const investment = holding.quantity * holding.avgPrice;
      const unrealizedPnL = currentValue - investment;

      totalValue += currentValue;
      totalInvestment += investment;

      return {
        ...holding.toObject(),
        currentPrice: currentStock.price,
        currentValue,
        pnl: unrealizedPnL,
        pnlPercent: (unrealizedPnL / investment * 100).toFixed(2)
      };
    }).filter(h => h !== null);

    const totalPnL = totalValue - totalInvestment;
    const totalPortfolioValue = totalValue + user.balance;

    res.json({
      holdings: holdingsWithCurrent,
      totalValue,
      totalInvestment,
      totalPnL,
      cash: user.balance,
      totalPortfolioValue,
      cashPercent: ((user.balance / totalPortfolioValue) * 100).toFixed(2),
      equityPercent: ((totalValue / totalPortfolioValue) * 100).toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
