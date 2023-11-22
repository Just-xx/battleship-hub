import chalk from "chalk";
import { Rooms } from "../utils/Rooms.js";
import { generatePattern } from "../utils/generatePattern.js";

class GameSocketHandler {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  #handleUnfreeze() {
    this.socket.on("unfreeze", payload => {



      Rooms.updateUser(
        payload.roomId,
        payload.userType,
        this.socket.id,
        payload.prevSocketId
      );

      const newPattern = generatePattern();
      this.socket.emit("pattern", { pattern: newPattern });

      Rooms.addPattern(
        payload.roomId,
        this.socket.id,
        payload.userType,
        newPattern
      );

      if (Rooms.getById(payload.roomId)?.freeze) {
        Rooms.setRandomTurn(payload.roomId);
        this.socket.join(payload.roomId);
        Rooms.freeze(payload.roomId, true);

        console.log(chalk.yellow(`Room "${payload.roomId}" unfreezed`));
      } else {
        this.socket.join(payload.roomId);
        console.log(chalk.yellow(`Room "${payload.roomId}" already unfreezed`));
        this.io.to(payload.roomId).emit("clientStart");

        this.io
          .to(payload.roomId)
          .emit("turn", { turn: Rooms.getTurn(payload.roomId) });
        
        this.io
          .to(this.socket.id)
          .emit("oponnentPattern", Rooms.getOpoenntPattern(this.socket.id).map(ship => ({ type: ship.type, id: ship.id })))
        
        this.io
          .to(Rooms.getOponentId(this.socket.id))
          .emit("oponnentPattern", newPattern.map(ship => ({ type: ship.type, id: ship.id })))
      }
    });
  }

  #handleGuess() {
    this.socket.on("guess", payload => {
      if (payload.userType === Rooms.getTurn(payload.roomId)) {
        const hitResult = Rooms.checkForHit(
          payload.roomId,
          this.socket.id,
          payload.x,
          payload.y
        );

        const hostId = Rooms.getBySocketId(this.socket.id).hostId;

        if (hitResult?.hit) {
          console.log("HIT", hitResult.ship)
          this.io.to(payload.roomId).emit("hit", {
            ship: hitResult.ship,
            senderId: this.socket.id,
            userType: this.socket.id === hostId ? "host" : "player",
            x: payload.x,
            y: payload.y,
            struck: true,
          });
        } else {
          Rooms.changeTurn(payload.roomId);
          this.io
            .to(payload.roomId)
            .emit("turn", { turn: Rooms.getTurn(payload.roomId) });
          this.io.to(payload.roomId).emit("hit", {
            senderId: this.socket.id,
            userType: this.socket.id === hostId ? "host" : "player",
            x: payload.x,
            y: payload.y,
            ship: null,
            struck: false,
          });
        }
      }
    });
  }

  gameHandlersSet() {
    this.#handleUnfreeze();
    this.#handleGuess();
  }
}

export const gameHandler = io => {
  io.on("connection", socket => {
    const gameSocketHandler = new GameSocketHandler(io, socket);
    gameSocketHandler.gameHandlersSet();
  });
};
