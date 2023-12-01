import { roomController } from "./roomController.js";
import { gameController } from "./gameController.js";
import { Server } from 'socket.io'

function wsController(server) {
  const io = new Server(server);
  roomController(io);
  gameController(io);
}

export default wsController