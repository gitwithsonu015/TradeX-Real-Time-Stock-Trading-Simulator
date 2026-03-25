import { Star, X, TrendingUp, TrendingDown } from 'lucide-react'

const Watchlist = ({ watchlist, onToggleWatchlist }) => {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-yellow-200/50 dark:border-yellow-800/50 shadow-lg">
      <h4 className="text-lg font-bold mb-4 flex items-center space-x-2 text-slate-900 dark:text-slate-100">
        <Star className="w-5 h-5 text-yellow-500 fill-current" />
        <span>Watchlist</span>
        <span className="ml-auto text-sm bg-yellow-100 dark:bg-yellow-900/50 px-2 py-1 rounded-full font-semibold">
          {watchlist.length}
        </span>
      </h4>

      {watchlist.length === 0 ? (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 mb-4">Your watchlist is empty</p>
          <p className="text-sm text-slate-500 dark:text-slate-500">Add stocks from the market list</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {watchlist.map((stock) => {
            const changeColor = stock.changePercent >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            const Icon = stock.changePercent >= 0 ? TrendingUp : TrendingDown

            return (
              <div key={stock.symbol} className="group flex items-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-all border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{stock.symbol}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">{stock.symbol}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{stock.name}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-lg text-slate-900 dark:text-slate-100">
                      ₹{stock.price.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-end space-x-1">
                      <Icon className={`w-4 h-4 ${changeColor}`} />
                      <span className={`text-sm font-semibold ${changeColor}`}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onToggleWatchlist(stock.symbol)}
                  className="p-2 -m-2 rounded-xl text-slate-400 hover:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ml-4 flex-shrink-0"
                  title="Remove from watchlist"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {watchlist.length > 0 && (
        <div className="pt-4 mt-4 border-t border-yellow-200/50 dark:border-yellow-800/50">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            💡 Right-click stocks in market to add to watchlist
          </p>
        </div>
      )}
    </div>
  )
}

export default Watchlist
