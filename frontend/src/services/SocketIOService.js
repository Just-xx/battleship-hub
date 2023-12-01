import { io } from 'socket.io-client';

export class SocketIOService {

  constructor() {
    this.io = io(import.meta.env.VITE_WS_URL, { autoConnect: false });
  }

  connectToServer() {
    this.io.connect();
  }

  disconnectFromServer() {
    return () => {
      this.io.disconnect();
    };
  }
}

export default new SocketIOService();