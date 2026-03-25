import { useEffect } from 'react'
import usePortfolioStore from '../store/portfolioStore.js'
import { useStockStore } from '../store/stockStore.js'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const Portfolio = () => {
  const { portfolio, fetchPortfolio } = usePortfolioStore()
  const { stocks } = useStockStore()

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

  const pieData = portfolio?.holdings?.map((holding, index) => {
    const stock = stocks.find(s => s.symbol === holding.symbol)
    const currentValue = holding.quantity * (stock?.price || holding.avgPrice)
    return {
      name: holding.symbol,
      value: currentValue,
      fill: COLORS[index % COLORS.length]
    }
  }) || []

  const totalPortfolioValue = portfolio?.totalPortfolioValue || 0
  const cashPercent = portfolio?.cashPercent || 100

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-2">
          Portfolio
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Your investments and performance overview</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Holdings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                    <th className="text-left py-4 font-semibold text-slate-900 dark:text-slate-100">Symbol</th>
                    <th className="text-right py-4 font-semibold text-slate-900 dark:text-slate-100">Qty</th>
                    <th className="text-right py-4 font-semibold text-slate-900 dark:text-slate-100">Avg Price</th>
                    <th className="text-right py-4 font-semibold text-slate-900 dark:text-slate-100">Current</th>
                    <th className="text-right py-4 font-semibold text-slate-900 dark:text-slate-100">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio?.holdings?.map(holding => {
                    const stock = stocks.find(s => s.symbol === holding.symbol)
                    const currentPrice = stock?.price || holding.avgPrice
                    const currentValue = holding.quantity * currentPrice
                    const pnl = currentValue - (holding.quantity * holding.avgPrice)
                    const pnlPercent = (pnl / (holding.quantity * holding.avgPrice) * 100)
                    
                    return (
                      <tr key={holding.symbol} className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-4 font-semibold text-slate-900 dark:text-slate-100">{holding.symbol}</td>
                        <td className="text-right py-4">{holding.quantity.toLocaleString()}</td>
                        <td className="text-right py-4 text-slate-600 dark:text-slate-400">₹{holding.avgPrice.toLocaleString()}</td>
                        <td className="text-right py-4 font-semibold">₹{currentPrice.toLocaleString()}</td>
                        <td className={`text-right py-4 font-semibold ${pnl >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {pnl >= 0 ? '+' : ''}{pnl.toLocaleString()} ({pnlPercent.toFixed(2)}%)
                        </td>
                      </tr>
                    )
                  }) || (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-slate-500 dark:text-slate-400">
                        No holdings yet. Start trading!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
            <h3 className="text-xl font-bold mb-6">Portfolio Summary</h3>
            <div className="space-y-4 text-center">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Value</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  ₹{totalPortfolioValue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Cash</p>
                <p className="text-xl font-bold text-emerald-600">{cashPercent.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
            <h3 className="text-xl font-bold mb-6">Allocation</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[{name: 'Cash', value: totalPortfolioValue * (cashPercent/100)}, ...pieData]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  nameKey="name"
                >
                  {[{name: 'Cash', value: totalPortfolioValue * (cashPercent/100)}, ...pieData].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
