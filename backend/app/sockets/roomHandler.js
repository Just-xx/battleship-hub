import chalk from "chalk";
import { Rooms } from "../utils/Rooms.js";
import { makeId } from "../utils/makeId.js";

class RoomSocketHandler {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.makeId = makeId;
  }


  handleCreatingRoom() {
    this.socket.on("createRoom", () => {
      const roomId = this.makeId(12);
      Rooms.create(roomId, this.socket.id);

      this.socket.join(roomId);
      this.socket.emit("roomId", { roomId: String(roomId), socketId: this.socket.id });
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
          socketId: this.socket.id
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

  #hostDisconnects(socket, roomId) {
    socket.to(roomId).emit("hostQuit");
    // delete player from this room
  }

  #playerDisconnects(socket, roomId) {
    socket.to(roomId).emit("playerQuit");
  }

  handleDisconnect() {
    this.socket.on("disconnect", () => {
      Rooms.handleQuit(
        this.io,
        this.socket,
        this.#hostDisconnects,
        this.#playerDisconnects
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

export function roomHandler(io) {
  io.on("connection", socket => {
    const roomSocketHandler = new RoomSocketHandler(io, socket);
    roomSocketHandler.roomHandlersSet();
  });
}
