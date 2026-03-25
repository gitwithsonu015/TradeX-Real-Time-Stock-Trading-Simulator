const { stocks } = require('../utils/mockStockData');

exports.getStocks = (req, res) => {
  res.json(stocks);
};

exports.getStock = (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const stock = stocks.find(s => s.symbol === symbol);
  
  if (!stock) {
    return res.status(404).json({ error: 'Stock not found' });
  }
  
  res.json(stock);
};
