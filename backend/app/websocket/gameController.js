import chalk from "chalk";
import { Rooms } from "../utils/Rooms.js";
import { generatePattern } from "../utils/generatePattern.js";
import { ROOM_UTYPE_HOST, ROOM_UTYPE_PLAYER } from "../utils/Room.js";

class GameController {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;

    this.#gameHandlersSet();
  }

  #handleUnfreeze() {
    this.socket.on("unfreeze", payload => {
      const roomExists = Rooms.getById(payload.roomId);
      if (!roomExists) return;

      Rooms.updateUser(payload.roomId, this.socket.id, payload.prevSocketId);

      const newPattern = generatePattern();
      Rooms.addPattern(payload.roomId, this.socket.id, newPattern);
      this.socket.emit("patternProposal", { pattern: newPattern });

      const isFreezed = Rooms.getById(payload.roomId).freezed;


      if (isFreezed) {
        this.socket.join(payload.roomId);
        console.log(chalk.yellow(`Room "${payload.roomId}" unfreezed`));
        console.log(chalk.yellow(`User "${this.socket.id}" rejoined`));
        Rooms.freeze(payload.roomId, true);
      } else {
        this.socket.join(payload.roomId);
        this.io.to(payload.roomId).emit("clientStart");

        console.log(chalk.yellow(`User "${this.socket.id}" rejoined`));

        this.io
          .to(payload.roomId)
          .emit("turn", { turn: Rooms.getTurn(payload.roomId) });

        this.io.to(this.socket.id).emit("oponnentPattern", {
          pattern: Rooms.getOpponentPattern(this.socket.id).pattern.map(
            ship => ({
              type: ship.type,
              id: ship.id,
            })
          ),
        });

        this.io
          .to(Rooms.getOpponentId(this.socket.id))
          .emit("oponnentPattern", {
            pattern: newPattern.map(ship => ({ type: ship.type, id: ship.id })),
          });
      }
    });
  }

  #handleGuess() {
    this.socket.on("guess", payload => {
      if (!(payload.userType === Rooms.getTurn(payload.roomId))) return;

      const strucked = Rooms.addHit(
        payload.roomId,
        this.socket.id,
        payload.x,
        payload.y
      );

      const win = Rooms.checkForWin(this.socket.id);
      const hostId = Rooms.getBySocketId(this.socket.id).hostId;
      const senderUType =
        this.socket.id === hostId ? ROOM_UTYPE_HOST : ROOM_UTYPE_PLAYER;

      if (win) {
        this.socket.emit("win");
        this.socket.to(payload.roomId).emit("lost");
      }

      if (strucked) {
        this.io.to(payload.roomId).emit("hit", {
          ship: strucked,
          senderId: this.socket.id,
          userType: senderUType,
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
          userType: senderUType,
          x: payload.x,
          y: payload.y,
          ship: null,
          struck: false,
        });
      }
    });
  }

  #gameHandlersSet() {
    this.#handleUnfreeze();
    this.#handleGuess();
  }
}

export const gameController = io => {
  io.on("connection", socket => {
    new GameController(io, socket);
  });
};
