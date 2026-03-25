import { useEffect, useState } from 'react'
import { useStockStore } from '../store/stockStore.js'
import usePortfolioStore from '../store/portfolioStore.js'
import useAuthStore from '../store/authStore.js'
import socket from '../services/socket.js'
import StockCard from '../components/StockCard.jsx'
import TradePanel from '../components/TradePanel.jsx'
import Chart from '../components/Chart.jsx'
import toast from 'react-hot-toast'
import { Search, Filter, Bell } from 'lucide-react'

const Dashboard = () => {
  const { stocks, fetchStocks } = useStockStore()
  const { portfolio, fetchPortfolio } = usePortfolioStore()
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('market')
  const [searchTerm, setSearchTerm] = useState('')
const { watchlist } = useStockStore()

  useEffect(() => {
    fetchStocks()
    fetchPortfolio()
    
    // Socket for real-time updates
    socket.on('stockUpdate', (updatedStocks) => {
      useStockStore.getState().stocks.forEach(stock => {
        const updated = updatedStocks.find(s => s.symbol === stock.symbol)
        if (updated) {
          useStockStore.getState().updateStock(updated)
        }
      })
    })

    return () => {
      socket.off('stockUpdate')
    }
  }, [])

  const filteredStocks = stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

const toggleWatchlist = (symbol) => {
    useStockStore.getState().toggleWatchlist(symbol)
    toast.success('Watchlist updated!')
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Real-time market data and your portfolio overview
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-200/50 dark:border-slate-700/50 flex-1">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Cash Balance</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                ₹{user?.balance?.toLocaleString() || '10,00,000'}
              </p>
            </div>
          </div>
          <div className="bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-200/50 dark:border-emerald-800/50 rounded-2xl p-4 shadow-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1">Total PnL</p>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                ₹{(user?.totalPnL || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search stocks (AAPL, TSLA, RELIANCE...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200/50 dark:border-slate-800/50">
        <button
          className={`pb-4 px-6 font-semibold transition-colors ${activeTab === 'market' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
          onClick={() => setActiveTab('market')}
        >
          Market
        </button>
        <button
          className={`pb-4 px-6 font-semibold transition-colors ${activeTab === 'watchlist' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
          onClick={() => setActiveTab('watchlist')}
        >
          Watchlist ({watchlist.length})
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market/Watchlist Stocks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {(activeTab === 'market' ? filteredStocks : watchlist).map((stock) => (
              <StockCard
                key={stock.symbol}
                stock={stock}
                onAddWatchlist={() => toggleWatchlist(stock.symbol)}
isInWatchlist={watchlist.some(w => w.symbol === stock.symbol)}
                onToggleWatchlist={toggleWatchlist}
              />
            ))}
          </div>
        </div>

        {/* Right sidebar - Chart & Trade */}
        <div className="space-y-6">
          <Chart />
          <TradePanel />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
