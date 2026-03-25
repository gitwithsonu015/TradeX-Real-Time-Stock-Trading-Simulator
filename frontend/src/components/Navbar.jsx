import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore.js'
import { Menu, User, LogOut, BarChart3, Wallet, TrendingUp, Award } from 'lucide-react'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const { user, logout, initialize } = useAuthStore()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    initialize()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TX</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TradeX
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
{user && (
                <>
                  <Link to="/dashboard" className="flex items-center space-x-1 px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 font-medium rounded-md transition-colors">
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/portfolio" className="flex items-center space-x-1 px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 font-medium rounded-md transition-colors">
                  <Wallet className="w-4 h-4" />
                  <span>Portfolio</span>
                </Link>
                <Link to="/transactions" className="flex items-center space-x-1 px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 font-medium rounded-md transition-colors">
                  <TrendingUp className="w-4 h-4" />
                  <span>Transactions</span>
                </Link>
                <Link to="/leaderboard" className="flex items-center space-x-1 px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 font-medium rounded-md transition-colors">
                  <Award className="w-4 h-4" />
                  <span>Leaderboard</span>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
{user && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-medium rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
            <button
              className="md:hidden p-2 rounded-md text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

{isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50">
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600"
                >Dashboard</Link>
                <Link
                  to="/portfolio"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600"
                >Portfolio</Link>
                <Link
                  to="/transactions"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600"
                >Transactions</Link>
                <Link
                  to="/leaderboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600"
                >Leaderboard</Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-left text-base font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
