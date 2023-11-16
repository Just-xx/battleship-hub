import { createContext, useState } from 'react'
import { io } from 'socket.io-client';

export class SocketUtilsContext {
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

export const socket = new SocketUtilsContext()