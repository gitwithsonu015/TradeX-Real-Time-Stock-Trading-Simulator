const allowedOrigins = [
  "https://trade-x-real-time-stock-trading-sim-five.vercel.app",
  "https://trade-x-real-time-stock-trading-sim-peach.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
