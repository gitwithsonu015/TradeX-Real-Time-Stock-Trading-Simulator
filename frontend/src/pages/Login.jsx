import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore.js'
import { Mail, Lock, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const { login, register, isLoading: authLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const result = isLogin 
      ? await login(formData.email, formData.password)
      : await register(formData.name, formData.email, formData.password)

    if (result.success) {
      toast.success(isLogin ? 'Login successful!' : 'Account created!')
      navigate('/dashboard')
    } else {
      toast.error(result.error)
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 p-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-3xl font-bold text-white">TX</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-2">
            {isLogin ? 'Welcome back' : 'Create Account'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {isLogin 
              ? 'Enter your details to login to your account' 
              : 'Join TradeX and start trading with ₹10L virtual money'
            }
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 pl-11 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  placeholder="Enter your name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 pl-11 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 pl-11 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || authLoading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 focus:ring-4 focus:ring-indigo-500/50 focus:outline-none transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading || authLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'}
                <UserPlus className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Forgot Password Link */}
          {isLogin && (
            <div className="text-center">
              <Link 
                to="/forgot-password" 
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium flex items-center justify-center space-x-1 group"
              >
                <Lock className="w-4 h-4 group-hover:rotate-3 transition-transform" />
                <span>Forgot Password?</span>
              </Link>
            </div>
          )}
        </form>

        {/* Toggle */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setFormData({ name: '', email: '', password: '' })
            }}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium"
          >
            {isLogin 
              ? 'Don\'t have an account? Create one' 
              : 'Already have an account? Sign in'
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login

