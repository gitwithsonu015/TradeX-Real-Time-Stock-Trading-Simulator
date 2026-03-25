# TradeX – Real-Time Stock Trading Simulator 🚀

Production-level full-stack web app simulating real-world stock trading with virtual money (₹10,00,000 starting balance per user).

## 🏗️ Tech Stack
- **Frontend**: React 18 + Vite + Tailwind CSS + Zustand + Recharts + Socket.io-client
- **Backend**: Node.js + Express + MongoDB (Mongoose) + Socket.io + JWT + bcrypt
- **Real-time**: Socket.io for live prices/portfolio updates
- **Responsive**: Mobile-first, dark mode

## 📁 Project Structure
```
e:/TradeX/
├── backend/          # Express API + WebSockets
├── frontend/         # React app
├── TODO.md           # Build progress
└── README.md         # This file
```

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas: get connection string)
- npm/yarn

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env: MONGO_URI=mongodb://localhost:27017/tradex or Atlas URL
# JWT_SECRET=your-super-secret-key (generate with openssl rand -base64 32)
npm run dev
```
Backend runs on `http://localhost:5000`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

### 3. Test the App
1. Register/Login (₹10L virtual balance)
2. Dashboard: Live stock prices/charts
3. Buy/Sell stocks
4. View Portfolio PnL, Transactions, Leaderboard

## 🔌 Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tradex
JWT_SECRET=your-super-secret-key
NODE_ENV=development
```

### Frontend (.env - optional)
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 🌐 API Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create account |
| POST | `/api/auth/login` | No | Login |
| GET | `/api/stocks` | Yes | Live stocks |
| POST | `/api/trades/buy` | Yes | Buy stock |
| POST | `/api/trades/sell` | Yes | Sell stock |
| GET | `/api/portfolio` | Yes | Portfolio |
| GET | `/api/leaderboard` | No | Top traders |

## 🚀 Production Deployment

### Backend (Render/Railway)
1. Push to GitHub
2. Connect to Render → Build: `npm install` → Start: `npm start`
3. Set env vars (MONGO_URI Atlas, JWT_SECRET)

### Frontend (Vercel)
1. `cd frontend`
2. `vercel --prod`
3. Set `VITE_API_URL=https://your-backend.render.com/api`

### Database
- MongoDB Atlas (free tier): Create cluster, get connection string

## 🧪 Testing
```bash
# Backend tests (future)
npm test

# Seed demo users/stocks
npm run seed
```

## 📱 Features
- ✅ Real-time prices (WebSocket)
- ✅ JWT auth + bcrypt
- ✅ Buy/Sell with validation
- ✅ Portfolio PnL calculation
- ✅ Watchlist + Leaderboard
- ✅ Charts (1D/1W/1M)
- ✅ Responsive + Dark mode
- ✅ Notifications + Error handling

## 🤝 Contributing
See [TODO.md](TODO.md) for build progress.

Built with ❤️ by BLACKBOXAI
