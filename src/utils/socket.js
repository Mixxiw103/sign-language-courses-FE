import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export const socket = io(URL, {
    autoConnect: false,          // tự điều khiển connect/disconnect
    withCredentials: true,
    transports: ['websocket'],   // ưu tiên websocket
    auth: { token: localStorage.getItem('token') } // (khuyến nghị) nếu bạn xác thực bằng JWT
});
