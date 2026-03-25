import { useState } from 'react'
import api from '../services/api.js'
import toast from 'react-hot-toast'
import useAuthStore from '../store/authStore.js'
import usePortfolioStore from '../store/portfolioStore.js'
import { useStockStore } from '../store/stockStore.js'
import { Play, Pause, Plus, Minus } from 'lucide-react'

const TradePanel = () => {
  const [selectedStock, setSelectedStock] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [orderType, setOrderType] = useState('BUY')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const { user } = useAuthStore()
  const { fetchPortfolio } = usePortfolioStore()

  const handleBuy = async () => {
    if (!selectedStock || !user) return
    
    setIsPlacingOrder(true)
    try {
      const response = await api.post('/trades/buy', { 
        symbol: selectedStock.symbol, 
        quantity 
      })
      toast.success('Buy order executed! 🎉')
      fetchPortfolio()
      setQuantity(1)
    } catch (error) {
      toast.error(error.response?.data?.error || 'Buy order failed')
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const handleSell = async () => {
    if (!selectedStock || !user) return
    
    setIsPlacingOrder(true)
    try {
      const response = await api.post('/trades/sell', { 
        symbol: selectedStock.symbol, 
        quantity 
      })
      toast.success('Sell order executed! ✅')
      fetchPortfolio()
      setQuantity(1)
    } catch (error) {
      toast.error(error.response?.data?.error || 'Sell order failed')
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const totalCost = selectedStock ? selectedStock.price * quantity : 0
  const formattedTotal = totalCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
      <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-slate-100 flex items-center space-x-2">
        <Play className="w-6 h-6 text-emerald-600" />
        <span>Quick Trade</span>
      </h3>

      {/* Stock Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Select Stock
        </label>
        <select 
          value={selectedStock?.symbol || ''}
          onChange={(e) => {
            const stock = window.stockData?.find(s => s.symbol === e.target.value) // Global from socket
            setSelectedStock(stock)
          }}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        >
          <option value="">Choose a stock...</option>
          {useStockStore.getState().stocks.map(stock => (
            <option key={stock.symbol} value={stock.symbol}>
              {stock.symbol} - ₹{stock.price.toLocaleString()}
              {stock.changePercent >= 0 ? ` (+${stock.changePercent.toFixed(2)}%)` : ` (${stock.changePercent.toFixed(2)}%)`}
            </option>
          ))}
        </select>
      </div>

      {selectedStock && (
        <div className="space-y-4 mb-6 p-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/20 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">{selectedStock.symbol}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{selectedStock.name}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                ₹{selectedStock.price.toLocaleString()}
              </p>
              <p className={`text-sm font-semibold ${selectedStock.changePercent >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
          Quantity
        </label>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 min-w-[3rem] text-center">
            {quantity.toLocaleString()}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Total & Order Type */}
      {selectedStock && (
        <div className="mb-6 p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">Total</span>
            <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
              ₹{formattedTotal}
            </span>
          </div>
        </div>
      )}

      {/* Order Buttons */}
      <div className="flex space-x-3">
        <select 
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        >
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </select>
        <button
          onClick={orderType === 'BUY' ? handleBuy : handleSell}
          disabled={!selectedStock || !quantity || isPlacingOrder || !user}
          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl focus:ring-4 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-3"
        >
          {isPlacingOrder ? (
            <>
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Executing...</span>
            </>
          ) : (
            <>
              <span>{orderType}</span>
              <span className="text-sm">({quantity})</span>
            </>
          )}
        </button>
      </div>

      {user?.balance < totalCost && orderType === 'BUY' && selectedStock && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50 rounded-xl">
          <p className="text-sm font-medium text-red-800 dark:text-red-300 flex items-center space-x-2">
            <span>⚠️</span>
            <span>Insufficient balance. Available: ₹{user.balance.toLocaleString()}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default TradePanel
