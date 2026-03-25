import { useEffect, useState } from 'react'
import api from '../services/api.js'
import { Trophy, Crown, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get('/leaderboard')
      setLeaderboard(response.data)
    } catch (error) {
      console.error('Failed to fetch leaderboard')
    } finally {
      setIsLoading(false)
    }
  }

  const chartData = leaderboard.slice(0, 10).map((user, index) => ({
    name: user.name,
    pnl: user.totalPnL || 0,
    rank: index + 1
  }))

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full mb-6 shadow-2xl">
          <Crown className="w-6 h-6" />
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <Trophy className="w-6 h-6" />
        </div>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Top traders by total profit & loss. Climb the ranks!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top 3 Cards */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border-4 border-yellow-200/50 dark:border-yellow-800/50 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Rohan Sharma</h3>
                <p className="text-4xl font-black text-yellow-600">+₹1,25,000</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">147% ROI</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-emerald-400/10 to-teal-500/10 border-2 border-emerald-200/50 dark:border-emerald-800/50 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">Priya Patel</h4>
                <p className="text-2xl font-bold text-emerald-600">+₹85,000</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-amber-400/10 to-orange-500/10 border-2 border-amber-200/50 dark:border-amber-800/50 rounded-2xl">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100">Amit Singh</h4>
                <p className="text-2xl font-bold text-amber-600">+₹45,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div>
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              <span>Top 50 Traders</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Rank</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">Trader</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.slice(0, 10).map((user, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-200/50 dark:border-slate-700/50 last:border-b-0">
                      <td className="py-3 px-4 font-bold text-lg">
                        #{index + 1}
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-slate-100">{user.name}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">{user.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className={`text-2xl font-bold ${user.totalPnL >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {user.totalPnL >= 0 ? '+' : ''}₹{Math.abs(user.totalPnL).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PnL Chart */}
          <div className="mt-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-6">Top Traders PnL</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pnl" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
