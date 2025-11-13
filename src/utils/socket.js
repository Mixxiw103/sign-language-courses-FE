import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export const socket = io(URL, {
    autoConnect: true,
    withCredentials: true,
    transports: ['websocket', 'polling'],
    // auth: { token: localStorage.getItem('token') }, // JWT 
});