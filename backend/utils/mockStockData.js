// Mock stocks data for simulator - real-time prices via WebSocket
const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 225.10, change: 1.25, changePercent: 0.56, high: 226.50, low: 223.80 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 182.45, change: -0.85, changePercent: -0.46, high: 184.20, low: 181.90 },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.30, change: 3.20, changePercent: 0.78, high: 417.00, low: 412.50 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.75, change: -5.40, changePercent: -2.12, high: 255.00, low: 247.20 },
  { symbol: 'AMZN', name: 'Amazon.com', price: 186.65, change: 2.10, changePercent: 1.14, high: 188.30, low: 185.20 },
  { symbol: 'META', name: 'Meta Platforms', price: 575.40, change: 4.50, changePercent: 0.79, high: 578.00, low: 572.00 },
  { symbol: 'NVDA', name: 'NVIDIA', price: 132.80, change: 2.30, changePercent: 1.76, high: 134.50, low: 131.20 },
  { symbol: 'NFLX', name: 'Netflix', price: 710.25, change: -8.75, changePercent: -1.22, high: 720.00, low: 708.50 },
  { symbol: 'SHOP', name: 'Shopify', price: 82.35, change: 1.10, changePercent: 1.35, high: 83.20, low: 81.50 },
  { symbol: 'UBER', name: 'Uber Technologies', price: 74.60, change: 0.45, changePercent: 0.61, high: 75.30, low: 74.10 },
  { symbol: 'TATA', name: 'Tata Motors', price: 1050.50, change: 12.75, changePercent: 1.23, high: 1062.00, low: 1045.00 },
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2950.25, change: -18.50, changePercent: -0.62, high: 2975.00, low: 2938.00 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1625.80, change: 8.20, changePercent: 0.51, high: 1632.00, low: 1620.00 },
  { symbol: 'INFY', name: 'Infosys', price: 1850.40, change: -5.60, changePercent: -0.30, high: 1860.00, low: 1845.00 },
  { symbol: 'ITC', name: 'ITC Ltd', price: 495.75, change: 2.25, changePercent: 0.46, high: 498.00, low: 494.00 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 825.30, change: 10.50, changePercent: 1.29, high: 832.00, low: 820.00 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1420.90, change: -7.10, changePercent: -0.50, high: 1430.00, low: 1418.00 },
  { symbol: 'ASIANPAINT', name: 'Asian Paints', price: 2985.20, change: 15.40, changePercent: 0.52, high: 3000.00, low: 2975.00 },
  { symbol: 'LT', name: 'Larsen & Toubro', price: 3625.75, change: -22.25, changePercent: -0.61, high: 3650.00, low: 3605.00 },
  { symbol: 'HCLTECH', name: 'HCL Technologies', price: 1628.50, change: 6.75, changePercent: 0.42, high: 1635.00, low: 1622.00 }
];

// Function to generate random price fluctuation (-3% to +3%)
const updateStockPrice = (stock) => {
  const volatility = Math.random() * 0.06 - 0.03; // -3% to +3%
  const newPrice = stock.price * (1 + volatility);
  
  return {
    ...stock,
    price: Math.round(newPrice * 100) / 100,
    change: Math.round((newPrice - stock.price) * 100) / 100,
    changePercent: Math.round(volatility * 10000) / 100,
    high: Math.max(stock.high, newPrice),
    low: Math.min(stock.low, newPrice)
  };
};

module.exports = { stocks, updateStockPrice };
