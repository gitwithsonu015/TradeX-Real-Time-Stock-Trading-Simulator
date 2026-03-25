import { create } from "zustand";
import { api } from "../services/api.js";

export const useStockStore = create((set, get) => ({
  stocks: [],
  watchlist: [],
  isLoading: false,
  error: null,

  fetchStocks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/stocks");
      set({ stocks: response.data, error: null });
    } catch (error) {
      set({ error: "Failed to fetch stocks" });
    } finally {
      set({ isLoading: false });
    }
  },

  addToWatchlist: (stock) => {
    set((state) => {
      if (!state.watchlist.find(w => w.symbol === stock.symbol)) {
        return { watchlist: [...state.watchlist, stock] };
      }
      return state;
    });
  },

  removeFromWatchlist: (symbol) => {
    set((state) => ({
      watchlist: state.watchlist.filter(w => w.symbol !== symbol)
    }));
  },

  toggleWatchlist: (symbol) => {
    const state = get();
    const stock = state.stocks.find(s => s.symbol === symbol);
    if (stock && !state.watchlist.find(w => w.symbol === symbol)) {
      set({ watchlist: [...state.watchlist, stock] });
    } else {
      set({ watchlist: state.watchlist.filter(w => w.symbol !== symbol) });
    }
  },

  updateStock: (updatedStock) => {
    set((state) => ({
      stocks: state.stocks.map((stock) =>
        stock.symbol === updatedStock.symbol ? updatedStock : stock
      ),
      watchlist: state.watchlist.map((stock) =>
        stock.symbol === updatedStock.symbol ? updatedStock : stock
      ),
    }));
  },
}));

