import chalk from "chalk";
import { Rooms } from "../utils/Rooms.js";
import { generatePattern } from "../utils/generatePattern.js";

class RoomSocketHandler {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  #makeId(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  handleCreatingRoom() {
    this.socket.on("createRoom", () => {
      const roomId = this.#makeId(8);
      Rooms.create(roomId, this.socket.id);

      this.socket.join(roomId);
      this.socket.emit("roomId", { roomId: String(roomId) });
    });
  }

  handlejoiningRoom() {
    this.socket.on("joinRoom", payload => {
      if (Rooms.getById(payload.roomId)) {
        this.socket.join(String(payload.roomId));
        Rooms.addUser(payload.roomId, this.socket.id);
        this.socket.emit("roomId", {
          roomId: String(payload.roomId),
          success: true,
        });
        this.socket.to(payload.roomId).emit("playerJoin", {
          id: this.socket.id,
          playerNickname: payload.playerNickname,
        });
      } else {
        this.socket.emit("roomId", { success: false, roomId: undefined });
      }
    });
  }

  handleGamePreparation() {
    this.socket.on("requestStart", payload => {
      this.io.to(payload.roomId).emit("requestData");
    });

    this.socket.on("gameData", payload => {
      if (payload.hostNickname) {
        Rooms.addHostNickname(payload.roomId, payload.hostNickname);
        this.io
          .to(payload.roomId)
          .emit("hostInfo", { hostNickname: payload.hostNickname });
      } else if (payload.playerNickname)
        Rooms.addPlayerNickname(payload.roomId, payload.playerNickname);

      if (Rooms.isLobbyComplete(payload.roomId)) {
        this.#handleGameStart(payload);
      }
    });
  }

  #handleGameStart(payload) {
    console.log(chalk.green(`Game room "${payload.roomId}" starting game...`));
    Rooms.freeze(payload.roomId);
    this.io
      .to(payload.roomId)
      .emit("gameStart", Rooms.rooms[Rooms.getById(payload.roomId)]);
  }

  hostDisconnects(io, playerSocketId) {
    io.to(playerSocketId).emit("hostQuit");
    // TODO: delete player from this room
  }

  playerDisconnects(io, roomId) {
    io.to(String(roomId)).emit("playerQuit");
  }

  handleDisconnect() {
    this.socket.on("disconnect", () => {
      Rooms.handleQuit(
        this.io,
        this.socket,
        this.hostDisconnects,
        this.playerDisconnects
      );
    });
  }

  roomHandlersSet() {
    this.handleCreatingRoom();
    this.handlejoiningRoom();
    this.handleGamePreparation();
    this.handleDisconnect();
  }
}

class GameSocketHandler {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
  }

  #handleUnfreeze() {
    this.socket.on("unfreeze", payload => {
      Rooms.updateUser(payload.roomId, payload.userType, this.socket.id);
      this.socket.emit("pattern", { pattern: generatePattern() });

      if (Rooms.getById(payload.roomId).freeze) {
        this.socket.join(payload.roomId);
        Rooms.freeze(payload.roomId, true);
        console.log(chalk.yellow(`Room "${payload.roomId}" unfreezed`));
      } else {
        this.socket.join(payload.roomId);
        console.log(chalk.yellow(`Room "${payload.roomId}" already unfreezed`));
        this.io.to(payload.roomId).emit("clientStart");
      }
    });
  }

  gameHandlersSet() {
    this.#handleUnfreeze();
  }
}

export function roomHandler(io) {
  io.on("connection", socket => {
    const roomSocketHandler = new RoomSocketHandler(io, socket);
    roomSocketHandler.roomHandlersSet();
    const gameSocketHandler = new GameSocketHandler(io, socket);
    gameSocketHandler.gameHandlersSet();
  });
}
