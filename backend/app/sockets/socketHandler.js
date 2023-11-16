import { roomHandler } from "./roomHandler.js";
import { Server } from 'socket.io'

function configureSocket(server) {
  const io = new Server(server);
  roomHandler(io);
}

export { configureSocket }