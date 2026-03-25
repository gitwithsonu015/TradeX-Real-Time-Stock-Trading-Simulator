import { create } from 'zustand'
import { api } from '../services/api.js'
import { useStockStore } from './stockStore.js'

const usePortfolioStore = create((set, get) => ({
  portfolio: null,
  isLoading: false,
  error: null,

  fetchPortfolio: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/portfolio')
      set({ portfolio: response.data, error: null })
    } catch (error) {
      set({ error: 'Failed to fetch portfolio', isLoading: false })
    } finally {
      set({ isLoading: false })
    }
  },

  updatePortfolio: (portfolioData) => {
    set({ portfolio: portfolioData })
  }
}))

export default usePortfolioStore
