const io = require("socket.io")(server, {
  cors: {
    origin: [
      "https://trade-x-real-time-stock-trading-sim-five.vercel.app",
      "https://trade-x-real-time-stock-trading-sim-peach.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});
