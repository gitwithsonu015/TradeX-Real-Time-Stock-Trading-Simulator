import { useState } from 'react'
import { TrendingUp, TrendingDown, Plus, Star } from 'lucide-react'
import { useStockStore } from '../store/stockStore'
import toast from 'react-hot-toast'

const StockCard = ({ stock, onAddWatchlist, isInWatchlist }) => {
  const { updateStock } = useStockStore()
  const [isExpanded, setIsExpanded] = useState(false)

  const StockIcon = ({ symbol }) => (
    <div className="w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg" style={{
      background: `linear-gradient(135deg, hsl(${Math.random()*360}, 70%, 60%), hsl(${Math.random()*360}, 70%, 50%))`
    }}>
      <span className="text-white font-bold text-lg">{symbol}</span>
    </div>
  )

  const changeColor = stock.changePercent > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
  const changeIcon = stock.changePercent > 0 ? TrendingUp : TrendingDown
  const Icon = changeIcon

const handleWatchlistToggle = () => {
    useStockStore.getState().toggleWatchlist(stock.symbol)
    toast.success(isInWatchlist ? 'Removed from watchlist' : 'Added to watchlist')
  }

  return (
    <div className={`group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border hover:border-slate-300 dark:hover:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 ${stock.changePercent > 0 ? 'stock-up' : 'stock-down'}`} onClick={() => setIsExpanded(!isExpanded)}>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <StockIcon symbol={stock.symbol} />
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">{stock.symbol}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{stock.name}</p>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleWatchlistToggle()
          }}
          className={`p-2 rounded-xl transition-all hover:scale-110 ${isInWatchlist ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' : 'text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-400'}`}
          title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          {isInWatchlist ? <Star className="w-5 h-5 fill-current" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>

      {/* Price & Change */}
      <div className="space-y-2 mb-6">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            ₹{stock.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </span>
          <span className={`text-lg font-semibold ml-2 ${changeColor}`}>
            {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon className={`w-5 h-5 ${changeColor}`} />
          <span className={`font-medium ${changeColor}`}>
            ₹{stock.change.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Day Range */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div className="text-center p-3 bg-slate-100/50 dark:bg-slate-700/50 rounded-xl">
          <p className="text-slate-600 dark:text-slate-400 text-xs mb-1">Day High</p>
          <p className="font-semibold text-emerald-600 dark:text-emerald-400">
            ₹{stock.high.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="text-center p-3 bg-slate-100/50 dark:bg-slate-700/50 rounded-xl">
          <p className="text-slate-600 dark:text-slate-400 text-xs mb-1">Day Low</p>
          <p className="font-semibold text-red-600 dark:text-red-400">
            ₹{stock.low.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Quick Actions - Expanded */}
{isExpanded && (
        <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button className="group flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-200/50 dark:border-emerald-800/50 rounded-xl font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 transition-all duration-200">
              <TrendingUp className="w-4 h-4 group-hover:-rotate-1 transition-transform" />
              <span>Buy</span>
            </button>
            <button className="group flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-200/50 dark:border-red-800/50 rounded-xl font-semibold text-red-700 dark:text-red-400 hover:text-red-600 transition-all duration-200">
              <TrendingDown className="w-4 h-4 group-hover:rotate-1 transition-transform" />
              <span>Sell</span>
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
            Click to expand for quick trade actions
          </p>
        </div>
      )}
    </div>
  )
}

export default StockCard
