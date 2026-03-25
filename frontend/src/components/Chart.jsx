import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts'
import { useState, useEffect } from 'react'

const Chart = () => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    // Mock price data for demo chart
    const data = Array.from({ length: 30 }, (_, i) => ({
      time: i,
      price: 100 + Math.sin(i / 3) * 20 + Math.random() * 10,
      volume: Math.random() * 1000
    }))
    setChartData(data)
  }, [])

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">AAPL Price Chart</h3>
        <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
          <span>1D</span>
          <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
          <span>+2.34%</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" vertical={false} />
          <XAxis 
            dataKey="time" 
            axisLine={false}
            tickLine={false}
            tickMargin={12}
            tickFormatter={(value) => `${value}h`}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tickMargin={12}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip 
            contentStyle={{
              background: 'hsl(0 0% 98%)',
              border: '1px solid hsl(0 0% 85%)',
              borderRadius: '12px'
            }}
          />
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#10b981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#priceGradient)" 
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 2, stroke: '#ffffff' }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Open</p>
          <p className="font-bold text-emerald-600 text-lg">₹225.10</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">High</p>
          <p className="font-bold text-emerald-600 text-lg">₹228.50</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Low</p>
          <p className="font-bold text-red-600 text-lg">₹223.80</p>
        </div>
      </div>
    </div>
  )
}

export default Chart
