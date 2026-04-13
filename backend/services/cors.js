const allowedOrigins = [
  'https://trade-x-real-time-stock-trading-sim-five.vercel.app',
  'https://trade-x-real-time-stock-trading-sim-peach.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));
