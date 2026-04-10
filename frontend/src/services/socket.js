import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_SOCKET_URL || 'https://tradex-real-time-stock-trading-simulator-zao0.onrender.com')

export default socket
