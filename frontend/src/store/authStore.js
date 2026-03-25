import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '../services/api.js'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const response = await api.post('/auth/login', { email, password })
          const { token, user } = response.data
          set({ user, token })
          localStorage.setItem('token', token)
          return { success: true }
        } catch (error) {
          return { 
            success: false, 
            error: error.response?.data?.error || 'Login failed' 
          }
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true })
        try {
          const response = await api.post('/auth/register', { name, email, password })
          const { token, user } = response.data
          set({ user, token })
          localStorage.setItem('token', token)
          return { success: true }
        } catch (error) {
          return { 
            success: false, 
            error: error.response?.data?.error || 'Registration failed' 
          }
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        set({ user: null, token: null })
        localStorage.removeItem('token')
      },

      initialize: () => {
        const token = localStorage.getItem('token')
        if (token) {
          // Could validate token with API
          set({ token })
        }
      },

      isAuthenticated: () => !!get().token && !!get().user
    }),
    {
      name: 'tradex-auth'
    }
  )
)

export default useAuthStore
