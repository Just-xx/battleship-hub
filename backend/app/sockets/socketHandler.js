import { roomHandler } from "./roomHandler.js";
import { gameHandler } from "./gameHandler.js";
import { Server } from 'socket.io'

function configureSocket(server) {
  const io = new Server(server);
  roomHandler(io);
  gameHandler(io);
}

export { configureSocket }